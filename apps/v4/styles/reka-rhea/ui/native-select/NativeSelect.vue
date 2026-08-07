<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: AcceptableValue | AcceptableValue[]
  class?: HTMLAttributes['class']
  size?: 'sm' | 'default'
}>()

const emit = defineEmits<{
  'update:modelValue': AcceptableValue
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
  defaultValue: '',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <div
    :class="cn('group/native-select relative w-fit has-[select:disabled]:opacity-50', props.class)"
    data-slot="native-select-wrapper"
    :data-size="props.size ?? 'default'"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      class="bg-input/50 border-transparent placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 w-full min-w-0 appearance-none rounded-2xl border py-1 pr-8 pl-2.5 text-sm transition-[color,box-shadow] duration-200 select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-7 outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
      :data-size="props.size ?? 'default'"
    >
      <slot />
    </select>
    <ChevronDownIcon class="text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none" aria-hidden="true" data-slot="native-select-icon" />
  </div>
</template>
