<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { Color, ColorFormat } from '@/lib/colors'
import { getColorFormat } from '@/lib/colors'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/registry/new-york-v4/ui/select'
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton'

const props = defineProps<{
  color: Color
  class?: HTMLAttributes['class']
}>()

const { format, setFormat, isLoading } = useColors()
const formats = computed(() => getColorFormat(props.color))
</script>

<template>
  <Skeleton
    v-if="isLoading"
    class="h-8 w-[132px] gap-1.5 rounded-md"
  />

  <Select v-else :model-value="format" @update:model-value="setFormat($event as ColorFormat)">
    <SelectTrigger
      size="sm"
      :class="cn(
        'bg-secondary text-secondary-foreground border-secondary shadow-none',
        props.class,
      )"
    >
      <span class="font-medium">Format: </span>
      <span class="text-muted-foreground font-mono">{{ format }}</span>
    </SelectTrigger>
    <SelectContent align="end" class="rounded-xl">
      <SelectItem
        v-for="(value, format) of formats"
        :key="format"
        :value="format"
        class="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
      >
        <span class="font-medium">{{ format }}</span>
        <span class="text-muted-foreground font-mono text-xs">
          {{ value }}
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
