import type { Config } from '../../src/utils/get-config'
import { describe, expect, it } from 'vitest'
import { transform as metaTransform } from 'vue-metamorph'
import { transformStyle } from '../../src/utils/transformers/transform-style'

function createTestConfig(style: string): Config {
  return {
    style,
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
}

describe('transformStyle', () => {
  describe('vega style (default - no transformations)', () => {
    it('does not transform classes for vega style', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 gap-6 rounded-lg">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('vega'),
          }),
        ],
      )

      expect(result.code).toContain('class="p-6 gap-6 rounded-lg"')
    })

    it('does not transform classes for new-york style', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 gap-6 rounded-lg">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('new-york'),
          }),
        ],
      )

      expect(result.code).toContain('class="p-6 gap-6 rounded-lg"')
    })
  })

  describe('nova style (compact)', () => {
    it('reduces padding classes', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 p-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova'),
          }),
        ],
      )

      expect(result.code).toContain('p-4')
      expect(result.code).toContain('p-6')
      expect(result.code).not.toContain('p-8')
    })

    it('reduces gap classes', () => {
      const result = metaTransform(
        `<template>
  <div class="gap-6 gap-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova'),
          }),
        ],
      )

      expect(result.code).toContain('gap-4')
      expect(result.code).toContain('gap-6')
      expect(result.code).not.toContain('gap-8')
    })

    it('reduces space-y classes', () => {
      const result = metaTransform(
        `<template>
  <div class="space-y-6 space-y-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova'),
          }),
        ],
      )

      expect(result.code).toContain('space-y-4')
      expect(result.code).toContain('space-y-6')
      expect(result.code).not.toContain('space-y-8')
    })
  })

  describe('maia style (rounded, generous spacing)', () => {
    it('increases border radius', () => {
      const result = metaTransform(
        `<template>
  <div class="rounded-md rounded-lg rounded-sm">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('maia'),
          }),
        ],
      )

      expect(result.code).toContain('rounded-xl')
      expect(result.code).toContain('rounded-2xl')
      expect(result.code).toContain('rounded-md')
      expect(result.code).not.toContain('rounded-lg"')
      expect(result.code).not.toContain('rounded-sm"')
    })

    it('increases padding', () => {
      const result = metaTransform(
        `<template>
  <div class="p-4 p-3">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('maia'),
          }),
        ],
      )

      expect(result.code).toContain('p-6')
      expect(result.code).toContain('p-4')
      expect(result.code).not.toContain('p-3"')
    })
  })

  describe('lyra style (boxy, sharp)', () => {
    it('removes all border radius', () => {
      const result = metaTransform(
        `<template>
  <div class="rounded-md rounded-lg rounded-xl rounded-2xl rounded-sm rounded-full">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('lyra'),
          }),
        ],
      )

      // All rounded classes should be transformed to rounded-none
      expect(result.code).toContain('rounded-none')
      expect(result.code).not.toContain('rounded-md"')
      expect(result.code).not.toContain('rounded-lg"')
      expect(result.code).not.toContain('rounded-xl"')
      expect(result.code).not.toContain('rounded-2xl"')
      expect(result.code).not.toContain('rounded-sm"')
      expect(result.code).not.toContain('rounded-full"')
    })
  })

  describe('mira style (compact, dense)', () => {
    it('significantly reduces padding', () => {
      const result = metaTransform(
        `<template>
  <div class="p-4 p-6 p-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('mira'),
          }),
        ],
      )

      expect(result.code).toContain('p-2')
      expect(result.code).toContain('p-4')
      expect(result.code).toContain('p-5')
    })

    it('reduces gap classes', () => {
      const result = metaTransform(
        `<template>
  <div class="gap-4 gap-6">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('mira'),
          }),
        ],
      )

      expect(result.code).toContain('gap-2')
      expect(result.code).toContain('gap-4')
      expect(result.code).not.toContain('gap-6')
    })

    it('reduces text sizes', () => {
      const result = metaTransform(
        `<template>
  <div class="text-base text-lg text-xl">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('mira'),
          }),
        ],
      )

      expect(result.code).toContain('text-sm')
      expect(result.code).toContain('text-base')
      expect(result.code).toContain('text-lg')
      expect(result.code).not.toContain('text-xl')
    })

    it('reduces height and width classes', () => {
      const result = metaTransform(
        `<template>
  <div class="h-10 h-12 w-10 w-12">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('mira'),
          }),
        ],
      )

      expect(result.code).toContain('h-8')
      expect(result.code).toContain('h-10')
      expect(result.code).toContain('w-8')
      expect(result.code).toContain('w-10')
      expect(result.code).not.toContain('h-12')
      expect(result.code).not.toContain('w-12')
    })
  })

  describe('luma style (fluid, luminous, glassy)', () => {
    it('increases border radius classes', () => {
      const result = metaTransform(
        `<template>
  <div class="rounded-sm rounded-md rounded-lg rounded-xl">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('luma'),
          }),
        ],
      )

      // rounded-sm -> rounded-xl, rounded-md -> rounded-2xl,
      // rounded-lg -> rounded-3xl, rounded-xl -> rounded-3xl
      expect(result.code).toContain('rounded-2xl')
      expect(result.code).toContain('rounded-3xl')
      expect(result.code).not.toContain('"rounded-sm')
      expect(result.code).not.toContain(' rounded-md')
      expect(result.code).not.toContain(' rounded-lg ')
    })
  })

  describe('sera style (editorial, typographic)', () => {
    it('flattens border radius to rounded-none', () => {
      const result = metaTransform(
        `<template>
  <div class="rounded-sm rounded-md rounded-lg rounded-xl rounded-2xl rounded-3xl">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('sera'),
          }),
        ],
      )

      expect(result.code).toContain('rounded-none')
      expect(result.code).not.toContain('rounded-sm"')
      expect(result.code).not.toContain('rounded-md"')
      expect(result.code).not.toContain('rounded-lg"')
      expect(result.code).not.toContain('rounded-xl"')
      expect(result.code).not.toContain('rounded-2xl"')
      expect(result.code).not.toContain('rounded-3xl"')
    })

    it('preserves rounded-full for circular elements', () => {
      const result = metaTransform(
        `<template>
  <div class="rounded-full size-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('sera'),
          }),
        ],
      )

      expect(result.code).toContain('rounded-full')
      expect(result.code).not.toContain('rounded-none')
    })
  })

  describe('handles multiple classes', () => {
    it('transforms multiple classes in same element', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 gap-8 space-y-6 m-8">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova'),
          }),
        ],
      )

      expect(result.code).toContain('p-4')
      expect(result.code).toContain('gap-6')
      expect(result.code).toContain('space-y-4')
      expect(result.code).toContain('m-6')
    })
  })

  describe('handles style with version suffix', () => {
    it('extracts base style from versioned style name', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 gap-6">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova-v4'),
          }),
        ],
      )

      // nova style transformations should apply
      expect(result.code).toContain('p-4')
      expect(result.code).toContain('gap-4')
    })
  })

  describe('preserves unaffected classes', () => {
    it('does not modify classes not in mapping', () => {
      const result = metaTransform(
        `<template>
  <div class="flex items-center justify-between bg-white text-black">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('nova'),
          }),
        ],
      )

      expect(result.code).toContain('flex')
      expect(result.code).toContain('items-center')
      expect(result.code).toContain('justify-between')
      expect(result.code).toContain('bg-white')
      expect(result.code).toContain('text-black')
    })
  })

  describe('handles unknown styles', () => {
    it('does not transform for unknown style', () => {
      const result = metaTransform(
        `<template>
  <div class="p-6 gap-6 rounded-lg">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformStyle({
            filename: 'test.vue',
            raw: '',
            config: createTestConfig('unknown-style'),
          }),
        ],
      )

      expect(result.code).toContain('class="p-6 gap-6 rounded-lg"')
    })
  })
})
