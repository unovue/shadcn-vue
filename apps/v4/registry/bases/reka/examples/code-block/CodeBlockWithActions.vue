<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"
import { download, source } from "./data"

const wrap = ref(false)
const lines = useHighlightedCode(source, "ts")
</script>

<template>
  <Example title="Actions">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>server/api/chat.post.ts</CodeBlockTitle>
        <CodeBlockActions>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Wrap lines"
            :aria-pressed="wrap"
            class="aria-pressed:text-foreground"
            @click="wrap = !wrap"
          >
            <IconPlaceholder
              lucide="WrapTextIcon"
              tabler="IconTextWrap"
              hugeicons="TextWrapIcon"
              phosphor="ArrowUDownLeftIcon"
              remixicon="RiTextWrap"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Download"
            @click="download(source, 'chat.post.ts')"
          >
            <IconPlaceholder
              lucide="DownloadIcon"
              tabler="IconDownload"
              hugeicons="Download01Icon"
              phosphor="DownloadSimpleIcon"
              remixicon="RiDownloadLine"
            />
          </Button>
          <CodeBlockCopyButton :value="source" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent :wrap="wrap" line-numbers>
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
