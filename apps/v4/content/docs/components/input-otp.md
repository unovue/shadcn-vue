---
title: Input OTP
description: Accessible one-time password component with copy paste functionality.
component: true
links:
  doc: https://vue-input-otp.vercel.app/
---

::component-preview
---
name: InputOTPDemo
description: An input OTP component.
---
::

## Installation

::code-tabs

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
npx shadcn-vue@latest add input-otp
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install vue-input-otp
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-otp) into your project.
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
</script>

<template>
  <InputOTP v-model="value" :maxlength="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

## Examples

### Pattern

Use the `pattern` prop to define a custom pattern for the OTP input.

::component-preview
---
name: InputOTPPatternDemo
description: An input OTP component with a custom pattern.
---
::

```vue showLineNumbers {2,9}
<script setup lang="ts">
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'
// ...
</script>

<template>
  <InputOTP
    maxlength="6"
    :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
  >
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
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
  <InputOTP maxlength="4">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
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

You can use the InputOTP component within a form, for example with VeeValidate.

::component-preview
---
name: InputOTPFormDemo
description: An input OTP component used within a form.
---
::
