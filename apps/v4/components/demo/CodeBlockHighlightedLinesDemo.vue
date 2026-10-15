<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from '@/registry/bases/reka/ui/code-block'

const code = `export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    typedPages: true,
  },
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
})`

const highlighted = [2, 3]
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockContent line-numbers>
        <CodeBlockLine
          v-for="(line, index) in code.split('\n')"
          :key="index"
          :variant="highlighted.includes(index) ? 'highlighted' : 'default'"
        >
          {{ line }}
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
