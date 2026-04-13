<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
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

const title = 'New Project'
const description
  = 'Customize everything. Pick your component library, icons, base color, theme, fonts and create your own version of shadcn/ui.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
    <div
      data-slot="designer"
      class="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
    >
      <Preview />
      <Customizer :items="items" />
    </div>
    <WelcomeDialog />
  </div>
</template>
