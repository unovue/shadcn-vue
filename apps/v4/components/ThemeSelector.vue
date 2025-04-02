<script setup lang="ts">
import { THEMES } from '@/lib/themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'

const { activeTheme } = useThemeConfig()
</script>

<template>
  <Select v-model="activeTheme">
    <SelectTrigger size="sm" class="w-32">
      <SelectValue placeholder="Select a theme">
        {{ THEMES.find(theme => theme.value === activeTheme)?.name }}
      </SelectValue>
    </SelectTrigger>
    <SelectContent align="end">
      <template v-for="theme in THEMES" :key="theme.name">
        <SelectItem :value="theme.value">
          {{ theme.name }}
        </SelectItem>
      </template>
    </SelectContent>
  </Select>
</template>
