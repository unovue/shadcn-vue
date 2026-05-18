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
        'border-transparent border-b-input bg-transparent placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50 h-10 w-full min-w-0 appearance-none rounded-none border py-2 pr-8 pl-0 text-sm transition-[color,border-color] select-none data-[size=sm]:h-9 outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
        props.class,
      )"
    >
      <slot />
    </select>
    <ChevronDownIcon class="text-muted-foreground top-1/2 right-0 size-3.5 -translate-y-1/2 pointer-events-none absolute select-none" aria-hidden="true" data-slot="native-select-icon" />
  </div>
</template>
