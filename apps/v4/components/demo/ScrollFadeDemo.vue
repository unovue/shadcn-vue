<script setup lang="ts">
const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`)
</script>

<template>
  <div class="scroll-fade-b h-64 w-full max-w-xs overflow-y-auto rounded-lg border p-4">
    <ul class="flex flex-col gap-3">
      <li
        v-for="item in items"
        :key="item"
        class="rounded-md bg-muted px-3 py-2 text-sm"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
