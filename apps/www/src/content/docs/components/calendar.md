---
title: Calendar
description: A date field component that allows users to enter and edit date.
---


<ComponentPreview name="CalendarDemo"  /> 

## About

The `Calendar` component is built on top of [VCalendar](https://vcalendar.io/getting-started/installation.html).

## Installation
 
```bash
npx shadcn-vue@latest add calendar
```

<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import { Calendar } from '@/lib/registry/default/ui/calendar'
</script>

<template>
  <Calendar />
</template>
```