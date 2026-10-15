# Forms & Inputs

## Contents

- Forms use FieldGroup + Field
- InputGroup requires InputGroupInput/InputGroupTextarea
- Buttons inside inputs use InputGroup + InputGroupAddon
- Option sets (2–7 choices) use ToggleGroup
- FieldSet + FieldLegend for grouping related fields
- Field validation and disabled states
- Form libraries: vee-validate, TanStack Form, Formisch

---

## Forms use FieldGroup + Field

Always use `FieldGroup` + `Field` — never raw `div` with `space-y-*`:

```vue
<FieldGroup>
  <Field>
    <FieldLabel for="email">Email</FieldLabel>
    <Input id="email" type="email" />
  </Field>
  <Field>
    <FieldLabel for="password">Password</FieldLabel>
    <Input id="password" type="password" />
  </Field>
</FieldGroup>
```

Use `Field orientation="horizontal"` for settings pages. Use `FieldLabel class="sr-only"` for visually hidden labels.

**Choosing form controls:**

- Simple text input → `Input`
- Dropdown with predefined options → `Select`
- Searchable dropdown → `Combobox`
- Native HTML select (no JS) → `native-select`
- Boolean toggle → `Switch` (for settings) or `Checkbox` (for forms)
- Single choice from few options → `RadioGroup`
- Toggle between 2–7 options → `ToggleGroup` + `ToggleGroupItem`
- OTP/verification code → `InputOTP`
- Multi-line text → `Textarea`

---

## InputGroup requires InputGroupInput/InputGroupTextarea

Never use raw `Input` or `Textarea` inside an `InputGroup`.

**Incorrect:**

```html
<InputGroup>
  <Input placeholder="Search..." />
</InputGroup>
```

**Correct:**

```js
<script setup lang="ts">
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
  </InputGroup>
</template>
```

---

## Buttons inside inputs use InputGroup + InputGroupAddon

Never place a `Button` directly inside or adjacent to an `Input` with custom positioning.

**Incorrect:**

```html
<div class="relative">
  <Input placeholder="Search..." class="pr-10" />
  <Button class="absolute right-0 top-0" size="icon">
    <SearchIcon />
  </Button>
</div>
```

**Correct:**

```js
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-xs" aria-label="Search">
        <SearchIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

Use `InputGroupButton` (sizes `xs`, `sm`, `icon-xs`, `icon-sm`), not a plain `Button`. `InputGroupAddon` defaults to `align="inline-start"`, which renders it **before** the input — set `align="inline-end"` for trailing buttons (or `block-start` / `block-end` for rows above/below a textarea).

---

## Option sets (2–7 choices) use ToggleGroup

Don't manually loop `Button` components with active state.

**Incorrect:**

```js
<script setup lang="ts">
const selected = ref("daily")
const options = ["daily", "weekly", "monthly"]
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-for="option in options"
      :key="option"
      :variant="selected === option ? 'default' : 'outline'"
      @click="selected = option"
    >
      {{ option }}
    </Button>
  </div>
</template>
```

**Correct:**

```js
<script setup lang="ts">
import { ref } from "vue"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const selected = ref("daily")
</script>

<template>
  <ToggleGroup v-model="selected" type="single" :spacing="2">
    <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
    <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
    <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
  </ToggleGroup>
</template>
```

Combine with `Field` for labelled toggle groups:

```html
<Field orientation="horizontal">
  <FieldTitle id="theme-label">Theme</FieldTitle>
  <ToggleGroup aria-labelledby="theme-label" type="single" :spacing="2">
    <ToggleGroupItem value="light">Light</ToggleGroupItem>
    <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
    <ToggleGroupItem value="system">System</ToggleGroupItem>
  </ToggleGroup>
</Field>
```


---

## FieldSet + FieldLegend for grouping related fields

Use `FieldSet` + `FieldLegend` for related checkboxes, radios, or switches — not `div` with a heading:

```html
<FieldSet>
  <FieldLegend variant="label">Preferences</FieldLegend>
  <FieldDescription>Select all that apply.</FieldDescription>
  <FieldGroup class="gap-3">
    <Field orientation="horizontal">
      <Checkbox id="dark" />
      <FieldLabel for="dark" class="font-normal">Dark mode</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

---

## Field validation and disabled states

Both attributes are needed — `data-invalid`/`data-disabled` styles the field (label, description), while `aria-invalid`/`disabled` styles the control. Show the message with `FieldError` (not `FieldDescription`), right after the control.

```html
<!-- Invalid. -->
<Field data-invalid>
  <FieldLabel for="email">Email</FieldLabel>
  <Input id="email" aria-invalid />
  <FieldError>Invalid email address.</FieldError>
</Field>

<!-- Disabled. -->
<Field data-disabled>
  <FieldLabel for="email">Email</FieldLabel>
  <Input id="email" disabled />
</Field>
```

Works for all controls: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroupItem`, `Switch`, `Slider`, `NativeSelect`, `InputOTP`.

`FieldError` also accepts an `errors` prop — an array of strings or `{ message }` objects (e.g. from a schema validator). It dedupes them and renders a list when there is more than one.

---

## Form libraries: vee-validate, TanStack Form, Formisch

Build forms with the `Field` components plus a form library. The old `Form` / `FormField` / `FormItem` components are **no longer actively developed** — don't use them for new forms.

The pattern is the same for every library: the library owns state and validation, shadcn-vue `Field` owns layout, and errors flow into `data-invalid`, `aria-invalid` and `FieldError`.

**vee-validate** (`useForm` + `toTypedSchema` from `@vee-validate/zod`). Alias its `Field` as `VeeField`. Bind `componentField` (not `field`) to `v-model` components like `Input` — `field` binds `value`, which they ignore, so `initialValues` never render:

```vue
<VeeField v-slot="{ componentField, errors }" name="title">
  <Field :data-invalid="!!errors.length">
    <FieldLabel for="title">Title</FieldLabel>
    <Input id="title" v-bind="componentField" :aria-invalid="!!errors.length" />
    <FieldError v-if="errors.length" :errors="errors" />
  </Field>
</VeeField>
```

**TanStack Form** (`useForm` from `@tanstack/vue-form`): render `<form.Field>` and read `field.state.meta` — invalid when `isTouched && !isValid`, errors in `field.state.meta.errors`.

**Formisch** (`useForm` from `@formisch/vue` + Valibot): Formisch ships its own `Field`, so import it as `FormischField`. Errors are strings in `field.errors` (or `null`) — guard before mapping: `<FieldError v-if="field.errors" :errors="field.errors.map(message => ({ message }))" />`.

See `https://shadcn-vue.com/docs/forms` for complete examples.
