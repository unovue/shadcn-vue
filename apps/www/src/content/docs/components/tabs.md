---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/www/src/lib/registry/default/ui/tabs 
primitive: https://www.radix-vue.com/components/tabs.html
---

<ComponentPreview name="TabsDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add tabs
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
</script>

<template>
  <TabsRoot class="flex flex-col w-full sm:w-[300px] shadow-[0_2px_10px] shadow-blackA4" default-value="tab1">
    <TabsList class="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
      <TabsTrigger
        class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-grass11 data-[state=active]:text-grass11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
        value="tab1"
      >
        Account
      </TabsTrigger>
      <TabsTrigger
        class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-grass11 data-[state=active]:text-grass11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
        value="tab2"
      >
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent
      class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab1"
    >
      <p class="mb-5 !mt-0 text-mauve11 text-[15px] !leading-normal">
        Make changes to your account here. Click save when you're done.
      </p>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="name"> Name </label>
        <input
          id="name"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
          value="Pedro Duarte"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="username"> Username </label>
        <input
          id="username"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
          value="@peduarte"
        >
      </fieldset>
      <div class="flex justify-end mt-5">
        <button
          class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
        >
          Save changes
        </button>
      </div>
    </TabsContent>
    <TabsContent
      class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab2"
    >
      <p class="mb-5 !mt-0 text-mauve11 text-[15px] !leading-normal">
        Change your password here. After saving, you'll be logged out.
      </p>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="currentPassword">
          Current password
        </label>
        <input
          id="currentPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
          type="password"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="newPassword"> New password </label>
        <input
          id="newPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
          type="password"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
          type="password"
        >
      </fieldset>
      <div class="flex justify-end mt-5">
        <button
          class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
        >
          Change password
        </button>
      </div>
    </TabsContent>
  </TabsRoot>
</template>
```


### Update `tailwind.config.js`

Add the following code into your `tailwind.config.js` file:

```ts
const { blackA, green, grass, mauve } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
      },
    },
  },
  plugins: [],
}
```

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <Tabs default-value="account" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```