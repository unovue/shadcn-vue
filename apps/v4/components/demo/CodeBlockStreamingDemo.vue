<script setup lang="ts">
import { RotateCcwIcon } from '@lucide/vue'
import { useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'
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

const blocks: {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}[] = [
  {
    title: 'composables/useDebounce.ts',
    language: 'ts',
    lineNumbers: true,
    code: `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value)

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay)
    onCleanup(() => clearTimeout(timeout))
  })

  return debounced
}`,
  },
  {
    language: 'bash',
    code: 'pnpm dlx shadcn-vue@latest add code-block',
  },
  {
    title: 'components/Search.vue',
    language: 'vue',
    lineNumbers: true,
    diff: true,
    code: ` <script setup lang="ts">
 const query = ref("")
-const results = useSearch(query)
+const debounced = useDebounce(query, 300)
+const results = useSearch(debounced)
 <\/script>

 <template>
   <SearchResults :results="results" />
 </template>`,
  },
  {
    title: 'server/api/chat.post.ts',
    language: 'ts',
    lineNumbers: true,
    highlight: [5, 6, 7, 8],
    code: `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`,
  },
  {
    title: '.env',
    language: 'bash',
    code: 'AI_GATEWAY_API_KEY=your-api-key',
  },
]

// Where each block starts in the stream.
const offsets = blocks.map((_, index) =>
  blocks.slice(0, index).reduce((total, block) => total + block.code.length, 0),
)
const total = blocks.reduce((sum, block) => sum + block.code.length, 0)

const length = ref(total)

const streamed = blocks.map((block, index) => {
  const code = computed(() => block.code.slice(0, Math.max(0, length.value - offsets[index]!)))
  const rows = computed(() => code.value.split('\n'))
  // A diff row starts with +, - or a space. The marker is not part of the code.
  const source = computed(() =>
    block.diff ? rows.value.map(row => row.slice(1)).join('\n') : code.value,
  )
  const lines = useHighlightedCode(source, block.language)

  return { block, code, rows, source, lines }
})

function getVariant(item: (typeof streamed)[number], index: number) {
  if (item.block.diff) {
    const row = item.rows.value[index]
    if (row?.startsWith('+'))
      return 'added'
    if (row?.startsWith('-'))
      return 'removed'
    return 'default'
  }

  return item.block.highlight?.includes(index) ? 'highlighted' : 'default'
}

const { pause, resume } = useIntervalFn(() => {
  length.value += 3
  if (length.value >= total)
    pause()
}, 16, { immediate: false })

function replay() {
  length.value = 0
  resume()
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <template v-for="(item, index) in streamed" :key="item.block.code">
      <CodeBlock v-if="length > offsets[index]!">
        <CodeBlockHeader v-if="item.block.title">
          <CodeBlockTitle>{{ item.block.title }}</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton
              :value="item.source.value"
              :disabled="item.code.value.length < item.block.code.length"
            />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent :line-numbers="item.block.lineNumbers">
          <CodeBlockLine
            v-for="(line, i) in item.lines.value"
            :key="i"
            :variant="getVariant(item, i)"
          >
            <CodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </template>
    <Button
      variant="outline"
      size="sm"
      class="self-start"
      :disabled="length < total"
      @click="replay"
    >
      <RotateCcwIcon />
      Replay
    </Button>
  </div>
</template>
