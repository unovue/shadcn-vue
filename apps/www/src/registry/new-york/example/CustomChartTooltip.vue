<script setup lang="ts">
import { Card, CardContent } from '@/registry/new-york/ui/card'

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
    <CardContent class="flex min-w-[180px] flex-col gap-2 p-3">
      <div v-for="(item, key) in data" :key="key" class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="mr-4 h-7 w-1 rounded-full" :style="{ background: item.color }" />
          <span>{{ item.name }}</span>
        </div>
        <span class="ml-4 font-semibold">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>
