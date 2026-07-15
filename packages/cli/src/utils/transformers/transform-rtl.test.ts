import type { Config } from '@/src/utils/get-config'
import { describe, expect, it } from 'vitest'
import { transform as metaTransform } from 'vue-metamorph'
import { applyRtlMapping, transformRtl } from './transform-rtl'

const baseConfig: Config = {
  style: 'new-york',
  typescript: true,
  tailwind: {
    baseColor: 'neutral',
    cssVariables: true,
    config: 'tailwind.config.ts',
    css: 'tailwind.css',
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
  },
  resolvedPaths: {
    cwd: '/',
    components: '/components',
    utils: '/lib/utils',
    ui: '/ui',
    lib: '/lib',
    hooks: '/hooks',
    composables: '/composables',
    tailwindConfig: 'tailwind.config.ts',
    tailwindCss: 'tailwind.css',
  },
}

const rtlConfig: Config = { ...baseConfig, rtl: true } as Config

function run(source: string, config: Config = rtlConfig) {
  return metaTransform(source, 'test.vue', [
    transformRtl({ filename: 'test.vue', raw: source, config }),
  ]).code
}

describe('applyRtlMapping', () => {
  it('maps physical margin to logical margin', () => {
    expect(applyRtlMapping('ml-4')).toBe('ms-4')
    expect(applyRtlMapping('mr-2')).toBe('me-2')
    expect(applyRtlMapping('-ml-4')).toBe('-ms-4')
  })

  it('maps text-left / text-right', () => {
    expect(applyRtlMapping('text-left')).toBe('text-start')
    expect(applyRtlMapping('text-right')).toBe('text-end')
  })

  it('replaces cn-rtl-flip marker with rtl:rotate-180', () => {
    expect(applyRtlMapping('cn-rtl-flip')).toBe('rtl:rotate-180')
    expect(applyRtlMapping('size-4 cn-rtl-flip')).toBe('size-4 rtl:rotate-180')
  })

  it('adds rtl:space-x-reverse for space-x utilities', () => {
    expect(applyRtlMapping('space-x-4')).toBe('space-x-4 rtl:space-x-reverse')
  })

  it('adds rtl variant for cursor-w-resize', () => {
    expect(applyRtlMapping('cursor-w-resize')).toBe(
      'cursor-w-resize rtl:cursor-e-resize',
    )
  })

  it('does not touch classes that already have rtl: or ltr:', () => {
    expect(applyRtlMapping('rtl:ml-4')).toBe('rtl:ml-4')
    expect(applyRtlMapping('ltr:mr-2')).toBe('ltr:mr-2')
  })

  it('maps rounded corners', () => {
    expect(applyRtlMapping('rounded-tl-md')).toBe('rounded-ss-md')
    expect(applyRtlMapping('rounded-br-lg')).toBe('rounded-ee-lg')
  })
})

describe('transformRtl', () => {
  it('is a no-op when config.rtl is false', () => {
    const input = `<template>
  <div class="ml-4 text-left" />
</template>
`
    expect(run(input, baseConfig)).toContain('ml-4 text-left')
  })

  it('rewrites static class="..."', () => {
    const result = run(`<template>
  <div class="ml-4 text-left" />
</template>
`)
    expect(result).toContain('ms-4 text-start')
    expect(result).not.toContain('ml-4')
    expect(result).not.toContain('text-left')
  })

  it('rewrites :class="\'...\'" string binding', () => {
    const result = run(`<template>
  <div :class="'space-x-4'" />
</template>
`)
    expect(result).toContain('space-x-4 rtl:space-x-reverse')
  })

  it('rewrites :class="[...]" array binding', () => {
    const result = run(`<template>
  <div :class="['ml-4', cond && 'mr-2']" />
</template>
`)
    expect(result).toContain('\'ms-4\'')
    expect(result).toContain('\'me-2\'')
  })

  it('rewrites :class="{ ... }" object binding keys', () => {
    const result = run(`<template>
  <div :class="{ 'text-left': true }" />
</template>
`)
    expect(result).toContain('\'text-start\'')
    expect(result).not.toContain('\'text-left\'')
  })

  it('rewrites cva() base string and variants in script setup', () => {
    const result = run(`<script setup lang="ts">
import { cva } from 'class-variance-authority'

const button = cva('ml-4 text-left', {
  variants: {
    size: {
      sm: 'pl-2',
      lg: 'pr-4',
    },
  },
})
</script>
`)
    expect(result).toContain('\'ms-4 text-start\'')
    expect(result).toContain('\'ps-2\'')
    expect(result).toContain('\'pe-4\'')
  })

  it('does not rewrite import source strings', () => {
    const result = run(`<script setup lang="ts">
import { cn } from '@/lib/utils'

const x = 'ml-4'
</script>
`)
    expect(result).toContain(`'@/lib/utils'`)
    expect(result).toContain('\'ms-4\'')
  })

  it('leaves non-class literals outside class bindings alone in template', () => {
    const result = run(`<template>
  <div class="ml-4" :title="'ml-4 should not change'" />
</template>
`)
    expect(result).toContain('"ms-4"')
    // title string literal is not inside a class attribute → untouched
    expect(result).toContain('\'ml-4 should not change\'')
  })
})
