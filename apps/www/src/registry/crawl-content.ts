import type { RegistryStyle } from './registry-styles'
import type { Registry, RegistryFiles } from './schema'
import { readdir, readFile } from 'node:fs/promises'
import { parseSync } from 'oxc-parser'
import { join, resolve } from 'pathe'
import { compileScript, parse, walk } from 'vue/compiler-sfc'
import { styles } from './registry-styles'

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
  ['reka-ui', []],
  ['@vueuse/core', []],
  ['vue-sonner', []],
  ['vaul-vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['embla-carousel-vue', []],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
])

const REGISTRY_DEPENDENCY = '@/'
const CATEGORIES = ['authentication', 'sidebar', 'login', 'dashboard']

type ArrayItem<T> = T extends Array<infer X> ? X : never
type RegistryItem = ArrayItem<Registry>

function getCategory(text: string) {
  return CATEGORIES.find(category => category === text.replace(/\d+/g, '').toLowerCase()) || undefined
}

export async function buildRegistry() {
  const registryRootPath = resolve('src', 'registry')
  const registry: Registry = []

  for (const { name: style } of styles) {
    const uiPath = resolve(registryRootPath, style, 'ui')
    const examplePath = resolve(registryRootPath, style, 'examples')
    const blockPath = resolve(registryRootPath, style, 'blocks')
    // const hookPath = resolve(registryRootPath, style, 'hook')

    const [ui, example, block] = await Promise.all([
      crawlUI(uiPath),
      crawlExample(examplePath),
      crawlBlock(blockPath),
      // crawlHook(hookPath),
    ])

    registry.push(...ui, ...example, ...block)
  }

  return registry
}

export async function buildRegistryV4() {
  const registryRootPath = resolve('../v4/registry')
  const registry: Registry = []

  const uiPath = resolve(registryRootPath, 'new-york-v4', 'ui')
  // const examplePath = resolve(registryRootPath, 'new-york-v4', 'example')
  const blockPath = resolve(registryRootPath, 'new-york-v4', 'blocks')
  // const hookPath = resolve(registryRootPath, 'new-york-v4', 'hook')

  const [ui,
    // example,
    block] = await Promise.all([
    crawlUI(uiPath),
    // crawlExample(examplePath),
    crawlBlock(blockPath),
    // crawlHook(hookPath),
  ])

  registry.push(
    ...ui,
    //  ...example,
    ...block,
  )

  return registry
}

async function crawlUI(rootPath: string) {
  const dir = await readdir(rootPath, { recursive: true, withFileTypes: true })

  const uiRegistry: Registry = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(rootPath, dirent.name)
    const ui = await buildUIRegistry(componentPath, dirent.name)
    uiRegistry.push(ui)
  }

  return uiRegistry
}

async function crawlExample(rootPath: string) {
  const type = `registry:example` as const

  const dir = await readdir(rootPath, { withFileTypes: true })

  const registry: Registry = []

  for (const dirent of dir) {
    if (!dirent.name.endsWith('.vue') || !dirent.isFile())
      continue

    const [name] = dirent.name.split('.vue')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('examples', dirent.name)

    const file = {
      name: dirent.name,
      content: source,
      path: relativePath,
      // style,
      target: '',
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      type,
      // style,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
    })
  }

  return registry
}

async function crawlBlock(rootPath: string) {
  const type = `registry:block` as const

  const dir = await readdir(rootPath, { withFileTypes: true })

  const registry: Registry = []

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

    const [name] = dirent.name.split('.vue')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('blocks', dirent.name)

    const target = 'pages/dashboard/index.vue'

    const file = {
      name: dirent.name,
      content: source,
      path: relativePath,
      target,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      type,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      category: getCategory(name),
    })
  }

  return registry
}

async function crawlHook(rootPath: string, style: RegistryStyle) {
  const type = `registry:hook` as const

  const dir = await readdir(rootPath, { withFileTypes: true })

  const registry: Registry = []

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const [name] = dirent.name.split('.vue.ts')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('hook', dirent.name)

    const file = {
      name: dirent.name,
      content: source,
      path: relativePath,
      style,
      target: dirent.name,
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
  const dir = await readdir(componentPath, {
    withFileTypes: true,
  })

  const files: RegistryFiles[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('ui', componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = ''

    files.push({ content: source, path: relativePath, type, target })

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
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}

async function buildBlockRegistry(blockPath: string, blockName: string) {
  const dir = await readdir(blockPath, { withFileTypes: true, recursive: true })

  const files: RegistryFiles[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue
    const isPage = dirent.name === 'page.vue'
    const type = isPage ? 'registry:page' : 'registry:component'

    const compPath = isPage ? dirent.name : `components/${dirent.name}`
    const filepath = join(blockPath, compPath)
    const relativePath = join('blocks', blockName, compPath)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = isPage ? `pages/dashboard/index.vue` : ''

    files.push({ content: source, path: relativePath, type, target })

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    type: 'registry:block',
    files,
    name: blockName,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
    category: getCategory(blockName),
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
