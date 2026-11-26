<script setup lang="ts">
import type { RadioProps } from "@vase-ui/vue/radio"
import type { HTMLAttributes } from "vue"
import { Radio } from "@vase-ui/vue/radio"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ RadioProps {
  class?: HTMLAttributes["class"]
  value: RadioProps["value"]
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
          class="cn-radio-group-item relative aspect-square shrink-0 appearance-none border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:data-checked:border-primary"
        >
        <span
          v-if="state.checked"
          data-slot="radio-group-indicator"
          class="cn-radio-group-indicator pointer-events-none absolute inset-0"
        >
          <slot :state="state">
            <span class="cn-radio-group-indicator-icon" />
          </slot>
        </span>
      </span>
    </template>
  </Radio>
</template>
