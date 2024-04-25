---
title: VeeValidate
description: Building forms with VeeValidate and Zod.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

In this guide, we will take a look at building forms with [`vee-validate`](https://vee-validate.logaretm.com/v4/) and [`zod`](https://zod.dev). We're going to use a `<FormField>` component to compose accessible forms using Radix Vue components.

## Features

The `<Form />` component is a wrapper around the `vee-validate` library. It provides a few things:

- Composable components for building forms.
- A `<FormField />` component for building controlled form fields.
- Form validation using `zod`.
- Applies the correct `aria` attributes to form fields based on states, handle unqiue IDs
- Built to work with all Radix Vue components.
- Bring your own schema library. We use `zod` but you can use any other supported schema validation you want, like [`yup`](https://github.com/jquense/yup) or [`valibot`](https://valibot.dev/).
- **You have full control over the markup and styling.**

[`vee-validate`](https://vee-validate.logaretm.com/v4/) makes use of two flavors to add validation to your forms.
- Composition API
- Higher-order components (HOC)

## Anatomy

```vue
<Form>
  <FormField v-slot="{ ... }">
    <FormItem>
      <FormLabel />
      <FormControl>
        <!-- any Form Input component or native input elements -->
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</Form>
```

## Example

<TabPreview name="Component" :names="['Component', 'Native']">
<template #Component>

#### `Input` Component

```vue
<FormField v-slot="{ componentField }">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input placeholder="shadcn" v-bind="componentField" />
    </FormControl>
    <FormDescription />
    <FormMessage />
  </FormItem>
</FormField>
```

</template>

<template #Native>

#### native `input` element

```vue
<FormField v-slot="{ field }">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <input placeholder="shadcn" v-bind="field" />
    </FormControl>
    <FormDescription />
    <FormMessage />
  </FormItem>
</FormField>
```

</template>
</TabPreview>

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add form
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue vee-validate @vee-validate/zod zod
```

### Copy and paste the following codes into your project:

`index.ts`

<<< @/lib/registry/default/ui/form/index.ts

`FormItem.vue`

<<< @/lib/registry/default/ui/form/FormItem.vue

`FormLabel.vue`

<<< @/lib/registry/default/ui/form/FormLabel.vue

`FormControl.vue`

<<< @/lib/registry/default/ui/form/FormControl.vue

`FormMessage.vue`

<<< @/lib/registry/default/ui/form/FormMessage.vue

`FormDescription.vue`

<<< @/lib/registry/default/ui/form/FormDescription.vue

### Update the import paths to match your project setup.

</Steps>

</template>
</TabPreview>

## Usage

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev).

Use `@vee-validate/zod` to integrate Zod schema validation with `vee-validate`

`toTypedSchema` also makes the form values and submitted values typed automatically and caters for both input and output types of that schema.

```vue:line-numbers {2-3,5-7}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))
</script>
```

### Define a form

Use the `useForm` composable from `vee-validate` or use `<Form />` component to create a form.

<TabPreview name="Composition" :names="['Composition', 'Component']">
<template #Composition>

```vue:line-numbers {2,19-21}
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit">
    ...
  </form>
</template>
```

</template>

<template #Component>

```vue:line-numbers {5,24-26}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

function onSubmit(values) {
  console.log('Form submitted!', values)
}
</script>

<template>
  <Form :validation-schema="formSchema" @submit="onSubmit">
    ...
  </Form>
</template>
```

</template>
</TabPreview>

### Build your form

Based on last step we can either use `<Form />` component or `useForm` composable
`useForm` is recommended because values are typed automatically

```vue:line-numbers {2}
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
```

### Done

That's it. You now have a fully accessible form that is type-safe with client-side validation.

<ComponentPreview
  name="InputForm"
  class="[&_[role=tablist]]:hidden [&>div>div:first-child]:hidden"
/>

</Steps>

## Examples

See the following links for more examples on how to use the `vee-validate` features with other components:

- [Checkbox](/docs/components/checkbox#form)
- [Date Picker](/docs/components/date-picker#form)
- [Input](/docs/components/input#form)
- [Radio Group](/docs/components/radio-group#form)
- [Select](/docs/components/select#form)
- [Slider](/docs/components/slider#form)
- [Switch](/docs/components/switch#form)
- [Textarea](/docs/components/textarea#form)
- [Combobox](/docs/components/combobox#form)

## Extras

This example shows how to add motion to your forms with [Formkit AutoAnimate](https://auto-animate.formkit.com/)

<ComponentPreview name="InputFormAutoAnimate" />
