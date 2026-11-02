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
import { install, source } from "./data"
</script>

<template>
  <Example title="Header Edges">
    <div class="flex flex-col gap-4">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Title only</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          {{ 'console.log("title, no actions")' }}
        </CodeBlockContent>
      </CodeBlock>
      <CodeBlock>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="install" />
        </CodeBlockActions>
        <CodeBlockContent>{{ install }}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <IconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="CodeIcon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            />
            apps/web/app/pages/(dashboard)/settings/organizations/[organizationId]/members/invitations/index.vue
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="source" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>
          {{ 'definePageMeta({ layout: "dashboard" })' }}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </Example>
</template>
