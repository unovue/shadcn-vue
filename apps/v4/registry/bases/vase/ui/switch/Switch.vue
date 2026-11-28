<script setup lang="ts">
import type { SwitchEmits, SwitchProps } from "@vase-ui/vue/switch"
import type { HTMLAttributes } from "vue"
import { Switch } from "@vase-ui/vue/switch"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ SwitchProps {
  class?: HTMLAttributes["class"]
  size?: "sm" | "default"
}
interface Emits extends /* @vue-ignore */ SwitchEmits {}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})
defineEmits<Emits>()
</script>

<template>
  <Switch>
    <template #element="{ props: inputProps, elementRef, state }">
      <span
        data-slot="switch"
        :data-size="size"
        :class="cn('peer group/switch relative inline-flex shrink-0 items-center', props.class)"
      >
        <input
          v-bind="inputProps"
          :ref="elementRef"
          data-slot="switch-input"
          :data-size="size"
          :data-checked="state.checked ? '' : undefined"
          :data-unchecked="state.checked ? undefined : ''"
          class="cn-switch relative appearance-none transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
        <!-- Hidden copy of the track: the thumb sits in the same border box as the input in every style. -->
        <span
          aria-hidden="true"
          class="cn-switch pointer-events-none invisible absolute inset-0 flex items-center"
        >
          <span
            data-slot="switch-thumb"
            :data-checked="state.checked ? '' : undefined"
            :data-unchecked="state.checked ? undefined : ''"
            class="cn-switch-thumb visible block ring-0 transition-transform"
          >
            <slot name="thumb" :state="state" />
          </span>
        </span>
      </span>
    </template>
  </Switch>
</template>
