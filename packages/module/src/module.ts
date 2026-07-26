import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { addComponent, addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import { parseSync } from 'oxc-parser'

export interface ComponentDirConfig {
  path: string
  prefix?: string
}

export type ComponentDirInput = string | ComponentDirConfig

export type ComponentDirOption = ComponentDirInput | ComponentDirInput[]

interface NormalizedComponentDir {
  path: string
  prefix: string
}

function isComponentDirConfig(value: unknown): value is ComponentDirConfig {
  return typeof value === 'object' && value !== null && 'path' in value
}

function normalizeComponentDirs(componentDir: ComponentDirOption, fallbackPrefix: string): NormalizedComponentDir[] {
  const dirs = Array.isArray(componentDir) ? componentDir : [componentDir]

  return dirs
    .filter((dir): dir is ComponentDirInput => Boolean(dir))
    .map((dir) => {
      if (typeof dir === 'string')
        return { path: dir, prefix: fallbackPrefix }

      if (isComponentDirConfig(dir))
        return { path: dir.path, prefix: dir.prefix ?? fallbackPrefix }

      throw new Error('Invalid componentDir entry provided to shadcn module.')
    })
}

// TODO: add test to make sure all registry is being parse correctly
// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Prefix for all the imported component.
   * @default "Ui"
   */
  prefix?: string
  /**
   * Directory that the component lives in.
   * Will respect the Nuxt aliases.
   * @link https://nuxt.com/docs/api/nuxt-config#alias
   * @default "@/components/ui"
   */
  componentDir?: ComponentDirOption
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'shadcn',
    configKey: 'shadcn',
  },
  defaults: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },
  async setup({ prefix, componentDir }, nuxt) {
    const ROOT_DIR_PATH = nuxt.options.rootDir
    const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)

    const normalizedDirs = normalizeComponentDirs(componentDir ?? '@/components/ui', prefix ?? 'Ui')

    await Promise.all(normalizedDirs.map(async ({ path, prefix: dirPrefix }) => {
      // Components Auto Imports
      const componentsPath = await resolvePath(path)

      // Early return if directory doesn't exist
      if (!existsSync(componentsPath)) {
        console.warn(`Component directory does not exist: ${componentsPath}`)
        return
      }

      // Tell Nuxt to not scan `componentsDir` for auto imports as we will do it manually
      // See https://github.com/unovue/shadcn-vue/pull/528#discussion_r1590206268
      addComponentsDir({
        path: componentsPath,
        extensions: [],
        ignore: ['**/*'],
      }, {
        prepend: true,
      })

      // Manually scan `componentsDir` for components and register them for auto imports
      try {
        await Promise.all(readdirSync(componentsPath).map(async (dir) => {
          try {
            const filePath = await resolvePath(join(path, dir, 'index'), { extensions: ['.ts', '.js'] })
            const content = readFileSync(filePath, { encoding: 'utf8' })
            const ast = parseSync(filePath, content, {
              sourceType: 'module',
            })

            const exportedKeys: string[] = ast.program.body
              .filter(node => node.type === 'ExportNamedDeclaration')
            // @ts-expect-error parse return any
              .flatMap(node => node.specifiers?.map(specifier => specifier.exported?.name) || [])
              .filter((key: string) => /^[A-Z]/.test(key))

            exportedKeys.forEach((key) => {
              addComponent({
                name: `${dirPrefix}${key}`, // name of the component to be used in vue templates
                export: key, // (optional) if the component is a named (rather than default) export
                filePath: resolve(filePath),
                priority: 1,
              })
            })
          }
          catch (err) {
            if (err instanceof Error)
              console.warn('Module error: ', err.message)
          }
        }))
      }
      catch (err) {
        if (err instanceof Error)
          console.warn(err.message)
      }
    }))
  },
})
