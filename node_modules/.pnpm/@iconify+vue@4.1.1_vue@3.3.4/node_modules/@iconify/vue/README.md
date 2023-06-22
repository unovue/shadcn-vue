# Iconify for Vue

Iconify for Vue is not yet another icon component! There are many of them already.

What you get with other components:

-   Limited set of icons.
-   Large bundle size because all icons are bundled.

Iconify icon component is nothing like that. Component does not include any icon data, it is not tied to any specific icon set. Instead, all data is retrieved from public API on demand.

That means:

-   One syntax for over 100,000 icons from 100+ icon sets.
-   Renders SVG. Many components simply render icon fonts, which look ugly. Iconify renders pixel perfect SVG.
-   Loads icons on demand. No need to bundle icons, component will automatically load icon data for icons that you use from Iconify API.

For more information about Iconify project visit [https://iconify.design/](https://iconify.design/).

For extended documentation visit [Iconify for Vue documentation](https://docs.iconify.design/icon-components/vue/).

## Installation

If you are using NPM:

```bash
npm install --save-dev @iconify/vue
```

If you are using Yarn:

```bash
yarn add --dev @iconify/vue
```

### Vue 2 compatibility

This component is not backwards compatible with Vue 2.

If you are using Vue 2, you need to install `@iconify/vue2` component. It is almost identical to this component, but for Vue 2.

See [Iconify for Vue 2 documentation](https://docs.iconify.design/icon-components/vue2/).

## Usage with API

Install `@iconify/vue` and import `Icon` from it:

```js
import { Icon } from '@iconify/vue';
```

Then use `Icon` component in template with icon name or data as "icon" parameter:

```jsx
<Icon icon="mdi-light:home" />
```

Component will automatically retrieve data for "mdi-light:home" from Iconify API and render it. There are over 100,000 icons available on Iconify API from various free and open source icon sets, including all the most popular icon sets.

## Offline Usage

Retrieving icon data from Iconify API requires visitor to be online. What if you want to use component offline or on local network?

If you want to use icon component without relying on public Iconify API, there are several options:

1. You can import icon data from Iconify Icons packages.
2. You can create custom icon bundles (more efficient, but requires more coding).
3. You can host your own Iconify API instead of relying on third party service.

See [Iconify for Vue offline use documentation](https://docs.iconify.design/icon-components/vue/offline.html) or [Iconify API documentation](https://docs.iconify.design/sources/api/).

## Icon Names

Icon name is a string. Few examples:

-   `@api-provider:icon-set-prefix:icon-name`
-   `mdi-light:home` (in this example API provider is empty, so it is skipped)

It has 3 parts, separated by ":":

-   provider points to API source. Starts with "@", can be empty (empty value is used for public Iconify API).
-   prefix is name of icon set.
-   name is name of icon.

See [Iconify for Vue icon names documentation](https://docs.iconify.design/icon-components/vue/icon-name.html) for more detailed explanation.

## Using icon data

Instead of icon name, you can pass icon data to component:

```vue
<template>
	<Icon :icon="icons.chart" height="24" />
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import areaChartOutlined from '@iconify-icons/ant-design/area-chart-outlined';

export default {
	components: {
		Icon,
	},
	data() {
		return {
			// Assign icon data to icons.chart
			icons: {
				chart: areaChartOutlined,
			},
		};
	},
};
</script>
```

See [icon packages documentation](https://docs.iconify.design/sources/npm/) for more details.

### ES / CommonJS packages

Example above might currently fail with some use cases. Package `@iconify-icons/mdi-light` uses ES modules that some software might not support yet. But do not worry, there is a simple solution: switch to CommonJS icon packages.

To switch to CommonJS package, replace this line in example above:

```js
import home from '@iconify-icons/mdi-light/home';
```

with

```js
import home from '@iconify/icons-mdi-light/home';
```

All icons are available as ES modules for modern bundler and as CommonJS modules for outdated bundlers. ES modules use format `@iconify-icons/{prefix}`, CommonJS modules use `@iconify/icons-{prefix}`.

For more details, see [icon packages documentation](https://docs.iconify.design/sources/npm/).

### Inline

Icons have 2 modes: inline and block. Difference between modes is `vertical-align` that is added to inline icons.

Inline icons are aligned slightly below baseline, so they look centred compared to text, like glyph fonts.

Block icons do not have alignment, like images, which aligns them to baseline by default.

Alignment option was added to make icons look like continuation of text, behaving like glyph fonts. This should make migration from glyph fonts easier.

To toggle between block and inline modes, you can use boolean `inline` property:

```vue
<template>
	<div>
		<p>
			Block:
			<Icon icon="line-md:image-twotone" />
			<Icon icon="mdi:account-box-outline" />
		</p>
		<p>
			Inline:
			<Icon icon="line-md:image-twotone" :inline="true" />
			<Icon icon="mdi:account-box-outline" :inline="true" />
		</p>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
	components: {
		Icon,
	},
};
</script>
```

Visual example to show the difference between inline and block modes:

![Inline icon](https://iconify.design/assets/images/inline.png)

## Icon component properties

`icon` property is mandatory. It tells component what icon to render. If the property value is invalid, the component will render an empty icon. The value can be a string containing the icon name (icon must be registered before use by calling `addIcon` or `addCollection`, see instructions above) or an object containing the icon data.

The icon component has the following optional properties:

-   `inline`. Changes icon behaviour to match icon fonts. See "Inline icon" section below.
-   `width` and `height`. Icon dimensions. The default values are "1em" for both. See "Dimensions" section below.
-   `color`. Icon colour. This is the same as setting colour in style. See "Icon colour" section below.
-   `flip`, `horizontalFlip`, `verticalFlip`. Flip icon horizontally and/or vertically. See "Transformations" section below.
-   `rotate`. Rotate icon by 90, 180 or 270 degrees. See "Transformations" section below.
-   `align`, `verticalAlign`, `horizontalAlign`, `slice`. Icon alignment. See "Alignment" section below.
-   `onLoad`. Callback function that is called when icon data has been loaded. See "onLoad" section below.

Note: in templates you can use "camelCase" properties as "kebab-case". For example, `horizontalFlip` can be used as `horizontal-flip`.

### Other properties and events

In addition to the properties mentioned above, the icon component accepts any other properties and events. All other properties and events will be passed to generated `SVG` element, so you can do stuff like assigning click event, setting the inline style, add title and so on.

### Dimensions

By default, icon height is "1em". With is dynamic, calculated using the icon's width to height ratio.

There are several ways to change icon dimensions:

-   Setting `font-size` in style.
-   Setting `width` and/or `height` property.

Values for `width` and `height` can be numbers or strings.

If you set only one dimension, another dimension will be calculated using the icon's width to height ratio. For example, if the icon size is 16 x 24, you set the height to 48, the width will be set to 32. Calculations work not only with numbers, but also with string values.

#### Dimensions as numbers

You can use numbers for `width` and `height`.

```html
<Icon icon="mdi-light:home" :height="24" />
```

```html
<Icon icon="mdi-light:home" :width="16" :height="16" />
```

Note ":" before attribute - in Vue it changes the value to expression, so "20" is a number, not a string.

Number values are treated as pixels. That means in examples above, values are identical to "24px" and "16px".

#### Dimensions as strings without units

If you use strings without units, they are treated the same as numbers in an example above.

```html
<Icon icon="mdi-light:home" height="24" />
```

```html
<Icon icon="mdi-light:home" width="16" height="16" />
```

#### Dimensions as strings with units

You can use units in width and height values:

```html
<Icon icon="mdi-light:home" height="2em" />
```

Be careful when using `calc`, view port based units or percentages. In SVG element they might not behave the way you expect them to behave and when using such units, you should consider settings both width and height.

#### Dimensions as 'auto'

Keyword "auto" sets dimensions to the icon's `viewBox` dimensions. For example, for 24 x 24 icon using `height="auto"` sets height to 24 pixels.

```html
<Icon icon="mdi-light:home" height="auto" />
```

### Icon colour

There are two types of icons: icons that do not have a palette and icons that do have a palette.

Icons that do have a palette, such as emojis, cannot be customised. Setting colour to such icons will not change anything.

Icons that do not have a palette can be customised. By default, colour is set to "currentColor", which means the icon's colour matches text colour. To change the colour you can:

-   Set `color` style or use stylesheet to target icon. If you are using the stylesheet, target `svg` element.
-   Add `color` property.

Examples:

Using `color` property:

```html
<Icon icon="eva:alert-triangle-fill" color="red" />
<Icon icon="eva:alert-triangle-fill" color="#f00" />
```

Using inline style:

```html
<Icon icon="eva:alert-triangle-fill" style="color: red;" />
<Icon icon="eva:alert-triangle-fill" :style="{color: 'red'}" />
<Icon icon="eva:alert-triangle-fill" :style="{color: '#f00'}" />
```

Using stylesheet:

```vue
<template>
	<Icon icon="eva:alert-triangle-fill" class="red-icon" />
</template>

<style>
.red-icon {
	color: red;
}
</style>
```

### Transformations

You can rotate and flip the icon.

This might seem redundant because icon can also be rotated and flipped using CSS transformations. So why do transformation properties exist? Because it is a different type of transformation.

-   CSS transformations transform the entire icon.
-   Icon transformations transform the contents of the icon.

If you have a square icon, this makes no difference. However, if you have an icon that has different width and height values, it makes a huge difference.

Rotating 16x24 icon by 90 degrees results in:

-   CSS transformation keeps 16x24 bounding box, which might cause the icon to overlap text around it.
-   Icon transformation changes bounding box to 24x16, rotating content inside an icon.

See [icon transformations documentation](https://docs.iconify.design/icon-components/vue/transform.html) for more details.

#### Flipping an icon

There are several properties available to flip an icon:

-   `horizontal-flip` or `h-flip`: boolean property, flips icon horizontally.
-   `vertical-flip` or `v-flip`: boolean property, flips icon vertically.
-   `flip`: shorthand string property, can flip icon horizontally and/or vertically.

Examples:

Flip an icon horizontally:

```html
<Icon icon="eva:alert-triangle-fill" :h-flip="true" />
<Icon icon="eva:alert-triangle-fill" :horizontal-flip="true" />
<Icon icon="eva:alert-triangle-fill" flip="horizontal" />
```

Flip an icon vertically:

```html
<Icon icon="eva:alert-triangle-fill" :v-flip="true" />
<Icon icon="eva:alert-triangle-fill" :vertical-flip="true" />
<Icon icon="eva:alert-triangle-fill" flip="vertical" />
```

Flip an icon horizontally and vertically (the same as 180 degrees rotation):

```html
<Icon icon="eva:alert-triangle-fill" :h-flip="true" :v-flip="true" />
<Icon
	icon="eva:alert-triangle-fill"
	:horizontal-flip="true"
	:vertical-flip="true"
/>
<Icon icon="eva:alert-triangle-fill" flip="horizontal,vertical" />
```

Why are there multiple boolean properties for flipping an icon?

In components for other frameworks, properties for flipping an icon are `hFlip` and `vFlip`. Vue has special treatment for properties that start with v-, so `vFlip` (same applies to `vAlign` attribute) attribute is not available without using tricky syntax.

Because of that, Vue component uses longer property names: `verticalFlip` instead of `vFlip` and `horizontalFlip` instead of `hFlip` for consistency.

#### Rotating an icon

An icon can be rotated by 90, 180 and 270 degrees. Only contents of the icon are rotated.

To rotate an icon, use `rotate` property. Value can be a string (degrees or percentages) or a number.

Number values are 1 for 90 degrees, 2 for 180 degrees, 3 for 270 degrees.

Examples of 90 degrees rotation:

```html
<Icon icon="eva:alert-triangle-fill" :rotate="1" />
<Icon icon="eva:alert-triangle-fill" rotate="90deg" />
<Icon icon="eva:alert-triangle-fill" rotate="25%" />
```

### onLoad

`onLoad` property is an optional callback function. It is called when icon data has been loaded.

It is not an event, such as `onClick` event for links, it is a simple callback function.

When `onLoad` is called:

-   If value of icon property is an object, `onLoad` is not called.
-   If value of icon property is a string and icon data is available, `onLoad` is called on first render.
-   If value of icon property is a string and icon data is not available, `onLoad` is called on first re-render after icon data is retrieved from API.

What is the purpose of `onLoad`? To let you know when Icon component renders an icon and when it does not render anything. This allows you to do things like adding class name for parent element, such as "container--with-icon" that modify layout if icon is being displayed.

## Full documentation

For extended documentation visit [Iconify for Vue documentation](https://docs.iconify.design/icon-components/vue/).

## License

Vue component is released with MIT license.

© 2020 - 2022 Vjacheslav Trushkin / Iconify OÜ

See [Iconify icon sets page](https://icon-sets.iconify.design/) for list of collections and their licenses.
