---
title: Form
description: Building forms with VeeValidate and Zod.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
component: true
---

::callout{title="We are not actively developing this component anymore."}

The Form component is an abstraction over the `vee-validate` library. Going forward, we recommend using the [`<Field />`](/docs/components/field) component to build forms. See the [Form](/docs/forms) documentation for more information.

::

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

In this guide, we will take a look at building forms with [`vee-validate`](https://vee-validate.logaretm.com/v4/) and [`zod`](https://zod.dev). We're going to use a `<FormField>` component to compose accessible forms using Reka UI components.

## Features

The `<Form />` component is a wrapper around the `vee-validate` library. It provides a few things:

- Composable components for building forms.
- A `<FormField />` component for building controlled form fields.
- Form validation using `zod`.
- Applies the correct `aria` attributes to form fields based on states, handle unique IDs
- Built to work with all Reka UI components.
- Bring your own schema library. We use `zod` but you can use any other supported schema validation you want, like [`yup`](https://github.com/jquense/yup) or [`valibot`](https://valibot.dev/).
- **You have full control over the markup and styling.**

[`vee-validate`](https://vee-validate.logaretm.com/v4/) makes use of two flavors to add validation to your forms.
- Composition API
- Higher-order components (HOC)

## Anatomy

```vue
<template>
  <Form>
    <FormField>
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
</template>
```

## Example

::tabs{default-value="component"}

  ::tabs-list

    ::tabs-trigger{value="component"}
    Component
    ::

    ::tabs-trigger{value="native"}
    Native
    ::

  ::

  ::tabs-content{value="component"}

  #### `Input` Component

  ```vue showLineNumbers
  <template>
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
  </template>
  ```

  ::

  ::tabs-content{value="native"}

  #### native `input` element

  ```vue showLineNumbers
  <template>
    <FormField v-slot="{ field }">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <input placeholder="shadcn" v-bind="field">
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
  </template>
  ```

  ::
::

## Installation

::tabs{default-value="cli"}

  ::tabs-list

    ::tabs-trigger{value="cli"}
    CLI
    ::

    ::tabs-trigger{value="manual"}
    Manual
    ::

  ::

  ::tabs-content{value="cli"}

  ```bash
  npx shadcn-vue@latest add form
  ```

  ::

  ::tabs-content{value="manual"}

    ::steps
      ::step
      Install the following dependency:
      ::

      ```bash
      npm install reka-ui vee-validate @vee-validate/zod zod
      ```

      ::step
      Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/form) into your project.
      ::

      ::step
      Update the import paths to match your project setup.
      ::
    ::

  ::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
</script>

<template>
  <FormField v-slot="{ componentField }" name="username">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" v-bind="componentField" />
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

### Create a form schema

  Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev).

  Use `@vee-validate/zod` to integrate Zod schema validation with `vee-validate`

  `toTypedSchema` also makes the form values and submitted values typed automatically and caters for both input and output types of that schema.

  ```vue showLineNumbers {2-3,5-7}
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

  ::tabs{default-value="composition"}

    ::tabs-list

      ::tabs-trigger{value="composition"}
      Composition
      ::

      ::tabs-trigger{value="component"}
      Component
      ::

    ::

    ::tabs-content{value="composition"}

    ```vue showLineNumbers {2,19-21}
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

    ::

    ::tabs-content{value="component"}

    ```vue showLineNumbers {5,24-26}
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

    ::

### Build your form

  Based on last step we can either use `<Form />` component or `useForm` composable
  `useForm` is recommended because values are typed automatically

  ```vue showLineNumbers {2}
  <script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
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

  ::component-preview
  ---
  name: InputForm
  class: '[&_[role=tablist]]:hidden [&>div>div:first-child]:hidden'
  ---
  ::

::

<!-- ## Extras

This example shows how to add motion to your forms with [Formkit AutoAnimate](https://auto-animate.formkit.com/)

**Note:** You need to install `@formkit/auto-animate` to use this feature:

```bash
npm install @formkit/auto-animate
```

::component-preview
---
name: InputFormAutoAnimate
---
:: -->
