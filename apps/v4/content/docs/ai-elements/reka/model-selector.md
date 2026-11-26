---
title: Model Selector
description: Two menus. One picks the model the agent runs, the other picks how hard it thinks.
component: true
new: true
---

::component-preview
---
name: ModelSelectorDemo
class: style-rhea
previewClass: h-auto
---
::

## Installation

Model Selector is built with the [Dropdown Menu](/docs/components/dropdown-menu) and [Input Group](/docs/components/input-group) components.

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
npx shadcn-vue@latest add dropdown-menu input-group
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add input-group
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/dropdown-menu) into your project.
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
import { ArrowUpIcon, ChevronDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const model = ref('gpt-5')
const effort = ref('medium')
</script>

<template>
  <InputGroup>
    <InputGroupTextarea placeholder="Ask the agent to change your code..." />
    <InputGroupAddon align="block-end">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <InputGroupButton size="sm">
            GPT-5
            <ChevronDownIcon />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup v-model="model">
            <DropdownMenuGroup>
              <DropdownMenuLabel>OpenAI</DropdownMenuLabel>
              <DropdownMenuRadioItem value="gpt-5">
                GPT-5
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="gpt-5-mini">
                GPT-5 mini
              </DropdownMenuRadioItem>
            </DropdownMenuGroup>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <InputGroupButton size="sm">
            Medium
            <ChevronDownIcon />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup v-model="effort">
            <DropdownMenuRadioItem value="low">
              Low
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">
              Medium
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="high">
              High
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <InputGroupButton type="submit" variant="default" class="ml-auto">
        <ArrowUpIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

## AI SDK

Send the model and the effort with the message. Map them to a model and provider options in the route.

```ts showLineNumbers
chat.sendMessage({ text }, { body: { model: model.value, effort: effort.value } })
```

```ts showLineNumbers title="server/api/chat.post.ts"
import type { UIMessage } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'

const models = {
  'gpt-5': openai('gpt-5'),
  'gpt-5-mini': openai('gpt-5-mini'),
  'claude-sonnet-4-5': anthropic('claude-sonnet-4-5'),
  'claude-haiku-4-5': anthropic('claude-haiku-4-5'),
}

export default defineEventHandler(async (event) => {
  const { messages, model, effort } = await readBody<{
    messages: UIMessage[]
    model: keyof typeof models
    effort: 'low' | 'medium' | 'high'
  }>(event)

  const result = streamText({
    model: models[model] ?? models['gpt-5'],
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: { reasoningEffort: effort },
      anthropic: { effort },
    },
  })

  return result.toUIMessageStreamResponse()
})
```

Each provider reads its own key in `providerOptions` and ignores the rest.

## Migrating from AI Elements Vue

If you added Model Selector from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/model-selector/` folder. Paste this prompt into your coding agent to rebuild it on Dropdown Menu. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/model-selector/ from AI Elements Vue to the shadcn-vue Dropdown Menu component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Dropdown Menu: npx shadcn-vue@latest add dropdown-menu
2. Read https://www.shadcn-vue.com/docs/ai-elements/model-selector and build Model Selector the same way.
3. Rebuild each part:
   - ModelSelector renders a DropdownMenu, instead of a Dialog. ModelSelectorTrigger renders a DropdownMenuTrigger.
   - ModelSelectorContent renders a DropdownMenuContent, and ModelSelectorList a DropdownMenuRadioGroup with the selected model as its v-model.
   - ModelSelectorGroup renders a DropdownMenuGroup with a DropdownMenuLabel for its heading.
   - ModelSelectorItem renders a DropdownMenuRadioItem, so picking a model closes the menu.
   - ModelSelectorSeparator renders a DropdownMenuSeparator, and ModelSelectorShortcut a DropdownMenuShortcut.
   - A menu has no search field. Keep ModelSelectorInput, ModelSelectorEmpty and ModelSelectorDialog on Command if you use search, or remove them if nothing imports them.
   - Keep ModelSelectorLogo, ModelSelectorLogoGroup and ModelSelectorName as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
