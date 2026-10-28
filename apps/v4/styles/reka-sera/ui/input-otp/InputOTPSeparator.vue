<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { MinusIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from 'cn'
import { useForwardProps } from 'reka-ui'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    v-bind="forwarded"
    :class="cn('[&_svg:not([class*=size-])]:size-3.5 flex items-center', props.class)"
  >
    <slot>
      <MinusIcon />
    </slot>
  </div>
</template>
