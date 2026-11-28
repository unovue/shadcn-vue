<script setup lang="ts">
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry', grapes: 'Grapes', pineapple: 'Pineapple' }">
      <SelectTrigger :aria-invalid="true">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">
            Apple
          </SelectItem>
          <SelectItem value="banana">
            Banana
          </SelectItem>
          <SelectItem value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem value="grapes">
            Grapes
          </SelectItem>
          <SelectItem value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Field data-invalid>
      <FieldLabel for="select-fruit-invalid">
        Favorite Fruit
      </FieldLabel>
      <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry', grapes: 'Grapes', pineapple: 'Pineapple' }">
        <SelectTrigger id="select-fruit-invalid" :aria-invalid="true">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">
              Apple
            </SelectItem>
            <SelectItem value="banana">
              Banana
            </SelectItem>
            <SelectItem value="blueberry">
              Blueberry
            </SelectItem>
            <SelectItem value="grapes">
              Grapes
            </SelectItem>
            <SelectItem value="pineapple">
              Pineapple
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError :errors="[{ message: 'Please select a valid fruit.' }]" />
    </Field>
  </div>
</template>
