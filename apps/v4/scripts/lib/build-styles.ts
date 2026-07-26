import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { rimraf } from 'rimraf'
import { transform } from 'vue-metamorph'
import { STYLES } from '@/registry/styles'
import { createStyleMap } from './create-style-map'
import { makeExpandCnPlugin } from './expand-cn-classes'
import { makeTransformIconsPlugin } from './transform-icons'

const execAsync = promisify(exec)

/**
 * Codegen pipeline that mirrors shadcn-ui's build-registry.mts step 6
 * ("Copy compiled ui/* from the temporary registries into styles/<style>/ui").
 *
 * Source of truth: `apps/v4/registry/bases/reka/ui/**` — components authored
 * with `cn-*` placeholder classes (e.g. `cn-button-variant-default`).
 *
 * Per style, we read `apps/v4/registry/styles/style-{name}.css` to get the
 * tailwind expansion for each `cn-*` token, then transform every .vue and .ts
 * file in `bases/reka/ui` via vue-metamorph, replacing tokens with their
 * expansions. Output goes to `apps/v4/styles/reka-{name}/ui/**` which is
 * treated as a build artifact and is fully overwritten on each run.
 */

const SOURCE_BASE = 'reka'
const SOURCE_UI_DIR = path.join('registry', 'bases', SOURCE_BASE, 'ui')
const STYLES_CSS_DIR = path.join('registry', 'styles')
const OUTPUT_BASE_DIR = 'styles'

// Internal import prefix that points at the source-of-truth components.
// Per-style outputs must reference their own sibling files instead of the
// shared base, so we rewrite this prefix to `@/styles/reka-{style}/` below.
const SOURCE_IMPORT_PREFIX = `@/registry/bases/${SOURCE_BASE}/`

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

export async function buildStyles() {
  const cwd = process.cwd()
  const sourceUiAbs = path.resolve(cwd, SOURCE_UI_DIR)

  // eslint-disable-next-line no-console
  console.log('\n🎨 Building per-style component outputs...')

  const sourceFiles = await walkFiles(sourceUiAbs)
  // eslint-disable-next-line no-console
  console.log(`   Found ${sourceFiles.length} source files in ${SOURCE_UI_DIR}`)

  // Read & cache all source contents once. They're shared across styles.
  const sourceCache = new Map<string, string>()
  await Promise.all(sourceFiles.map(async (abs) => {
    const content = await fs.readFile(abs, 'utf8')
    sourceCache.set(abs, content)
  }))

  for (const style of STYLES) {
    const cssPath = path.resolve(cwd, STYLES_CSS_DIR, `style-${style.name}.css`)
    const css = await fs.readFile(cssPath, 'utf8')
    const styleMap = createStyleMap(css)
    const tokenCount = Object.keys(styleMap).length

    const outDir = path.resolve(cwd, OUTPUT_BASE_DIR, `${SOURCE_BASE}-${style.name}`, 'ui')
    await rimraf(outDir)
    await fs.mkdir(outDir, { recursive: true })

    const targetImportPrefix = `@/${OUTPUT_BASE_DIR}/${SOURCE_BASE}-${style.name}/`

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
      if (outContent.includes(SOURCE_IMPORT_PREFIX)) {
        outContent = outContent.split(SOURCE_IMPORT_PREFIX).join(targetImportPrefix)
      }

      const destAbs = path.join(outDir, relPath)
      await fs.mkdir(path.dirname(destAbs), { recursive: true })
      await fs.writeFile(destAbs, outContent, 'utf8')
    }

    // eslint-disable-next-line no-console
    console.log(
      `   ✅ reka-${style.name}: ${tokenCount} tokens, transformed ${transformedFiles} files, ${totalReplacements} replacements`,
    )
  }

  // eslint --fix the generated output so it matches the project's antfu/eslint
  // single-quote conventions. vue-metamorph's recast printer can introduce
  // double quotes / object key wrapping that drift from the codebase style.
  // eslint-disable-next-line no-console
  console.log('   🧹 Running eslint --fix on generated output...')
  try {
    await execAsync(`eslint --fix "${OUTPUT_BASE_DIR}/${SOURCE_BASE}-*/ui/**/*.{ts,vue}"`, {
      cwd,
      maxBuffer: 64 * 1024 * 1024,
    })
  }
  catch (err: any) {
    // eslint --fix exits non-zero when there are unfixable warnings — that's
    // fine for our purposes, the fixable formatting was still applied.
    if (err?.stderr && !String(err.stderr).includes('warning')) {
      console.warn('   ⚠️  eslint --fix had errors:', err.stderr?.toString().slice(0, 500))
    }
  }

  // eslint-disable-next-line no-console
  console.log('🎨 Per-style build complete.\n')
}
