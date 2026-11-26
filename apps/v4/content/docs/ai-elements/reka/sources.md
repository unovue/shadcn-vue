---
title: Sources
description: Displays the links the agent used for a reply.
component: true
new: true
---

::component-preview
---
name: SourcesDemo
class: style-rhea
previewClass: h-auto
---
::

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `Trace` with a `TraceCollapsible` for the list.

## Installation

Sources is built with the [Trace](/docs/components/trace) component.

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
npx shadcn-vue@latest add trace
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add collapsible
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/trace) into your project.
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
import { ArrowUpRightIcon, GlobeIcon } from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'

function getHostname(url: string) {
  return new URL(url).hostname
}
</script>

<template>
  <Trace>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <GlobeIcon />
          </TraceIcon>
          <TraceTitle>Used {{ sources.length }} sources</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <a
            v-for="source in sources"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noreferrer"
          >
            <TraceLine>
              <TraceIcon>
                <GlobeIcon />
              </TraceIcon>
              <TraceTitle>
                {{ source.title ?? getHostname(source.url) }}
                <span class="sr-only"> (opens in a new tab)</span>
              </TraceTitle>
              <TraceIcon>
                <ArrowUpRightIcon />
              </TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## AI SDK

Collect the `source-url` parts of a message and render them after the text. The agent can cite the same page more than once, so dedupe them by `url`.

```ts showLineNumbers
const sources = computed(() =>
  props.message.parts
    .filter(part => part.type === 'source-url')
    .filter(
      (part, index, all) =>
        all.findIndex(other => other.url === part.url) === index,
    ),
)
```

`title` is optional on a `source-url` part. Fall back to the hostname of the URL.

## Accessibility

Each source is a plain link inside the list.

- Links open in a new tab. Add `sr-only` text, like "(opens in a new tab)", so screen readers announce it.
- The arrow icon is decorative. The title is the name of the link.
- The count in the trigger, like "Used 3 sources", tells the person what opens before they open it.

## Migrating from AI Elements Vue

If you added Sources from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/sources/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/sources/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/sources and build Sources the same way.
3. Rebuild each part:
   - Sources.vue renders a Trace with a TraceCollapsible.
   - SourcesTrigger.vue renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle that uses count, like "Used 3 sources".
   - SourcesContent.vue renders a TraceCollapsibleContent with a Trace for the links.
   - Source.vue renders a link that wraps a TraceLine, with a TraceIcon and a TraceTitle for its title. Add "(opens in a new tab)" in an sr-only span.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
