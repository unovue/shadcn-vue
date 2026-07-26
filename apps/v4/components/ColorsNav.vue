<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'
import { getColors } from '~/lib/colors'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { path } = toRefs(useRoute())
const colors = getColors()
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <ScrollArea class="max-w-full">
      <div class="flex items-center">
        <NuxtLink
          v-for="(colorPalette, index) in colors"
          :key="colorPalette.name"
          :to="`/colors#${colorPalette.name}`"
          :data-active="
            path?.startsWith(colorPalette.name)
              || (index === 0 && path === '/colors')
          "
          :class="cn(
            'text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium capitalize transition-colors',
          )"
        >
          {{ colorPalette.name }}
        </NuxtLink>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
