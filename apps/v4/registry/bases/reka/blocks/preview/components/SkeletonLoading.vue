<script setup lang="ts">
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Skeleton } from "@/registry/bases/reka/ui/skeleton"
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <Skeleton class="size-10 rounded-full" />
        <div class="flex flex-1 flex-col gap-2">
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-3 w-1/2" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <Skeleton class="h-3 w-full" />
        <Skeleton class="h-3 w-full" />
        <Skeleton class="h-3 w-4/5" />
      </div>
      <div class="flex gap-2">
        <Skeleton class="h-8 w-20" />
        <Skeleton class="h-8 w-20" />
      </div>
    </CardContent>
  </Card>
</template>
