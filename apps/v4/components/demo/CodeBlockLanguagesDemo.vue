<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from '@/registry/bases/reka/ui/code-block'

const samples = [
  {
    language: 'css',
    title: 'assets/css/main.css',
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
  },
  {
    language: 'python',
    title: 'main.py',
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  },
  {
    language: 'text',
    title: 'notes.txt',
    code: 'A language that is not in the list renders as plain text.',
  },
]

const highlighted = samples.map(sample => useHighlightedCode(sample.code, sample.language))
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <CodeBlock v-for="(sample, index) in samples" :key="sample.language">
      <CodeBlockHeader>
        <CodeBlockTitle>{{ sample.title }}</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>
        <CodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
          <CodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
