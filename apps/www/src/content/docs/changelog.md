---
title: Changelog
description: Latest updates and announcements.
---

## June 2024

### New Component - Number Field
A new component has been added to the project [`NumberField`](/docs/components/number-field.html).

A number field allows a user to enter a number and increment or decrement the value using stepper buttons.

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

## May 2024

### New Component - Charts
Several kinds of chart components has been added to the project.

Charts are versatile visualization tools, allowing users to represent data using various options for effective analysis.

1. [`Area Chart`](/docs/charts/area) - An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.

<ComponentPreview name="AreaChartDemo"  />

2. [`Bar Chart`](/docs/charts/bar) - A line chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.

<ComponentPreview name="BarChartDemo"  />

3. [`Donut Chart`](/docs/charts/donut) - A line chart visually represents data in a circular form, similar to a pie chart but with a central void, emphasizing proportions within categories.

<ComponentPreview name="DonutChartDemo"  />

4. [`Line Chart`](/docs/charts/line) - A line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.

<ComponentPreview name="LineChartDemo"  />

### New Component - Auto Form

[`Auto Form`](/docs/components/auto-form.html) is a drop-in form builder for your internal and low-priority forms with existing zod schemas.

For example, if you already have zod schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

The following form has been created by passing a `zod` schema object to our `AutoForm` component.

<ComponentPreview name="AutoFormBasic" />

## April 2024

### Component Updated - Calendar

The [`Calendar`](/docs/components/calendar.html) component has been updated and is now built on top of the [RadixVue Calendar](https://www.radix-vue.com/components/calendar.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [`Range Calendar`](/docs/components/range-calendar.html) component.

And if you're looking for a date picker input, check out the [`Date Picker`](/docs/components/date-picker.html) component.

<ComponentPreview name="CalendarDemo" />

<ComponentPreview name="RangeCalendarDemo" />

<ComponentPreview name="DatePickerDemo" />

### Building Blocks for the Web

[`Blocks`](/blocks) are composed of different components that can be used to build your apps, with each block being a standalone section of your application. These blocks are fully responsive, accessible, and composable, and are built using the same principles as the other components in `shadcn-vue`.

<div>
    <image
        src="/examples/block-dark.png"
        :width="1280"
        :height="727"
        alt="Building Blocks"
        class="hidden dark:block"
    />
    <image
        src="/examples/block-light.png"
        :width="1280"
        :height="727"
        alt="Building Blocks"
        class="block dark:hidden"
    />
</div>

## March 2024

### New Component - Breadcrumb

[`Breadcrumb`](/docs/components/breadcrumb.html) displays the path to the current resource using a hierarchy of links.

<ComponentPreview name="BreadcrumbDemo" />

### New Component - Pin Input (OTP Input)

[`Pin Input`](/docs/components/pin-input.html) allows users to input a sequence of one-character alphanumeric inputs.

<ComponentPreview name="PinInputDemo" />

### New Component - Resizable

[`Resizable`](/docs/components/resizable.html) - Accessible resizable panel groups and layouts with keyboard support.

<ComponentPreview name="ResizableDemo" />

### New Component - Drawer

[`Drawer`](/docs/components/drawer.html) - A drawer component for vue that is built on top of [Vaul Vue](https://github.com/radix-vue/vaul-vue).

<ComponentPreview name="DrawerDemo" />

## February 2024

### New Component - Tag Inputs

[`Tag inputs`](/docs/components/tags-input.html) render tags inside an input, followed by an actual text input.

<ComponentPreview name="TagsInputDemo" />

## January 2024

### New Component - Sonner

[`Sonner`](/docs/components/sonner.html) is an opinionated toast component for Vue.

The Sonner component is provided by [vue-sonner](https://vue-sonner.vercel.app/), which is a Vue port of Sonner, originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

<ComponentPreview name="SonnerDemo" />

### New Component - Toggle Group

[`Toggle Group`](/docs/components/toggle-group.html) - A set of two-state buttons that can be toggled on or off.

<ComponentPreview name="ToggleGroupDemo" />

### New Component - Carousel

[`Carousel`](/docs/components/toggle-group.html) - A carousel with motion and swipe built using [Embla](https://www.embla-carousel.com/) library.

<ComponentPreview name="CarouselDemo" />
