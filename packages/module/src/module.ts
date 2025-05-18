import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { parseSync } from '@oxc-parser/wasm'

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
  componentDir?: string
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
    const COMPONENT_DIR_PATH = componentDir!
    const ROOT_DIR_PATH = nuxt.options.rootDir
    const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)

    // Components Auto Imports
    const componentsPath = await resolvePath(COMPONENT_DIR_PATH)

    // Tell Nuxt to not scan `componentsDir` for auto imports as we will do it manually
    // See https://github.com/unovue/shadcn-vue/pull/528#discussion_r1590206268
    nuxt.hook('components:dirs', (dirs) => {
      dirs.unshift({
        path: componentsPath,
        extensions: [],
      })
    })

    // Manually scan `componentsDir` for components and register them for auto imports
    try {
      readdirSync(componentsPath)
        .forEach(async (dir) => {
          try {
            const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })
            const content = readFileSync(filePath, { encoding: 'utf8' })
            const ast = parseSync(content, {
              sourceType: 'module',
              sourceFilename: filePath,
            })

            const exportedKeys: string[] = ast.program.body
              .filter(node => node.type === 'ExportNamedDeclaration')
              // @ts-expect-error parse return any
              .flatMap(node => node.specifiers.map(specifier => specifier.exported.name))
              .filter((key: string) => /^[A-Z]/.test(key))

            exportedKeys.forEach((key) => {
              addComponent({
                name: `${prefix}${key}`, // name of the component to be used in vue templates
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
        })
    }
    catch (err) {
      if (err instanceof Error)
        console.warn(err.message)
    }
  },
})
