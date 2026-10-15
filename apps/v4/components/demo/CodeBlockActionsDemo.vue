<script setup lang="ts">
import { DownloadIcon, TerminalIcon, WrapTextIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/registry/bases/reka/ui/code-block'

const output = `$ pnpm lint
app/components/MessageList.vue
  18:22  error    'messages' is possibly 'undefined'. Add a guard before calling map  ts/no-unsafe-call
  42:7   warning  'scrollToBottom' is assigned a value but never used  unused-imports/no-unused-vars

✖ 2 problems (1 error, 1 warning)`

const wrap = ref(true)

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TerminalIcon />
          Terminal
        </CodeBlockTitle>
        <CodeBlockActions>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Wrap lines"
            :aria-pressed="wrap"
            class="aria-pressed:text-foreground"
            @click="wrap = !wrap"
          >
            <WrapTextIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Download"
            @click="download(output, 'lint.log')"
          >
            <DownloadIcon />
          </Button>
          <CodeBlockCopyButton :value="output" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent :wrap="wrap">
        {{ output }}
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
