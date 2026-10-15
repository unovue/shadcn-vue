<script setup lang="ts">
import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@lucide/vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
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
} from '@/registry/bases/reka/ui/code-block'
import {
  Message,
  MessageContent,
  MessageFooter,
} from '@/registry/bases/reka/ui/message'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/bases/reka/ui/tooltip'

const command = 'npx shadcn-vue@latest add dialog'

const reply = `Install Dialog, then open it from the gear button in \`SiteHeader.vue\`.

\`\`\`bash
${command}
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`

const lines = useHighlightedCode(command, 'bash')

const copied = ref(false)
const feedback = ref<'like' | 'dislike' | null>(null)
let timeout: ReturnType<typeof setTimeout> | undefined

watch(copied, (value) => {
  clearTimeout(timeout)
  if (value)
    timeout = setTimeout(() => (copied.value = false), 2000)
})

onBeforeUnmount(() => clearTimeout(timeout))

function copy() {
  navigator.clipboard.writeText(reply)
  copied.value = true
}

function toggleFeedback(value: 'like' | 'dislike') {
  feedback.value = feedback.value === value ? null : value
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
    <Message align="end">
      <MessageContent class="gap-2">
        <Bubble align="end" variant="muted">
          <BubbleContent>
            How do I add a settings dialog? It should open from the gear icon
            in the header.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon-sm" aria-label="Copy">
                <CopyIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon-sm" aria-label="Edit">
                <PencilIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent class="gap-2">
        <div class="flex flex-col gap-3">
          <p>
            Install Dialog, then open it from the gear button in
            <code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]">SiteHeader.vue</code>.
          </p>
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>bash</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton :value="command" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent line-numbers>
              <CodeBlockLine v-for="(line, index) in lines" :key="index">
                <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
              </CodeBlockLine>
            </CodeBlockContent>
          </CodeBlock>
          <p>
            Wrap the button in a
            <code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]">DialogTrigger</code>
            and put the settings form in
            <code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]">DialogContent</code>.
            Focus moves into the dialog when it opens, and
            <strong class="font-semibold">Esc</strong> closes it.
          </p>
        </div>
        <MessageFooter class="px-0">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon-sm"
                :aria-label="copied ? 'Copied' : 'Copy'"
                @click="copy"
              >
                <CheckIcon v-if="copied" />
                <CopyIcon v-else />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ copied ? 'Copied' : 'Copy' }}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Good response"
                :aria-pressed="feedback === 'like'"
                @click="toggleFeedback('like')"
              >
                <ThumbsUpIcon :class="feedback === 'like' ? 'fill-current' : undefined" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Good response</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Bad response"
                :aria-pressed="feedback === 'dislike'"
                @click="toggleFeedback('dislike')"
              >
                <ThumbsDownIcon :class="feedback === 'dislike' ? 'fill-current' : undefined" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bad response</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon-sm" aria-label="Retry">
                <RefreshCcwIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Retry</p>
            </TooltipContent>
          </Tooltip>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
