---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

 
You can choose between using CSS variables or Tailwind CSS utility classes for theming.

## Utility classes

```html /bg-zinc-950/ /text-zinc-50/ /dark:bg-white/ /dark:text-zinc-950/
<div class="bg-zinc-950 dark:bg-white" />
```

To use utility classes for theming set `tailwind.cssVariables` to `false` in your `components.json` file.

```json {7} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": false
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## CSS Variables

```html /bg-background/ /text-foreground/
<div class="bg-background text-foreground" />
```

To use CSS variables for theming set `tailwind.cssVariables` to `true` in your `components.json` file.
 

```json {7} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Convention

We use a simple `background` and `foreground` convention for colors. The `background` variable is used for the background color of the component and the `foreground` variable is used for the text color.

<Callout class="mt-4">

The `background` suffix is omitted when the variable is used for the background color of the component.

</Callout>

Given the following CSS variables:

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

The `background` color of the following component will be `hsl(var(--primary))` and the `foreground` color will be `hsl(var(--primary-foreground))`.

```html
<div class="bg-primary text-primary-foreground">Hello</div>
```

<Callout>

**CSS variables must be defined without color space function**. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information.

</Callout>

### List of variables

Here's the list of variables available for customization:

<Steps>

```css
/* Default background color of <body />...etc */
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

```css 
/* Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch /> */
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

```css 
/* Background color for <Card /> */
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

```css 
/* Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover /> */
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

```css 
/* Default border color */
--border: 214.3 31.8% 91.4%;
```

```css 
/* Border color for inputs such as <Input />, <Select />, <Textarea /> */
--input: 214.3 31.8% 91.4%;
```

```css 
/* Primary colors for <Button /> */
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

```css 
/* Secondary colors for <Button /> */
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

```css 
/* Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc */
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

```css 
/* Used for destructive actions such as <Button variant="destructive"> */
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

```css 
/* Used for focus ring */
--ring: 215 20.2% 65.1%;
```

```css 
/* Border radius for card, input and buttons */
--radius: 0.5rem;
```

</Steps>

### Adding new colors

To add new colors, you need to add them to your CSS file and to your `tailwind.config.js` file.

```css title="app/globals.css"
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

```js {5-6} title="tailwind.config.js"
module.exports = {
  theme: {
    extend: {
      colors: {
        'warning': 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
      },
    },
  },
}
```

You can now use the `warning` utility class in your components.

```html /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground" />
```

### Other color formats

I recommend using [HSL colors](https://www.smashingmagazine.com/2021/07/hsl-colors-css/) for theming but you can also use other color formats if you prefer.

See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information on using `rgb`, `rgba` or `hsl` colors.




## Hex -> Color Channel

You can use this tool to convert your HEX color to HSL without the color space function. Simply add your color in hex format, copy one of the generated values, then add them to the CSS variable.

<!-- <HexToChannels /> -->
