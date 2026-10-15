<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@/registry/bases/reka/ui/code-block'

const patch = ` <template>
-  <p>Hello, {{ name }}</p>
+  <p class="text-sm text-muted-foreground">
+    Hello, {{ name }}!
+  </p>
 </template>`

function getVariant(line: string) {
  if (line.startsWith('+'))
    return 'added'

  if (line.startsWith('-'))
    return 'removed'

  return 'default'
}
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>components/Greeting.vue</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="patch" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        <CodeBlockLine
          v-for="(line, index) in patch.split('\n')"
          :key="index"
          :variant="getVariant(line)"
        >
          {{ line.slice(1) }}
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
