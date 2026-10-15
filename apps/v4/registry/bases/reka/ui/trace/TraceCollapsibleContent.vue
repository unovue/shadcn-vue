<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@/registry/bases/reka/ui/collapsible"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    v-bind="delegatedProps"
    class="cn-trace-collapsible-content min-w-0 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :class="cn('cn-trace-collapsible-content-inner min-w-0 wrap-break-word text-muted-foreground', props.class)"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
