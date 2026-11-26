---
title: Inline Citation
description: A source in the sentence that opens on hover.
component: true
new: true
---

::component-preview
---
name: InlineCitationDemo
class: style-rhea
previewClass: h-auto
---
::

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/docs/components/hover-card) on a [Button](/docs/components/button).

To show a list of sources after the reply, use [Sources](/docs/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/docs/components/hover-card) and [Button](/docs/components/button) components.

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
npx shadcn-vue@latest add hover-card button
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add button
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
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard :open-delay="10" :close-delay="100">
    <HoverCardTrigger as-child>
      <Button variant="secondary" size="xs">
        {{ hostname }}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="flex w-64 flex-col gap-1">
      <div class="font-medium">
        {{ title }}
      </div>
      <a :href="url" target="_blank" rel="noreferrer">
        {{ hostname }}
        <span class="sr-only"> (opens in a new tab)</span>
      </a>
    </HoverCardContent>
  </HoverCard>
</template>
```

## AI SDK

A `source-url` part is the citation. Set `sendSources: true` on `toUIMessageStreamResponse()`, or write the part yourself.

```ts showLineNumbers title="server/api/chat.post.ts"
writer.write({
  type: 'source-url',
  sourceId: 'shadcn-vue',
  url: 'https://www.shadcn-vue.com',
  title: 'shadcn-vue',
})
```

```ts showLineNumbers
const sources = computed(() =>
  props.message.parts.filter(part => part.type === 'source-url'),
)
```

`title` is optional. Fall back to the URL's hostname.

## Migrating from AI Elements Vue

If you added Inline Citation from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/inline-citation/` folder. Paste this prompt into your coding agent to rebuild it on Hover Card and Button. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/inline-citation/ from AI Elements Vue to the shadcn-vue Hover Card and Button components.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add hover-card button
2. Read https://www.shadcn-vue.com/docs/ai-elements/inline-citation and build Inline Citation the same way.
3. Rebuild each part:
   - InlineCitationCard.vue renders a HoverCard. Set open-delay and close-delay on it.
   - InlineCitationCardTrigger.vue renders a HoverCardTrigger with as-child and a Button with variant="secondary" and size="xs" inside, instead of a Badge, so it can take keyboard focus.
   - InlineCitationCardBody.vue renders a HoverCardContent.
   - InlineCitationSource.vue renders the title and a link to the URL that opens in a new tab, with "(opens in a new tab)" in an sr-only span.
   - Keep InlineCitation.vue, InlineCitationText.vue, InlineCitationQuote.vue and the carousel parts as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
