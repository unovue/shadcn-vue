<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Content, useData, useRoute } from 'vitepress'
import { Button } from '@/lib/registry/default/ui/button'
import { Kbd } from '@/lib/registry/default/ui/kbd'
import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
import TablerBrandX from '~icons/tabler/brand-x'
import RadixIconsMoon from '~icons/radix-icons/moon'
import RadixIconsSun from '~icons/radix-icons/sun'
import LucidePanelRightOpen from '~icons/lucide/panel-right-open'
import LucideSearch from '~icons/lucide/search'

const { frontmatter } = useData()

const $route = useRoute()
const isDark = useDark()

const toggleDark = useToggle(isDark)

const routes = [
  {
    name: 'Documentation',
    path: '/docs',
  },
  {
    name: 'Components',
    path: '/docs/components/accordion',
  },
  {
    name: 'Themes',
    path: '/themes',
  },
  {
    name: 'Examples',
    path: '/examples/dashboard',
  },
  {
    name: 'GitHub',
    path: 'https://github.com/radix-vue/shadcn-vue',
    target: '_blank',
  },
]

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/radix-vue',
    icon: RadixIconsGithubLogo,
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: TablerBrandX,
  },
]
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <header class="sticky z-40 top-0 border-b border-border">
      <div
        class="max-w-8xl flex h-[58px] items-center justify-between p-4 mx-auto"
      >
        <div class="flex gap-6 md:gap-8">
          <a href="/" class="text-md font-bold"> shadcn-vue </a>

          <nav
            v-for="route in routes"
            :key="route.name"
            class="flex items-center space-x-6 text-sm font-medium"
          >
            <a
              :href="route.path"
              :target="route.target"
              class="transition-colors hover:text-foreground/80 text-foreground/60"
              :class="{
                'font-semibold !text-foreground': $route.path === `${route.path}.html`,
              }"
            >
              {{ route.name }}
            </a>
          </nav>
        </div>

        <div class="md:flex flex-1 items-center justify-end space-x-4 hidden">
          <Button
            variant="outline"
            class="w-72 h-8 px-3 hidden lg:flex lg:justify-between lg:items-center"
          >
            <div class="flex items-center">
              <LucideSearch class="w-4 h-4 mr-2 text-muted" />
              <span class="text-muted"> Search for anything... </span>
            </div>
            <div class="flex items-center gap-x-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
          </Button>

          <div
            v-for="link in links"
            :key="link.name"
            class="flex items-center space-x-1"
          >
            <a :href="link.href" target="_blank" class="text-foreground">
              <component :is="link.icon" class="w-5 h-5" />
            </a>
          </div>

          <button
            class="flex items-center justify-center"
            aria-label="Toggle dark mode"
            @click="toggleDark()"
          >
            <component
              :is="isDark ? RadixIconsSun : RadixIconsMoon"
              class="w-5 h-5 text-foreground"
            />
          </button>

          <button class="flex md:hidden items-center justify-center">
            <LucidePanelRightOpen class="w-5 h-5 text-foreground" />
          </button>
        </div>
        <button class="flex md:hidden items-center justify-center">
          <LucidePanelRightOpen class="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>

    <div class="flex-1">
      <component :is="'docs'" v-if="$route.path.includes('docs')">
        <Content />
      </component>
      <component :is="frontmatter.layout" v-else-if="frontmatter.layout">
        <slot />
      </component>
      <main v-else>
        <Content />
      </main>
    </div>

    <footer class="z-40 border-t border-border text-foreground">
      <div class="max-w-8xl h-20 flex items-center justify-between p-4 mx-auto">
        <div class="flex justify-center items-center">
          <span class="text-sm">
            Built and designed by {{ " " }}
            <a
              href="https://twitter.com/shadcn"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground"
            >
              shadcn
            </a>
          </span>
          <span class="text-sm ml-0.5"> . </span>
          <span class="text-sm ml-2">
            Ported to Vue by {{ " " }}
            <a
              href="https://twitter.com"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground"
            >
              Radix Vue
            </a>
          </span>
          <span class="text-sm ml-0.5"> . </span>
          <span class="text-sm ml-2">
            The code source is available on {{ " " }}
            <a
              href="https://github.com/radix-vue/shadcn-vue"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground"
            >
              GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
