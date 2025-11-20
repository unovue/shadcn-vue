<script setup lang="ts">
const props = defineProps<{
  items: { href: string, label: string }[]
  class?: HTMLAttributes['class']
}>()

import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'

const { path } = toRefs(useRoute())
</script>

<template>
  <nav :class="cn('items-center', props.class)">
    <Button v-for="item in items" :key="item.href" variant="ghost" as-child size="sm">
      <NuxtLink
        :to="item.href"
        :class="cn(path === item.href && 'text-primary')"
      >
        {{ item.label }}
      </NuxtLink>
    </Button>
  </nav>
</template>
