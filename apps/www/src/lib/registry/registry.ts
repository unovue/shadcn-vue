import { readFile, readdir } from 'node:fs/promises'
import { join, normalize, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'

import type { Registry } from '../../lib/registry'

const DEPENDENCIES = new Map<string, string[]>([
  ['@vueuse/core', []],
  ['vue-sonner', []],
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
  const exampleRegistry = await crawlExample(example_path)

  return uiRegistry.concat(exampleRegistry)
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

async function crawlExample(rootPath: string) {
  const type = 'components:example'

  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  })

  const exampleRegistry: Registry = []

  for (const dirent of dir) {
    if (dirent.name === 'index.ts')
      continue

    if (dirent.isFile()) {
      const [name] = dirent.name.split('.vue')
      const file_path = join('example', normalize(dirent.path).split('/example')[1], dirent.name)
      const { dependencies, registryDependencies }
      = await getDependencies(join(dirent.path, dirent.name))

      exampleRegistry.push({
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
    // 	exampleRegistry.push({
    // 		...ui,
    // 		type
    // 	});
    // }
  }

  return exampleRegistry
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
  const parsed = parse(code, { filename })

  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
    const compiled = compileScript(parsed.descriptor, { id: '' })

    Object.values(compiled.imports!).forEach((value) => {
      const source = value.source
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
    })
  }

  return { registryDependencies, dependencies }
}
