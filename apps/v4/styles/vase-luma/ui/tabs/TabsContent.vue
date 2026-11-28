<script setup lang="ts">
import type { TabsPanelProps } from '@vase-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'
import { Tabs } from '@vase-ui/vue/tabs'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ TabsPanelProps {
  class?: HTMLAttributes['class']
  value: TabsPanelProps['value']
}

const props = defineProps<Props>()
</script>

<template>
  <Tabs.Panel
    :value="value"
    data-slot="tabs-content"
    :class="cn('text-sm flex-1 outline-none', props.class)"
  >
    <slot />
  </Tabs.Panel>
</template>
