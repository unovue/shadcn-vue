import type { InjectionKey, Ref } from "vue"
import type { CodeBlockLineVariants } from "@/registry/bases/reka/ui/code-block"
import { useIntervalFn } from "@vueuse/core"
import { ref } from "vue"

export type LineVariant = NonNullable<CodeBlockLineVariants["variant"]>

export const build = `$ pnpm build
> nuxt build

 ✔ Client built in 4215ms
 ✔ Server built in 1803ms

Route                      Size  Gzip
┌ ○ /                    1.9 kB  0.9 kB
├ ○ /about               993 B   0.5 kB
└ ƒ /api/chat            141 B   0.1 kB`

export const install = `$ pnpm add ai @ai-sdk/vue zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/vue 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`

export const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at setup (components/MessageList.vue:18:22)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7934:25)`

export const source = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`

export const chat = `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"
import type { InjectionKey, Ref } from "vue"
import { ref } from "vue"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const input = ref("")
const chat = new Chat({})

function onSubmit() {
  chat.sendMessage({ text: input.value })
  input.value = ""
}
<\/script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <Input v-model="input" placeholder="Ask anything" />
      <Button :disabled="chat.status !== 'ready'">
        Send
      </Button>
    </form>
  </div>
</template>`

export const diff: { variant: LineVariant, text: string }[] = [
  { variant: "default", text: "<template>" },
  { variant: "removed", text: "  <p>Hello, {{ name }}</p>" },
  { variant: "added", text: "  <p class=\"text-sm\">Hello, {{ name }}!</p>" },
  { variant: "default", text: "</template>" },
]

export const log = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`,
).join("\n")

export const middle = `  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return projects
})`

export const longDiff: { variant: LineVariant, text: string }[] = [
  { variant: "default", text: "export default defineEventHandler(async (event) => {" },
  {
    variant: "removed",
    text: "  const { searchParams } = new URL(event.path, \"http://localhost:3000/api/projects?include=owner,members\")",
  },
  {
    variant: "added",
    text: "  const { searchParams } = new URL(event.path, process.env.NUXT_PUBLIC_APP_URL ?? getRequestHeader(event, \"origin\") ?? undefined)",
  },
  {
    variant: "added",
    text: "  const include = searchParams.get(\"include\")?.split(\",\") ?? []",
  },
  {
    variant: "default",
    text: "  return await getProjects({ include })",
  },
  { variant: "default", text: "})" },
]

export const samples = [
  {
    language: "json",
    title: "package.json",
    code: `{
  "name": "acme-chat",
  "scripts": { "dev": "nuxt dev" },
  "dependencies": { "ai": "^6.0.12", "zod": "^4.1.12" }
}`,
  },
  {
    language: "css",
    title: "assets/css/main.css",
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
  },
  {
    language: "python",
    title: "main.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  },
  {
    language: "text",
    title: "notes.txt",
    code: "An unknown language renders as plain lines.",
  },
]

export const ansi = `$ pnpm test
\x1B[32m✓\x1B[39m src/format.test.ts \x1B[2m(4 tests)\x1B[22m
\x1B[31m✗\x1B[39m src/stream.test.ts \x1B[2m(3 tests | 1 failed)\x1B[22m

Tests  \x1B[31m1 failed\x1B[39m | \x1B[32m6 passed\x1B[39m (7)`

export const answer = `Wrap the input in a \`useDebounce\` composable:

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

Then install it:

\`\`\`bash
pnpm dlx shadcn-vue@latest add use-debounce
\`\`\``

export const files = [
  { id: "route", title: "server/api/chat.post.ts", language: "ts", code: source },
  { id: "chat", title: "components/Chat.vue", language: "vue", code: chat },
  {
    id: "env",
    title: ".env",
    language: "bash",
    code: "AI_GATEWAY_API_KEY=your-api-key",
  },
]

export interface StreamedBlock {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}

export const streamed: StreamedBlock[] = [
  {
    title: "server/api/chat.post.ts",
    language: "ts",
    lineNumbers: true,
    highlight: [5, 6, 7, 8],
    code: source,
  },
  { language: "bash", code: "pnpm dlx shadcn-vue@latest add code-block" },
  {
    title: "components/Search.vue",
    language: "vue",
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
]

export const offsets = streamed.map((_, index) =>
  streamed
    .slice(0, index)
    .reduce((total, block) => total + block.code.length, 0),
)

export const streamedLength = streamed.reduce(
  (sum, block) => sum + block.code.length,
  0,
)

export function useStream(length: number) {
  const position = ref(length)

  const { pause, resume } = useIntervalFn(() => {
    position.value = Math.min(position.value + 3, length)
    if (position.value >= length)
      pause()
  }, 16, { immediate: false })

  function replay() {
    position.value = 0
    resume()
  }

  return [position, replay] as const
}

export function download(code: string, filename: string) {
  const url = URL.createObjectURL(new Blob([code], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const markdownStreamKey: InjectionKey<{
  text: Ref<string>
  streaming: Ref<boolean>
}> = Symbol("markdown-stream")
