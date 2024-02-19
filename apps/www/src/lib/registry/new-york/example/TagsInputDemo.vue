<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/lib/registry/new-york/ui/tags-input'

const modelValue = ref(['Apple', 'Banana'])
</script>

<template>
  <TagsInput v-model="modelValue">
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput placeholder="Fruits..." />
  </TagsInput>
</template>
