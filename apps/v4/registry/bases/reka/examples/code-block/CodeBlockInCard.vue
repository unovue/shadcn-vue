<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/reka/ui/dialog"
import { source } from "./data"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="Card and Dialog">
    <div class="flex flex-col items-start gap-4">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Install the AI SDK</CardTitle>
          <CardDescription>Add the packages to your project.</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>Terminal</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value="pnpm add ai @ai-sdk/vue zod" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <Highlighted
              code="pnpm add ai @ai-sdk/vue zod"
              language="bash"
            />
          </CodeBlock>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            View route
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>server/api/chat.post.ts</DialogTitle>
            <DialogDescription>
              The route that streams the answer.
            </DialogDescription>
          </DialogHeader>
          <CodeBlock>
            <Highlighted :code="source" language="ts" line-numbers />
          </CodeBlock>
        </DialogContent>
      </Dialog>
    </div>
  </Example>
</template>
