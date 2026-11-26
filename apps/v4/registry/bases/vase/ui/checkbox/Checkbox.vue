<script setup lang="ts">
import type { CheckboxEmits, CheckboxProps } from "@vase-ui/vue/checkbox"
import type { HTMLAttributes } from "vue"
import { Checkbox } from "@vase-ui/vue/checkbox"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ CheckboxProps {
  class?: HTMLAttributes["class"]
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
          class="cn-checkbox relative shrink-0 appearance-none outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:data-checked:border-primary"
        >
        <span
          v-if="state.checked || state.indeterminate"
          data-slot="checkbox-indicator"
          class="cn-checkbox-indicator pointer-events-none absolute inset-0 grid place-content-center text-current transition-none"
        >
          <slot :state="state">
            <IconPlaceholder
              v-if="state.indeterminate && !state.checked"
              lucide="MinusIcon"
              tabler="IconMinus"
              hugeicons="MinusSignIcon"
              phosphor="MinusIcon"
              remixicon="RiSubtractLine"
            />
            <IconPlaceholder
              v-else
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </slot>
        </span>
      </span>
    </template>
  </Checkbox>
</template>
