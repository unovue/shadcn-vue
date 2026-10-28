<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { CodeBlockLineVariants } from '.'
import { cn } from 'cn'
import { Comment, Fragment, Text, useSlots } from 'vue'
import { codeBlockLineVariants } from '.'

const props = withDefaults(defineProps<{
  variant?: CodeBlockLineVariants['variant']
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
})

const slots = useSlots()

function hasContent(nodes: VNode[]): boolean {
  return nodes.some((node) => {
    if (node.type === Comment)
      return false
    if (node.type === Text)
      return node.children !== ''
    if (node.type === Fragment)
      return Array.isArray(node.children) && hasContent(node.children as VNode[])
    return true
  })
}

// An empty line holds a newline so copying a selection keeps blank lines.
function isEmpty() {
  return !hasContent(slots.default?.() ?? [])
}
</script>

<template>
  <span
    data-slot="code-block-line"
    :data-variant="variant"
    :class="cn(codeBlockLineVariants({ variant }), props.class)"
  ><span data-slot="code-block-line-content" class="min-w-0"><template v-if="isEmpty()">{{ "\n" }}</template><slot v-else /></span></span>
</template>
