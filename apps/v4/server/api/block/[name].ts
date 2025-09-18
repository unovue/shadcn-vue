import type { H3Event } from 'h3'
import type { registryItemFileSchema } from 'shadcn-vue/schema'
import type { z } from 'zod'
import { createFileTreeForRegistryItemFiles, getRegistryItem } from '~/lib/registry'

export default cachedEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Block name is required',
    })
  }

  const highlighter = await getShikiHighlighter()
  const item = await getRegistryItem(name)

  if (!item?.files) {
    throw createError({ statusCode: 404, statusMessage: 'Files not found' })
  }

  const [tree, highlightedFiles] = await Promise.all([
    getFileTree(item.files),
    getHighlightedFiles(item.files),
  ])

  async function getFileTree(files: Array<{ path: string, target?: string }>) {
    if (!files) {
      return null
    }

    return await createFileTreeForRegistryItemFiles(files)
  }

  async function getHighlightedFiles(files: z.infer<typeof registryItemFileSchema>[]) {
    return await Promise.all(
      files.map(async file => ({
        ...file,
        highlightedContent: highlighter.highlight(file.content ?? '', {
          lang: 'vue',
          transformers: [
            {
              pre(node) {
                node.properties.class
                  = 'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
              },
              code(node) {
                node.properties['data-line-numbers'] = ''
              },
              line(node) {
                node.properties['data-line'] = ''
              },
            },
          ],
        }),
      })),
    )
  }

  return {
    item,
    tree,
    highlightedFiles,
  }
}, {
  shouldBypassCache: () => !!import.meta.dev,
  maxAge: 0, // 60 * 60, // 1 hour
  getKey: (event: H3Event) => event.path,
})
