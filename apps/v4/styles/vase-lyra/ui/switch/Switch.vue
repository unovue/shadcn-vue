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
          class="data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-1 aria-invalid:ring-1 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 relative appearance-none transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
        <!-- Hidden copy of the track: the thumb sits in the same border box as the input in every style. -->
        <span
          aria-hidden="true"
          class="data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-1 aria-invalid:ring-1 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 pointer-events-none invisible absolute inset-0 flex items-center"
        >
          <span
            data-slot="switch-thumb"
            :data-checked="state.checked ? '' : undefined"
            :data-unchecked="state.checked ? undefined : ''"
            class="bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 visible block ring-0 transition-transform"
          >
            <slot name="thumb" :state="state" />
          </span>
        </span>
      </span>
    </template>
  </Switch>
</template>
