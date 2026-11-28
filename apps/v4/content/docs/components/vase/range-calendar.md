---
title: Range Calendar
description: Presents a calendar view tailored for selecting date ranges.
component: true
links:
  doc: https://vase-ui.com/components/range-calendar
  api: https://vase-ui.com/components/range-calendar#api-reference
---

::component-preview
---
name: CalendarRangeDemo
previewClass: h-[42rem] sm:h-[26rem]
---
::

## About

The `<RangeCalendar />` component is built on top of the [Vase UI Range Calendar](https://vase-ui.com/components/range-calendar) component. It takes and gives `Temporal.PlainDate` values, and uses no date library. See [Temporal](/docs/components/vase/calendar#temporal) on the Calendar page for the polyfill.

If you're looking for a normal calendar, check out the [Calendar](/docs/components/vase/calendar) component.

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
npx shadcn-vue@latest add range-calendar
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue temporal-polyfill
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/range-calendar) into your project.
    ::

    ::step
    Copy and paste [`lib/temporal.ts`](https://github.com/unovue/shadcn-vue/blob/dev/apps/v4/registry/bases/vase/lib/temporal.ts) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage
```vue
<script setup lang="ts">
import { RangeCalendar } from "@/components/ui/range-calendar";
</script>

<template>
  <RangeCalendar />
</template>
```

`v-model` takes a range as an array of two `Temporal.PlainDate` values, `[start, end]`:

```vue
<script setup lang="ts">
import type { RangeCalendarRootValue } from '@vase-ui/vue/range-calendar'
import { ref } from 'vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { installTemporal } from '@/lib/temporal'

installTemporal()

const range = ref<RangeCalendarRootValue>([
  Temporal.Now.plainDateISO(),
  Temporal.Now.plainDateISO().add({ days: 7 }),
])
</script>

<template>
  <RangeCalendar v-model="range" />
</template>
```
