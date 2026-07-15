import type { Config } from '@/src/utils/get-config'
import { describe, expect, it } from 'vitest'
import { transform as metaTransform } from 'vue-metamorph'
import { transformMenu } from './transform-menu'

const testConfig: Config = {
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

describe('transformMenu', () => {
  describe('vue SFC - menuColor is inverted', () => {
    it('replaces cn-menu-target with dark in static class', async () => {
      const result = metaTransform(
        `<template>
  <div class="cn-menu-target p-4">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="dark p-4">Content</div>
        </template>

        <script setup lang="ts">

        </script>"
      `)
    })

    it('replaces cn-menu-target with dark in bound class with cn()', async () => {
      const result = metaTransform(
        `<template>
  <div :class="cn('cn-menu-target', 'p-4')">Content</div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="cn('dark', 'p-4')">Content</div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('handles multiple occurrences in template', async () => {
      const result = metaTransform(
        `<template>
  <div>
    <header class="cn-menu-target border-b">Header</header>
    <nav :class="cn('cn-menu-target', 'flex gap-4')">Nav</nav>
    <main class="container">Content</main>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div>
            <header class="dark border-b">Header</header>
            <nav :class="cn('dark', 'flex gap-4')">Nav</nav>
            <main class="container">Content</main>
          </div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('handles cn() in script setup', async () => {
      const result = metaTransform(
        `<template>
  <div :class="containerClass">Content</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const containerClass = computed(() => cn('cn-menu-target', 'p-4'))
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="containerClass">Content</div>
        </template>

        <script setup lang="ts">
        import { computed } from 'vue'
        import { cn } from '@/lib/utils'

        const containerClass = computed(() => cn('dark', 'p-4'))
        </script>"
      `)
    })
  })

  describe('vue SFC - menuColor is default or not set', () => {
    it('removes cn-menu-target from static class', async () => {
      const result = metaTransform(
        `<template>
  <div class="cn-menu-target p-4 bg-background">Content</div>
</template>

<script setup lang="ts">
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="p-4 bg-background">Content</div>
        </template>

        <script setup lang="ts">

        </script>"
      `)
    })

    it('removes cn-menu-target from bound class with cn()', async () => {
      const result = metaTransform(
        `<template>
  <div :class="cn('cn-menu-target', 'p-4', 'rounded-md')">Content</div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="cn('', 'p-4', 'rounded-md')">Content</div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('removes cn-menu-target at the end of cn() call', async () => {
      const result = metaTransform(
        `<template>
  <div :class="cn('flex', 'items-center', 'cn-menu-target')">Content</div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="cn('flex', 'items-center', '')">Content</div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('removes cn-menu-target in the middle of cn() call', async () => {
      const result = metaTransform(
        `<template>
  <div :class="cn('flex', 'cn-menu-target', 'gap-4')">Content</div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="cn('flex', '', 'gap-4')">Content</div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('handles multiple occurrences when removing', async () => {
      const result = metaTransform(
        `<template>
  <div>
    <header class="cn-menu-target border-b p-4">Header</header>
    <nav :class="cn('cn-menu-target', 'flex')">Nav</nav>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div>
            <header class="border-b p-4">Header</header>
            <nav :class="cn('', 'flex')">Nav</nav>
          </div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('removes cn-menu-target from script computed class', async () => {
      const result = metaTransform(
        `<template>
  <div :class="menuClass">Content</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const menuClass = computed(() => cn('cn-menu-target', 'p-4', 'bg-card'))
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: testConfig,
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div :class="menuClass">Content</div>
        </template>

        <script setup lang="ts">
        import { computed } from 'vue'
        import { cn } from '@/lib/utils'

        const menuClass = computed(() => cn('', 'p-4', 'bg-card'))
        </script>"
      `)
    })
  })

  describe('vue SFC - edge cases', () => {
    it('does not modify class without cn-menu-target', async () => {
      const result = metaTransform(
        `<template>
  <div class="p-4 flex gap-2">
    <button :class="cn('btn', 'btn-primary')">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="p-4 flex gap-2">
            <button :class="cn('btn', 'btn-primary')">Click me</button>
          </div>
        </template>

        <script setup lang="ts">
        import { cn } from '@/lib/utils'
        </script>"
      `)
    })

    it('handles complex component with multiple class bindings', async () => {
      const result = metaTransform(
        `<template>
  <div class="container">
    <header class="cn-menu-target header">
      <nav :class="cn('cn-menu-target', 'nav', isOpen && 'nav-open')">
        <a href="#" class="nav-link">Home</a>
      </nav>
    </header>
    <main class="main-content">Content</main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const isOpen = ref(false)
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="container">
            <header class="dark header">
              <nav :class="cn('dark', 'nav', isOpen && 'nav-open')">
                <a href="#" class="nav-link">Home</a>
              </nav>
            </header>
            <main class="main-content">Content</main>
          </div>
        </template>

        <script setup lang="ts">
        import { ref } from 'vue'
        import { cn } from '@/lib/utils'

        const isOpen = ref(false)
        </script>"
      `)
    })

    it('only transforms class and className attributes, not kebab-case variants', async () => {
      const result = metaTransform(
        `<template>
  <div class="cn-menu-target p-4">Standard class works</div>
  <CustomComponent class="cn-menu-target p-4" />
</template>

<script setup lang="ts">
import CustomComponent from './CustomComponent.vue'
</script>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="dark p-4">Standard class works</div>
          <CustomComponent class="dark p-4" />
        </template>

        <script setup lang="ts">
        import CustomComponent from './CustomComponent.vue'
        </script>"
      `)
    })

    it('preserves empty script and style blocks', async () => {
      const result = metaTransform(
        `<template>
  <div class="cn-menu-target p-4">Content</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.custom-style {
  color: red;
}
</style>`,
        'test.vue',
        [
          transformMenu({
            filename: 'test.vue',
            raw: '',
            config: {
              ...testConfig,
              menuColor: 'inverted',
            },
          }),
        ],
      )

      expect(result.code).toMatchInlineSnapshot(`
        "<template>
          <div class="dark p-4">Content</div>
        </template>

        <script setup lang="ts">

        </script>

        <style scoped>
        .custom-style {
          color: red;
        }
        </style>"
      `)
    })
  })
})
