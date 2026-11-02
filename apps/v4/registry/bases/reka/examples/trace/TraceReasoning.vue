<script setup lang="ts">
import { createReusableTemplate, promiseTimeout, tryOnScopeDispose } from "@vueuse/core"
import { computed, ref } from "vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/reka/ui/trace"

interface Part {
  type: "reasoning" | "text"
  text: string
  state: "streaming" | "done"
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  parts: Part[]
}

const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`

const QUESTION = "Why is the checkout deploy so slow?"
const ANSWER = "Image optimization is the bottleneck. It reruns on every deploy because the cache key includes the commit hash. Key it on the lockfile and the image directory instead."

const [DefineThinkingTrace, ThinkingTrace] = createReusableTemplate<{
  id: string
  text: string
  running: boolean
}>()

const messages = ref<ChatMessage[]>([])
const status = ref<"ready" | "streaming">("ready")
const open = ref<Record<string, boolean | undefined>>({})

const isBusy = computed(() => status.value === "streaming")
const nextMessage = computed(() => (messages.value.length === 0 ? QUESTION : null))

// Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
let runId = 0

// Invalidate the running script on unmount so pending steps bail out.
tryOnScopeDispose(() => {
  runId++
})

async function stream(part: Part, text: string, delayMs: number, id: number) {
  for (const delta of text.match(/\S+\s*/g) ?? [text]) {
    await promiseTimeout(delayMs)
    if (id !== runId)
      return false
    part.text += delta
  }
  part.state = "done"
  return true
}

async function sendMessage(text: string) {
  const id = ++runId
  messages.value.push({
    id: `user-${id}`,
    role: "user",
    parts: [{ type: "text", text, state: "done" }],
  })
  messages.value.push({ id: `assistant-${id}`, role: "assistant", parts: [] })
  const message = messages.value.at(-1)!
  status.value = "streaming"

  message.parts.push({ type: "reasoning", text: "", state: "streaming" })
  if (!await stream(message.parts.at(-1)!, REASONING, 60, id))
    return
  await promiseTimeout(400)
  if (id !== runId)
    return
  message.parts.push({ type: "text", text: "", state: "streaming" })
  if (!await stream(message.parts.at(-1)!, ANSWER, 20, id))
    return

  status.value = "ready"
}

function handleClick() {
  if (nextMessage.value) {
    void sendMessage(nextMessage.value)
    return
  }

  runId++
  messages.value = []
  open.value = {}
  status.value = "ready"
}

function groupParts(parts: Part[]) {
  const runs: { trace: boolean, parts: Part[] }[] = []

  for (const part of parts) {
    const trace = part.type === "reasoning"

    if (!trace && part.type !== "text")
      continue

    const last = runs.at(-1)

    if (last?.trace === trace)
      last.parts.push(part)
    else
      runs.push({ trace, parts: [part] })
  }

  return runs
}

function isLive(message: ChatMessage) {
  return status.value === "streaming" && message === messages.value.at(-1)
}
</script>

<template>
  <DefineThinkingTrace v-slot="{ id, text, running }">
    <TraceCollapsible
      :open="open[id] ?? (running && text.length > 0)"
      @update:open="open[id] = $event"
    >
      <TraceCollapsibleTrigger>
        <TraceLine :status="running ? 'running' : undefined">
          <TraceTitle>{{ running ? "Thinking" : "Thought" }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </DefineThinkingTrace>
  <Example title="Reasoning">
    <div class="flex w-full max-w-md flex-col gap-8">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Thought for 12 seconds</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="whitespace-pre-wrap">
          {{ REASONING }}
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <div class="flex min-h-80 flex-col gap-4 border-t pt-8">
        <template v-for="message in messages" :key="message.id">
          <template v-for="(run, runIndex) in groupParts(message.parts)" :key="runIndex">
            <Trace v-if="run.trace">
              <template v-for="(part, index) in run.parts" :key="index">
                <ThinkingTrace
                  v-if="part.type === 'reasoning'"
                  :id="`${message.id}-${runIndex}-${index}`"
                  :text="part.text"
                  :running="isLive(message) && part.state === 'streaming'"
                />
              </template>
            </Trace>
            <template v-else>
              <template v-for="(part, index) in run.parts" :key="`${runIndex}-${index}`">
                <p
                  v-if="part.type === 'text'"
                  :class="message.role === 'user' ? 'text-sm font-medium' : 'text-sm leading-relaxed'"
                >
                  {{ part.text }}
                </p>
              </template>
            </template>
          </template>
        </template>
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          :disabled="isBusy"
          @click="handleClick"
        >
          {{ nextMessage ? "Send message" : "Reset" }}
        </Button>
      </div>
    </div>
  </Example>
</template>
