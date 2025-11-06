<script setup lang="ts">
import { siteConfig } from '@/lib/config'
// import { GitHubLink } from "@/components/github-link"
// import { Icons } from "@/components/icons"
// import { MainNav } from "@/components/main-nav"
// import { MobileNav } from "@/components/mobile-nav"
// import { ModeSwitcher } from "@/components/mode-switcher"
// import { SiteConfig } from "@/components/site-config"
// import blocks from "@/registry/__blocks__.json"
import { Button } from '@/registry/new-york-v4/ui/button'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import { getColors } from '~/lib/colors'
import { Icons } from './Icons'

const { data } = await useNavigation()
const docData = computed(() => data.value!.find(i => i.stem === 'docs')!)
</script>

<template>
  <header class="bg-background sticky top-0 z-50 w-full">
    <div class="container-wrapper 3xl:fixed:px-0 px-6">
      <div class="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:!h-4">
        <MobileNav
          :tree="data ?? []"
          :items="siteConfig.navItems"
          class="flex lg:hidden"
        />
        <Button
          as-child
          variant="ghost"
          size="icon"
          class="hidden size-8 lg:flex"
        >
          <NuxtLink to="/">
            <Icons.logo class="size-5" />
            <span class="sr-only">{{ siteConfig.name }}</span>
          </NuxtLink>
        </Button>
        <MainNav :items="siteConfig.navItems" class="hidden lg:flex" />
        <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
            <CommandMenu :tree="docData" :colors="getColors()" :nav-items="siteConfig.navItems" />
          </div>
          <Separator
            orientation="vertical"
            class="ml-2 hidden lg:block"
          />
          <GitHubLink />
          <Separator orientation="vertical" class="3xl:flex hidden" />
          <SiteConfig class="3xl:flex hidden" />
          <Separator orientation="vertical" />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
