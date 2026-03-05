<script setup lang="ts">
import { Marquee } from '@/registry/new-york-v4/ui/marquee'

const items = [
  { name: 'Vue.js', color: '#42b883' },
  { name: 'Nuxt', color: '#00dc82' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Vite', color: '#a855f7' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#5fa04e' },
  { name: 'shadcn', color: 'currentColor' },
]
</script>

<template>
  <Marquee orientation="vertical" class="h-64 [--duration:20s]">
    <div
      v-for="item in items"
      :key="item.name"
      class="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm shadow-sm"
    >
      <span class="size-2 rounded-full" :style="{ backgroundColor: item.color }" />
      {{ item.name }}
    </div>
  </Marquee>
</template>
