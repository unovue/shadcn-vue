---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
component: true
new: true
---

::component-preview
---
name: QuestionnaireDemo
class: style-nova
align: end
previewClass: min-h-[560px] p-4 sm:p-8
---
::

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
npx shadcn-vue@latest add questionnaire
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/questionnaire) into your project.
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
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'

const items = [
  { name: 'direction', required: true },
  { name: 'timing', required: true },
]

function handleSubmit(event: Event) {
  event.preventDefault()

  const answers = new FormData(event.target as HTMLFormElement)
  console.log(Object.fromEntries(answers))
}
</script>

<template>
  <Questionnaire :items="items" @submit="handleSubmit">
    <QuestionnaireProgress />

    <QuestionnaireItem name="direction" required>
      <QuestionnaireTitle>What should the agent build next?</QuestionnaireTitle>
      <QuestionnaireDescription>Choose a direction.</QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="tool-calls">Tool call timeline</QuestionnaireChoice>
        <QuestionnaireChoice value="approvals">Approval checkpoints</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="timing" required>
      <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
        <QuestionnaireChoice value="backlog">Add it to the backlog</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext />
      <QuestionnaireSubmit />
    </QuestionnaireActions>
  </Questionnaire>
</template>
```

## Composition

Use the following composition to build a questionnaire:

```text
Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   │   └── QuestionnaireChoiceDescription
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit
```

`Questionnaire` renders a real `<form>` and every item renders a `<fieldset>` with a `<legend>`, so answers submit with `FormData` and no extra state is needed.

## Server Rendering

Pass `items` to server-render the active item, progress, actions, and answer shortcuts. Without it the questionnaire only learns its order once the items have mounted on the client.

## Features

- One question at a time, with progress, navigation, and validation handled for you
- Single-choice, multiple-choice, freeform, and intentionally skipped answers
- Keyboard shortcuts for choices, plus arrow key navigation between questions and answers
- Declarative `items` for item order, conditional items, and stable shortcut assignment
- Controlled navigation with `v-model:item` for custom validation flows
- Native form reset restores the answers you marked as defaults

## Examples

### Multiple Selection

Use `multiple` for an item that accepts more than one fixed answer.

::component-preview
---
name: QuestionnaireMultipleDemo
class: style-nova
align: end
previewClass: min-h-[420px] p-4 sm:p-8
---
::

### Freeform Answer

Compose `QuestionnaireInput` with fixed choices when the user can provide another answer.

::component-preview
---
name: QuestionnaireFreeformDemo
class: style-nova
align: end
previewClass: min-h-[420px] p-4 sm:p-8
---
::

### Explicit Skip

Add `QuestionnaireSkip` when an optional item may be intentionally left unanswered.

::component-preview
---
name: QuestionnaireSkipDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Shortcuts

Assign a letter or number key to each answer with `shortcuts`. Declare `choices` on `items` so the keys stay stable regardless of the render order.

::component-preview
---
name: QuestionnaireShortcutsDemo
class: style-nova
align: end
previewClass: min-h-[480px] p-4 sm:p-8
---
::

### Custom Validation

Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error.

::component-preview
---
name: QuestionnaireValidationDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

`QuestionnaireError` falls back to a built-in message, so only render your own message when you have one:

```vue showLineNumbers
<QuestionnaireError>
  <template v-if="errors.detail">
    { errors.detail }
  </template>
</QuestionnaireError>
```

### Controlled

Control the active item from host state, such as returning to an invalid step. Use `v-model:item`.

::component-preview
---
name: QuestionnaireControlledDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Resume

Restore a saved active item and default answers, then reset changes back to that saved state.

::component-preview
---
name: QuestionnaireResumeDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Conditional Items

Disable items that do not apply to the user's earlier answers.

::component-preview
---
name: QuestionnaireConditionalDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Navigation State

Read item status to opt into disabled navigation and custom action styling. Listen to `@update:status` on the items you want to track.

::component-preview
---
name: QuestionnaireNavigationStateDemo
class: style-nova
align: end
previewClass: min-h-[480px] p-4 sm:p-8
---
::

### Custom Progress

Use the progress slot state to build a custom progress indicator. `QuestionnaireProgress` exposes `current`, `total`, `first`, and `last`.

::component-preview
---
name: QuestionnaireProgressDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Animated Items

Animate the active item while keeping progress and navigation stationary. The active item is marked with `data-active`.

::component-preview
---
name: QuestionnaireAnimatedDemo
class: style-nova
align: end
previewClass: min-h-[520px] p-4 sm:p-8
---
::

### Card

Compose Questionnaire with Card slots while keeping the question title and description semantic. Use `as-child` to render a part as another component:

```vue showLineNumbers
<QuestionnaireTitle as-child>
  <CardTitle>What should the agent work on?</CardTitle>
</QuestionnaireTitle>
```

::component-preview
---
name: QuestionnaireCardDemo
class: style-nova
align: end
previewClass: min-h-[560px] p-4 sm:p-8
---
::

`QuestionnaireProgress`, `QuestionnaireTitle`, `QuestionnaireDescription`, `QuestionnaireChoices`, `QuestionnaireError`, `QuestionnaireActions`, and the four navigation buttons all accept `as` and `as-child`. `as-child` on the title replaces the `legend` that names the item, so the item labels itself with the rendered title instead. The title and description keep the id of the child they render.

### Dialog

Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.

::component-preview
---
name: QuestionnaireDialogDemo
class: style-nova
align: end
previewClass: min-h-[320px] p-4 sm:p-8
---
::

## Keyboard navigation

| Key                    | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `Arrow Down`           | Moves focus to the next answer.                                   |
| `Arrow Up`             | Moves focus to the previous answer.                               |
| `Arrow Right`          | Moves to the next question once the current one is answered.      |
| `Arrow Left`           | Moves to the previous question.                                   |
| `Enter`                | Confirms the focused answer and moves on, or submits on the last question. |
| `Meta+Enter` / `Ctrl+Enter` | Confirms the active question from anywhere in the form.      |
| `A` – `Z` / `1` – `9`  | Selects the matching choice when `shortcuts` is set.              |

## Accessibility

`QuestionnaireItem` renders a `fieldset` with a `legend`, so every question is announced with its answers. Descriptions and errors are associated with the item through `aria-describedby`, and an invalid item exposes `aria-invalid`.

`QuestionnaireProgress` renders a named `progressbar` that announces the current question. Inactive items are `hidden` and `inert`, so they stay out of the tab order and the accessibility tree.

Navigation actions are real buttons. `QuestionnaireSubmit` submits the form, so a questionnaire keeps working with browser autofill and native form submission.

## API Reference

### Questionnaire

The root form. Manages the active item, progress, validation, and keyboard navigation.

| Prop          | Type                            | Default | Description                                                                 |
| ------------- | ------------------------------- | ------- | --------------------------------------------------------------------------- |
| `items`       | `QuestionnaireItemDefinition[]`  | -       | Declares item order, `required`, `disabled`, and the `choices` used for shortcuts. |
| `item`        | `string`                        | -       | The active item. Use with `v-model:item`.                                    |
| `defaultItem` | `string`                        | -       | The item shown first. Ignored when `item` is provided.                       |
| `shortcuts`   | `"letters" \| "numbers"`        | -       | Assigns a keyboard shortcut to every choice.                                 |
| `noValidate`  | `boolean`                       | `true`  | Set to `false` to run native constraint validation on answered items.        |
| `class`       | `HTMLAttributes["class"]`       | -       | Additional classes to apply to the form.                                     |

| Emit           | Payload  | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `update:item`  | `string` | The active item changed.                                                 |
| `submit`       | `Event`  | Every item is valid. Call `event.preventDefault()` to handle it yourself. |
| `reset`        | `Event`  | The form was reset. Call `event.preventDefault()` to keep the answers.    |

### QuestionnaireProgress

A `progressbar` announcing the active question. Exposes `current`, `total`, `first`, and `last` to its default slot.

| Prop    | Type                      | Default | Description                                      |
| ------- | ------------------------- | ------- | ------------------------------------------------ |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the progress bar. |
| `as`      | `AsTag \| Component`      | `"div"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |

### QuestionnaireItem

A single question, rendered as a `fieldset`. Only the active item is visible.

| Prop       | Type                      | Default | Description                                                   |
| ---------- | ------------------------- | ------- | ------------------------------------------------------------- |
| `name`     | `string`                  | -       | Required. The name the answer submits under.                   |
| `required` | `boolean`                 | `false` | Requires an answer before the questionnaire can continue.      |
| `multiple` | `boolean`                 | `false` | Renders choices as checkboxes and keeps every selected answer. |
| `disabled` | `boolean`                 | `false` | Removes the item from the flow without unmounting it.          |
| `invalid`  | `boolean`                 | `false` | Marks the item invalid from outside, for example after schema validation. |
| `class`    | `HTMLAttributes["class"]` | -       | Additional classes to apply to the item.                       |

| Emit             | Payload                                       | Description             |
| ---------------- | --------------------------------------------- | ----------------------- |
| `update:status`  | `"unanswered" \| "answered" \| "skipped"`     | The item status changed. |

### QuestionnaireTitle

The question, rendered as a `legend`.

| Prop    | Type                      | Default | Description                                 |
| ------- | ------------------------- | ------- | ------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the title.   |
| `as`      | `AsTag \| Component`      | `"legend"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |

### QuestionnaireDescription

Help text associated with the item through `aria-describedby`.

| Prop    | Type                      | Default | Description                                     |
| ------- | ------------------------- | ------- | ----------------------------------------------- |
| `id`    | `string`                  | -       | Overrides the generated id.                     |
| `as`      | `AsTag \| Component`      | `"p"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the description. |

### QuestionnaireChoices

The answer list. Wraps choices and an optional freeform input.

| Prop    | Type                      | Default | Description                                 |
| ------- | ------------------------- | ------- | ------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the list.    |
| `as`      | `AsTag \| Component`      | `"div"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |

### QuestionnaireChoice

A single answer, rendered as a radio or a checkbox depending on the item.

| Prop             | Type                      | Default | Description                                             |
| ---------------- | ------------------------- | ------- | ------------------------------------------------------- |
| `value`          | `string`                  | -       | Required. The submitted value.                           |
| `checked`        | `boolean`                 | -       | Controlled checked state. Use with `v-model:checked`.    |
| `defaultChecked` | `boolean`                 | `false` | Checks the choice on mount and after a native form reset.|
| `disabled`       | `boolean`                 | `false` | Disables the choice.                                     |
| `class`          | `HTMLAttributes["class"]` | -       | Additional classes to apply to the choice.               |

| Emit               | Payload   | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `update:checked`   | `boolean` | The choice was checked or cleared. |
| `change`           | `Event`   | The native change event.           |

### QuestionnaireChoiceDescription

Secondary text inside a choice.

| Prop    | Type                      | Default | Description                                     |
| ------- | ------------------------- | ------- | ----------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the description. |

### QuestionnaireInput

A freeform answer. Answers the item while it holds a value, and submits under the item name.

| Prop           | Type                      | Default  | Description                                           |
| -------------- | ------------------------- | -------- | ----------------------------------------------------- |
| `modelValue`   | `string \| number`        | -        | Controlled value. Use with `v-model`.                 |
| `defaultValue` | `string \| number`        | -        | Fills the answer on mount and after a native reset.   |
| `type`         | `QuestionnaireInputType`  | `"text"` | The input type.                                       |
| `disabled`     | `boolean`                 | `false`  | Disables the input.                                   |
| `class`        | `HTMLAttributes["class"]` | -        | Additional classes to apply to the input.             |

### QuestionnaireError

The item error. Hidden until the item is invalid, and falls back to a built-in message.

| Prop    | Type                      | Default | Description                               |
| ------- | ------------------------- | ------- | ----------------------------------------- |
| `id`    | `string`                  | -       | Overrides the generated id.               |
| `as`      | `AsTag \| Component`      | `"p"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the error. |

### QuestionnaireActions

The navigation row.

| Prop    | Type                      | Default | Description                                 |
| ------- | ------------------------- | ------- | ------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the row.     |
| `as`      | `AsTag \| Component`      | `"div"`   | The element or component to render as.      |
| `asChild` | `boolean`                 | `false` | Render the child element instead.           |

### QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, and QuestionnaireSubmit

Navigation buttons. Each one hides itself when it does not apply: `QuestionnairePrevious` on the first item, `QuestionnaireSkip` on required items, `QuestionnaireNext` on the last item, and `QuestionnaireSubmit` everywhere but the last item.

| Prop       | Type                            | Default                            | Description                                |
| ---------- | ------------------------------- | ---------------------------------- | ------------------------------------------ |
| `variant`  | `ButtonVariants["variant"]`     | `"outline"` / `"default"`          | The button variant.                        |
| `size`     | `ButtonVariants["size"]`        | `"default"`                        | The button size.                            |
| `disabled` | `boolean`                       | `false`                            | Disables the button.                        |
| `as`       | `AsTag \| Component`            | `"button"`                         | The element or component to render as.      |
| `asChild`  | `boolean`                       | `false`                            | Render the child element instead.           |
| `class`    | `HTMLAttributes["class"]`       | -                                  | Additional classes to apply to the button.  |
