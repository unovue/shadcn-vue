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
  <Example title="Header">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <IconPlaceholder
            lucide="TerminalIcon"
            tabler="IconTerminal"
            hugeicons="ComputerTerminal01Icon"
            phosphor="TerminalIcon"
            remixicon="RiTerminalBoxLine"
          />
          Terminal
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="install" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{{ install }}</CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
