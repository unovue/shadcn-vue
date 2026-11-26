<script setup lang="ts">
import type { CollapsiblePanelProps } from '@vase-ui/vue/collapsible'
import { Collapsible } from '@vase-ui/vue/collapsible'

interface Props extends /* @vue-ignore */ CollapsiblePanelProps {}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props>()
</script>

<template>
  <Transition
    enter-active-class="overflow-hidden transition-[height] duration-200 ease-out"
    leave-active-class="overflow-hidden transition-[height] duration-200 ease-out"
    enter-from-class="h-0"
    enter-to-class="h-(--collapsible-panel-height)"
    leave-from-class="h-(--collapsible-panel-height)"
    leave-to-class="h-0"
  >
    <Collapsible.Panel data-slot="collapsible-content" v-bind="$attrs">
      <slot />
    </Collapsible.Panel>
  </Transition>
</template>
