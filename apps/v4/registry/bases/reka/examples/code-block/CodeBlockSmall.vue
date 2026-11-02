<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import { install } from "./data"
</script>

<template>
  <Example title="Small">
    <CodeBlock size="sm">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <IconPlaceholder
            lucide="TerminalIcon"
            tabler="IconTerminal"
            hugeicons="ComputerTerminal01Icon"
            phosphor="TerminalIcon"
            remixicon="RiTerminalBoxLine"
          />
          pnpm add ai @ai-sdk/vue zod
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="install" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap>
        {{ install }}
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
