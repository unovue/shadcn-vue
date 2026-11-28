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
        class="bg-input/90 rounded-full data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2 relative grow overflow-hidden select-none"
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
        class="ring-black/10 not-dark:bg-clip-padding ring-1 h-4 w-6 rounded-full bg-white shadow-md transition-[color,box-shadow,background-color] hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden data-vertical:h-6 data-vertical:w-4 block shrink-0 select-none has-[:focus-visible]:ring-3 disabled:pointer-events-none disabled:opacity-50"
      />
    </Slider.Control>
  </Slider.Root>
</template>
