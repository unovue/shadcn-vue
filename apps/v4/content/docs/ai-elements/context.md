---
title: Context
description: How much of the context window the conversation has used.
component: true
new: true
---

::component-preview
---
name: ContextDemo
class: style-rhea
previewClass: h-auto
---
::

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/docs/components/hover-card) with a [Progress](/docs/components/progress) bar.

## Installation

Context is built with the [Hover Card](/docs/components/hover-card) and [Progress](/docs/components/progress) components.

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add hover-card progress
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add progress
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/hover-card) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<template>
  <HoverCard :open-delay="10" :close-delay="100">
    <HoverCardTrigger as-child>
      <Button variant="outline" size="sm">
        {{ percent }}% context
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="flex w-64 flex-col gap-3">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="font-medium">Context</span>
        <span class="text-muted-foreground">
          {{ used }} / {{ limit }}
        </span>
      </div>
      <Progress :model-value="percent" aria-label="Context used" />
    </HoverCardContent>
  </HoverCard>
</template>
```

## AI SDK

Read usage from the metadata on the agent's message. `messageMetadata` runs when the stream finishes.

```ts showLineNumbers title="server/api/chat.post.ts"
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === 'finish') {
      return { usage: part.totalUsage }
    }
  },
})
```

```ts showLineNumbers
const usage = message.metadata?.usage
const used = (usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0)
const percent = Math.round((used / limit) * 100)
```

`limit` is the model's context window. The AI SDK does not send it, so set it from the model you use.

## Migrating from AI Elements Vue

If you added Context from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/context/` folder. Paste this prompt into your coding agent to rebuild it on Hover Card and Progress. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/context/ from AI Elements Vue to the shadcn-vue Hover Card and Progress components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add hover-card progress button
2. Read https://www.shadcn-vue.com/docs/ai-elements/context and build Context the same way.
3. Rebuild each part:
   - Context renders a HoverCard with :open-delay and :close-delay. Keep usedTokens, maxTokens, usage and modelId in its provide/inject context.
   - ContextTrigger renders a HoverCardTrigger with as-child and a Button with variant="outline" and size="sm", showing the percent used.
   - ContextContent renders a HoverCardContent.
   - ContextContentHeader renders the used and max tokens, and a Progress with aria-label="Context used".
   - Keep ContextContentBody, ContextContentFooter and the usage parts as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
