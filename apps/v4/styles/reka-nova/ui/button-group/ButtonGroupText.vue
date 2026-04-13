<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :as="as"
    :as-child="asChild"
    :class="cn('bg-muted gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg:not([class*=size-])]:size-4 flex items-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </Primitive>
</template>
