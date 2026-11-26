import type { RegistryBase } from '../registry.config'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { rimraf } from 'rimraf'
import { transform } from 'vue-metamorph'
import { STYLES } from '@/registry/styles'
import { configuredBases } from '../registry.config'
import { createStyleMap } from './create-style-map'
import { makeExpandCnPlugin } from './expand-cn-classes'
import { runEslintFix } from './run-formatters'
import { makeTransformIconsPlugin } from './transform-icons'

/**
 * Codegen pipeline that mirrors shadcn-ui's build-registry.mts step 6
 * ("Copy compiled ui/* from the temporary registries into styles/<style>/ui").
 *
 * Source of truth: `apps/v4/registry/bases/<base>/ui/**` — components authored
 * with `cn-*` placeholder classes (e.g. `cn-button-variant-default`).
 *
 * Per base and per style, we read `apps/v4/registry/styles/style-{name}.css` to
 * get the tailwind expansion for each `cn-*` token, then transform every .vue
 * and .ts file in `bases/<base>/ui` via vue-metamorph, replacing tokens with
 * their expansions. Output goes to `apps/v4/styles/<base>-{name}/ui/**` which
 * is treated as a build artifact and is fully overwritten on each run.
 */

const STYLES_CSS_DIR = path.join('registry', 'styles')
const OUTPUT_BASE_DIR = 'styles'

const TRANSFORMABLE_EXTENSIONS = new Set(['.vue', '.ts', '.tsx', '.js', '.jsx'])
// Files inside source dirs that we never want to ship as part of a style output.
const EXCLUDED_FILENAMES = new Set(['_registry.ts'])

async function walkFiles(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)))
    }
    else if (entry.isFile()) {
      out.push(full)
    }
  }
  return out
}

async function normalizeLineEndings(files: string[]) {
  await Promise.all(files.map(async (file) => {
    const content = await fs.readFile(file, 'utf8')
    const normalized = content.replace(/\r\n/g, '\n')

    if (normalized !== content) {
      await fs.writeFile(file, normalized, 'utf8')
    }
  }))
}

interface StyleStats {
  name: string
  tokenCount: number
  transformedFiles: number
  totalReplacements: number
}

export async function buildBaseStyles(base: RegistryBase, cwd = process.cwd()) {
  const sourceUiDir = path.join('registry', base.path, 'ui')
  const sourceUiAbs = path.resolve(cwd, sourceUiDir)

  // Internal import prefix that points at the source-of-truth components.
  // Per-style outputs must reference their own sibling files instead of the
  // shared base, so we rewrite this prefix to `@/styles/<base>-{style}/` below.
  const sourceImportPrefix = `@/registry/${base.path}/`

  const sourceFiles = await walkFiles(sourceUiAbs)

  // Read & cache all source contents once. They're shared across styles.
  const sourceCache = new Map<string, string>()
  await Promise.all(sourceFiles.map(async (abs) => {
    const content = await fs.readFile(abs, 'utf8')
    sourceCache.set(abs, content)
  }))

  const styles: StyleStats[] = []
  for (const style of STYLES) {
    const cssPath = path.resolve(cwd, STYLES_CSS_DIR, `style-${style.name}.css`)
    const css = await fs.readFile(cssPath, 'utf8')
    const styleMap = createStyleMap(css)
    const tokenCount = Object.keys(styleMap).length

    const outDir = path.resolve(cwd, OUTPUT_BASE_DIR, `${base.name}-${style.name}`, 'ui')
    await rimraf(outDir)
    await fs.mkdir(outDir, { recursive: true })

    const targetImportPrefix = `@/${OUTPUT_BASE_DIR}/${base.name}-${style.name}/`

    let transformedFiles = 0
    let totalReplacements = 0

    for (const sourceAbs of sourceFiles) {
      const relPath = path.relative(sourceUiAbs, sourceAbs)
      const filename = path.basename(relPath)

      if (EXCLUDED_FILENAMES.has(filename))
        continue

      const ext = path.extname(filename)
      const source = sourceCache.get(sourceAbs)!

      let outContent: string
      if (TRANSFORMABLE_EXTENSIONS.has(ext)) {
        // Build a fresh plugins array per file because transformIcons collects
        // icon names in closure state — must not leak across files.
        const plugins = [
          makeExpandCnPlugin(styleMap),
          makeTransformIconsPlugin(),
        ]
        const result = transform(source, filename, plugins)
        outContent = result.code
        const replacementCount = result.stats.reduce((acc, [, n]) => acc + n, 0)
        if (replacementCount > 0) {
          transformedFiles++
          totalReplacements += replacementCount
        }
      }
      else {
        outContent = source
      }

      // Rewrite internal references from the shared base to this style's
      // own directory so generated files are self-contained.
      if (outContent.includes(sourceImportPrefix)) {
        outContent = outContent.split(sourceImportPrefix).join(targetImportPrefix)
      }

      const destAbs = path.join(outDir, relPath)
      await fs.mkdir(path.dirname(destAbs), { recursive: true })
      await fs.writeFile(destAbs, outContent, 'utf8')
    }

    styles.push({ name: `${base.name}-${style.name}`, tokenCount, transformedFiles, totalReplacements })
  }

  return { sourceDir: sourceUiDir, sourceCount: sourceFiles.length, styles }
}

export async function buildStyles() {
  const cwd = process.cwd()

  // eslint-disable-next-line no-console
  console.log('\n🎨 Building per-style component outputs...')

  for (const base of configuredBases) {
    const { sourceDir, sourceCount, styles } = await buildBaseStyles(base, cwd)

    // eslint-disable-next-line no-console
    console.log(`   Found ${sourceCount} source files in ${sourceDir}`)
    for (const { name, tokenCount, transformedFiles, totalReplacements } of styles) {
      // eslint-disable-next-line no-console
      console.log(`   ✅ ${name}: ${tokenCount} tokens, transformed ${transformedFiles} files, ${totalReplacements} replacements`)
    }
  }

  // eslint --fix the generated output so it matches the project's antfu/eslint
  // single-quote conventions. vue-metamorph's recast printer can introduce
  // double quotes / object key wrapping that drift from the codebase style.
  // eslint-disable-next-line no-console
  console.log('   🧹 Running eslint --fix on generated output...')
  try {
    await runEslintFix(configuredBases.map(base => `${OUTPUT_BASE_DIR}/${base.name}-*/ui/**/*.{ts,vue}`), cwd)
  }
  catch (err: any) {
    // eslint --fix exits non-zero when there are unfixable warnings — that's
    // fine for our purposes, the fixable formatting was still applied.
    if (err?.stderr && !String(err.stderr).includes('warning')) {
      console.warn('   ⚠️  eslint --fix had errors:', err.stderr?.toString().slice(0, 500))
    }
  }

  await normalizeLineEndings(await walkFiles(path.resolve(cwd, OUTPUT_BASE_DIR)))

  // eslint-disable-next-line no-console
  console.log('🎨 Per-style build complete.\n')
}
