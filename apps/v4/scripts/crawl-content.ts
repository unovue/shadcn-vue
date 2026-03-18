import type { RegistryItem } from 'shadcn-vue/schema'

type RegistryFile = NonNullable<RegistryItem['files']>[number]
import { readdir, readFile } from 'node:fs/promises'
import { parseSync } from 'oxc-parser'
import { join, resolve } from 'pathe'
import { compileScript, parse, walk } from 'vue/compiler-sfc'
import { blockMeta } from '~/registry/new-york-v4/blocks/_meta'

// Special title mappings for brand names
const BLOCK_TITLE_MAP: Record<string, string> = {
  chatgpt: 'ChatGPT',
  elevenlabs: 'ElevenLabs',
  github: 'GitHub',
  preview: 'Home',
}

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
  ['reka-ui', []],
  ['@vueuse/core', []],
  ['vue-sonner', []],
  ['vaul-vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['embla-carousel-vue', []],
  // TODO: remove version tag after vee-validate v5
  ['vee-validate', ['@vee-validate/zod', 'zod@3.25.76']],
  ['vue-input-otp', []],
])

const REGISTRY_DEPENDENCY = '@/'

function sanitizeString(input: string): string {
  return input
    .replace(/[-_]\d+/g, '') // Remove hyphens/underscores followed by digits
    .replace(/\d+/g, '') // Remove any remaining digits
    .toLowerCase() // Convert to lowercase
}

/**
 * Extract chart categories from component name
 * Example: ChartAreaAxes -> ["chart", "chart-area"]
 * Example: ChartBarDefault -> ["chart", "chart-bar"]
 */
function getChartCategories(componentName: string): string[] {
  // Remove file extension if present
  const name = componentName.replace(/\.vue$/, '')

  // Match pattern: Chart + Type (e.g., ChartArea, ChartBar)
  // The type is everything after "Chart" until the next capital letter or end
  const match = name.match(/^Chart([A-Z][a-z]+)/)

  if (match && match[1]) {
    const chartType = match[1].toLowerCase()
    return ['chart', `chart-${chartType}`]
  }

  // Fallback: just return 'chart'
  return ['chart']
}

export async function crawlUI(rootPath: string) {
  const dir = (await readdir(rootPath, { recursive: true, withFileTypes: true })).sort()

  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(rootPath, dirent.name)
    const ui = await buildUIRegistry(componentPath, dirent.name)
    uiRegistry.push(ui)
  }

  return uiRegistry
}

export async function crawlExample(rootPath: string) {
  const type = 'registry:example' as const

  const dir = (await readdir(rootPath, { withFileTypes: true })).sort()

  const registry: RegistryItem[] = []

  // Group files by folder
  const folderMap = new Map<string, { files: any[], deps: Set<string>, regDeps: Set<string> }>()

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const folderName = dirent.name
    const folderPath = join(rootPath, folderName)
    const filesInFolder = await readdir(folderPath, { withFileTypes: true })

    const files: any[] = []
    const dependencies = new Set<string>()
    const registryDependencies = new Set<string>()

    for (const file of filesInFolder) {
      if (!file.name.endsWith('.vue') || !file.isFile())
        continue

      const filepath = join(folderPath, file.name)
      const source = await readFile(filepath, { encoding: 'utf8' })
      const relativePath = join(folderName, file.name)

      files.push({
        path: relativePath,
        type,
      })

      const deps = await getFileDependencies(filepath, source)
      deps.dependencies.forEach(dep => dependencies.add(dep))
      deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
    }

    if (files.length > 0) {
      // Generate title from folder name (convert kebab-case to Title Case)
      const title = folderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      registry.push({
        name: `${folderName}-example`,
        title,
        type,
        files,
        registryDependencies: Array.from(registryDependencies),
        dependencies: Array.from(dependencies),
      })
    }
  }

  return registry
}

export async function crawlBlock(rootPath: string) {
  const type = 'registry:block' as const

  const dir = (await readdir(rootPath, { withFileTypes: true })).sort()

  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isFile()) {
      const result = await buildBlockRegistry(
        `${rootPath}/${dirent.name}`,
        dirent.name,
      )

      if (result.files.length) {
        registry.push(result)
      }
      continue
    }
    if (!dirent.name.endsWith('.vue') || !dirent.isFile())
      continue

    const [name = ''] = dirent.name.split('.vue')
    // Use special title mapping or generate from name (capitalize first letter of each word)
    const title = BLOCK_TITLE_MAP[name] ?? name
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('blocks', dirent.name)

    const file = {
      path: relativePath,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      title,
      type,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      categories: ['blocks'],
    })
  }

  return registry
}

export async function crawlChart(rootPath: string) {
  const type = 'registry:block' as const

  const dir = (await readdir(rootPath, { withFileTypes: true })).sort()

  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isFile()) {
      const result = await buildBlockRegistry(
        `${rootPath}/${dirent.name}`,
        dirent.name,
      )

      if (result.files.length) {
        registry.push(result)
      }
      continue
    }
    if (!dirent.name.endsWith('.vue') || !dirent.isFile())
      continue

    const [name = ''] = dirent.name.split('.vue')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('charts', dirent.name)
    const file = {
      path: relativePath,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      type,
      dependencies: dependencies.size ? Array.from(dependencies) : undefined,
      registryDependencies: registryDependencies.size ? Array.from(registryDependencies) : undefined,
      files: [file],
      categories: getChartCategories(name),
    })
  }

  return registry
}

export async function crawlComposables(rootPath: string) {
  const type = 'registry:composable' as const

  const dir = (await readdir(rootPath, { withFileTypes: true })).sort()

  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const [name = ''] = dirent.name.split('.ts')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('composables', dirent.name)

    const file = {
      path: relativePath,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      type,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
    })
  }

  return registry
}

async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = (await readdir(componentPath, {
    withFileTypes: true,
  })).sort()

  const files: RegistryFile[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('ui', componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })

    files.push({ path: relativePath, type })

    // only grab deps from the vue files
    if (dirent.name === 'index.ts')
      continue

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: componentName,
    type,
    dependencies: dependencies.size ? Array.from(dependencies) : undefined,
    registryDependencies: registryDependencies.size ? Array.from(registryDependencies) : undefined,
    files,
  } satisfies RegistryItem
}

async function buildBlockRegistry(blockPath: string, blockName: string) {
  const dir = (await readdir(blockPath, { withFileTypes: true, recursive: true })).sort()

  const files: RegistryFile[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const meta = blockMeta[blockName]

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue
    const isPage = dirent.name === 'page.vue'
    const type = isPage ? 'registry:page' : 'registry:component'

    const compPath = isPage ? dirent.name : `components/${dirent.name}`
    const filepath = join(blockPath, compPath)
    const relativePath = join('blocks', blockName, compPath)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = isPage ? `pages/${sanitizeString(blockName)}/index.vue` : undefined

    // @ts-expect-error ignore target has optional type
    files.push({ path: relativePath, type, target })

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: blockName,
    type: 'registry:block',
    description: meta?.description || undefined,
    dependencies: dependencies.size ? Array.from(dependencies) : undefined,
    registryDependencies: registryDependencies.size ? Array.from(registryDependencies) : undefined,
    files,
    categories: meta?.categories ?? undefined,
  } satisfies RegistryItem
}

async function getFileDependencies(filename: string, sourceCode: string) {
  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  const populateDeps = (source: string) => {
    const peerDeps = DEPENDENCIES.get(source)
    // const taggedDeps = DEPENDENCIES_WITH_TAGS.get(source)
    if (peerDeps !== undefined) {
      // if (taggedDeps !== undefined)
      //   dependencies.add(taggedDeps)
      // else
      dependencies.add(source)
      peerDeps.forEach(dep => dependencies.add(dep))
    }

    if (source.startsWith(REGISTRY_DEPENDENCY) && !source.endsWith('.vue')) {
      const component = source.split('/').at(-1)!
      if (component !== 'utils')
        registryDependencies.add(component)
    }
  }

  if (filename.endsWith('.ts')) {
    const ast = parseSync(filename, sourceCode, {
      sourceType: 'module',
    })

    const sources = ast.program.body.filter((i: any) => i.type === 'ImportDeclaration').map((i: any) => i.source)
    sources.forEach((source: any) => {
      populateDeps(source.value)
    })
  }
  else {
    const parsed = parse(sourceCode, { filename })
    if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
      const compiled = compileScript(parsed.descriptor, { id: 'id' })

      Object.values(compiled.imports!).forEach((value) => {
        populateDeps(value.source)
      })
    }
  }

  return { registryDependencies, dependencies }
}

export async function getBlockMetadata(filename: string, sourceCode: string) {
  const metadata = {
    description: null as string | null,
    iframeHeight: null as string | null,
    containerClass: null as string | null,
  }

  if (filename.endsWith('.vue')) {
    const { descriptor } = parse(sourceCode, { filename })
    if (descriptor.script?.content) {
      const ast = compileScript(descriptor, { id: 'id' })
      walk(ast.scriptAst, {
        enter(node: any) {
          const declaration = node.declaration
          // Check if the declaration is a variable declaration
          if (declaration?.type === 'VariableDeclaration') {
            // Extract variable names and their values
            declaration.declarations.forEach((decl: any) => {
              // @ts-expect-error ignore missing type
              metadata[decl.id.name] = decl.init ? decl.init.value : null
            })
          }
        },
      })
    }
  }

  return metadata
}
