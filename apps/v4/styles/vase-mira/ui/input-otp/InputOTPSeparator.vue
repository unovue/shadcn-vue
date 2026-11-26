<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { MinusIcon } from '@lucide/vue'
import { cn } from 'cn'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    :class="cn('[&_svg:not([class*=size-])]:size-4 flex items-center', props.class)"
  >
    <slot>
      <MinusIcon />
    </slot>
  </div>
</template>
