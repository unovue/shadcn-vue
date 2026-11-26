<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"
</script>

<template>
  <Example title="Select Fields">
    <FieldGroup>
      <Field>
        <FieldLabel for="select-basic">
          Basic Select
        </FieldLabel>
        <Select :items="{ option1: 'Option 1', option2: 'Option 2', option3: 'Option 3' }">
          <SelectTrigger id="select-basic">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">
              Option 1
            </SelectItem>
            <SelectItem value="option2">
              Option 2
            </SelectItem>
            <SelectItem value="option3">
              Option 3
            </SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel for="select-country">
          Country
        </FieldLabel>
        <Select :items="{ us: 'United States', uk: 'United Kingdom', ca: 'Canada' }">
          <SelectTrigger id="select-country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">
              United States
            </SelectItem>
            <SelectItem value="uk">
              United Kingdom
            </SelectItem>
            <SelectItem value="ca">
              Canada
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>
          Select the country where you currently reside.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="select-timezone">
          Timezone
        </FieldLabel>
        <FieldDescription>
          Choose your local timezone for accurate scheduling.
        </FieldDescription>
        <Select :items="{ utc: 'UTC', est: 'Eastern Time', pst: 'Pacific Time' }">
          <SelectTrigger id="select-timezone">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc">
              UTC
            </SelectItem>
            <SelectItem value="est">
              Eastern Time
            </SelectItem>
            <SelectItem value="pst">
              Pacific Time
            </SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field data-invalid>
        <FieldLabel for="select-invalid">
          Invalid Select
        </FieldLabel>
        <Select :items="{ option1: 'Option 1', option2: 'Option 2', option3: 'Option 3' }">
          <SelectTrigger id="select-invalid" :aria-invalid="true">
            <SelectValue placeholder="This field has an error" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">
              Option 1
            </SelectItem>
            <SelectItem value="option2">
              Option 2
            </SelectItem>
            <SelectItem value="option3">
              Option 3
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>
          This field contains validation errors.
        </FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel for="select-disabled-field">
          Disabled Field
        </FieldLabel>
        <Select :items="{ option1: 'Option 1', option2: 'Option 2', option3: 'Option 3' }" :disabled="true">
          <SelectTrigger id="select-disabled-field">
            <SelectValue placeholder="Cannot select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">
              Option 1
            </SelectItem>
            <SelectItem value="option2">
              Option 2
            </SelectItem>
            <SelectItem value="option3">
              Option 3
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>This field is currently disabled.</FieldDescription>
      </Field>
    </FieldGroup>
  </Example>
</template>
