<script setup lang="ts">
import type { SwitchEmits, SwitchProps } from '@vase-ui/vue/switch'
import type { HTMLAttributes } from 'vue'
import { Switch } from '@vase-ui/vue/switch'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SwitchProps {
  class?: HTMLAttributes['class']
  size?: 'sm' | 'default'
}
interface Emits extends /* @vue-ignore */ SwitchEmits {}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
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
          class="data-checked:bg-primary data-unchecked:bg-input data-checked:border-primary border data-unchecked:border-input/50 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 shrink-0 rounded-none focus-visible:ring-2 aria-invalid:ring-2 data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-3.5 data-[size=sm]:w-6.25 relative appearance-none transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
        <!-- Hidden copy of the track: the thumb sits in the same border box as the input in every style. -->
        <span
          aria-hidden="true"
          class="data-checked:bg-primary data-unchecked:bg-input data-checked:border-primary border data-unchecked:border-input/50 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 shrink-0 rounded-none focus-visible:ring-2 aria-invalid:ring-2 data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-3.5 data-[size=sm]:w-6.25 pointer-events-none invisible absolute inset-0 flex items-center"
        >
          <span
            data-slot="switch-thumb"
            :data-checked="state.checked ? '' : undefined"
            :data-unchecked="state.checked ? undefined : ''"
            class="bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-2.5 data-checked:translate-x-[calc(100%+2px)] data-unchecked:translate-x-0.25 visible block ring-0 transition-transform"
          >
            <slot name="thumb" :state="state" />
          </span>
        </span>
      </span>
    </template>
  </Switch>
</template>
