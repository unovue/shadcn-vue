<script setup lang="ts">
import type { RadioProps } from '@vase-ui/vue/radio'
import type { HTMLAttributes } from 'vue'
import { Radio } from '@vase-ui/vue/radio'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ RadioProps {
  class?: HTMLAttributes['class']
  value: RadioProps['value']
}

const props = defineProps<Props>()
</script>

<template>
  <Radio :value="value">
    <template #element="{ props: inputProps, elementRef, state }">
      <span
        data-slot="radio-group-item"
        :class="cn('peer group/radio-group-item relative inline-flex shrink-0', props.class)"
      >
        <input
          v-bind="inputProps"
          :ref="elementRef"
          data-slot="radio-group-input"
          :data-checked="state.checked ? '' : undefined"
          :data-unchecked="state.checked ? undefined : ''"
          class="bg-input/90 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary border-transparent aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 flex size-4 rounded-2xl focus-visible:ring-3 aria-invalid:ring-3 relative aspect-square shrink-0 appearance-none border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:data-checked:border-primary"
        >
        <span
          v-if="state.checked"
          data-slot="radio-group-indicator"
          class="flex size-4 items-center justify-center pointer-events-none absolute inset-0"
        >
          <slot :state="state">
            <span class="bg-primary-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full dark:size-2.5" />
          </slot>
        </span>
      </span>
    </template>
  </Radio>
</template>
