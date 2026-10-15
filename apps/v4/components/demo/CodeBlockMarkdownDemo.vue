<script setup lang="ts">
import type { ElementNode } from '@comark/vue'
import type { FunctionalComponent, PropType } from 'vue'
import { Markdown } from '@comark/vue'
import { useIntervalFn } from '@vueuse/core'
import { computed, defineComponent, h, ref } from 'vue'
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

const transcript: ChatMessage[] = [
  { id: 'question', role: 'user', text: question },
  { id: 'answer', role: 'assistant', text: response },
]

const messages = ref<ChatMessage[]>(transcript)

// Stream the answer a word at a time.
const chunks = response.split(/(?<=\s)/)
let index = 0

const { pause, resume, isActive: busy } = useIntervalFn(() => {
  if (index >= chunks.length) {
    pause()
    return
  }

  messages.value = [
    messages.value[0]!,
    { id: 'answer', role: 'assistant', text: chunks.slice(0, ++index).join('') },
  ]
}, 30, { immediate: false })

function replay() {
  index = 0
  messages.value = [{ id: 'question', role: 'user', text: question }]
  resume()
}

// Comark closes an unfinished fence while streaming. The trailing fence is
// still open when an odd number of lines start with ```.
const openFence = computed(() => {
  const message = messages.value.at(-1)
  if (!busy.value || message?.role !== 'assistant')
    return null

  const lines = message.text.trim().split('\n')
  const fences = lines.flatMap((line, i) => (line.startsWith('```') ? [i] : []))

  return fences.length % 2 ? lines.slice(fences.at(-1)! + 1).join('\n') : null
})

const MarkdownCodeBlock = defineComponent({
  props: {
    language: { type: String, default: '' },
    // The raw `pre` node: ['pre', props, ['code', props, text]].
    // eslint-disable-next-line vue/prop-name-casing
    __node: { type: Array as unknown as PropType<ElementNode>, default: undefined },
  },
  setup(props) {
    const code = computed(() => {
      const child = props.__node?.[2]
      return Array.isArray(child) && typeof child[2] === 'string' ? child[2] : ''
    })
    // True while the closing fence has not arrived yet.
    const incomplete = computed(() => openFence.value?.trimEnd() === code.value.trimEnd())
    const lines = useHighlightedCode(code, () => props.language)

    return () =>
      h(CodeBlock, null, () => [
        h(CodeBlockHeader, null, () => [
          h(CodeBlockTitle, null, () => props.language || 'text'),
          h(CodeBlockActions, null, () =>
            h(CodeBlockCopyButton, { value: code.value, disabled: incomplete.value })),
        ]),
        h(CodeBlockContent, null, () =>
          lines.value.map((line, index) =>
            h(CodeBlockLine, { key: index }, () =>
              line.map((token, i) => h(CodeBlockToken, { key: i, token }))))),
      ])
  },
})

// Comark does not run components inside `pre`, so this is inline code only.
const MarkdownCode: FunctionalComponent = (_, { slots }) =>
  h('code', { class: 'rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]' }, slots.default?.())

const components = { pre: MarkdownCodeBlock, code: MarkdownCode }
</script>

<template>
  <div class="flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <Message v-if="message.role === 'user'" align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ message.text }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message v-else>
        <MessageContent>
          <Markdown
            class="typeset"
            :value="message.text"
            :components="components"
            :streaming="busy && message === messages.at(-1)"
          />
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
