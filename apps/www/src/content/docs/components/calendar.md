---
title: Calendar
description: A date field component that allows users to enter and edit date.
source: apps/www/src/lib/registry/default/ui/calendar
primitive: https://www.radix-vue.com/components/calendar.html
---

<ComponentPreview name="CalendarDemo" />

<Callout class="text-base mt-12">

If you're looking for **previous** Calendar implementation, checkout to <span class="font-bold underline">[VCalendar](/docs/components/v-calendar)</span> component

</Callout>

## About

The `<Calendar />` component is built on top of the [RadixVue Calendar](https://www.radix-vue.com/components/calendar.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/range-calendar) component.

## Installation

```bash
npx shadcn-vue@latest add calendar
```
::: tip
The component depends on the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package, which solves a lot of the problems that come with working with dates and times in JavaScript.
Check [Dates & Times in Radix Vue](https://www.radix-vue.com/guides/dates.html) for more information and installation instructions.
:::

## Datepicker

You can use the `<Calendar />` component to build a date picker. See the [Date Picker](/docs/components/date-picker) page for more information.

## Examples

### Form

<ComponentPreview name="CalendarForm" />

## Advanced Customization

### Month & Year Selects

<ComponentPreview name="CalendarWithSelect" />
