<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/bases/reka/ui/tabs"
import { files } from "./data"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="Tabs">
    <Tabs default-value="route">
      <TabsList>
        <TabsTrigger v-for="file in files" :key="file.id" :value="file.id">
          {{ file.title.split("/").at(-1) }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-for="file in files" :key="file.id" :value="file.id">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>{{ file.title }}</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton :value="file.code" />
            </CodeBlockActions>
          </CodeBlockHeader>
          <Highlighted
            :code="file.code"
            :language="file.language"
            line-numbers
          />
        </CodeBlock>
      </TabsContent>
    </Tabs>
  </Example>
</template>
