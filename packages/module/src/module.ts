import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { parse } from 'recast'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Prefix for all the imported component
   */
  prefix?: string
  /**
   * Directory that the component lives in.
   * @default "./components/ui"
   */
  componentDir?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'shadcn',
    configKey: 'shadcn',
  },
  defaults: {
    prefix: '',
    componentDir: './components/ui',
  },
  async setup({ prefix, componentDir }, nuxt) {
    const COMPONENT_DIR_PATH = componentDir!
    const ROOT_DIR_PATH = nuxt.options.rootDir
    const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)

    nuxt.hook('components:dirs', (dirs) => {
      dirs.unshift({
        path: resolve(COMPONENT_DIR_PATH),
        extensions: [],
      })
    })

    try {
      readdirSync(resolve(COMPONENT_DIR_PATH))
        .forEach(async (dir) => {
          const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', 'js'] })
          const content = readFileSync(filePath, { encoding: 'utf8' })
          const ast = parse(content)

          const exportedKeys: string[] = ast.program.body
          // @ts-expect-error parse return any
            .filter(node => node.type === 'ExportNamedDeclaration')
          // @ts-expect-error parse return any
            .flatMap(node => node.specifiers.map(specifier => specifier.exported.name))
            .filter((key: string) => /^[A-Z]/.test(key))

          exportedKeys.forEach((key) => {
            addComponent({
              name: `${prefix}${key}`, // name of the component to be used in vue templates
              export: key, // (optional) if the component is a named (rather than default) export
              filePath: resolve(filePath),
            })
          })
        })
    }
    catch (err) {
      if (err instanceof Error)
        console.warn(err.message)
    }
  },
})
