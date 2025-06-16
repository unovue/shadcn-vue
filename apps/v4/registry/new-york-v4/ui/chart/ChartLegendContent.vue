<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useChart } from '.'
import { getPayloadConfigFromPayload } from './utils'

const props = defineProps<{
  hideIcon?: boolean
  nameKey?: string
  verticalAlign?: 'bottom' | 'top'
  payload?: any[]
  class?: HTMLAttributes['class']
}>()

const { config } = useChart()

const payload = computed(() => props.payload?.map((item) => {
  const key = `${props.nameKey || item.dataKey || 'value'}`
  return {
    item,
    itemConfig: getPayloadConfigFromPayload(config.value, item, key),
  }
}))
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-center gap-4',
      verticalAlign === 'top' ? 'pb-3' : 'pt-3',
      props.class,
    )"
  >
    <div
      v-for="{ item, itemConfig } in payload"
      :key="item.value"
      :class="cn(
        '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3',
      )"
    >
      <component :is="itemConfig.icon" v-if="itemConfig?.icon" />
      <div
        v-else
        class="h-2 w-2 shrink-0 rounded-[2px]"
        :style="{
          backgroundColor: item.color,
        }"
      />

      {{ itemConfig?.label }}
    </div>
  </div>
</template>
