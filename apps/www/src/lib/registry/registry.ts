import { readFile, readdir } from 'node:fs/promises'
import { join, normalize, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'
import { parseSync } from '@oxc-parser/wasm'

import type { Registry } from '../../lib/registry'

const DEPENDENCIES = new Map<string, string[]>([
  ['@vueuse/core', []],
  ['vue-sonner', []],
  ['vaul-vue', []],
  ['v-calendar', []],
  ['@tanstack/vue-table', []],
  ['embla-carousel-vue', ['embla-carousel']],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
])
// Some dependencies latest tag were not compatible with Vue3.
const DEPENDENCIES_WITH_TAGS = new Map<string, string>([
  ['v-calendar', 'v-calendar@next'],
])
const REGISTRY_DEPENDENCY = '@/'

type ArrayItem<T> = T extends Array<infer X> ? X : never
type RegistryItem = ArrayItem<Registry>

export async function buildRegistry() {
  const ui_path = resolve('./src/lib/registry/default/ui')
  const uiRegistry = await crawlUI(ui_path)

  const example_path = resolve('./src/lib/registry/default/example')
  const exampleRegistry = await crawlDirectory(example_path, 'example')

  const block_path = resolve('./src/lib/registry/default/block')
  const blockRegistry = await crawlDirectory(block_path, 'block')

  return uiRegistry.concat(exampleRegistry).concat(blockRegistry)
}

async function crawlUI(rootPath: string) {
  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  })

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

async function crawlDirectory(rootPath: string, typeName: 'example' | 'block') {
  const type = `components:${typeName}` as const

  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  })

  const registry: Registry = []

  for (const dirent of dir) {
    if (dirent.name === 'index.ts')
      continue

    if (dirent.isFile()) {
      const [name] = dirent.name.split('.vue')
      const file_path = join(typeName, normalize(dirent.path).split(`/${typeName}`)[1], dirent.name)
      const { dependencies, registryDependencies }
      = await getDependencies(join(dirent.path, dirent.name))

      registry.push({
        name,
        type,
        files: [file_path],
        registryDependencies: Array.from(registryDependencies),
        dependencies: Array.from(dependencies),
      })
    }

    // ignoring examples with directories for now...

    // if (dirent.isDirectory()) {
    // 	const componentPath = resolve(rootPath, dirent.name);
    // 	const ui = await buildUIRegistry(componentPath, dirent.name);
    // 	registry.push({
    // 		...ui,
    // 		type
    // 	});
    // }
  }

  return registry
}

async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = await readdir(componentPath, {
    withFileTypes: true,
  })

  const files: string[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'components:ui'

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const file_path = join('ui', componentName, dirent.name)
    files.push(file_path)
    files.sort()

    // only grab deps from the vue files
    if (dirent.name === 'index.ts')
      continue
    const deps = await getDependencies(join(componentPath, dirent.name))
    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep =>
      registryDependencies.add(dep),
    )
  }

  return {
    name: componentName,
    type,
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}

async function getDependencies(filename: string) {
  const code = await readFile(filename, { encoding: 'utf8' })

  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  const populateDeps = (source: string) => {
    const peerDeps = DEPENDENCIES.get(source)
    const taggedDeps = DEPENDENCIES_WITH_TAGS.get(source)
    if (peerDeps !== undefined) {
      if (taggedDeps !== undefined)
        dependencies.add(taggedDeps)
      else
        dependencies.add(source)
      peerDeps.forEach(dep => dependencies.add(dep))
    }

    if (source.startsWith(REGISTRY_DEPENDENCY)) {
      const component = source.split('/').at(-1)!
      registryDependencies.add(component)
    }
  }

  if (filename.endsWith('.ts')) {
    const ast = parseSync(code, {
      sourceType: 'module',
      sourceFilename: filename,
    })

    const sources = ast.program.body.filter((i: any) => i.type === 'ImportDeclaration').map((i: any) => i.source)
    sources.forEach((source: any) => {
      populateDeps(source.value)
    })
  }
  else {
    const parsed = parse(code, { filename })
    if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
      const compiled = compileScript(parsed.descriptor, { id: '' })

      Object.values(compiled.imports!).forEach((value) => {
        populateDeps(value.source)
      })
    }
  }

  return { registryDependencies, dependencies }
}
