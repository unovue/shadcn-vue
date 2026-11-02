<script setup lang="ts">
import { createReusableTemplate, promiseTimeout, tryOnScopeDispose } from "@vueuse/core"
import { computed, ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Bubble, BubbleContent } from "@/registry/bases/reka/ui/bubble"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Message, MessageContent } from "@/registry/bases/reka/ui/message"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/bases/reka/ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/reka/ui/trace"

interface ToolIO {
  getWeather: {
    input: { city: string }
    output: { location: string, temperature: number, condition: string }
  }
  searchWikipedia: {
    input: { query: string }
    output: { results: { title: string, url: string }[] }
  }
  fetchPage: {
    input: { url: string }
    output: { status: number, title: string, excerpt: string }
  }
  readFile: {
    input: { path: string }
    output: { path: string, content: string }
  }
  runCommand: {
    input: { command: string }
    output: { stdout: string }
  }
}

type ToolName = keyof ToolIO

type ToolState
  = | "input-available"
    | "approval-requested"
    | "approval-responded"
    | "output-available"
    | "output-error"
    | "output-denied"

type ToolPart = {
  [K in ToolName]: {
    type: `tool-${K}`
    toolCallId: string
    state: ToolState
    input: ToolIO[K]["input"]
    output?: ToolIO[K]["output"]
    errorText?: string
    approval?: { id: string, approved?: boolean }
  }
}[ToolName]

interface TextPart {
  type: "text"
  text: string
}

interface ReasoningPart {
  type: "reasoning"
  text: string
  state: "streaming" | "done"
}

interface SourcePart {
  type: "source-url"
  url: string
  title?: string
}

type ChatbotPart = TextPart | ReasoningPart | ToolPart | SourcePart

interface ChatbotMessage {
  id: string
  role: "user" | "assistant"
  parts: ChatbotPart[]
}

interface ApprovalResponse {
  id: string
  approved: boolean
}

type GlyphName
  = | "arrow-up-right"
    | "book"
    | "brain"
    | "chevron-right"
    | "file"
    | "globe"
    | "link"
    | "sun"
    | "terminal"

const README = `# Acme Chat

A chat app built with Nuxt and the AI SDK.

## Getting started

pnpm install
pnpm dev

## Chat route

server/api/chat.post.ts streams responses through the AI Gateway.
Set AI_GATEWAY_API_KEY in .env.`

// Simulated chat. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
const DELAY_MS = 20
const CANCELLED = Symbol("cancelled")
const approvalOutputs = new Map<string, unknown>()

let runId = 0

// Invalidate the running script on unmount so pending steps bail out.
tryOnScopeDispose(() => {
  runId++
})

async function sleep(ms: number, id: number) {
  await promiseTimeout(ms)
  if (id !== runId)
    throw CANCELLED
}

function createWriter(message: ChatbotMessage, id: number) {
  async function stream(part: TextPart | ReasoningPart, text: string) {
    for (const delta of text.match(/\S+\s*/g) ?? [text]) {
      await sleep(DELAY_MS, id)
      part.text += delta
    }
  }

  function addTool<K extends ToolName>(name: K, input: ToolIO[K]["input"]) {
    message.parts.push({
      type: `tool-${name}`,
      toolCallId: `call-${id}-${message.parts.length}`,
      state: "input-available",
      input,
    } as ToolPart)
    return message.parts.at(-1) as ToolPart
  }

  return {
    async reasoning(text: string) {
      message.parts.push({ type: "reasoning", text: "", state: "streaming" })
      const part = message.parts.at(-1) as ReasoningPart
      await stream(part, text)
      part.state = "done"
    },
    async text(text: string) {
      message.parts.push({ type: "text", text: "" })
      await stream(message.parts.at(-1) as TextPart, text)
    },
    async tool<K extends ToolName>(
      name: K,
      input: ToolIO[K]["input"],
      result:
        | { delayMs: number, output: ToolIO[K]["output"] }
        | { delayMs: number, error: string },
    ) {
      const part = addTool(name, input)
      await sleep(result.delayMs, id)
      if ("error" in result) {
        part.state = "output-error"
        part.errorText = result.error
      }
      else {
        part.state = "output-available"
        part.output = result.output as never
      }
    },
    // Pauses the turn until the user approves or denies the call.
    approval<K extends ToolName>(
      name: K,
      input: ToolIO[K]["input"],
      output: ToolIO[K]["output"],
    ) {
      const part = addTool(name, input)
      part.state = "approval-requested"
      part.approval = { id: `approval-${part.toolCallId}` }
      approvalOutputs.set(part.approval.id, output)
    },
    sourceUrl(source: { url: string, title?: string }) {
      message.parts.push({ type: "source-url", ...source })
    },
  }
}

type Writer = ReturnType<typeof createWriter>

const chatbot: {
  user: string
  sleep: number
  assistant: (writer: Writer) => Promise<void>
  continuation?: (writer: Writer, approved: boolean) => Promise<void>
}[] = [
  {
    user: "What's the weather in Lisbon and Tokyo?",
    sleep: 800,
    async assistant(writer) {
      await writer.reasoning(
        "The user wants the weather in two cities. I'll look both up at once, then compare them in a sentence.",
      )
      await writer.tool("getWeather", { city: "Lisbon" }, {
        delayMs: 1200,
        output: {
          location: "Lisbon, Portugal",
          temperature: 18,
          condition: "Mainly clear",
        },
      })
      await writer.tool("getWeather", { city: "Tokyo" }, {
        delayMs: 600,
        output: {
          location: "Tokyo, Japan",
          temperature: 26,
          condition: "Clear sky",
        },
      })
      await writer.text(
        "Lisbon is 18°C and mainly clear. Tokyo is warmer at 26°C under a clear sky.",
      )
    },
  },
  {
    user: "Search Wikipedia for the Voyager probes and summarise with sources.",
    sleep: 800,
    async assistant(writer) {
      await writer.reasoning(
        "Start with a Wikipedia search. The Voyager 1 article should say where the probe is now.",
      )
      await writer.tool("searchWikipedia", { query: "Voyager probes" }, {
        delayMs: 1000,
        output: {
          results: [
            {
              title: "Voyager program",
              url: "https://en.wikipedia.org/wiki/Voyager_program",
            },
            {
              title: "Voyager 1",
              url: "https://en.wikipedia.org/wiki/Voyager_1",
            },
            {
              title: "Voyager 2",
              url: "https://en.wikipedia.org/wiki/Voyager_2",
            },
          ],
        },
      })
      await writer.tool("fetchPage", { url: "https://en.wikipedia.org/wiki/Voyager_1" }, {
        delayMs: 900,
        output: {
          status: 200,
          title: "Voyager 1 - Wikipedia",
          excerpt:
            "Voyager 1 is a space probe launched by NASA on September 5, 1977. It is the most distant human-made object from Earth.",
        },
      })
      await writer.text(
        "NASA launched both Voyager probes in 1977 to study the outer planets. Both have since reached interstellar space, and Voyager 1 is the most distant human-made object from Earth.",
      )
      writer.sourceUrl({
        url: "https://en.wikipedia.org/wiki/Voyager_program",
        title: "Voyager program",
      })
      writer.sourceUrl({
        url: "https://en.wikipedia.org/wiki/Voyager_1",
        title: "Voyager 1",
      })
    },
  },
  {
    user: "Read the README and the changelog, then check the Node version.",
    sleep: 800,
    async assistant(writer) {
      await writer.reasoning(
        "Read both files first. Running a command needs the user's approval.",
      )
      await writer.tool("readFile", { path: "README.md" }, {
        delayMs: 700,
        output: { path: "README.md", content: README },
      })
      await writer.tool("readFile", { path: "CHANGELOG.md" }, {
        delayMs: 500,
        error: "ENOENT: no such file or directory, open 'CHANGELOG.md'",
      })
      writer.approval(
        "runCommand",
        { command: "node --version" },
        { stdout: "v24.18.0" },
      )
    },
    async continuation(writer, approved) {
      await writer.text(
        approved
          ? "The README covers setup and the chat route. There is no changelog. The project runs on Node v24.18.0."
          : "The README covers setup and the chat route. There is no changelog. I didn't run the command.",
      )
    },
  },
]

const [DefineGlyph, Glyph] = createReusableTemplate<{ name: GlyphName }>()
const [DefineActivityRow, ActivityRow] = createReusableTemplate<{
  status?: "running" | "error"
  icon: GlyphName
  title: string
}>()
const [DefineToolRow, ToolRow] = createReusableTemplate<{
  part: ToolPart
  isStreaming: boolean
}>()
const [DefineToolApproval, ToolApproval] = createReusableTemplate<{
  part: ToolPart
}>()
const [DefineLinkActivity, LinkActivity] = createReusableTemplate<{
  href: string
  title: string
}>()
const [DefineFileActivity, FileActivity] = createReusableTemplate<{
  path: string
  content: string
}>()
const [DefineToolInputOutput, ToolInputOutput] = createReusableTemplate<{
  input: unknown
  output: string
}>()

const messages = ref<ChatbotMessage[]>([])
const status = ref<"ready" | "submitted" | "streaming">("ready")
const open = ref<Record<string, boolean | undefined>>({})

const nextMessage = computed(() => {
  const sent = messages.value.filter(message => message.role === "user").length
  return chatbot[sent]?.user ?? null
})
const isBusy = computed(() => status.value === "submitted" || status.value === "streaming")
const lastMessage = computed(() => messages.value.at(-1))

async function sendMessage(text: string) {
  const turn = chatbot.find(turn => turn.user === text)
  if (!turn)
    return

  const id = ++runId
  messages.value.push({
    id: `user-${id}`,
    role: "user",
    parts: [{ type: "text", text }],
  })
  status.value = "submitted"

  try {
    await sleep(turn.sleep, id)
    messages.value.push({ id: `assistant-${id}`, role: "assistant", parts: [] })
    status.value = "streaming"
    await turn.assistant(createWriter(messages.value.at(-1)!, id))
    status.value = "ready"
  }
  catch (error) {
    if (error !== CANCELLED)
      throw error
  }
}

// Answering the last pending approval continues the paused turn.
async function addToolApprovalResponse(response: ApprovalResponse) {
  const message = messages.value.at(-1)
  const part = message?.parts.find(
    (part): part is ToolPart => "approval" in part && part.approval?.id === response.id,
  )
  const turn = chatbot[messages.value.filter(message => message.role === "user").length - 1]
  if (!message || !part?.approval || !turn?.continuation)
    return

  part.state = "approval-responded"
  part.approval.approved = response.approved

  const id = ++runId
  status.value = "streaming"

  if (response.approved) {
    part.state = "output-available"
    part.output = approvalOutputs.get(response.id) as never
  }
  else {
    part.state = "output-denied"
  }

  try {
    await turn.continuation(createWriter(message, id), response.approved)
    status.value = "ready"
  }
  catch (error) {
    if (error !== CANCELLED)
      throw error
  }
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

function getMessageText(message: ChatbotMessage) {
  return message.parts
    .map(part => (part.type === "text" ? part.text : ""))
    .join("")
}

function isToolPart(part: ChatbotPart): part is ToolPart {
  return part.type.startsWith("tool-")
}

// Each run of reasoning and tool parts becomes one group. A text part or a
// pending approval ends the run. Sources are shown once at the end.
function groupParts(parts: ChatbotPart[]) {
  const runs: (
    | { type: "text", key: string, text: string }
    | { type: "approval", key: string, part: ToolPart }
    | { type: "activity", key: string, parts: (ReasoningPart | ToolPart)[] }
  )[] = []
  const sources: SourcePart[] = []

  parts.forEach((part, index) => {
    const last = runs.at(-1)

    if (part.type === "source-url") {
      if (!sources.some(source => source.url === part.url))
        sources.push(part)
      return
    }

    if (part.type === "text") {
      if (last?.type === "text")
        last.text += part.text
      else if (part.text.trim())
        runs.push({ type: "text", key: `text-${index}`, text: part.text })
      return
    }

    if (isToolPart(part) && part.state === "approval-requested") {
      runs.push({ type: "approval", key: part.toolCallId, part })
      return
    }

    if (part.type === "reasoning" || isToolPart(part)) {
      if (last?.type === "activity")
        last.parts.push(part)
      else
        runs.push({ type: "activity", key: `activity-${index}`, parts: [part] })
    }
  })

  return { runs, sources }
}

function getToolMeta(part: ToolPart): {
  icon: GlyphName
  running: string
  done: string
  failed: string
  denied: string
} {
  switch (part.type) {
    case "tool-getWeather": {
      const city = part.input?.city
      return {
        icon: "sun",
        running: `Getting weather for ${city}`,
        done: `Got weather for ${city}`,
        failed: `Couldn't get weather for ${city}`,
        denied: `Denied: Getting weather for ${city}`,
      }
    }
    case "tool-searchWikipedia": {
      const query = part.input?.query
      return {
        icon: "book",
        running: `Searching Wikipedia for “${query}”`,
        done: `Searched Wikipedia for “${query}”`,
        failed: `Couldn't search Wikipedia for “${query}”`,
        denied: `Denied: Searching Wikipedia for “${query}”`,
      }
    }
    case "tool-fetchPage": {
      const url = part.input?.url?.replace(/^https?:\/\//, "")
      return {
        icon: "globe",
        running: `Fetching ${url}`,
        done: `Fetched ${url}`,
        failed: `Couldn't fetch ${url}`,
        denied: `Denied: Fetching ${url}`,
      }
    }
    case "tool-readFile": {
      const path = part.input?.path
      return {
        icon: "file",
        running: `Reading ${path}`,
        done: `Read ${path}`,
        failed: `Couldn't read ${path}`,
        denied: `Denied: Reading ${path}`,
      }
    }
    case "tool-runCommand": {
      const command = part.input?.command
      return {
        icon: "terminal",
        running: `Running ${command}`,
        done: `Ran ${command}`,
        failed: `Couldn't run ${command}`,
        denied: `Denied ${command}`,
      }
    }
  }
}
</script>

<template>
  <DefineGlyph v-slot="{ name }">
    <IconPlaceholder
      v-if="name === 'arrow-up-right'"
      lucide="ArrowUpRightIcon"
      tabler="IconArrowUpRight"
      hugeicons="ArrowUpRight01Icon"
      phosphor="ArrowUpRightIcon"
      remixicon="RiArrowRightUpLine"
    />
    <IconPlaceholder
      v-else-if="name === 'book'"
      lucide="BookOpenIcon"
      tabler="IconBook"
      hugeicons="BookOpen02Icon"
      phosphor="BookOpenIcon"
      remixicon="RiBookOpenLine"
    />
    <IconPlaceholder
      v-else-if="name === 'brain'"
      lucide="BrainIcon"
      tabler="IconBrain"
      hugeicons="AiBrainIcon"
      phosphor="BrainIcon"
      remixicon="RiBrainLine"
    />
    <IconPlaceholder
      v-else-if="name === 'chevron-right'"
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
    />
    <IconPlaceholder
      v-else-if="name === 'file'"
      lucide="FileTextIcon"
      tabler="IconFileText"
      hugeicons="File02Icon"
      phosphor="FileTextIcon"
      remixicon="RiFileTextLine"
    />
    <IconPlaceholder
      v-else-if="name === 'globe'"
      lucide="GlobeIcon"
      tabler="IconGlobe"
      hugeicons="Globe02Icon"
      phosphor="GlobeIcon"
      remixicon="RiGlobeLine"
    />
    <IconPlaceholder
      v-else-if="name === 'link'"
      lucide="LinkIcon"
      tabler="IconLink"
      hugeicons="LinkIcon"
      phosphor="LinkIcon"
      remixicon="RiLinksLine"
    />
    <IconPlaceholder
      v-else-if="name === 'sun'"
      lucide="SunIcon"
      tabler="IconSun"
      hugeicons="Sun03Icon"
      phosphor="SunIcon"
      remixicon="RiSunLine"
    />
    <IconPlaceholder
      v-else-if="name === 'terminal'"
      lucide="TerminalIcon"
      tabler="IconTerminal"
      hugeicons="ComputerTerminal01Icon"
      phosphor="TerminalIcon"
      remixicon="RiTerminalBoxLine"
    />
  </DefineGlyph>

  <!-- Static when there is nothing to show, expandable otherwise. -->
  <DefineActivityRow v-slot="{ status: rowStatus, icon, title, $slots }">
    <TraceLine v-if="!$slots.default" :status="rowStatus">
      <TraceIcon>
        <Glyph :name="icon" />
      </TraceIcon>
      <TraceTitle>{{ title }}</TraceTitle>
    </TraceLine>
    <TraceCollapsible v-else>
      <TraceCollapsibleTrigger>
        <TraceLine :status="rowStatus">
          <TraceIcon>
            <Glyph :name="icon" />
          </TraceIcon>
          <TraceTitle>{{ title }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <component :is="$slots.default" />
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </DefineActivityRow>

  <DefineLinkActivity v-slot="{ href, title }">
    <a :href="href" target="_blank" rel="noreferrer">
      <TraceLine>
        <TraceIcon>
          <Glyph name="globe" />
        </TraceIcon>
        <TraceTitle>
          {{ title }}
          <span class="sr-only"> (opens in a new tab)</span>
        </TraceTitle>
        <TraceIcon>
          <Glyph name="arrow-up-right" />
        </TraceIcon>
      </TraceLine>
    </a>
  </DefineLinkActivity>

  <DefineFileActivity v-slot="{ path, content }">
    <Sheet>
      <SheetTrigger as-child>
        <button type="button">
          <TraceLine>
            <TraceIcon>
              <Glyph name="file" />
            </TraceIcon>
            <TraceTitle>Read {{ path }}</TraceTitle>
            <TraceIcon>
              <Glyph name="chevron-right" />
            </TraceIcon>
          </TraceLine>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle class="font-mono">
            {{ path }}
          </SheetTitle>
          <SheetDescription>
            {{ content.split("\n").length }} lines
          </SheetDescription>
        </SheetHeader>
        <CodeBlock class="mx-4 mb-4 min-h-0 w-auto flex-1">
          <CodeBlockContent wrap>
            {{ content }}
          </CodeBlockContent>
        </CodeBlock>
      </SheetContent>
    </Sheet>
  </DefineFileActivity>

  <DefineToolInputOutput v-slot="{ input, output }">
    <div class="flex flex-col gap-2">
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>Input</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent wrap class="max-h-64">
          {{ JSON.stringify(input) }}
        </CodeBlockContent>
      </CodeBlock>
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>Output</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent wrap class="max-h-64">
          {{ output }}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </DefineToolInputOutput>

  <!-- Maps a tool part's state to a row. The finished row expands to show the result. -->
  <DefineToolRow v-slot="{ part, isStreaming }">
    <template v-for="(meta, metaIndex) in [getToolMeta(part)]" :key="metaIndex">
      <ActivityRow
        v-if="part.state === 'input-available' || (part.state === 'approval-responded' && part.approval?.approved)"
        :status="isStreaming ? 'running' : undefined"
        :icon="meta.icon"
        :title="meta.running"
      />
      <ActivityRow
        v-else-if="part.state === 'approval-responded' || part.state === 'output-denied'"
        :icon="meta.icon"
        :title="meta.denied"
      />
      <ActivityRow
        v-else-if="part.state === 'output-error'"
        status="error"
        :icon="meta.icon"
        :title="meta.failed"
      >
        <CodeBlock size="sm" variant="destructive">
          <CodeBlockContent wrap class="max-h-64">
            {{ part.errorText }}
          </CodeBlockContent>
        </CodeBlock>
      </ActivityRow>
      <ActivityRow
        v-else-if="part.state === 'output-available'"
        :icon="meta.icon"
        :title="meta.done"
      >
        <ToolInputOutput
          v-if="part.type === 'tool-getWeather' && part.output"
          :input="part.input"
          :output="`${part.output.location}\n${part.output.temperature}°C, ${part.output.condition}`"
        />
        <Trace v-else-if="part.type === 'tool-searchWikipedia' && part.output">
          <LinkActivity
            v-for="result in part.output.results"
            :key="result.url"
            :href="result.url"
            :title="result.title"
          />
        </Trace>
        <ToolInputOutput
          v-else-if="part.type === 'tool-fetchPage' && part.output"
          :input="part.input"
          :output="`HTTP ${part.output.status} · ${part.output.title}\n\n${part.output.excerpt}`"
        />
        <CodeBlock v-else-if="part.type === 'tool-runCommand' && part.output" size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ part.output.stdout }}
          </CodeBlockContent>
        </CodeBlock>
      </ActivityRow>
    </template>
  </DefineToolRow>

  <!-- A pending approval is a prompt, not activity, so it is an Item. Once
  answered, the tool part renders as a Trace row again. -->
  <DefineToolApproval v-slot="{ part }">
    <Item
      v-if="part.state === 'approval-requested' && part.type === 'tool-runCommand' && part.approval"
      variant="outline"
      size="sm"
    >
      <ItemMedia variant="icon">
        <Glyph name="terminal" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Run {{ part.input.command }}?</ItemTitle>
        <ItemDescription>The command runs in this project.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          @click="addToolApprovalResponse({ id: part.approval.id, approved: false })"
        >
          Deny
        </Button>
        <Button
          size="sm"
          @click="addToolApprovalResponse({ id: part.approval.id, approved: true })"
        >
          Approve
        </Button>
      </ItemActions>
    </Item>
  </DefineToolApproval>

  <Example title="Chat" container-class-name="md:col-span-2">
    <div class="flex min-h-96 w-full max-w-xl flex-col gap-6 text-sm">
      <template v-for="message in messages" :key="message.id">
        <Message v-if="message.role === 'user'" align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>{{ getMessageText(message) }}</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message v-else align="start">
          <template
            v-for="({ runs, sources }, groupIndex) in [groupParts(message.parts)]"
            :key="groupIndex"
          >
            <MessageContent class="gap-3">
              <template v-for="run in runs" :key="run.key">
                <p v-if="run.type === 'text'" class="leading-relaxed">
                  {{ run.text }}
                </p>
                <ToolApproval v-else-if="run.type === 'approval'" :part="run.part" />
                <Trace v-else>
                  <template
                    v-for="(part, index) in run.parts"
                    :key="part.type === 'reasoning' ? `reasoning-${index}` : part.toolCallId"
                  >
                    <template v-if="part.type === 'reasoning'">
                      <template
                        v-for="(running, runningIndex) in [isBusy && message.id === lastMessage?.id && part.state === 'streaming']"
                        :key="runningIndex"
                      >
                        <ActivityRow
                          v-if="!part.text.trim()"
                          :status="running ? 'running' : undefined"
                          icon="brain"
                          :title="running ? 'Thinking' : 'Thought'"
                        />
                        <TraceCollapsible
                          v-else
                          :open="open[`${message.id}-${run.key}-${index}`] ?? running"
                          @update:open="open[`${message.id}-${run.key}-${index}`] = $event"
                        >
                          <TraceCollapsibleTrigger>
                            <TraceLine :status="running ? 'running' : undefined">
                              <TraceIcon>
                                <Glyph name="brain" />
                              </TraceIcon>
                              <TraceTitle>{{ running ? "Thinking" : "Thought" }}</TraceTitle>
                            </TraceLine>
                          </TraceCollapsibleTrigger>
                          <TraceCollapsibleContent class="whitespace-pre-wrap">
                            {{ part.text.trim() }}
                          </TraceCollapsibleContent>
                        </TraceCollapsible>
                      </template>
                    </template>
                    <FileActivity
                      v-else-if="part.type === 'tool-readFile' && part.state === 'output-available' && part.output"
                      :path="part.output.path"
                      :content="part.output.content"
                    />
                    <ToolRow
                      v-else
                      :part="part"
                      :is-streaming="isBusy && message.id === lastMessage?.id"
                    />
                  </template>
                </Trace>
              </template>
              <Trace v-if="!(isBusy && message.id === lastMessage?.id) && sources.length > 0">
                <ActivityRow icon="link" :title="`Used ${sources.length} sources`">
                  <Trace>
                    <LinkActivity
                      v-for="source in sources"
                      :key="source.url"
                      :href="source.url"
                      :title="source.title ?? source.url"
                    />
                  </Trace>
                </ActivityRow>
              </Trace>
            </MessageContent>
          </template>
        </Message>
      </template>
      <Trace v-if="status === 'submitted'">
        <ActivityRow status="running" icon="brain" title="Thinking" />
      </Trace>
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
  </Example>
</template>
