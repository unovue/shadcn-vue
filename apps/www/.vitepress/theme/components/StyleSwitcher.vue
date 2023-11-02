<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type SelectTriggerProps } from 'radix-vue'
import { useConfigStore } from '@/stores/config'

import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { styles } from '@/lib/registry/styles'

const props = defineProps<SelectTriggerProps & { class?: string }>()
const { style } = storeToRefs(useConfigStore())
</script>

<template>
  <Select v-model="style">
    <SelectTrigger :class="cn('h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4', props.class)">
      <span class="text-muted-foreground">Style: </span>
      <SelectValue placeholder="Select style" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="style in styles" :key="style.name" :value="style.name" class="text-xs">
        {{ style.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
