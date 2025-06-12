<script setup lang="ts">
import { SidebarProvider } from '@/registry/new-york-v4/ui/sidebar'

const { data } = await useNavigation()
const docData = computed(() => data.value!.find(i => i.stem === 'docs')!)
</script>

<template>
  <div class="container-wrapper flex flex-1 flex-col px-2">
    <SidebarProvider class="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
      <DocsSidebar :tree="docData" />
      <div class="h-full w-full">
        <NuxtPage />
      </div>
    </SidebarProvider>
  </div>
</template>
