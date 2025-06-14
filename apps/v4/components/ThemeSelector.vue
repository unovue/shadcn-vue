<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { config } = useConfig()

const DEFAULT_THEMES = [
  {
    name: 'Default',
    value: 'neutral',
  },
  {
    name: 'Scaled',
    value: 'scaled',
  },
  {
    name: 'Mono',
    value: 'mono',
  },
]

const COLOR_THEMES = [
  {
    name: 'Blue',
    value: 'blue',
  },
  {
    name: 'Green',
    value: 'green',
  },
  {
    name: 'Amber',
    value: 'amber',
  },
  {
    name: 'Rose',
    value: 'rose',
  },
  {
    name: 'Purple',
    value: 'purple',
  },
  {
    name: 'Orange',
    value: 'orange',
  },
  {
    name: 'Teal',
    value: 'teal',
  },
]
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
        <SelectValue placeholder="Select a theme">
          {{ [...DEFAULT_THEMES, ...COLOR_THEMES].find(theme => theme.value === config.activeTheme)?.name }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem
            v-for="theme in DEFAULT_THEMES"
            :key="theme.name"
            :value="theme.value"
            class="data-[state=checked]:opacity-50"
          >
            {{ theme.name }}
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Colors</SelectLabel>
          <SelectItem
            v-for="theme in COLOR_THEMES"
            :key="theme.name"
            :value="theme.value"
            class="data-[state=checked]:opacity-50"
          >
            {{ theme.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
