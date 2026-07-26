---
title: Calendar
description: A date field component that allows users to enter and edit date.
component: true
links:
  doc: https://reka-ui.com/docs/components/calendar
  api: https://reka-ui.com/docs/components/calendar#api-reference
---

::component-preview
---
name: CalendarDemo
description: A calendar component.
---
::

## About

The `<Calendar />` component is built on top of the [Reka UI Calendar](https://www.reka-ui.com/docs/components/calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](./range-calendar.md) component.

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add calendar
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install reka-ui
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/calendar) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
</script>

<template>
  <Calendar />
</template>
```

## Calendar Systems (Persian / Hijri / Jalali for example)

[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) Supports 13 calendar systems
Here, we'll use the Persian calendar as an example to show how to use calendar systems with the `<Calendar />` component or any other Calendar components.

The default calendar system is `gregory`.<br/>
To use a different calendar system, you need to provide a value with the desired system through the **`defaultPlaceholder`** or **`placeholder`** props.

It's recommended to add either the `placeholder` or `defaultPlaceholder` to the component even if you don't use any other calendar system

```vue
<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, PersianCalendar, toCalendar, today } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue> // no need to add calendar identifier to modelValue when using placeholder

const placeholder = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar())) as Ref<DateValue>
// or
const defaultPlaceholder = toCalendar(today(getLocalTimeZone()))
</script>

<template>
  <Calendar
    v-model="date"
    v-model:placeholder="placeholder"
    locale="fa-IR"
  />
  <!-- or -->
  <Calendar
    v-model="date"
    :default-placeholder="placeholder"
    locale="fa-IR"
  />
</template>
```

If none of these props are provided, the emitted dates will use the `gregorian` calendar by default, since it is the most widely used system.

The emitted value from the Calendar component will vary depending on the specified calendar system identifier. <br />

You can also change the locale using the `locale` prop to match the calendar system interface.

::code-collapsible-wrapper

```vue showLineNumbers
<script setup lang="ts">
import {
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  parseDate,
  PersianCalendar,
  toCalendar,
  today
} from '@internationalized/date'
import { ref } from 'vue'

const date = ref(toCalendar(new CalendarDate(2025, 1, 1), new PersianCalendar()))
// or
const date = ref(toCalendar(parseDate('2022-02-03'), new PersianCalendar()))
// or
const date = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar()))
// or
const date = ref(new CalendarDate(new PersianCalendar(), 1404, 1, 1))
// or
const date = ref(toCalendar(fromDate(new Date(), getLocalTimeZone()), new PersianCalendar()))

const placeholder = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar()))
</script>

<template>
  <Calendar
    v-model="date"
    v-model:placeholder="placeholder"
    locale="fa-IR"
    dir="rtl"
  />
</template>
```

::

::component-preview
---
name: CalendarPersianDemo
description: A Persian calendar.
---
::

## Examples

### Calendar Systems

importing `createCalendar` into your project will result in all available calendars being included in your bundle. If you wish to limit the supported calendars to reduce bundle sizes, you can create your own implementation that only imports the desired classes. This way, your bundler can tree-shake the unused calendar implementations.

Check [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/), especially the section on [**Calendar Identifiers**](https://react-spectrum.adobe.com/internationalized/date/Calendar.html#calendar-identifiers).

```ts
import { GregorianCalendar, JapaneseCalendar } from '@internationalized/date'

function createCalendar(identifier) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar()
    case 'japanese':
      return new JapaneseCalendar()
    default:
      throw new Error(`Unsupported calendar ${identifier}`)
  }
}
```

::component-preview
---
name: CalendarSystems
title: Calendar systems
description: A calendar with multiple calendar systems
class: '**:[.preview]:h-[560px] mt-8'
---
::

### Month and Year Selector

Make sure to pass either the `placeholder` or `defaultPlaceholder` prop when using this feature.

::component-preview
---
name: CalendarYearAndMonthSelector
title: Month and Year Selector
description: A calendar with month and year dropdowns.
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
