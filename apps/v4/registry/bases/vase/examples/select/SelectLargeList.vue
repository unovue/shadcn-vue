<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"

const items = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`item-${i}`, `Item ${i}`]))
</script>

<template>
  <Select :items="items">
    <SelectTrigger>
      <SelectValue placeholder="Select an item" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="i in 100" :key="i" :value="`item-${i - 1}`">
          Item {{ i - 1 }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
