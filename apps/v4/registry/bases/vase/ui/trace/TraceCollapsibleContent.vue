<script setup lang="ts">
import type { CollapsiblePanelProps } from "@vase-ui/vue/collapsible"
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { CollapsibleContent } from "@/registry/bases/vase/ui/collapsible"

interface Props extends /* @vue-ignore */ CollapsiblePanelProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    class="cn-trace-collapsible-content min-w-0"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :class="cn('cn-trace-collapsible-content-inner min-w-0 wrap-break-word text-muted-foreground', props.class)"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
