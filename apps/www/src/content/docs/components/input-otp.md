---
title: Input OTP
description: Accessible one-time password component with copy paste functionality.
source: apps/www/src/lib/registry/default/ui/input-otp
primitive: https://vue-input-otp.vercel.app/
---

<ComponentPreview name="InputOtpDemo" />

## About

Input OTP is built on top of [vue-input-otp](https://github.com/wobsoriano/vue-input-otp) by [@wobsoriano](https://github.com/wobsoriano).

## Installation

```bash
npx shadcn-vue@latest add input-otp
```

#### Update `tailwind.config`

```js:line-numbers {6-9,12}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
}
```

## Usage

```vue
<script setup lang="ts">
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot
} from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, idx) in slots.slice(0, 3)" v-bind="slot" :key="idx" />
    </InputOtpGroup>
    <InputOtpSeparator />
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, idx) in slots.slice(3)" v-bind="slot" :key="idx" />
    </InputOtpGroup>
  </InputOtp>
</template>
```

## Examples

### Pattern

Use the `pattern` prop to define a custom pattern for the OTP input.

<ComponentPreview name="InputOtpPattern" />

```vue:line-numbers
<script setup lang="ts">
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot
} from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
    :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, idx) in slots" v-bind="slot" :key="idx" />
    </InputOtpGroup>
  </InputOtp>
</template>
```

### Disabled

<ComponentPreview name="InputOtpDisabled" />

```vue:line-numbers
<script setup lang="ts">
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from '@/lib/registry/default/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
    disabled
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, index) in slots" v-bind="slot" :key="index" />
    </InputOtpGroup>
  </InputOtp>
</template>
```

### Separator

You can use the `<InputOtpSeparator />` component to add a separator between the input groups.

<ComponentPreview name="InputOtpSeparatorDemo" />

```vue:line-numbers {5,19}
<script setup lang="ts">
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
  >
    <InputOtpGroup class="gap-2">
      <template v-for="(slot, index) in slots" :key="index">
        <InputOtpSlot class="rounded-md border" v-bind="slot" />
        <template v-if="index !== slots.length - 1">
          <InputOtpSeparator />
        </template>
      </template>
    </InputOtpGroup>
  </InputOtp>
</template>
```

### Controlled

You can use the `v-model` prop to control the input value.

<ComponentPreview name="InputOtpControlled" />

### Form

<ComponentPreview name="InputOtpForm" />
