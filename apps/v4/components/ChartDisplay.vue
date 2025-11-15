<script lang="ts">
import type { registryItemSchema } from 'shadcn-vue/schema'
import type { z } from 'zod'
import { fixImport } from '~/lib/registry-utils'
import { cn } from '~/lib/utils'

export type Chart = z.infer<typeof registryItemSchema> & {
  // highlightedCode: string
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  class?: HTMLAttributes['class']
}>()

const code = fixImport((await import(`@/registry/new-york-v4/charts/${props.name}.vue?raw`)).default)
</script>

<template>
  <div
    :class="cn(
      'themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 ease-in-out hover:z-30',
      props.class,
    )"
  >
    <ChartToolbar
      :name
      :code
      class="bg-card text-card-foreground relative z-20 flex justify-end border-b px-3 py-2.5"
    >
      <slot />
    </ChartToolbar>
    <div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
      <slot />
    </div>
  </div>
</template>
