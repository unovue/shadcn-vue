<script setup lang="ts">
import type { CollapsibleTriggerProps } from "@vase-ui/vue/collapsible"
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"
import { CollapsibleTrigger } from "@/registry/bases/vase/ui/collapsible"
import TraceIcon from "./TraceIcon.vue"

interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    :class="cn(
      'cn-trace-collapsible-trigger group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive',
      props.class,
    )"
  >
    <slot />
    <TraceIcon class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      />
    </TraceIcon>
  </CollapsibleTrigger>
</template>
