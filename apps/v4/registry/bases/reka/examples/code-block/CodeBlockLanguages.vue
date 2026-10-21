<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"
import { ansi, samples } from "./data"
import Highlighted from "./Highlighted.vue"

const lines = useHighlightedCode(ansi, "ansi")
</script>

<template>
  <Example title="Languages">
    <div class="flex flex-col gap-4">
      <CodeBlock v-for="sample in samples" :key="sample.language">
        <CodeBlockHeader>
          <CodeBlockTitle>{{ sample.title }}</CodeBlockTitle>
        </CodeBlockHeader>
        <Highlighted :code="sample.code" :language="sample.language" />
      </CodeBlock>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>ANSI</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent wrap>
          <CodeBlockLine v-for="(line, index) in lines" :key="index">
            <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </Example>
</template>
