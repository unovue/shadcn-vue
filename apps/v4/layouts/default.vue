<script setup lang="ts">
import { siteConfig } from '~/lib/config'

useSeoMeta({
  title: siteConfig.name,
  titleTemplate: `%s - ${siteConfig.name}`,
  description: siteConfig.description,
})

defineOgImageComponent('Custom')
</script>

<template>
  <div data-slot="layout" class="bg-background relative z-10 flex min-h-svh flex-col">
    <SiteHeader />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
