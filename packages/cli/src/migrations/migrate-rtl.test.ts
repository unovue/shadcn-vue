import type { Config } from '@/src/utils/get-config'
import { describe, expect, it } from 'vitest'
import { migrateRtlFile } from './migrate-rtl'

const baseConfig = {
  style: 'default',
  typescript: true,
  tailwind: {
    config: '',
    css: 'src/assets/css/tailwind.css',
    baseColor: 'neutral',
    cssVariables: true,
    prefix: '',
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    composables: '@/composables',
  },
  resolvedPaths: {
    cwd: '/project',
    tailwindConfig: '',
    tailwindCss: '/project/src/assets/css/tailwind.css',
    utils: '/project/src/lib/utils',
    components: '/project/src/components',
    lib: '/project/src/lib',
    hooks: '/project/src/hooks',
    ui: '/project/src/components/ui',
    composables: '/project/src/composables',
  },
} as unknown as Config

describe('migrateRtlFile', () => {
  it('rewrites static class attribute on a Vue template', () => {
    const input = `<template>
  <div class="ml-4 mr-2 text-left">hello</div>
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('ms-4')
    expect(result).toContain('me-2')
    expect(result).toContain('text-start')
    expect(result).not.toContain('ml-4')
    expect(result).not.toContain('text-left')
  })

  it('rewrites :class with a string literal binding', () => {
    const input = `<template>
  <div :class="'pl-4 pr-2'" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('ps-4')
    expect(result).toContain('pe-2')
  })

  it('rewrites :class with an array of literals', () => {
    const input = `<template>
  <div :class="['ml-4', 'text-right']" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('ms-4')
    expect(result).toContain('text-end')
  })

  it('rewrites :class object keys', () => {
    const input = `<template>
  <div :class="{ 'text-left': true, 'ml-2': isActive }" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('text-start')
    expect(result).toContain('ms-2')
  })

  it('adds rtl:space-x-reverse for space-x classes', () => {
    const input = `<template>
  <div class="space-x-4" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('space-x-4')
    expect(result).toContain('rtl:space-x-reverse')
  })

  it('rewrites cva() base class string and variants inside <script setup>', () => {
    const input = `<script setup lang="ts">
import { cva } from 'class-variance-authority'

const buttonVariants = cva('ml-2 mr-4 text-left', {
  variants: {
    size: {
      default: 'pl-4 pr-4',
      sm: 'pl-2 pr-2',
    },
  },
})
</script>
`
    const result = migrateRtlFile(input, 'Button.vue', baseConfig)
    expect(result).toContain('ms-2')
    expect(result).toContain('me-4')
    expect(result).toContain('text-start')
    expect(result).toContain('ps-4')
    expect(result).toContain('pe-4')
    expect(result).toContain('ps-2')
    expect(result).toContain('pe-2')
  })

  it('does not touch unrelated attributes', () => {
    const input = `<template>
  <div title="text-left" class="ml-4" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('title="text-left"')
    expect(result).toContain('ms-4')
  })

  it('does not touch import sources', () => {
    const input = `<script setup lang="ts">
import { foo } from './ml-4'
</script>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain(`from './ml-4'`)
  })

  it('preserves classes that already have an rtl: or ltr: prefix', () => {
    const input = `<template>
  <div class="rtl:ml-4 ltr:mr-2 text-left" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('rtl:ml-4')
    expect(result).toContain('ltr:mr-2')
    expect(result).toContain('text-start')
  })

  it('replaces cn-rtl-flip marker with rtl:rotate-180', () => {
    const input = `<template>
  <ChevronIcon class="cn-rtl-flip" />
</template>
`
    const result = migrateRtlFile(input, 'Component.vue', baseConfig)
    expect(result).toContain('rtl:rotate-180')
    expect(result).not.toContain('cn-rtl-flip')
  })
})
