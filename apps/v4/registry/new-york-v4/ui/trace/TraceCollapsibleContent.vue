<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@/registry/new-york-v4/ui/collapsible"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    v-bind="delegatedProps"
    class="duration-200 min-w-0 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :class="cn('mt-2 mb-1 ml-[calc(--spacing(2)-1px)] border-l pr-1 pl-4 leading-relaxed min-w-0 wrap-break-word text-muted-foreground', props.class)"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
