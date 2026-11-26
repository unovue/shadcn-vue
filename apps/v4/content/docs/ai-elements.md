---
title: AI Elements
description: Patterns for agentic interfaces, built from shadcn-vue components.
---

AI Elements are patterns for building agentic interfaces. Each one is a composition of shadcn-vue components that you copy into your project. There is no package to install. The code is yours.

A [Chat](/docs/ai-elements/reka/chat) is a list of [Message](/docs/ai-elements/reka/message) turns inside a [Message Scroller](/docs/components/reka/message-scroller). The steps an agent takes inside a turn, like [Reasoning](/docs/ai-elements/reka/reasoning), [Tool](/docs/ai-elements/reka/tool) and [Plan](/docs/ai-elements/reka/plan), are built on [Trace](/docs/components/reka/trace), so every step has the same shape.

**Coming from [ai-elements-vue.com](https://www.ai-elements-vue.com)?** See [Migrating from AI Elements Vue](#migrating-from-ai-elements-vue).

## Patterns

<div class="mt-6 grid gap-4 sm:grid-cols-2">
  <linked-card href="/docs/ai-elements/reka/chain-of-thought" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Chain of Thought</div>
    <div class="leading-relaxed text-muted-foreground">A summary that expands into the steps an agent took.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/chat" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Chat</div>
    <div class="leading-relaxed text-muted-foreground">The thread. Message Scroller keeps your place while the reply streams.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/checkpoint" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Checkpoint</div>
    <div class="leading-relaxed text-muted-foreground">A point in the conversation you can return to.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/confirmation" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Confirmation</div>
    <div class="leading-relaxed text-muted-foreground">A prompt to approve or deny a tool before it runs.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/context" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Context</div>
    <div class="leading-relaxed text-muted-foreground">How much of the context window the conversation has used.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/file-tree" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">File Tree</div>
    <div class="leading-relaxed text-muted-foreground">The files the agent changed, as a folder tree.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/inline-citation" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Inline Citation</div>
    <div class="leading-relaxed text-muted-foreground">A source in the sentence that opens on hover.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/message" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Message</div>
    <div class="leading-relaxed text-muted-foreground">One turn. The person's message, and the agent's reply with its actions.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/model-selector" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Model Selector</div>
    <div class="leading-relaxed text-muted-foreground">Two menus. One picks the model the agent runs, the other picks how hard it thinks.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/plan" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Plan</div>
    <div class="leading-relaxed text-muted-foreground">The steps the agent plans to take, and how far it has got.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/prompt-input" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Prompt Input</div>
    <div class="leading-relaxed text-muted-foreground">A message field with attachments and a send button.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/queue" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Queue</div>
    <div class="leading-relaxed text-muted-foreground">The agent's todo list, split into what is left and what is done.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/reasoning" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Reasoning</div>
    <div class="leading-relaxed text-muted-foreground">The agent's thinking as it streams.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/sources" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Sources</div>
    <div class="leading-relaxed text-muted-foreground">The links the agent used for a reply.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/stack-trace" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Stack Trace</div>
    <div class="leading-relaxed text-muted-foreground">A failed tool call and its stack frames.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/subagent" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Subagent</div>
    <div class="leading-relaxed text-muted-foreground">A subagent run, with its tool calls and result.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/suggestion" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Suggestion</div>
    <div class="leading-relaxed text-muted-foreground">A short prompt you can send to the agent in one click.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/task" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Task</div>
    <div class="leading-relaxed text-muted-foreground">The steps the agent takes, as it takes them.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/terminal" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Terminal</div>
    <div class="leading-relaxed text-muted-foreground">A command the agent runs, with its output as it streams.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/test-results" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Test Results</div>
    <div class="leading-relaxed text-muted-foreground">A test run by the agent, with its suites and failures.</div>
  </linked-card>
  <linked-card href="/docs/ai-elements/reka/tool" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Tool</div>
    <div class="leading-relaxed text-muted-foreground">A tool call the agent makes, from input to output.</div>
  </linked-card>
</div>

## Migrating from AI Elements Vue

If you used AI Elements Vue from [ai-elements-vue.com](https://www.ai-elements-vue.com), here is what changes.

### Existing projects

You do not need to migrate. When you installed components from ai-elements-vue.com, the code was copied into your project. It is yours, and it keeps working as is.

To move a wrapper onto shadcn-vue components, use the prompt in the **Migrating from AI Elements Vue** section of its pattern page. Paste it into your coding agent. It rebuilds the folder in `components/ai-elements` on Trace, Code Block and the other shadcn-vue components, and keeps every export and its props, so the code that uses it does not change.

For example, the [Queue](/docs/ai-elements/reka/queue#migrating-from-ai-elements-vue) prompt rebuilds `queue/` on Trace, and the [Inline Citation](/docs/ai-elements/reka/inline-citation#migrating-from-ai-elements-vue) prompt rebuilds `inline-citation/` on Hover Card.

### What replaces each element

Each folder from AI Elements Vue, and the shadcn-vue pattern or component that replaces it.

| AI Elements Vue     | shadcn-vue                                             |
| ------------------- | ------------------------------------------------------ |
| `agent/`            | [Subagent](/docs/ai-elements/reka/subagent)                 |
| `attachments/`      | [Attachment](/docs/components/reka/attachment)              |
| `chain-of-thought/` | [Chain of Thought](/docs/ai-elements/reka/chain-of-thought) |
| `checkpoint/`       | [Checkpoint](/docs/ai-elements/reka/checkpoint)             |
| `code-block/`       | [Code Block](/docs/components/reka/code-block)              |
| `commit/`           | [Trace](/docs/components/reka/trace#commit)                 |
| `confirmation/`     | [Confirmation](/docs/ai-elements/reka/confirmation)         |
| `context/`          | [Context](/docs/ai-elements/reka/context)                   |
| `conversation/`     | [Chat](/docs/ai-elements/reka/chat)                         |
| `file-tree/`        | [File Tree](/docs/ai-elements/reka/file-tree)               |
| `inline-citation/`  | [Inline Citation](/docs/ai-elements/reka/inline-citation)   |
| `loader/`           | [Spinner](/docs/components/reka/spinner)                    |
| `message/`          | [Message](/docs/ai-elements/reka/message)                   |
| `model-selector/`   | [Model Selector](/docs/ai-elements/reka/model-selector)     |
| `plan/`             | [Plan](/docs/ai-elements/reka/plan)                         |
| `prompt-input/`     | [Prompt Input](/docs/ai-elements/reka/prompt-input)         |
| `queue/`            | [Queue](/docs/ai-elements/reka/queue)                       |
| `reasoning/`        | [Reasoning](/docs/ai-elements/reka/reasoning)               |
| `shimmer/`          | [shimmer](/docs/utilities/shimmer)                     |
| `sources/`          | [Sources](/docs/ai-elements/reka/sources)                   |
| `stack-trace/`      | [Stack Trace](/docs/ai-elements/reka/stack-trace)           |
| `suggestion/`       | [Suggestion](/docs/ai-elements/reka/suggestion)             |
| `task/`             | [Task](/docs/ai-elements/reka/task)                         |
| `terminal/`         | [Terminal](/docs/ai-elements/reka/terminal)                 |
| `test-results/`     | [Test Results](/docs/ai-elements/reka/test-results)         |
| `tool/`             | [Tool](/docs/ai-elements/reka/tool)                         |

### Elements without a replacement

We did not rebuild these elements. Few projects use them, and each one is also a small composition you can build from components shadcn-vue already has, listed below.

Your copy keeps working. If you still need one of these, [open an issue](https://github.com/unovue/shadcn-vue/issues/new/choose) and we will help you build it.

| AI Elements Vue                                                                  | Build it with                                                                                                              |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `artifact/`                                                                      | [Card](/docs/components/reka/card), [Button](/docs/components/reka/button) and [Tooltip](/docs/components/reka/tooltip)                   |
| `audio-player/`                                                                  | An `audio` element, with [Button Group](/docs/components/reka/button-group) and [Slider](/docs/components/reka/slider)               |
| `canvas/`, `connection/`, `controls/`, `edge/`, `node/`, `panel/` and `toolbar/` | [Vue Flow](https://vueflow.dev), with [Card](/docs/components/reka/card) and [Button Group](/docs/components/reka/button-group)      |
| `environment-variables/`                                                         | [Item](/docs/components/reka/item), [Badge](/docs/components/reka/badge) and [Switch](/docs/components/reka/switch)                       |
| `image/`                                                                         | An `img` element                                                                                                           |
| `mic-selector/` and `voice-selector/`                                            | [Combobox](/docs/components/reka/combobox)                                                                                      |
| `open-in-chat/`                                                                  | [Dropdown Menu](/docs/components/reka/dropdown-menu)                                                                            |
| `package-info/`                                                                  | [Item](/docs/components/reka/item) and [Badge](/docs/components/reka/badge)                                                          |
| `persona/`                                                                       | A [Rive](https://rive.app) animation                                                                                       |
| `sandbox/`                                                                       | [Trace](/docs/components/reka/trace), [Tabs](/docs/components/reka/tabs) and [Code Block](/docs/components/reka/code-block)               |
| `schema-display/`                                                                | [Collapsible](/docs/components/reka/collapsible), [Badge](/docs/components/reka/badge) and [Code Block](/docs/components/reka/code-block) |
| `snippet/`                                                                       | [Input Group](/docs/components/reka/input-group)                                                                                |
| `speech-input/`                                                                  | [Button](/docs/components/reka/button) and [Spinner](/docs/components/reka/spinner), with the Web Speech API                         |
| `transcription/`                                                                 | A [Button](/docs/components/reka/button) for each segment, to seek to it                                                        |

### New projects

Build from shadcn-vue components instead.

:::steps
  ::step
  Add the components
  ::

  ```bash
  npx shadcn-vue@latest add trace code-block
  ```

  ::step
  Copy a pattern
  ::

  Open a pattern above and copy its code into your project. Each page lists any other components it needs.

  Or ask your coding agent to do it:

  ```txt
  Add the Reasoning pattern from https://www.shadcn-vue.com/docs/ai-elements/reka/reasoning to my chat.
  ```
:::

::callout
**Missing an element?** [Open an issue](https://github.com/unovue/shadcn-vue/issues/new/choose) and tell us what you need.
::
