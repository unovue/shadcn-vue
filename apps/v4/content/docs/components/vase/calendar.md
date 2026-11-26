---
title: Calendar
description: A date field component that allows users to enter and edit date.
component: true
links:
  doc: https://vase-ui.com/components/calendar
  api: https://vase-ui.com/components/calendar#api-reference
---

::component-preview
---
name: CalendarDemo
description: A calendar component.
previewClass: h-[26rem]
---
::

## About

The `<Calendar />` component is built on top of the [Vase UI Calendar](https://vase-ui.com/components/calendar) component. It takes and gives `Temporal` values, such as `Temporal.PlainDate`, and uses no date library.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/vase/range-calendar) component.

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
npx shadcn-vue@latest add calendar
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/calendar) into your project.
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

```vue showLineNumbers
<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
</script>

<template>
  <Calendar />
</template>
```

`v-model` takes a `Temporal.PlainDate`:

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui/calendar'
import { installTemporal } from '@/lib/temporal'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
</script>

<template>
  <Calendar v-model="date" />
</template>
```

## Temporal

`Temporal` is the date and time API of JavaScript. An engine that has no `Temporal` needs a polyfill.

`Calendar` and `RangeCalendar` call `installTemporal()` from `lib/temporal.ts` before they render. It installs the basic `temporal-polyfill` only where `Temporal` is missing. It does nothing where the engine or your app already has a `Temporal`.

Code that reads `Temporal` before a calendar renders, such as the setup of your page, calls `installTemporal()` first:

```ts
import { installTemporal } from '@/lib/temporal'

installTemporal()
```

The types of `Temporal` come with TypeScript 6.0. On an earlier version, add `import 'temporal-polyfill/types/global'` to one file of your project. See [Dates and times](https://vase-ui.com/handbook/dates-and-times) in the Vase UI documentation.

## Calendar Systems (Persian / Hijri / Jalali for example)

`Temporal` supports many calendar systems, such as `persian`, `islamic`, `hebrew` and `japanese`. Here, we'll use the Persian calendar as an example to show how to use calendar systems with the `<Calendar />` component or any other Calendar components.

The `calendar` prop names the calendar system of the grid, and `locale` sets the language of its texts. With no `calendar`, the grid uses the calendar system of the value when it is not ISO, else the one of the locale (`fa-IR` gives `persian`), else `gregory`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui/calendar'
import { installTemporal } from '@/lib/temporal'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
</script>

<template>
  <Calendar
    v-model="date"
    locale="fa-IR"
    calendar="persian"
    dir="rtl"
  />
</template>
```

The value that the component gives back keeps its own calendar system. To start with a date in another calendar system, give a value that has it:

```ts
installTemporal()

const date = ref(Temporal.PlainDate.from({ year: 1404, month: 1, day: 1, calendar: 'persian' }))
// or
const date = ref(Temporal.PlainDate.from('2022-02-03').withCalendar('persian'))
// or
const date = ref(Temporal.Now.plainDateISO().withCalendar('persian'))
```

::component-preview
---
name: CalendarPersianDemo
description: A Persian calendar.
previewClass: h-[30rem]
---
::

## Examples

### Calendar Systems

The basic polyfill has the ISO and Gregorian calendar systems only. For each other calendar system in an engine that needs a polyfill, change the import in `lib/temporal.ts` to `temporal-polyfill/full/shim`. No other file changes. An engine with a native `Temporal` needs neither.

::component-preview
---
name: CalendarSystems
title: Calendar systems
description: A calendar with multiple calendar systems
class: 'mt-8'
previewClass: h-[600px]
---
::

### Month and Year Selector

Set `layout` to `month-and-year`, `month-only` or `year-only` to show the month, the year or both as a select.

::component-preview
---
name: CalendarYearAndMonthSelector
title: Month and Year Selector
description: A calendar with month and year dropdowns.
previewClass: h-[32rem]
---
::

### Date of Birth Picker

::component-preview
---
name: CalendarDateBirth
title: Date of Birth Picker
description: A calendar with date of birth picker.
---
::

### Date and Time Picker

::component-preview
---
name: CalendarDateAndTimePicker
title: Date and Time Picker
description: A calendar with date and time picker.
---
::

### Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

::component-preview
---
name: CalendarNaturalLanguagePicker
title: Natural Language Picker
description: A calendar with natural language picker.
---
::

### Custom Heading and Cell Size

::component-preview
---
name: CalendarCustomCellSize
title: Custom Heading and Cell Size
description: A calendar with custom cell size that's responsive.
class: '**:[.preview]:h-[560px]'
---
::
