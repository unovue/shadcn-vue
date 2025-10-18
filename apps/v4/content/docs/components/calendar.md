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

If you're looking for a range calendar, check out the Range Calendar component.

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
    Copy and paste the GitHub source code into your project.
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
import { Calendar } from "@/components/ui/calendar"
</script>

<template>
  <Calendar />
</template>
```

## Calendar Systems (Persian / Hijri / Jalali for example)

[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) Supports 13 calendar systems
Here, we'll use the Persian calendar as an example to show how to use calendar systems with the `<Calendar />` component or any other Calendar components.

The default calendar system is `gregory`.<br/>
To use a different calendar system, you need to provide a value with the desired system through the `defaultValue`, `modelValue`, or `placeholder` props.

If none of these props are provided, the emitted dates will use the `Gregorian` calendar by default, since it is the most widely used system.

The emitted value from the Calendar component will vary depending on the specified calendar system identifier. <br />

You can also change the locale using the `locale` prop to match the calendar system interface.


::code-collapsible-wrapper

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'
import { 
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  parseDate, 
  PersianCalendar, 
  toCalendar,
  today
} from '@internationalized/date'

const date = ref(toCalendar(new CalendarDate(2025, 1, 1), new PersianCalendar()))
// or
const date = ref(toCalendar(parseDate('2022-02-03'), new PersianCalendar()));
// or
const date = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar()));
// or 
const date = ref(new CalendarDate(new PersianCalendar(), 1404, 1, 1));
// or
const date = ref(toCalendar(fromDate(new Date(), getLocalTimeZone()), new PersianCalendar()))
</script>

<template>
  <Calendar
    v-model="date"
    locale="fa-IR"
    dir="rtl"
  />
</template>
```

::

::component-preview
---
name: CalendarPersianDemo
description: A calendar component.
---
::
