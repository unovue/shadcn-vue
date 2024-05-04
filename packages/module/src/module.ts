import { createResolver, defineNuxtModule } from '@nuxt/kit'

// TODO: add test to make sure all registry is being parse correctly
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
    const { resolve } = createResolver(ROOT_DIR_PATH)

    // Register components
    const componentsPath = resolve(COMPONENT_DIR_PATH)
    nuxt.hook('components:dirs', (dirs) => {
      dirs.unshift({
        path: componentsPath,
        extensions: ['.vue'], // Scan `.vue` only and skip `.ts` files as we use them inside components file only
        prefix,
      })
    })
  },
})
