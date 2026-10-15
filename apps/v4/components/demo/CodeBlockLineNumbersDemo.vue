<script setup lang="ts">
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build"
  }
}`
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockContent line-numbers>
        {{ code }}
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
