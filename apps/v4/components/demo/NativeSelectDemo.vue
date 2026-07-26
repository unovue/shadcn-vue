<script setup lang="ts">
import {
  NativeSelect,
  NativeSelectOption,
} from '@/registry/new-york-v4/ui/native-select'
</script>

<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select status
    </NativeSelectOption>
    <NativeSelectOption value="todo">
      Todo
    </NativeSelectOption>
    <NativeSelectOption value="in-progress">
      In Progress
    </NativeSelectOption>
    <NativeSelectOption value="done">
      Done
    </NativeSelectOption>
    <NativeSelectOption value="cancelled">
      Cancelled
    </NativeSelectOption>
  </NativeSelect>
</template>
