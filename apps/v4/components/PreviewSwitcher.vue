<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const PREVIEW_ITEMS = [
  { label: '01', value: 'preview-02' },
  { label: '02', value: 'preview' },
]

const params = useDesignSystemSearchParams()

const isPreview = computed(() =>
  params.item.value === 'preview' || params.item.value.startsWith('preview-0'),
)
</script>

<template>
  <div
    v-if="isPreview"
    class="dark absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl"
  >
    <Button
      v-for="item in PREVIEW_ITEMS"
      :key="item.value"
      variant="ghost"
      size="sm"
      :data-active="params.item.value === item.value"
      class="h-7 min-w-8 cursor-pointer rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      @click="params.item.value = item.value"
    >
      {{ item.label }}
    </Button>
  </div>
</template>
