<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { GalleryHorizontalIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { userConfig } = useUserConfig()

function setLayout() {
  const newLayout = userConfig.value.layout === 'fixed' ? 'full' : 'fixed'
  userConfig.value.layout = newLayout
}
</script>

<template>
  <Button
    variant="ghost"
    size="icon"

    :class="cn('size-8', props.class)"
    title="Toggle layout"
    @click="setLayout()"
  >
    <span class="sr-only">Toggle layout</span>
    <GalleryHorizontalIcon />
  </Button>
</template>
