<script setup lang="ts">
import { Skeleton } from '@/styles/reka-nova/ui/skeleton'
</script>

<template>
  <div
    data-slot="designer"
    class="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
  >
    <Skeleton class="isolate hidden w-88 shrink-0 self-stretch rounded-2xl xl:block 2xl:w-104" />
    <Skeleton class="min-h-0 w-full flex-1 self-stretch rounded-2xl" />
    <Skeleton class="min-h-[151px] w-full self-start rounded-2xl md:h-full md:max-h-full md:min-h-0 md:w-(--customizer-width)" />
  </div>
</template>
