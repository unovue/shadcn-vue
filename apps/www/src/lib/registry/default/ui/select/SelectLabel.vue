<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectLabelProps & { class?: string }>()
</script>

<template>
  <div class="px-2 py-1">
    <SelectLabel :class="cn('text-[13px] text-muted font-medium', props.class)">
      <slot />
    </SelectLabel>
  </div>
</template>
