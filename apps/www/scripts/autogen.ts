import type { ComponentMeta, MetaCheckerOptions, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, parse, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import MarkdownIt from 'markdown-it'
import { createComponentMetaChecker } from 'vue-component-meta'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const md = new MarkdownIt()

const ROOTPATH = '../'
const OUTPUTPATH = '../src/content/meta'

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
}

const tsconfigChecker = createComponentMetaChecker(
  resolve(__dirname, ROOTPATH, 'tsconfig.registry.json'),
  checkerOptions,
)

const components = fg.sync(['chart/**/*.vue', 'chart*/**/*.vue'], {
  cwd: resolve(__dirname, ROOTPATH, 'src/lib/registry/default/ui/'),
  absolute: true,
})

components.forEach((componentPath) => {
  try {
    const componentName = parse(componentPath).name
    const meta = parseMeta(tsconfigChecker.getComponentMeta(componentPath))

    const metaDirPath = resolve(__dirname, OUTPUTPATH)
    // if meta dir doesn't exist create
    if (!existsSync(metaDirPath))
      mkdirSync(metaDirPath)

    const metaMdFilePath = join(metaDirPath, `${componentName}.md`)

    let parsedString = '<!-- This file was automatic generated. Do not edit it manually -->\n\n'
    if (meta.props.length)
      parsedString += `<APITable :type="'prop'" :data="${JSON.stringify(meta.props, null, 2).replace(/"/g, '\'')}" />\n`

    if (meta.events.length)
      parsedString += `\n<APITable :type="'emit'" :data="${JSON.stringify(meta.events, null, 2).replace(/"/g, '\'')}" />\n`

    if (meta.slots.length)
      parsedString += `\n<APITable :type="'slot'" :data="${JSON.stringify(meta.slots, null, 2).replace(/"/g, '\'')}" />\n`

    if (meta.methods.length)
      parsedString += `\n<APITable :type="'method'" :data="${JSON.stringify(meta.methods, null, 2).replace(/"/g, '\'')}" />\n`

    writeFileSync(metaMdFilePath, parsedString)
  }
  catch (err) {
    console.log(err)
  }
})

function parseTypeFromSchema(schema: PropertyMetaSchema): string {
  if (typeof schema === 'object' && (schema.kind === 'enum' || schema.kind === 'array')) {
    const isFlatEnum = schema.schema?.every(val => typeof val === 'string')
    const enumValue = schema?.schema?.filter(i => i !== 'undefined') ?? []

    if (isFlatEnum && /^[A-Z]/.test(schema.type))
      return enumValue.join(' | ')
    else if (typeof schema.schema?.[0] === 'object' && schema.schema?.[0].kind === 'enum')
      return schema.schema.map((s: PropertyMetaSchema) => parseTypeFromSchema(s)).join(' | ')
    else
      return schema.type
  }
  else if (typeof schema === 'object' && schema.kind === 'object') {
    return schema.type
  }
  else if (typeof schema === 'string') {
    return schema
  }
  else {
    return ''
  }
}

// Utilities
function parseMeta(meta: ComponentMeta) {
  const props = meta.props
  // Exclude global props
    .filter(prop => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default
      const { name, description, required } = prop

      if (name === 'as')
        defaultValue = defaultValue ?? '"div"'

      if (defaultValue === 'undefined')
        defaultValue = undefined

      return ({
        name,
        description: md.render(description),
        type: prop.type.replace(/\s*\|\s*undefined/g, ''),
        required,
        default: defaultValue ?? undefined,
      })
    })

  const events = meta.events
    .map((event) => {
      const { name, type } = event
      return ({
        name,
        type: type.replace(/\s*\|\s*undefined/g, ''),
      })
    })

  const defaultSlot = meta.slots?.[0]
  const slots: { name: string, description: string, type: string }[] = []

  if (defaultSlot && defaultSlot.type !== '{}') {
    const schema = defaultSlot.schema
    if (typeof schema === 'object' && schema.schema) {
      Object.values(schema.schema).forEach((childMeta: PropertyMeta) => {
        slots.push({
          name: childMeta.name,
          description: md.render(childMeta.description),
          type: parseTypeFromSchema(childMeta.schema),
        })
      })
    }
  }

  // exposed method
  const methods = meta.exposed
    .filter(expose => typeof expose.schema === 'object' && expose.schema.kind === 'event')
    .map(expose => ({
      name: expose.name,
      description: md.render(expose.description),
      type: expose.type,
    }))

  return {
    props,
    events,
    slots,
    methods,
  }
}
