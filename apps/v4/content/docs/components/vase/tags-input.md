---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
component: true
---

::component-preview
---
name: TagsInputDemo
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
npx shadcn-vue@latest add tags-input
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/tags-input) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Examples

### Tags with Combobox

Use a `Combobox` with `multiple` to pick the tags from a list.

::component-preview
---
name: TagsInputWithListbox
---
::
