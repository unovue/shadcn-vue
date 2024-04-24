---
title: AutoForm
description: Automatically generate a form from Zod schema.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

<Callout class="mt-6">

Credit: Heavily inspired by [AutoForm](https://github.com/vantezzen/auto-form) by Vantezzen

</Callout>

## What is AutoForm

AutoForm is a drop-in form builder for your internal and low-priority forms with existing zod schemas. For example, if you already have zod schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest update form
npx shadcn-vue@latest add auto-form
```

</Steps>

## Field types

Currently, these field types are supported out of the box:

- boolean (checkbox, switch)
- date (date picker)
- enum (select, radio group)
- number (input)
- string (input, textfield)
- file (file)

You can add support for other field types by adding them to the `INPUT_COMPONENTS` object in `auto-form/constants.ts`.

## Zod configuration

### Validations

Your form schema can use any of zod's validation methods including refine.

<Callout>

⚠️ However, there's a known issue with Zod’s `refine` and `superRefine` not executing whenever some object keys are missing.
[Read more](https://github.com/logaretm/vee-validate/issues/4338)

</Callout>

### Descriptions

You can use the `describe` method to set a label for each field. If no label is set, the field name will be used and un-camel-cased.

```ts
const formSchema = z.object({
  username: z.string().describe('Your username'),
  someValue: z.string(), // Will be "Some Value"
})
```

You can also configure the label with [`fieldConfig`](#label) too.

### Optional fields

By default, all fields are required. You can make a field optional by using the `optional` method.

```ts
const formSchema = z.object({
  username: z.string().optional(),
})
```

### Default values

You can set a default value for a field using the `default` method.

```ts
const formSchema = z.object({
  favouriteNumber: z.number().default(5),
})
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

### Sub-objects

You can nest objects to create accordion sections.

```ts
const formSchema = z.object({
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),

    // You can nest objects as deep as you want
    nested: z.object({
      foo: z.string(),
      bar: z.string(),

      nested: z.object({
        foo: z.string(),
        bar: z.string(),
      }),
    }),
  }),
})
```

Like with normal objects, you can use the `describe` method to set a label and description for the section:

```ts
const formSchema = z.object({
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    })
    .describe('Your address'),
})
```

### Select/Enums

AutoForm supports `enum` and `nativeEnum` to create select fields.

```ts
const formSchema = z.object({
  color: z.enum(['red', 'green', 'blue']),
})

enum BreadTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  White = 'White bread',
  Brown = 'Brown bread',
  Wholegrain = 'Wholegrain bread',
  Other,
}
// Keep in mind that zod will validate and return the enum labels, not the enum values!
const formSchema = z.object({
  bread: z.nativeEnum(BreadTypes),
})
```

### Arrays

AutoForm supports arrays _of objects_. Because inferring things like field labels from arrays of strings/numbers/etc. is difficult, only objects are supported.

```ts
const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.number(),
      })
    )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .describe('Guests invited to the party'),
})
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

```ts
const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.number(),
      })
    )
    .describe('Guests invited to the party')
    .default([
      { name: 'John', age: 24, },
      { name: 'Jane', age: 20, },
    ]),
})
```

## Field configuration

As zod doesn't allow adding other properties to the schema, you can use the `fieldConfig` prop to add additional configuration for the UI of each field.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        // fieldConfig
      },
    }"
  />
</template>
```

### Label

You can use the `label` property to customize label if you want to overwrite the pre-defined label via [Zod's description](#descriptions).

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        label: 'Custom username',
      },
    }"
  />
</template>
```

### Description

You can use the `description` property to add a description below the field.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        description: 'Enter a unique username. This will be shown to other users.',
      },
    }"
  />
</template>
```

### Input props

You can use the `inputProps` property to pass props to the input component. You can use any props that the HTML component accepts.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        inputProps: {
          type: 'text',
          placeholder: 'Username',
        },
      },
    }"
  />
</template>

// This will be rendered as:
<input type="text" placeholder="Username" />
```

Disabling the label of an input can be done by using the `showLabel` property in `inputProps`.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        inputProps: {
          type: 'text',
          placeholder: 'Username',
          showLabel: false,
        },
      },
    }"
  />
</template>
```

### Component

By default, AutoForm will use the Zod type to determine which input component to use. You can override this by using the `component` property.

```vue
<template>
  <AutoForm
    :field-config="{
      acceptTerms: {
        // Booleans use a checkbox by default, use a switch instead
        component: 'switch',
      },
    }"
  />
</template>
```

The complete list of supported field types is typed. Current supported types are:

- `checkbox` (default for booleans)
- `switch`
- `date` (default for dates)
- `select` (default for enums)
- `radio`
- `textarea`

Alternatively, you can pass a Vue component to the `component` property to use a custom component.

In `CustomField.vue`

```vue
<script setup lang="ts">
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { AutoFormLabel } from '@/ui/auto-form'

const props = defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label }}
      </AutoFormLabel>
      <FormControl>
        <CustomInput v-bind="slotProps" />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

Pass the above component in `fieldConfig`.

```vue
<template>
  <AutoForm
    :field-config="{
      username: {
        component: CustomField,
      },
    }"
  />
</template>
```

### Named slot

You can use Vue named slot to customize the rendered `AutoFormField`.

```vue
<template>
  <AutoForm
    :field-config="{
      customParent: {
        label: 'Wrapper',
      },
    }"
  >
    <template #customParent="slotProps">
      <div class="flex items-end space-x-2">
        <AutoFormField v-bind="slotProps" class="w-full" />
        <Button type="button">
          Check
        </Button>
      </div>
    </template>
  </AutoForm>
</template>
```

### Accessing the form data

There are two ways to access the form data:

### @submit

The preferred way is to use the `submit` emit. This will be called when the form is submitted and the data is valid.

```vue
<template>
  <AutoForm
    @submit="(data) => {
      // Do something with the data
    }"
  />
</template>
```

### Controlled form

By passing the `form` as props, you can control and use the method provided by `Form`.

```vue
<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const schema = z.object({
  username: z.string(),
})
const form = useForm({
  validationSchema: toTypedSchema(schema),
})

form.setValues({
  username: 'foo'
})
</script>

<template>
  <AutoForm :form="form" :schema="schema" />
</template>
```

### Submitting the form

You can use any `button` component to create a submit button. Most importantly is to add attributes `type="submit"`.

```vue
<template>
  <AutoForm>
    <CustomButton type="submit">
      Send now
    </CustomButton>
  </AutoForm>

  // or
  <AutoForm>
    <button type="submit">
      Send now
    </button>
  </AutoForm>
</template>
```

### Adding other elements

All children passed to the `AutoForm` component will be rendered below the form.

```vue
<template>
  <AutoForm>
    <Button>Send now</Button>
    <p class="text-gray-500 text-sm">
      By submitting this form, you agree to our
      <a href="#" class="text-primary underline">
        terms and conditions
      </a>.
    </p>
  </AutoForm>
</template>
```

### Dependencies

AutoForm allows you to add dependencies between fields to control fields based on the value of other fields. For this, a `dependencies` array can be passed to the `AutoForm` component.

```vue
<template>
  <AutoForm
    :dependencies="[
      {
        // 'age' hides 'parentsAllowed' when the age is 18 or older
        sourceField: 'age',
        type: DependencyType.HIDES,
        targetField: 'parentsAllowed',
        when: age => age >= 18,
      },
      {
        // 'vegetarian' checkbox hides the 'Beef Wellington' option from 'mealOptions'
        // if its not already selected
        sourceField: 'vegetarian',
        type: DependencyType.SETS_OPTIONS,
        targetField: 'mealOptions',
        when: (vegetarian, mealOption) =>
          vegetarian && mealOption !== 'Beef Wellington',
        options: ['Pasta', 'Salad'],
      },
    ]"
  />
</template>
```

The following dependency types are supported:

- `DependencyType.HIDES`: Hides the target field when the `when` function returns true
- `DependencyType.DISABLES`: Disables the target field when the `when` function returns true
- `DependencyType.REQUIRES`: Sets the target field to required when the `when` function returns true
- `DependencyType.SETS_OPTIONS`: Sets the options of the target field to the `options` array when the `when` function returns true

The `when` function is called with the value of the source field and the value of the target field and should return a boolean to indicate if the dependency should be applied.

Please note that dependencies will not cause the inverse action when returning `false` - for example, if you mark a field as required in your zod schema (i.e. by not explicitly setting `optional`), returning `false` in your `REQURIES` dependency will not mark it as optional. You should instead use zod's `optional` method to mark as optional by default and use the `REQURIES` dependency to mark it as required when the dependency is met.

Please note that dependencies do not have any effect on the validation of the form. You should use zod's `refine` method to validate the form based on the value of other fields.

You can create multiple dependencies for the same field and dependency type - for example to hide a field based on multiple other fields. This will then hide the field when any of the dependencies are met.

## Example

### Basic

<ComponentPreview name="AutoFormBasic" />

### Input Without Label
This example shows how to use AutoForm input without label.

<ComponentPreview name="AutoFormInputWithoutLabel" />

### Sub Object
Automatically generate a form from a Zod schema.

<ComponentPreview name="AutoFormSubObject" />

### Controlled
This example shows how to use AutoForm in a controlled way.

<ComponentPreview name="AutoFormControlled" />

### Confirm Password
Refined schema to validate that two fields match.

<ComponentPreview name="AutoFormConfirmPassword" />

### API Example
The form select options are fetched from an API.

<ComponentPreview name="AutoFormApi" />

### Array support
You can use arrays in your schemas to create dynamic forms.

<ComponentPreview name="AutoFormArray" />

### Dependencies
Create dependencies between fields.

<ComponentPreview name="AutoFormDependencies" />
