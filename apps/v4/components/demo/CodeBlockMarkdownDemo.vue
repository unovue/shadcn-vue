<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, ref } from 'vue'
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
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'

const question = 'How do I debounce a search input in Vue?'

const response = `Wrap the value in a \`useDebounce\` composable. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`ts
export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value)

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay)
    onCleanup(() => clearTimeout(timeout))
  })

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

type Segment
  = | { type: 'text', text: string }
    | { type: 'code', code: string, language: string, complete: boolean }

// Splits markdown into paragraphs and fenced code blocks. A fence without a
// closing line is still streaming, so it is marked as incomplete.
function parseMarkdown(text: string) {
  const segments: Segment[] = []
  const rows = text.split('\n')
  let paragraph: string[] = []

  function flush() {
    const value = paragraph.join('\n').trim()
    if (value)
      segments.push({ type: 'text', text: value })
    paragraph = []
  }

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index] ?? ''
    const fence = /^```(\S*)/.exec(row)

    if (!fence) {
      if (row.trim())
        paragraph.push(row)
      else
        flush()
      continue
    }

    flush()
    const code: string[] = []
    let complete = false

    while (++index < rows.length) {
      const line = rows[index] ?? ''
      if (line.startsWith('```')) {
        complete = true
        break
      }
      code.push(line)
    }

    segments.push({ type: 'code', code: code.join('\n'), language: fence[1] ?? '', complete })
  }

  flush()
  return segments
}

// Splits a paragraph on inline code. Odd parts are code.
function parseInline(text: string) {
  return text.split(/`([^`]+)`/)
}

const MarkdownCodeBlock = defineComponent({
  props: {
    code: { type: String, required: true },
    language: { type: String, default: '' },
    incomplete: { type: Boolean, default: false },
  },
  setup(props) {
    const lines = useHighlightedCode(() => props.code, () => props.language)

    return () =>
      h(CodeBlock, null, () => [
        h(CodeBlockHeader, null, () => [
          h(CodeBlockTitle, null, () => props.language || 'text'),
          h(CodeBlockActions, null, () =>
            // Disabled while the closing fence has not arrived yet.
            h(CodeBlockCopyButton, { value: props.code, disabled: props.incomplete })),
        ]),
        h(CodeBlockContent, null, () =>
          lines.value.map((line, index) =>
            h(CodeBlockLine, { key: index }, () =>
              line.map((token, i) => h(CodeBlockToken, { key: i, token }))))),
      ])
  },
})

const transcript: ChatMessage[] = [
  { id: 'question', role: 'user', text: question },
  { id: 'answer', role: 'assistant', text: response },
]

const messages = ref<ChatMessage[]>(transcript)
const busy = ref(false)

const rendered = computed(() =>
  messages.value.map(message => ({
    ...message,
    segments: message.role === 'assistant' ? parseMarkdown(message.text) : [],
  })),
)

let timeout: ReturnType<typeof setTimeout> | undefined

function replay() {
  clearTimeout(timeout)
  busy.value = true
  messages.value = [{ id: 'question', role: 'user', text: question }]

  // Stream the answer a word at a time.
  const chunks = response.split(/(?<=\s)/)
  let index = 0

  function next() {
    if (index >= chunks.length) {
      busy.value = false
      return
    }

    const text = chunks.slice(0, ++index).join('')
    messages.value = [
      messages.value[0]!,
      { id: 'answer', role: 'assistant', text },
    ]
    timeout = setTimeout(next, 30)
  }

  timeout = setTimeout(next, 30)
}

onBeforeUnmount(() => clearTimeout(timeout))
</script>

<template>
  <div class="flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
    <template v-for="message in rendered" :key="message.id">
      <Message v-if="message.role === 'user'" align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ message.text }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message v-else>
        <MessageContent>
          <template v-for="(segment, index) in message.segments" :key="index">
            <MarkdownCodeBlock
              v-if="segment.type === 'code'"
              :code="segment.code"
              :language="segment.language"
              :incomplete="busy && !segment.complete"
            />
            <p v-else>
              <template v-for="(part, i) in parseInline(segment.text)" :key="i">
                <code
                  v-if="i % 2"
                  class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]"
                >{{ part }}</code>
                <template v-else>
                  {{ part }}
                </template>
              </template>
            </p>
          </template>
        </MessageContent>
      </Message>
    </template>
    <Button
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="replay"
    >
      Replay
    </Button>
  </div>
</template>
