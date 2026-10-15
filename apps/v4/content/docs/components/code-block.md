---
title: Code Block
description: Displays code, terminal output and diffs with an optional header, line numbers and a copy button.
component: true
new: true
---

::component-preview
---
name: CodeBlockDemo
class: style-rhea
previewClass: h-auto
---
::

`CodeBlock` displays code, terminal output, logs and diffs. It has a header with a title and actions, line numbers, wrapping, diff and highlighted lines, and a small size for tool output in a [Trace](/docs/components/trace).

Syntax highlighting is optional and lives in a separate composable, so a block that only shows plain output stays small.

## Installation

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
npx shadcn-vue@latest add code-block
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install shiki
    ```

    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add button
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/code-block) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

`code-block` also includes `useHighlightedCode` and `CodeBlockToken` for [syntax highlighting](#syntax-highlighting). They live in `useHighlightedCode.ts` and `highlighter.ts` in the same folder.

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@/components/ui/code-block'

const output = `$ pnpm add ai @ai-sdk/vue zod
Done in 2.8s using pnpm v10.18.0`
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>Terminal</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="output" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent>{{ output }}</CodeBlockContent>
  </CodeBlock>
</template>
```

## Composition

```text
CodeBlock
├── CodeBlockHeader
│   ├── CodeBlockTitle
│   └── CodeBlockActions
│       └── CodeBlockCopyButton
├── CodeBlockActions (floating, when there is no header)
├── CodeBlockContent
│   └── CodeBlockLine
│       └── CodeBlockToken
└── CodeBlockFooter
```

`CodeBlockContent` takes plain text or a list of `CodeBlockLine`. Use lines when you need line variants or highlighted tokens.

## Features

- **It streams cheaply.** Plain text in the slot renders as one text node, and the highlighter tokenizes only the new lines as code arrives.
- **It copies cleanly.** Line numbers and diff markers are left out of a selection, and blank lines survive the copy.
- **It reads left to right.** The content is always `dir="ltr"`. The header follows the page direction.
- **It highlights without WASM.** `useHighlightedCode` uses Shiki's JavaScript engine, loads each language on first use and renders ANSI colors in terminal output. On the server, `highlightCode` returns the tokens without a component.
- **It fits where code shows up.** Use it in a message, a Markdown fence, a Trace line, Tabs, a Dialog or a `typeset` container.
- **It scrolls by keyboard.** The content is focusable, and floating actions show on focus as well as on hover.

## Basic

Put plain text in `CodeBlockContent`. It renders as one text node, so it stays cheap while output streams.

::component-preview
---
name: CodeBlockBasicDemo
class: style-rhea
previewClass: h-auto
---
::

## Header

`CodeBlockHeader` holds a `CodeBlockTitle` and `CodeBlockActions`. `CodeBlockCopyButton` copies its `value`.

::component-preview
---
name: CodeBlockHeaderDemo
class: style-rhea
previewClass: h-auto
---
::

A long title truncates. To link the title to a file, wrap `CodeBlockTitle` in an anchor.

```vue showLineNumbers
<template>
  <CodeBlockHeader>
    <a href="/files/chat.post.ts">
      <CodeBlockTitle>server/api/chat.post.ts</CodeBlockTitle>
    </a>
  </CodeBlockHeader>
</template>
```

## Actions

`CodeBlockActions` holds any number of buttons. For a wrap toggle, keep the state yourself and pass it to `wrap`.

::component-preview
---
name: CodeBlockActionsDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<script setup lang="ts">
import { WrapTextIcon } from '@lucide/vue'
import { ref } from 'vue'

const wrap = ref(false)
</script>

<template>
  <CodeBlockActions>
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label="Wrap lines"
      :aria-pressed="wrap"
      @click="wrap = !wrap"
    >
      <WrapTextIcon />
    </Button>
    <CodeBlockCopyButton :value="output" />
  </CodeBlockActions>
  <CodeBlockContent :wrap="wrap">
    {{ output }}
  </CodeBlockContent>
</template>
```

## Floating Actions

Without a header, put `CodeBlockActions` directly inside `CodeBlock`. The actions float at the top end and stay hidden until the block is hovered or focused. They always show on touch screens.

::component-preview
---
name: CodeBlockFloatingActionsDemo
class: style-rhea
previewClass: h-auto
---
::

## Line Numbers

Add `line-numbers` to `CodeBlockContent`. Plain text in the slot is split into lines, and the numbers are not copied with a selection.

::component-preview
---
name: CodeBlockLineNumbersDemo
class: style-rhea
previewClass: h-auto
---
::

## Start Line

Set `start-line` to number lines from a given line, for a snippet from the middle of a file. The gutter grows to fit the widest number.

::component-preview
---
name: CodeBlockStartLineDemo
class: style-rhea
previewClass: h-auto
---
::

## Wrap

Long lines scroll by default. Add `wrap` to wrap them, which suits tool output and error messages. To let the reader toggle it, see [Actions](#actions).

::component-preview
---
name: CodeBlockWrapDemo
class: style-rhea
previewClass: h-auto
---
::

## Highlighted Lines

Render each line as a `CodeBlockLine` and set `variant="highlighted"` on the lines to call out.

::component-preview
---
name: CodeBlockHighlightedLinesDemo
class: style-rhea
previewClass: h-auto
---
::

## Diff

Set `variant="added"` or `variant="removed"` on a `CodeBlockLine`. Each one adds a `+` or `−` marker.

::component-preview
---
name: CodeBlockDiffDemo
class: style-rhea
previewClass: h-auto
---
::

## Height

Cap the height with a `max-h-*` class on `CodeBlockContent`. The content scrolls inside the block.

::component-preview
---
name: CodeBlockHeightDemo
class: style-rhea
previewClass: h-auto
---
::

`CodeBlockContent` fades its edges with [`scroll-fade`](/docs/utilities/scroll-fade) as it scrolls: left and right by default, top and bottom when it wraps. Add `scroll-fade-y` to a capped block that does not wrap.

## Show More

`CodeBlockFooter` is a slot below the content. For Show More, cap the content while it is collapsed and put a ghost `xs` `Button` in the footer.

::component-preview
---
name: CodeBlockShowMoreDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<script setup lang="ts">
import { ref, useId } from 'vue'

const expanded = ref(false)
const id = useId()
</script>

<template>
  <CodeBlockContent
    :id="id"
    :class="expanded ? undefined : 'max-h-64 overflow-y-hidden scroll-fade-y'"
  >
    {{ code }}
  </CodeBlockContent>
  <CodeBlockFooter class="justify-center">
    <Button
      variant="ghost"
      size="xs"
      :aria-expanded="expanded"
      :aria-controls="id"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : 'Show more' }}
    </Button>
  </CodeBlockFooter>
</template>
```

### Max Height

To keep a long block from taking over the page, raise the cap instead of removing it. The expanded content scrolls, and the edges fade as you scroll.

::component-preview
---
name: CodeBlockShowMoreScrollDemo
class: style-rhea
previewClass: h-auto
---
::

## Size

Use `size="sm"` for tool and [Trace](#trace) output. It has tighter padding and `text-xs` text.

::component-preview
---
name: CodeBlockSizeDemo
class: style-rhea
previewClass: h-auto
---
::

## Destructive

Use `variant="destructive"` for errors and failed output.

::component-preview
---
name: CodeBlockDestructiveDemo
class: style-rhea
previewClass: h-auto
---
::

## Trace

Put a `CodeBlock` with `size="sm"` in `TraceCollapsibleContent` for tool and terminal output. Add `wrap` and a `max-h-64` class to `CodeBlockContent` so long output wraps and scrolls inside the trace. The block sets its own text color, so `TraceCollapsibleContent` does not mute it.

::component-preview
---
name: CodeBlockTraceDemo
class: style-rhea
previewClass: h-auto
---
::

## Tabs

Show several files with [Tabs](/docs/components/tabs), one `CodeBlock` in each `TabsContent`.

::component-preview
---
name: CodeBlockTabsDemo
class: style-rhea
previewClass: h-auto
---
::

## Message

Put a `CodeBlock` between paragraphs inside a [Message](/docs/components/message).

::component-preview
---
name: CodeBlockChatDemo
class: style-rhea
previewClass: h-auto
---
::

## Typeset

A `CodeBlock` inside a [`typeset`](/docs/typeset) container keeps its own styles and gets the same space above as a paragraph.

::component-preview
---
name: CodeBlockTypesetDemo
class: style-rhea
previewClass: h-auto
---
::

## RTL

To enable RTL support in shadcn-vue, see the [RTL configuration guide](/docs/rtl). Code always reads left to right. The header follows the page direction.

::component-preview
---
name: CodeBlockRTLDemo
class: style-nova
---
::

## Syntax Highlighting

`useHighlightedCode` highlights with [Shiki](https://shiki.style) and returns a computed list of lines. Each line is a list of tokens, which you render with `CodeBlockToken` inside a `CodeBlockLine`.

::component-preview
---
name: CodeBlockHighlightingDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockToken,
  useHighlightedCode,
} from '@/components/ui/code-block'

const lines = useHighlightedCode(code, 'json')
</script>

<template>
  <CodeBlock>
    <CodeBlockContent>
      <CodeBlockLine v-for="(line, index) in lines" :key="index">
        <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
```

Both arguments accept a plain value, a ref or a getter, so the lines update when the code or the language changes:

```ts showLineNumbers
const props = defineProps<{ code: string, language: string }>()

const lines = useHighlightedCode(() => props.code, () => props.language)
```

Shiki uses its JavaScript regex engine, so there is no WASM to load.

### Languages

Each language loads the first time it is used. Edit the list in `highlighter.ts`. A language that is not in the list renders as plain text.

::component-preview
---
name: CodeBlockLanguagesDemo
class: style-rhea
previewClass: h-auto
---
::

The list ships with `bash`, `css`, `diff`, `html`, `javascript`, `json`, `jsx`, `markdown`, `python`, `sql`, `tsx`, `typescript`, `vue` and `yaml`, plus aliases such as `ts`, `js`, `sh` and `yml`.

### Terminal Output

Pass `"ansi"` as the language to render the colors in terminal output. Without it, escape codes show as text.

::component-preview
---
name: CodeBlockAnsiDemo
class: style-rhea
previewClass: h-auto
---
::

ANSI colors do not carry from one line to the next.

### Server Rendering

`highlightCode` is async and returns the tokens of each line, or `null` for a language that is not in the list. Call it from a server route or with `useAsyncData` so the tokens are part of the server-rendered HTML.

```vue showLineNumbers
<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockToken,
  highlightCode,
} from '@/components/ui/code-block'

const props = defineProps<{ code: string }>()

const { data: lines } = await useAsyncData(
  `code-${props.code}`,
  async () =>
    (await highlightCode(props.code, 'ts'))
    ?? props.code.split('\n').map(line => (line ? [{ content: line }] : [])),
)
</script>

<template>
  <CodeBlock>
    <CodeBlockContent line-numbers>
      <CodeBlockLine v-for="(line, index) in lines" :key="index">
        <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
```

To highlight many snippets in a row, `loadHighlighter` loads a language once and returns a highlighter with a synchronous `highlight(code)` method. It returns `null` for a language that is not in the list.

```ts showLineNumbers
import { loadHighlighter } from '@/components/ui/code-block'

const highlighter = await loadHighlighter('ts')
const { lines } = highlighter?.highlight(code) ?? { lines: [] }
```

### Streaming

While the code streams, the composable tokenizes only the new lines, starting where the last line left off. Lines that did not change keep the same tokens, so Vue skips them.

::component-preview
---
name: CodeBlockStreamingDemo
class: style-rhea
previewClass: h-auto
---
::

### Markdown

To render fenced code in a streamed Markdown message, split the message into paragraphs and fenced code blocks, and render each fence with a `CodeBlock`. A fence that has no closing line yet is still streaming. Use that to disable the copy button while the code is incomplete.

::component-preview
---
name: CodeBlockMarkdownDemo
class: style-rhea
previewClass: h-auto
---
::

If you render Markdown with a library, route its fenced code elements to a component that calls `useHighlightedCode` the same way, and keep inline code inline.

## Accessibility

- `CodeBlockContent` is a `pre` with a `code` element and always sets `dir="ltr"`, so code reads left to right on an RTL page.
- `CodeBlockContent` has `tabindex="0"`, so keyboard users can focus it and scroll it. Pass `tabindex="-1"` to remove the tab stop.
- Floating actions show when focus is inside the block, not only on hover, so keyboard users can reach them.
- Line numbers are hidden from screen readers.
- Diff lines carry a `+` or `−` marker as well as a tint, so the change does not rely on color.
- `CodeBlockCopyButton` is labelled "Copy", and a polite live region announces "Copied" after a successful copy.
- Give a wrap toggle `aria-pressed` so its state is announced.
- Give a Show More button `aria-expanded` and point `aria-controls` at the `id` of `CodeBlockContent`.

## API Reference

### CodeBlock

The surface that holds the header, the content and the footer.

| Prop      | Type                         | Default     | Description                                                     |
| --------- | ---------------------------- | ----------- | --------------------------------------------------------------- |
| `variant` | `"default" \| "destructive"` | `"default"` | The tone of the block.                                          |
| `size`    | `"default" \| "sm"`          | `"default"` | `"sm"` has tighter padding and `text-xs` code, for tool output. |
| `class`   | `string`                     | -           | Additional classes to apply to the block.                       |

### CodeBlockHeader

A row above the content for a title and actions.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the header. |

### CodeBlockTitle

A filename or a label, with an optional icon. It truncates.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the title. |

### CodeBlockActions

Holds buttons at the end of the header. As a direct child of `CodeBlock`, it floats.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the actions. |

### CodeBlockCopyButton

A ghost icon button that copies `value` to the clipboard. It accepts the props of [`Button`](/docs/components/button).

| Prop       | Type      | Default     | Description                                |
| ---------- | --------- | ----------- | ------------------------------------------ |
| `value`    | `string`  | -           | Required. The text to copy.                |
| `variant`  | `string`  | `"ghost"`   | The variant of the button.                 |
| `size`     | `string`  | `"icon-xs"` | The size of the button.                    |
| `as`       | `string`  | `"button"`  | The element or component to render as.     |
| `as-child` | `boolean` | `false`     | Render as the child element.               |
| `class`    | `string`  | -           | Additional classes to apply to the button. |

### CodeBlockContent

The `pre` that scrolls or wraps.

| Prop           | Type      | Default | Description                                                     |
| -------------- | --------- | ------- | --------------------------------------------------------------- |
| default slot   | -         | -       | Plain text, or a list of `CodeBlockLine`.                       |
| `wrap`         | `boolean` | `false` | Wrap long lines instead of scrolling.                           |
| `line-numbers` | `boolean` | `false` | Number each line. Plain text in the slot is split into lines.   |
| `start-line`   | `number`  | `1`     | The number of the first line, when `line-numbers` is set.       |
| `tabindex`     | `number`  | `0`     | Makes the content focusable so it can be scrolled by keyboard.  |
| `class`        | `string`  | -       | Additional classes to apply to the content, such as `max-h-72`. |

### CodeBlockLine

One line of code.

| Prop      | Type                                                 | Default     | Description                              |
| --------- | ---------------------------------------------------- | ----------- | ---------------------------------------- |
| `variant` | `"default" \| "added" \| "removed" \| "highlighted"` | `"default"` | The state of the line.                   |
| `class`   | `string`                                             | -           | Additional classes to apply to the line. |

### CodeBlockToken

One highlighted token from `useHighlightedCode` or `highlightCode`. It renders a `span` with the light and dark theme colors.

| Prop    | Type               | Default | Description            |
| ------- | ------------------ | ------- | ---------------------- |
| `token` | `HighlightedToken` | -       | Required. The token.   |

### CodeBlockFooter

A row below the content, such as for a Show More button.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the footer. |

### useHighlightedCode

```ts
const lines = useHighlightedCode(code, language)
```

Returns a `ComputedRef<HighlightedToken[][]>`, one list of tokens per line. It returns plain lines until the first pass finishes, and for a language that is not in the list.

| Argument   | Type                          | Description                                                  |
| ---------- | ----------------------------- | ------------------------------------------------------------ |
| `code`     | `MaybeRefOrGetter<string>`    | The code to highlight. A trailing newline is ignored.        |
| `language` | `MaybeRefOrGetter<string>`    | A language or alias from `highlighter.ts`, or `"ansi"`.      |

### highlightCode

```ts
const lines = await highlightCode(code, language)
```

Returns `Promise<HighlightedToken[][] | null>`, one list of tokens per line, or `null` for a language that is not in the list.

### loadHighlighter

```ts
const highlighter = await loadHighlighter(language)
```

Loads a language and returns a highlighter for it, or `null` for a language that is not in the list. `highlighter.highlight(code, state?)` returns `{ lines, state }`. Pass `state` back to continue tokenizing where the code left off.

### HighlightedToken

```ts
interface HighlightedToken {
  content: string
  htmlStyle?: Record<string, string>
}
```
