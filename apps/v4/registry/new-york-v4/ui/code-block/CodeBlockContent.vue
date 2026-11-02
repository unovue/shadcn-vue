<script setup lang="ts">
import type { HTMLAttributes, VNode } from "vue"
import { cn } from "cn"
import { Primitive } from "reka-ui"
import { Comment, Fragment, Text, useSlots } from "vue"
import CodeBlockLine from "./CodeBlockLine.vue"

const props = withDefaults(defineProps<{
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
  class?: HTMLAttributes["class"]
}>(), {
  wrap: false,
  lineNumbers: false,
  startLine: 1,
})

const slots = useSlots()

// Plain text content, or null when the slot renders elements.
function getText(nodes: VNode[]): string | null {
  let text = ""
  for (const node of nodes) {
    if (node.type === Comment)
      continue
    if (node.type === Text) {
      text += node.children as string
    }
    else if (node.type === Fragment && Array.isArray(node.children)) {
      const nested = getText(node.children as VNode[])
      if (nested === null)
        return null
      text += nested
    }
    else {
      return null
    }
  }
  return text
}

function getLines() {
  if (!props.lineNumbers)
    return null
  const text = getText(slots.default?.() ?? [])
  return text === null ? null : text.replace(/\n$/, "").split("\n")
}
</script>

<template>
  <Primitive
    as="pre"
    data-slot="code-block-content"
    :data-wrap="wrap || undefined"
    :data-numbered="lineNumbers || undefined"
    dir="ltr"
    tabindex="0"
    :style="{ counterReset: `line ${startLine - 1}` }"
    :class="cn(
      'px-3 py-3 leading-relaxed group-has-data-[slot=code-block-header]/code-block:pt-2 group-has-data-[slot=code-block-footer]/code-block:pb-2 group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:py-2.5 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 min-h-0 min-w-0 scroll-fade-x scrollbar-thin overflow-auto text-start font-mono outline-none data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
      props.class,
    )"
  >
    <Primitive
      as="code"
      data-slot="code-block-code"
      class="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
    >
      <template v-for="(lines, i) in [getLines()]" :key="i">
        <template v-if="lines">
          <CodeBlockLine v-for="(line, index) in lines" :key="index">
            {{ line }}
          </CodeBlockLine>
        </template>
        <slot v-else />
      </template>
    </Primitive>
  </Primitive>
</template>
