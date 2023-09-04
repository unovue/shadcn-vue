---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

 
We use CSS variables for styling. This allows you to easily change the colors of components without having to update class names.

**CSS variables must be defined without the color space function**. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information.

## Hex -> Color Channel

You can use this tool to convert your HEX color to HSL without the color space function. Simply add your color in hex format, copy one of the generated values, then add them to the CSS variable.

<!-- <HexToChannels /> -->

## Convention

We use a simple `background` and `foreground` convention for colors. The `background` variable is used for the background color of the component and the `foreground` variable is used for the text color.

<Callout>

The `background` suffix can be omitted if the variable is used for the background color of the component.

</Callout>

Given the following CSS variables:

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

The `background` color of the following component will be `hsl(var(--primary))` and the `foreground` color will be `hsl(var(--primary-foreground))`.

```svelte
<div class="bg-primary text-primary-foreground">Hello</div>
```

## CSS Variables

Here's the list of variables available for customization:

```css title="Default background color of <body />...etc"
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

```css title="Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch />"
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

```css title="Background color for <Card />"
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

```css title="Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover />"
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

```css title="Default border color"
--border: 214.3 31.8% 91.4%;
```

```css title="Border color for inputs such as <Input />, <Select />, <Textarea />"
--input: 214.3 31.8% 91.4%;
```

```css title="Primary colors for <Button />"
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

```css title="Secondary colors for <Button />"
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

```css title="Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc"
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

```css title="Used for destructive actions such as <Button variant='destructive'>"
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

```css title="Used for focus ring"
--ring: 215 20.2% 65.1%;
```

```css title="Border radius for card, input and buttons"
--radius: 0.5rem;
```

## Default

The following is the default color palette used by the components.

```css title="src/app.postcss"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;

    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --ring: 240 5% 64.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;

    --ring: 240 3.7% 15.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```