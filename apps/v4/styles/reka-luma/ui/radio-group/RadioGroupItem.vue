<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import IconPlaceholder from '@/registry/bases/reka/components/icon-placeholder/IconPlaceholder.vue'

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
        'bg-input/90 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary border-transparent aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 flex size-4 rounded-full border focus-visible:ring-[3px] aria-invalid:ring-[3px] group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="flex size-4 items-center justify-center"
    >
      <slot>
        <IconPlaceholder
          lucide="CircleIcon"
          tabler="IconCircle"
          hugeicons="CircleIcon"
          phosphor="CircleIcon"
          remixicon="RiCircleLine"
          class="bg-primary-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full dark:size-2.5"
        />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
