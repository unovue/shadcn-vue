<script setup lang="ts">
import type { SplitterPanelEmits, SplitterPanelProps } from "reka-ui"
import { SplitterPanel, useForwardPropsEmits } from "reka-ui"

const props = defineProps<SplitterPanelProps>()
const emits = defineEmits<SplitterPanelEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const SplitterPanelRef = useTemplateRef<InstanceType<typeof SplitterPanel>>("SplitterPanelRef")

defineExpose({
  collapse: () => SplitterPanelRef.value?.collapse(),
  expand: () => SplitterPanelRef.value?.expand(),
  getSize: () => SplitterPanelRef.value?.getSize(),
  resize: (size: number) => SplitterPanelRef.value?.resize(size),
  get isCollapsed() {
    return SplitterPanelRef.value?.isCollapsed
  },
  get isExpanded() {
    return SplitterPanelRef.value?.isExpanded
  },
})
</script>

<template>
  <SplitterPanel
    v-slot="slotProps"
    v-bind="forwarded"
    ref="SplitterPanelRef"
    data-slot="resizable-panel"
  >
    <slot v-bind="slotProps" />
  </SplitterPanel>
</template>
