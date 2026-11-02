<script setup lang="ts">
import { useToggle } from "@vueuse/core"
import { useId } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"
import { chat } from "./data"

const [expanded, toggleExpanded] = useToggle(false)
const lines = useHighlightedCode(chat, "vue")
const id = useId()
</script>

<template>
  <Example title="Show More">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>components/Chat.vue</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="chat" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent
        :id="id"
        line-numbers
        :class="expanded ? undefined : 'max-h-64 scroll-fade-y overflow-y-hidden'"
      >
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
      <CodeBlockFooter class="justify-center">
        <Button
          variant="ghost"
          size="xs"
          :aria-expanded="expanded"
          :aria-controls="id"
          @click="toggleExpanded()"
        >
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            class="transition-transform in-aria-expanded:rotate-180 aria-expanded:rotate-180"
          />
          {{ expanded ? "Show less" : "Show more" }}
        </Button>
      </CodeBlockFooter>
    </CodeBlock>
  </Example>
</template>
