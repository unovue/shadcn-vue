import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  addComponent,
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  findPath,
  getLayerDirectories,
  resolvePath as resolvePathNuxt,
  useLogger,
} from '@nuxt/kit'
import { parseSync } from 'oxc-parser'

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

    const logger = useLogger('shadcn-nuxt')
    logger.start('Setting up shadcn-nuxt module', { COMPONENT_DIR_PATH, ROOT_DIR_PATH })
    // Build list of potential component directory paths from all layers
    const layerDirectories = getLayerDirectories()
    const potentialPaths = await Promise.all(
      layerDirectories.map((layer) => {
        let layerPath = ROOT_DIR_PATH
        if ('cwd' in layer && typeof layer.cwd === 'string') {
          layerPath = layer.cwd
        }
        if ('app' in layer && typeof layer.app === 'string') {
          layerPath = layer.app
        }
        return resolvePathNuxt(COMPONENT_DIR_PATH, { cwd: layerPath })
      }),
    )

    logger.info('Checking', { potentialPaths })
    // Use findPath to find the first existing component directory
    const componentsPath = (await findPath(potentialPaths, {}, 'dir')) || ROOT_DIR_PATH

    logger.info('Decided on', { componentsPath })

    // Create resolver relative to the found components path
    const { resolve, resolvePath } = createResolver(componentsPath)

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
          const filePath = await resolvePath(join(componentsPath, dir, 'index'), { extensions: ['.ts', '.js'] })
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
      }))
    }
    catch (err) {
      if (err instanceof Error)
        console.warn(err.message)
    }
  },
})
