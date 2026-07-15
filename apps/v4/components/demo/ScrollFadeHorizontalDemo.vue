<script setup lang="ts">
const tags = [
  'Design',
  'Engineering',
  'Marketing',
  'Product',
  'Research',
  'Sales',
  'Support',
  'Operations',
  'Finance',
  'Legal',
  'People',
  'Security',
]
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <div class="scroll-fade-x scrollbar-none overflow-x-auto">
      <div class="flex w-max gap-1.5 p-1.5">
        <div
          v-for="tag in tags"
          :key="tag"
          class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
