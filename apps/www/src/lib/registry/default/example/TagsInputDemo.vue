<script setup lang="ts">
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/lib/registry/default/ui/tags-input'
import { ref } from 'vue'

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
