<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"
</script>

<template>
  <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry', carrot: 'Carrot', broccoli: 'Broccoli', spinach: 'Spinach' }">
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
        <SelectItem value="banana">
          Banana
        </SelectItem>
        <SelectItem value="blueberry">
          Blueberry
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="carrot">
          Carrot
        </SelectItem>
        <SelectItem value="broccoli">
          Broccoli
        </SelectItem>
        <SelectItem value="spinach">
          Spinach
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
