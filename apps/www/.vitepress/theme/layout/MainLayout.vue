<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { Content, useData, useRoute } from 'vitepress'
import { onMounted } from 'vue'
import { docsConfig } from '../config/docs'
import Logo from '../components/Logo.vue'
import MobileNav from '../components/MobileNav.vue'

// import { Button } from '@/lib/registry/default/ui/button'
// import { Kbd } from '@/lib/registry/default/ui/kbd'
// import LucideSearch from '~icons/lucide/search'
import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
import TablerBrandX from '~icons/tabler/brand-x'
import RadixIconsMoon from '~icons/radix-icons/moon'
import RadixIconsSun from '~icons/radix-icons/sun'
import { useConfigStore } from '@/stores/config'

const { radius, theme } = useConfigStore()
// Whenever the component is mounted, update the document class list
onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
  document.documentElement.classList.add(`theme-${theme.value}`)
})

const { frontmatter, isDark } = useData()

const $route = useRoute()
const toggleDark = useToggle(isDark)

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
    <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
      <div
        class="container flex justify-between h-14 items-center"
      >
        <MobileNav />

        <div class="mr-4 hidden md:flex">
          <Logo />

          <nav
            class="flex items-center space-x-6 text-sm font-medium"
          >
            <a
              v-for="route in docsConfig.mainNav"
              :key="route.title"
              :href="route.href"
              :target="route.external ? '_target' : undefined"
              class="transition-colors hover:text-foreground/80 text-foreground/60"
              :class="{
                'font-semibold !text-foreground': $route.path === `${route.href}.html`,
              }"
            >
              {{ route.title }}
            </a>
          </nav>
        </div>

        <div class=" flex items-center justify-end space-x-4 ">
          <!-- <Button
            variant="outline"
            class="w-72 h-8 px-3 hidden lg:flex lg:justify-between lg:items-center"
          >
            <div class="flex items-center">
              <LucideSearch class="w-4 h-4 mr-2 text-muted-foreground" />
              <span class="text-muted-foreground"> Search for anything... </span>
            </div>
            <div class="flex items-center gap-x-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
          </Button> -->

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
        </div>
      </div>
    </header>

    <div class="flex-1  bg-background">
      <component :is="'docs'" v-if="$route.path.includes('docs')">
        <Content />
      </component>
      <component :is="'examples'" v-else-if="$route.path.includes('examples')">
        <Content />
      </component>
      <component :is="frontmatter.layout" v-else-if="frontmatter.layout">
        <slot />
      </component>
      <main v-else class="container">
        <Content />
      </main>
    </div>

    <footer class="py-6 md:px-8 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          <span class="text-sm">
            Built and designed by
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
            Ported to Vue by
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
            The code source is available on
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
