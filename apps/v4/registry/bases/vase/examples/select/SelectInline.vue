<script setup lang="ts">
import { Input } from "@/registry/bases/vase/ui/input"
import { NativeSelect, NativeSelectOption } from "@/registry/bases/vase/ui/native-select"
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
  <div class="flex items-center gap-2">
    <Input placeholder="Search..." class="flex-1" />
    <Select :items="{ all: 'All', active: 'Active', inactive: 'Inactive' }">
      <SelectTrigger class="w-[140px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">
            All
          </SelectItem>
          <SelectItem value="active">
            Active
          </SelectItem>
          <SelectItem value="inactive">
            Inactive
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <NativeSelect class="w-[140px]">
      <NativeSelectOption value="">
        Sort by
      </NativeSelectOption>
      <NativeSelectOption value="name">
        Name
      </NativeSelectOption>
      <NativeSelectOption value="date">
        Date
      </NativeSelectOption>
      <NativeSelectOption value="status">
        Status
      </NativeSelectOption>
    </NativeSelect>
  </div>
</template>
