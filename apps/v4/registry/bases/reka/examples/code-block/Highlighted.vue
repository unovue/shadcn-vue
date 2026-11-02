<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import {
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"

const props = defineProps<{
  code: string
  language: string
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
  class?: HTMLAttributes["class"]
}>()

const lines = useHighlightedCode(() => props.code, () => props.language)
</script>

<template>
  <CodeBlockContent
    :wrap="wrap"
    :line-numbers="lineNumbers"
    :start-line="startLine"
    :class="props.class"
  >
    <CodeBlockLine v-for="(line, index) in lines" :key="index">
      <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
    </CodeBlockLine>
  </CodeBlockContent>
</template>
