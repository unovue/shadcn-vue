<script setup lang="ts">
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
  <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry', grapes: 'Grapes', pineapple: 'Pineapple' }" :disabled="true">
    <SelectTrigger>
      <SelectValue placeholder="Disabled" />
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
        <SelectItem value="grapes" :disabled="true">
          Grapes
        </SelectItem>
        <SelectItem value="pineapple">
          Pineapple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
