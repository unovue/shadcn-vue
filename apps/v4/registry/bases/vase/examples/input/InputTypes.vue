<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Field>
      <FieldLabel for="input-demo-password">
        Password
      </FieldLabel>
      <Input
        id="input-demo-password"
        type="password"
        placeholder="Password"
      />
    </Field>
    <Field>
      <FieldLabel for="input-demo-tel">
        Phone
      </FieldLabel>
      <Input
        id="input-demo-tel"
        type="tel"
        placeholder="+1 (555) 123-4567"
      />
    </Field>
    <Field>
      <FieldLabel for="input-demo-url">
        URL
      </FieldLabel>
      <Input
        id="input-demo-url"
        type="url"
        placeholder="https://example.com"
      />
    </Field>
    <Field>
      <FieldLabel for="input-demo-search">
        Search
      </FieldLabel>
      <Input id="input-demo-search" type="search" placeholder="Search" />
    </Field>
    <Field>
      <FieldLabel for="input-demo-number">
        Number
      </FieldLabel>
      <Input id="input-demo-number" type="number" placeholder="123" />
    </Field>
    <Field>
      <FieldLabel for="input-demo-date">
        Date
      </FieldLabel>
      <Input id="input-demo-date" type="date" />
    </Field>
    <Field>
      <FieldLabel for="input-demo-time">
        Time
      </FieldLabel>
      <Input id="input-demo-time" type="time" />
    </Field>
    <Field>
      <FieldLabel for="input-demo-file">
        File
      </FieldLabel>
      <Input id="input-demo-file" type="file" />
    </Field>
  </div>
</template>
