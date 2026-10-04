import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import { transform } from '../../src/utils/transformers'
import { transformSFC, transformVueSFC } from '../../src/utils/transformers/transform-sfc'

// The transpiler decides where object literals wrap, so compare declarations
// without depending on its line breaks or trailing commas.
function collapse(code: string) {
  return code.replace(/,(\s*[}\]])/g, '$1').replace(/\s+/g, ' ')
}

describe('transformSFC', () => {
  it('basic', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>

      <template>
        <div v-bind="{ array }">
          template
        </div>
      </template>

      <style scoped>
      </style>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('remove all type reference', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>

      <template>
        <div v-bind="{ array }" :prop="(a: number) => a" :prop2="(a: number) => {
          let b: number = a
          return b
        }">
          {{ true ? 123 as number : 0 }}
        </div>
      </template>

      <style scoped>
      </style>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('remove all type reference, keeping similar template', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>

      <template>
        <div :class="cn(
        'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        props.class,
      )
      ">
          {{ true ? 123 as number : 0 }}
        </div>
      </template>

      <style scoped>
      </style>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const props = defineProps<{ foo: string }>()
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('resolves props declared in a normal script block', async () => {
    const result = await transformVueSFC(`<script lang="ts">
      export interface Props {
        foo: string
      }
      </script>

      <script lang="ts" setup>
      const props = defineProps<Props>()
      </script>
      `, 'app.vue')

    expect(collapse(result)).toContain('foo: { type: String, required: true }')
    expect(result).not.toContain('lang="ts"')
  })

  it('preserves external TypeScript script blocks', async () => {
    const result = await transformVueSFC(
      '<script src="./component.ts" lang="ts"></script>',
      'app.vue',
    )

    expect(result).toContain('src="./component.ts"')
    expect(result).toContain('lang="ts"')
  })

  it('removes TypeScript lang attributes with surrounding whitespace', async () => {
    const result = await transformVueSFC(
      '<script lang = "ts">const value: string = "test"</script>',
      'app.vue',
    )

    expect(result).not.toContain('lang')
    expect(result).toContain('const value = "test"')
  })

  it('preserves imports referenced only in the template', async () => {
    const result = await transformVueSFC(`<script lang="ts" setup>
      import { Check } from '@lucide/vue'
      </script>

      <template>
        <Check />
      </template>
      `, 'app.vue')

    expect(result).toContain('import { Check } from "@lucide/vue"')
    expect(result).toContain('<Check />')
  })

  it('keeps value imports and removes type-only specifiers', async () => {
    const result = await transformVueSFC(`<script lang="ts" setup>
      import { Check, type CheckProps } from '@lucide/vue'
      const iconProps: CheckProps | undefined = undefined
      </script>

      <template>
        <Check v-bind="iconProps" />
      </template>
      `, 'app.vue')

    expect(result).toContain('import { Check } from "@lucide/vue"')
    expect(result).not.toContain('CheckProps')
    expect(result).toContain('<Check v-bind="iconProps" />')
  })

  it('removes type-only imports after resolving script setup macros', async () => {
    const result = await transformVueSFC(`<script lang="ts" setup>
      import { type Props } from './__fixtures__/props'
      const props = defineProps<Props>()
      </script>
      `, resolve(__dirname, './test.vue'))

    expect(result).not.toContain('import')
    expect(collapse(result)).toContain('a: { type: String, required: true }')
    expect(collapse(result)).toContain('b: { type: Number, required: true }')
  })

  it('resolves types imported from sibling registry files', async () => {
    const sourceFiles = [
      { path: 'ui/carousel/Carousel.vue', content: '' },
      {
        path: 'ui/carousel/interface.ts',
        content: `export interface CarouselProps {
          orientation?: 'horizontal' | 'vertical'
          count: number
        }`,
      },
    ]

    // A registry path, so nothing is on disk for @vue/compiler-sfc to read.
    const result = await transformVueSFC(`<script lang="ts" setup>
      import type { CarouselProps } from './interface'
      const props = defineProps<CarouselProps>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles })

    expect(collapse(result)).toContain('orientation: { type: String, required: false }')
    expect(collapse(result)).toContain('count: { type: Number, required: true }')
    expect(result).not.toContain('lang="ts"')
  })

  it('still resolves package types while staging siblings', async () => {
    const sourceFiles = [
      { path: 'ui/carousel/interface.ts', content: 'export interface Local { a: string }' },
    ]

    // Staging happens inside the project, so the walk up to node_modules that
    // package type resolution depends on keeps working.
    const result = await transformVueSFC(`<script lang="ts" setup>
      import type { LabelProps } from 'reka-ui'
      import type { Local } from './interface'
      const props = defineProps<Local & LabelProps>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles, cwd: resolve(__dirname, '../..') })

    expect(collapse(result)).toContain('a: { type: String, required: true }')
    expect(collapse(result)).toContain('for: { type: String, required: false }')
  })

  it('still resolves package types when no cwd is given', async () => {
    const sourceFiles = [
      { path: 'ui/carousel/interface.ts', content: 'export interface Local { a: string }' },
    ]

    const result = await transformVueSFC(`<script lang="ts" setup>
      import type { LabelProps } from 'reka-ui'
      import type { Local } from './interface'
      const props = defineProps<Local & LabelProps>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles })

    expect(collapse(result)).toContain('a: { type: String, required: true }')
    expect(collapse(result)).toContain('for: { type: String, required: false }')
  })

  it('resolves types imported from the index of a sibling directory', async () => {
    const sourceFiles = [
      {
        path: 'ui/carousel/index.ts',
        content: 'export interface Local { a: string }',
      },
    ]

    // The bare `from "."` form, which 32 registry SFCs use.
    const result = await transformVueSFC(`<script lang="ts" setup>
      import type { Local } from '.'
      const props = defineProps<Local>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles })

    expect(collapse(result)).toContain('a: { type: String, required: true }')
  })

  it('leaves no staging directory behind', async () => {
    const sourceFiles = [
      { path: 'ui/carousel/interface.ts', content: 'export interface Props { a: string }' },
    ]
    const before = await readdir(tmpdir())

    await transformVueSFC(`<script lang="ts" setup>
      import type { Props } from './interface'
      const props = defineProps<Props>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles })

    const after = await readdir(tmpdir())
    expect(after.filter(entry => entry.startsWith('shadcn-vue-sfc-')))
      .toEqual(before.filter(entry => entry.startsWith('shadcn-vue-sfc-')))
  })

  it('ignores sibling paths that escape the staging directory', async () => {
    const sourceFiles = [
      { path: '../../../escaped.ts', content: 'export interface Props { a: string }' },
      { path: 'ui/carousel/interface.ts', content: 'export interface Props { a: string }' },
    ]

    const result = await transformVueSFC(`<script lang="ts" setup>
      import type { Props } from './interface'
      const props = defineProps<Props>()
      </script>
      `, 'ui/carousel/Carousel.vue', { sourceFiles })

    expect(collapse(result)).toContain('a: { type: String, required: true }')
    expect(existsSync(resolve(tmpdir(), '../../../escaped.ts'))).toBe(false)
  })

  it('preserves JSX syntax while stripping TypeScript', async () => {
    const result = await transformSFC({
      filename: 'component.tsx',
      raw: `interface Props { label: string }
      export const Component = (props: Props) => <button>{props.label}</button>
      `,
      config: {},
    })

    expect(result).not.toContain('interface Props')
    expect(result).toContain('<button>{props.label}</button>')
    expect(result).not.toContain('React.createElement')
  })

  it('preserves JSX syntax in TSX script blocks', async () => {
    const result = await transformVueSFC(`<script lang="tsx" setup>
      interface Props { label: string }
      const render = (props: Props) => <button>{props.label}</button>
      </script>
      `, 'component.vue')

    expect(result).not.toContain('lang="tsx"')
    expect(result).not.toContain('interface Props')
    expect(result).toContain('<button>{props.label}</button>')
    expect(result).not.toContain('React.createElement')
  })

  it('preserves legal comments while stripping TypeScript', async () => {
    const result = await transformVueSFC(`<script lang="ts">
      /*! @license MIT */
      const value: number = 1
      </script>
      `, 'app.vue')

    expect(result).toContain('/*! @license MIT */')
    expect(result).toContain('const value = 1')
  })

  it('tolerates duplicate template attributes', async () => {
    const result = await transformVueSFC(`<template>
      <div :class="first" :class="second" />
      </template>
      `, 'app.vue')

    expect(result).toContain(':class="first"')
    expect(result).toContain(':class="second"')
  })

  it.each([
    ['empty', '<template></template>'],
    ['whitespace-only', '<template>\n  \n</template>'],
  ])('handles %s templates in TypeScript SFCs', async (_, template) => {
    const result = await transformVueSFC(`<script lang="ts">
      const value: string = 'ok'
      </script>
      ${template}
      `, 'app.vue')

    expect(result).not.toContain('lang="ts"')
    expect(result).toContain('const value = "ok"')
  })

  it('handles empty TypeScript script blocks', async () => {
    const result = await transformVueSFC(`<script lang="ts"></script>
      <template><div /></template>
      `, 'app.vue')

    expect(result).toContain('<script lang="ts"></script>')
    expect(result).toContain('<template><div /></template>')
  })

  it('defineProps with withDefaults', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const props = withDefaults(defineProps<{ foo: string }>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps with external props', async () => {
    const result = await transform({
      filename: resolve(__dirname, './test.vue'),
      raw: `<script lang="ts" setup>
      import { type Props } from './__fixtures__/props'
      const props = withDefaults(defineProps<{ foo?: string } & Props>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps with package props', async () => {
    const result = await transform({
      filename: resolve(__dirname, './test.vue'),
      raw: `<script lang="ts" setup>
      import { type LabelProps } from 'reka-ui'
      const props = withDefaults(defineProps<{ foo?: string } & LabelProps>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    // TODO: We need to improve this. https://github.com/unovue/shadcn-vue/issues/187
    expect(result).toMatchSnapshot()
  })

  it('returns raw content unchanged for .md files', async () => {
    const raw = '---\nname: my-skill\ndescription: A Claude Code skill.\n---\n\n# Heading\n\nContent.\n'
    const result = await transform({
      filename: 'src/registry/skill/SKILL.md',
      raw,
      config: {},
    })
    expect(result).toBe(raw)
  })

  it('returns raw content unchanged for .mdx files', async () => {
    const raw = '---\ntitle: My Doc\n---\n\n# Heading\n'
    const result = await transform({
      filename: 'src/registry/docs/README.mdx',
      raw,
      config: {},
    })
    expect(result).toBe(raw)
  })

  it('returns raw content unchanged for .txt files', async () => {
    const raw = 'just some plain text\nno code here\n'
    const result = await transform({
      filename: 'src/registry/notes/NOTES.txt',
      raw,
      config: {},
    })
    expect(result).toBe(raw)
  })

  it('defineEmits', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const emit = defineEmits<{ foo: string }>()
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })
})
