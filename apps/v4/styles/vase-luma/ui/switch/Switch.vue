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
          class="data-checked:bg-primary data-unchecked:bg-input/90 data-checked:border-primary border-2 data-unchecked:border-transparent focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 shrink-0 rounded-full focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-5 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-7 relative appearance-none transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
        <!-- Hidden copy of the track: the thumb sits in the same border box as the input in every style. -->
        <span
          aria-hidden="true"
          class="data-checked:bg-primary data-unchecked:bg-input/90 data-checked:border-primary border-2 data-unchecked:border-transparent focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 shrink-0 rounded-full focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-5 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-7 pointer-events-none invisible absolute inset-0 flex items-center"
        >
          <span
            data-slot="switch-thumb"
            :data-checked="state.checked ? '' : undefined"
            :data-unchecked="state.checked ? undefined : ''"
            class="bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full shadow-sm group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-6 group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-4 data-checked:translate-x-[calc(100%-8px)] data-unchecked:translate-x-0 not-dark:bg-clip-padding visible block ring-0 transition-transform"
          >
            <slot name="thumb" :state="state" />
          </span>
        </span>
      </span>
    </template>
  </Switch>
</template>
