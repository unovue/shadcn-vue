# Demo Components

This directory contains individual demo components that match the examples from the [shadcn/ui React library](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/examples). These components are Vue 3 adaptations using the Composition API with `<script setup>` syntax.

## Structure

The demo components are organized by component type and demonstrate specific use cases or variations:

### Accordion
- `AccordionDemo.vue` - Basic accordion with collapsible sections

### Alert
- `AlertDemo.vue` - Various alert types with icons, titles, and descriptions
- `AlertDestructive.vue` - Error/destructive alert example

### Avatar
- `AvatarDemo.vue` - Avatar with images and fallback text

### Badge
- `BadgeDemo.vue` - All badge variants and with icons
- `BadgeDestructive.vue` - Destructive badge
- `BadgeOutline.vue` - Outline badge
- `BadgeSecondary.vue` - Secondary badge

### Button
- `ButtonDemo.vue` - Basic button
- `ButtonDestructive.vue` - Destructive button
- `ButtonGhost.vue` - Ghost button
- `ButtonIcon.vue` - Icon-only button
- `ButtonLink.vue` - Link-styled button
- `ButtonLoading.vue` - Button with loading spinner
- `ButtonOutline.vue` - Outline button
- `ButtonSecondary.vue` - Secondary button
- `ButtonWithIcon.vue` - Button with icon and text

### Card
- `CardDemo.vue` - Login form card example

### Checkbox
- `CheckboxDemo.vue` - Various checkbox examples with labels
- `CheckboxDisabled.vue` - Disabled checkbox

### Dialog
- `DialogDemo.vue` - Modal dialog with form

### Input
- `InputDemo.vue` - Basic input field
- `InputDisabled.vue` - Disabled input
- `InputWithButton.vue` - Input with adjacent button
- `InputWithLabel.vue` - Input with label

### Label
- `LabelDemo.vue` - Label with checkbox

### Popover
- `PopoverDemo.vue` - Popover with form fields

### Progress
- `ProgressDemo.vue` - Animated progress bar

### Select
- `SelectDemo.vue` - Dropdown select with options

### Separator
- `SeparatorDemo.vue` - Horizontal and vertical separators

### Skeleton
- `SkeletonDemo.vue` - Loading skeleton with avatar and text

### Slider
- `SliderDemo.vue` - Range slider

### Switch
- `SwitchDemo.vue` - Toggle switch with label

### Tabs
- `TabsDemo.vue` - Tabbed interface with forms

### Textarea
- `TextareaDemo.vue` - Basic textarea
- `TextareaDisabled.vue` - Disabled textarea

### Tooltip
- `TooltipDemo.vue` - Tooltip on button hover

## Usage

Import and use any demo component:

```vue
<script setup lang="ts">
import { ButtonDemo } from '@/components/demo'
</script>

<template>
  <ButtonDemo />
</template>
```

Or import individual components:

```vue
<script setup lang="ts">
import ButtonDemo from '@/components/demo/ButtonDemo.vue'
</script>

<template>
  <ButtonDemo />
</template>
```

## Key Features

- **Vue 3 Composition API**: All demos use `<script setup>` syntax
- **TypeScript Support**: Fully typed components
- **Icon Integration**: Uses `lucide-vue-next` for icons
- **Consistent Styling**: Follows the same design patterns as the React examples
- **Component Imports**: Uses the `@/registry/new-york-v4/ui/` path structure

## Differences from React Examples

- Uses Vue 3 reactive syntax (`ref`, `onMounted`) instead of React hooks
- Event handling uses Vue's event syntax (`@click` vs `onClick`)
- Conditional rendering uses `v-if` instead of JSX conditionals
- Two-way binding uses `v-model` where appropriate
- Prop binding uses Vue's binding syntax (`:prop` vs `prop={}`)

## Existing Comprehensive Demos

The project also includes comprehensive "sink" demos in `./sink/` that showcase multiple variations of each component in a single demo. These individual demos complement those by providing focused, single-use-case examples that match the React library structure.