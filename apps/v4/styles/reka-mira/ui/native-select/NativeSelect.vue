<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'
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
    class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
    :data-size="props.size ?? 'default'"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :data-size="props.size ?? 'default'"
      :class="cn(
        'border-input bg-input/20 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-7 w-full min-w-0 appearance-none rounded-md border py-0.5 pr-6 pl-2 text-xs/relaxed transition-colors select-none focus-visible:ring-2 aria-invalid:ring-2 data-[size=sm]:h-6 data-[size=sm]:text-[0.625rem] outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
        props.class,
      )"
    >
      <slot />
    </select>
    <ChevronDownIcon class="text-muted-foreground top-1/2 right-1.5 size-3.5 -translate-y-1/2 group-data-[size=sm]/native-select:size-3 group-data-[size=sm]/native-select:-translate-y-[calc(--spacing(1.25))] pointer-events-none absolute select-none" aria-hidden="true" data-slot="native-select-icon" />
  </div>
</template>
