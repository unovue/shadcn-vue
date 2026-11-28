<script setup lang="ts">
import type { CheckboxEmits, CheckboxProps } from '@vase-ui/vue/checkbox'

import type { HTMLAttributes } from 'vue'
import { CheckIcon, MinusIcon } from '@lucide/vue'
import { Checkbox } from '@vase-ui/vue/checkbox'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CheckboxProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ CheckboxEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Checkbox>
    <template #element="{ props: inputProps, elementRef, state }">
      <span
        data-slot="checkbox"
        :class="cn('peer relative inline-flex shrink-0 has-data-checked:text-primary-foreground', props.class)"
      >
        <input
          v-bind="inputProps"
          :ref="elementRef"
          data-slot="checkbox-input"
          :data-checked="state.checked || state.indeterminate ? '' : undefined"
          :data-unchecked="state.checked || state.indeterminate ? undefined : ''"
          class="border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border shadow-xs transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 relative shrink-0 appearance-none outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:data-checked:border-primary"
        >
        <span
          v-if="state.checked || state.indeterminate"
          data-slot="checkbox-indicator"
          class="[&>svg]:size-3.5 pointer-events-none absolute inset-0 grid place-content-center text-current transition-none"
        >
          <slot :state="state">
            <MinusIcon v-if="state.indeterminate && !state.checked" />
            <CheckIcon v-else />
          </slot>
        </span>
      </span>
    </template>
  </Checkbox>
</template>
