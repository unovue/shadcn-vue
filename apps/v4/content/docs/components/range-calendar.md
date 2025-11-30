---
title: Range Calendar
description: Presents a calendar view tailored for selecting date ranges.
component: true
links:
  doc: https://reka-ui.com/docs/components/range-calendar
  api: https://reka-ui.com/docs/components/range-calendar#api-reference
---

::component-preview
---
name: CalendarRangeDemo
---
::

## About

The `<RangeCalendar />` component is built on top of the [Reka UI Range Calendar](https://www.reka-ui.com/docs/components/date-range-picker.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a normal calendar, check out the [Calendar](./calendar.md) component.

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
npx shadcn-vue@latest add range-calendar
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/range-calendar) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage
```vue
<script setup lang="ts">
import { RangeCalendar } from "@/components/ui/range-calendar";
</script>

<template>
  <RangeCalendar />
</template>
```
