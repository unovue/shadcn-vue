---
title: Calendar
description: A date field component that allows users to enter and edit date.
source: apps/www/src/lib/registry/default/ui/calendar
primitive: https://vcalendar.io/
---

<ComponentPreview name="VCalendarDemo" />

## About

The `Calendar` component is built on top of [VCalendar](https://vcalendar.io/getting-started/installation.html).

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add calendar
```
</template>

<template #Manual>

<Steps>

### Install the following dependency

```bash
npm install v-calendar
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/v-calendar/Calendar.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Calendar } from '@/components/ui/v-calendar'
</script>

<template>
  <Calendar />
</template>
```

The API is essentially the same, i.e. props and slots. See the [VCalendar](https://vcalendar.io/getting-started/installation.html) documentation for more information.

### Slots

The slots available are [those currently supported](https://github.com/nathanreyes/v-calendar/blob/v3.1.2/src/components/Calendar/CalendarSlot.vue#L16-L28) by VCalendar, namely :

- `day-content`
- `day-popover`
- `dp-footer`
- `footer`
- `header-title-wrapper`
- `header-title`
- `header-prev-button`
- `header-next-button`
- `nav`
- `nav-prev-button`
- `nav-next-button`
- `page`
- `time-header`

Example using the `day-content` slot:

```vue
<script setup lang="ts">
import { Calendar } from '@/components/ui/v-calendar'
</script>

<template>
  <Calendar>
    <template #day-content="{ day, dayProps, dayEvents }">
      <div v-bind="dayProps" v-on="dayEvents">
        {{ day.label }}
      </div>
    </template>
  </Calendar>
</template>
```
