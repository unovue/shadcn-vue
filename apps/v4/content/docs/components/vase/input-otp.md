---
title: Input OTP
description: Accessible one-time password component with copy paste functionality.
component: true
links:
  doc: https://vase-ui.com/components/otp-field
  api: https://vase-ui.com/components/otp-field#api-reference
---

::component-preview
---
name: InputOTPDemo
description: An input OTP component.
---
::

## Installation

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add input-otp
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/input-otp) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
</script>

<template>
  <InputOTP v-model="value" :length="6">
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
  </InputOTP>
</template>
```

## Examples

### Pattern

Use the `validation-type` prop to set the characters that a slot accepts: `numeric` (the default), `alpha`, `alphanumeric` or `none`.

::component-preview
---
name: InputOTPPatternDemo
description: An input OTP component with a custom pattern.
---
::

```vue showLineNumbers {2}
<template>
  <InputOTP :length="6" validation-type="alphanumeric">
    <InputOTPGroup>
      <InputOTPSlot />
      <!-- ... -->
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Separator
You can use the `<InputOTPSeparator />` component to add a separator between the input groups.

::component-preview
---
name: InputOTPSeparatorDemo
description: An input OTP component with a separator.
---
::

```vue showLineNumbers {5,17}
<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
// ...
</script>

<template>
  <InputOTP :length="4">
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Controlled
You can use the `v-model` directive to control the input value.

::component-preview
---
name: InputOTPControlledDemo
description: A controlled input OTP component.
---
::

### Form

You can use the InputOTP component within a form, for example with VeeValidate. `length` is required, and a slot takes no `index`.

::component-preview
---
name: InputOTPFormDemo
description: An input OTP component used within a form.
---
::
