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
  <div class="flex flex-col gap-4">
    <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry' }">
      <SelectTrigger size="sm">
        <SelectValue placeholder="Small size" />
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
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry' }">
      <SelectTrigger size="default">
        <SelectValue placeholder="Default size" />
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
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
