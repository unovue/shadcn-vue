---
title: Suggestion
description: A short prompt you can send to the agent in one click.
component: true
new: true
---

::component-preview
---
name: SuggestionDemo
class: style-rhea
previewClass: h-auto
---
::

Suggestion is a prompt you send without typing. Each one is a [Button](/docs/components/button) with the prompt as its label. Put a row of them above the [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Suggestion is built with the [Button](/docs/components/button) component.

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
npx shadcn-vue@latest add button
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/button) into your project.
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
</script>

<template>
  <div class="scrollbar-none flex scroll-fade-x gap-2 overflow-x-auto overscroll-x-contain">
    <Button
      v-for="suggestion in suggestions"
      :key="suggestion"
      variant="outline"
      size="sm"
      class="shrink-0"
      @click="send(suggestion)"
    >
      {{ suggestion }}
    </Button>
  </div>
</template>
```

## Scrolling

The row scrolls sideways when the suggestions do not fit. [`scroll-fade-x`](/docs/utilities/scroll-fade) fades the edge that has more to show, and `shrink-0` keeps each label on one line.

## AI SDK

The label is the message. Send it as is.

```ts showLineNumbers
chat.sendMessage({ text: suggestion })
```

## Migrating from AI Elements Vue

If you added Suggestion from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/suggestion/` folder. Paste this prompt into your coding agent to rebuild it on Button. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/suggestion/ from AI Elements Vue to the shadcn-vue Button component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Button: npx shadcn-vue@latest add button
2. Read https://www.shadcn-vue.com/docs/ai-elements/suggestion and build Suggestion the same way.
3. Rebuild each part:
   - Suggestions renders a div with class="flex scroll-fade-x scrollbar-none gap-2 overflow-x-auto overscroll-x-contain", instead of a ScrollArea. Change its props to a class prop and pass the slot through.
   - Suggestion renders a Button with variant="outline", size="sm" and class="shrink-0". Keep the click emit, called with the suggestion.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
