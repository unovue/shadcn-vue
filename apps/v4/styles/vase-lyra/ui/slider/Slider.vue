<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from '@vase-ui/vue/slider'
import type { HTMLAttributes } from 'vue'
import { Slider } from '@vase-ui/vue/slider'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SliderRootProps<number | readonly number[]> {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ SliderRootEmits<number | readonly number[]> {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Slider.Root
    v-slot="{ state }"
    data-slot="slider"
    thumb-alignment="edge"
    :class="cn('data-horizontal:w-full data-vertical:h-full', props.class)"
  >
    <Slider.Control
      class="data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col"
    >
      <Slider.Track
        data-slot="slider-track"
        class="bg-muted rounded-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1 relative grow overflow-hidden select-none"
      >
        <Slider.Indicator
          data-slot="slider-range"
          class="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </Slider.Track>
      <Slider.Thumb
        v-for="(_, index) in state.values"
        :key="index"
        data-slot="slider-thumb"
        class="border-ring ring-ring/50 relative size-3 rounded-none border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-1 focus-visible:ring-1 focus-visible:outline-hidden active:ring-1 block shrink-0 select-none has-[:focus-visible]:ring-3 disabled:pointer-events-none disabled:opacity-50"
      />
    </Slider.Control>
  </Slider.Root>
</template>
