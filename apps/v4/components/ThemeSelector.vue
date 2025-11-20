<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'
import { baseColors } from '@/registry/registry-base-colors'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { config } = useConfig()

const COLOR_THEMES = baseColors.filter(
  theme => !['slate', 'stone', 'gray', 'zinc'].includes(theme.name),
)
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <Label for="theme-selector" class="sr-only">
      Theme
    </Label>
    <Select v-model="config.activeTheme">
      <SelectTrigger
        id="theme-selector"
        size="sm"
        class="bg-secondary text-secondary-foreground border-secondary justify-start shadow-none *:data-[slot=select-value]:w-12"
      >
        <span class="font-medium">Theme:</span>
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem
          v-for="theme in COLOR_THEMES"
          :key="theme.name"
          :value="theme.name"
          class="data-[state=checked]:opacity-50"
        >
          {{ theme.label === "Neutral" ? "Default" : theme.label }}
        </SelectItem>
      </SelectContent>
    </Select>
    <CopyCodeButton variant="secondary" size="icon-sm" />
  </div>
</template>
