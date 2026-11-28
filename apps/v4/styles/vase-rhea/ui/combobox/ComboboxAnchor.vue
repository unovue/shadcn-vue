<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Combobox.InputGroup
    data-slot="combobox-anchor"
    :class="cn('', props.class)"
  >
    <slot />
  </Combobox.InputGroup>
</template>
