<script setup lang="ts">
import { Card, CardContent } from '@/lib/registry/new-york/ui/card'

defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
</script>

<template>
  <Card class="text-sm">
    <CardContent class="p-3 min-w-[180px] flex flex-col gap-2">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="w-1 h-7 mr-4 rounded-full" :style="{ background: item.color }" />
          <span>{{ item.name }}</span>
        </div>
        <span class="font-semibold ml-4">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>
