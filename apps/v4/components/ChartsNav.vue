<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { path } = toRefs(useRoute())

const links = [
  {
    name: 'Area Charts',
    href: '/charts/area#charts',
  },
  {
    name: 'Bar Charts',
    href: '/charts/bar#charts',
  },
  {
    name: 'Line Charts',
    href: '/charts/line#charts',
  },
  {
    name: 'Pie Charts',
    href: '/charts/pie#charts',
  },
  // {
  //   name: 'Radar Charts',
  //   href: '/charts/radar#charts',
  // },
  // {
  //   name: 'Radial Charts',
  //   href: '/charts/radial#charts',
  // },
  {
    name: 'Tooltips',
    href: '/charts/tooltip#charts',
  },
]
</script>

<template>
  <div class="relative overflow-hidden">
    <ScrollArea class="max-w-[600px] lg:max-w-none">
      <div :class="cn('flex items-center', props.class)">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          :data-active="link.href.startsWith(path)"
          :class="cn(
            'text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 shrink-0 items-center justify-center px-4 text-center text-base font-medium transition-colors',
          )"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
