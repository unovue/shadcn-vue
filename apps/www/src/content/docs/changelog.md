---
title: Changelog
description: Latest updates and announcements.
---

## February 2025 - Reka UI & npx shadcn-vue@latest init

We've updated the latest registry to support Reka UI instead of Radix Vue.

The updated CLI is now available. You can now install components, themes, composables, utils and more using `npx shadcn-vue add`.

This is a major step towards distributing code that you and your LLMs can access and use.

<Callout icon="⚠️">

With the released of [Reka UI v2](https://reka-ui.com/), `shadcn-vue@latest` command will now install Reka UI. If you want to keep using [Radix Vue](https://radix-vue.com/), please visit [here](https://radix.shadcn-vue.com/) and run `shadcn-vue@radix` command instead.

</Callout>

1. First up, when you init into a new app, we update your existing Tailwind files instead of overriding.
2. A component now ship its own dependencies. Take the accordion for example, it can define its Tailwind keyframes. When you add it to your project, we’ll update your tailwind.config.ts file accordingly.
3. You can also install remote components using url. `npx shadcn-vue add https://acme.com/registry/navbar.json`.
<!-- 4. We have also improve the init command. It does framework detection and can even init a brand new Next.js app in one command. `npx shadcn init`. -->
4. We have created a new schema that you can use to ship your own component registry. And since it has support for urls, you can even use it to distribute private components.
5. And a few more updates like better error handling and monorepo support.

You can try the new cli today.

```bash
npx shadcn-vue@latest init Sidebar01 Login01
```

### Update Your Project

<Steps>

### Update `components.json`

To update an existing project to use the new CLI, update your `components.json` file to include import aliases for your **components**, **utils**, **ui**, **lib** and **composables**.

```json:line-numbers {7-13} title="components.json" inert
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "tailwind": {
    // ...
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "composables": "@/composables"
  }
}
```

If you're using a different import alias prefix eg `~`, replace `@` with your prefix.

### Run add components

In order to perform Radix Vue to Reka UI migration easily, you can run `add` command for all your existing components.

```bash
npx shadcn-vue@latest add <components>
```

If you're using custom component, you need to migrate them [manually](https://reka-ui.com/docs/guides/migration).

</Steps>

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

The [`Calendar`](/docs/components/calendar.html) component has been updated and is now built on top of the [RadixVue Calendar](https://www.reka-ui.com/components/calendar.html) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

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

[`Drawer`](/docs/components/drawer.html) - A drawer component for vue that is built on top of [Vaul Vue](https://github.com/unovue/vaul-vue).

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

[`Carousel`](/docs/components/carousel.html) - A carousel with motion and swipe built using [Embla](https://www.embla-carousel.com/) library.

<ComponentPreview name="CarouselDemo" />
