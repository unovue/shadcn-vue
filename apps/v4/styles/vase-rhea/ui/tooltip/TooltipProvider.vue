<script setup lang="ts">
import type { TooltipProviderProps } from '@vase-ui/vue/tooltip'
import { Tooltip } from '@vase-ui/vue/tooltip'

interface Props extends /* @vue-ignore */ TooltipProviderProps {
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
})
</script>

<template>
  <Tooltip.Provider :delay="props.delay">
    <slot />
  </Tooltip.Provider>
</template>
