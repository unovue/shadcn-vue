<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { CircleIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input bg-transparent data-checked:border-foreground aria-invalid:aria-checked:border-foreground aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 flex size-4.5 rounded-full focus-visible:ring-2 aria-invalid:ring-2 group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="flex size-4.5 items-center justify-center"
    >
      <slot>
        <CircleIcon class="bg-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
