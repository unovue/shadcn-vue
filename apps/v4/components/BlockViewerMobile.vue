<script setup lang="ts">
import { useBlockViewer } from './BlockViewer.vue'

const { item } = useBlockViewer()
</script>

<template>
  <div class="flex flex-col gap-2 lg:hidden">
    <div class="flex items-center gap-2 px-2">
      <div class="line-clamp-1 text-sm font-medium">
        {{ item.description }}
      </div>
      <div class="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
        {{ item.name }}
      </div>
    </div>
    <template v-if="item.meta?.mobile === 'component'">
      <slot />
    </template>

    <div v-else class="overflow-hidden rounded-xl border">
      <!-- <img
        :src="`/r/styles/new-york-v4/${item.name}-light.png`"
        :alt="item.name"
        :data-block="item.name"
        :width="1440"
        :height="900"
        class="object-cover dark:hidden"
      >
      <img
        :src="`/r/styles/new-york-v4/${item.name}-dark.png`"
        :alt="item.name"
        :data-block="item.name"
        :width="1440"
        :height="900"
        class="hidden object-cover dark:block"
      > -->
    </div>
  </div>
</template>
