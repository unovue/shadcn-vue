<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    data-slot="slider"
    :class="cn(
      'data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col',
      props.class,
    )"
    v-bind="forwarded"
  >
    <SliderTrack
      data-slot="slider-track"
      class="bg-input/90 rounded-full data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2 bg-muted relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full"
    >
      <SliderRange
        data-slot="slider-range"
        class="bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      data-slot="slider-thumb"
      class="ring-black/10 not-dark:bg-clip-padding ring-1 h-4 w-6 rounded-full bg-white shadow-md transition-[color,box-shadow,background-color] hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden data-vertical:h-6 data-vertical:w-4 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
