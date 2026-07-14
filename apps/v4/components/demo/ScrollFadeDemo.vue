<script setup lang="ts">
const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <div class="scroll-fade scrollbar-none h-72 overflow-y-auto">
      <div class="flex flex-col gap-1.5 p-1.5">
        <div
          v-for="item in items"
          :key="item"
          class="rounded-lg bg-muted px-3 py-2.5 text-sm"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
