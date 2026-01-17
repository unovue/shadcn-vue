<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import { ArrowLeftIcon } from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import { SidebarProvider } from '@/registry/new-york-v4/ui/sidebar'
import { ALLOWED_ITEM_TYPES } from '~/lib/constants'

const params = useDesignSystemSearchParams()

const { data } = await useFetch<Record<string, RegistryItem>>(`/api/base/${params.base.value}`)
const items = computed(() => {
  return Object.values(data.value ?? {}).filter(item =>
    ALLOWED_ITEM_TYPES.includes(item.type),
  ).map(item => ({
    name: item.name,
    title: item.title ?? item.name,
    type: item.type,
  }))
})
console.log(data, items)

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div
    data-slot="layout"
    class="section-soft relative z-10 flex min-h-svh flex-col"
  >
    <header class="sticky top-0 z-50 w-full">
      <div class="container-wrapper 3xl:fixed:px-0 px-6">
        <div class="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:!h-4">
          <div class="flex items-center xl:w-1/3">
            <Button
              as-child
              variant="outline"
              size="sm"
              class="rounded-lg shadow-none"
            >
              <NuxtLink to="/">
                <ArrowLeftIcon />
                Back
              </NuxtLink>
            </Button>
            <Separator
              orientation="vertical"
              class="mx-2 hidden sm:mx-4 lg:flex"
            />
            <div class="text-muted-foreground hidden text-sm font-medium lg:flex">
              New Project
            </div>
          </div>
          <div class="fixed inset-x-0 bottom-0 ml-auto flex flex-1 items-center gap-2 px-4.5 pb-4 sm:static sm:justify-end sm:p-0 lg:ml-0 xl:justify-center">
            <ItemPicker :items="items" />
            <CustomizerControls class="sm:hidden" />
            <Separator
              orientation="vertical"
              class="mr-2 hidden sm:flex xl:hidden"
            />
          </div>
          <div class="ml-auto flex items-center gap-2 sm:ml-0 md:justify-end xl:ml-auto xl:w-1/3">
            <SiteConfig class="3xl:flex hidden" />
            <Separator orientation="vertical" class="3xl:flex hidden" />
            <ModeSwitcher />
            <Separator
              orientation="vertical"
              class="mr-0 -ml-2 sm:ml-0"
            />
            <ShareButton />
            <ToolbarControls />
          </div>
        </div>
      </div>
    </header>
    <main class="flex flex-1 flex-col pb-16 sm:pb-0">
      <SidebarProvider class="flex h-auto min-h-min flex-1 flex-col items-start overflow-hidden px-0">
        <div
          data-slot="designer"
          class="3xl:fixed:container flex w-full flex-1 flex-col gap-2 p-6 pt-1 pb-4 [--sidebar-width:--spacing(40)] sm:gap-2 sm:pt-2 md:flex-row md:pb-6 2xl:gap-6"
        >
          <ItemExplorer :base="params.base.value" :items="items" />
          <Preview />
          <Customizer />
        </div>
      </SidebarProvider>
      <WelcomeDialog />
    </main>
  </div>
</template>
