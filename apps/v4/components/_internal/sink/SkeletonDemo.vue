<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card'
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton'
</script>

<template>
  <div class="flex w-full flex-wrap items-start gap-4">
    <div class="flex items-center gap-4">
      <Skeleton class="size-10 shrink-0 rounded-full" />
      <div class="grid gap-2">
        <Skeleton class="h-4 w-[150px]" />
        <Skeleton class="h-4 w-[100px]" />
      </div>
    </div>
    <div class="flex w-full flex-wrap items-start gap-4">
      <Card v-for="index in 3" :key="index" class="w-full @md:w-auto @md:min-w-sm">
        <CardHeader>
          <Skeleton class="h-4 w-2/3" />
          <Skeleton class="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton class="aspect-square w-full" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
