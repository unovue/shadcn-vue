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
  <div
    data-slot="layout"
    class="group/layout relative z-10 flex min-h-svh flex-col bg-background has-data-[slot=designer]:h-svh has-data-[slot=designer]:overflow-hidden"
  >
    <SiteHeader />
    <main class="flex min-h-0 flex-1 flex-col">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
