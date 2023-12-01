import { readdirSync } from 'node:fs'
import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { Project } from 'ts-morph'

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
  async setup(options, nuxt) {
    const IGNORE_DIR = '**/components/ui'
    const COMPONENT_DIR_PATH = options.componentDir!
    const ROOT_DIR_PATH = nuxt.options.rootDir

    const { resolve } = createResolver(ROOT_DIR_PATH)

    nuxt.options.ignore.push(IGNORE_DIR)
    nuxt._ignore?.add(IGNORE_DIR)
    nuxt._ignorePatterns?.push(IGNORE_DIR)

    try {
      readdirSync(resolve(COMPONENT_DIR_PATH))
        .forEach(async (dir) => {
          const filePath = resolve(COMPONENT_DIR_PATH, dir, 'index.ts')

          const project = new Project()
          project.addSourceFileAtPath(filePath)
          const sourceFile = project.getSourceFileOrThrow(filePath)
          const exportedDeclarations = sourceFile.getExportedDeclarations()

          // Filter out non-component export
          const exportedKeys = Array.from(exportedDeclarations.keys()).filter(key => /^[A-Z]/.test(key))

          exportedKeys.forEach((key) => {
            addComponent({
              name: `${options.prefix}${key}`, // name of the component to be used in vue templates
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
