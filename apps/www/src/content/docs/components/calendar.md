---
title: Calendar
description: A date field component that allows users to enter and edit date.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="CalendarDemo"  /> 

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


<<< @/lib/registry/default/ui/calendar/Calendar.vue


</Steps>


</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Calendar } from '{{codeConfig.aliases.components}}/ui/calendar'
</script>

<template>
  <{{codeConfig.prefix}}Calendar />
</template>
```

See the [VCalendar](https://vcalendar.io/getting-started/installation.html) documentation for more information.

