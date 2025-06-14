<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

import { Label } from '@/registry/new-york-v4/ui/label'
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'
import { baseColors } from '@/registry/registry-base-colors'

const THEMES = baseColors.filter(
  theme => !['slate', 'stone', 'gray', 'zinc'].includes(theme.name),
)

const { config } = useConfig()
</script>

<template>
  <div class="flex w-full items-center gap-2">
    <ScrollArea class="hidden max-w-[96%] md:max-w-[600px] lg:flex lg:max-w-none">
      <div class="flex items-center">
        <Button
          v-for="theme in THEMES"
          :key="theme.name"
          variant="link"
          size="sm"
          :data-active="config.activeTheme === theme.name"
          class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 cursor-pointer items-center justify-center px-4 text-center text-base font-medium capitalize transition-colors hover:no-underline"
          @click="() => {
            config.activeTheme = theme.name
          }"
        >
          {{ theme.name === "neutral" ? "Default" : theme.name }}
        </Button>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
    <div class="flex items-center gap-2 lg:hidden">
      <Label for="theme-selector" class="sr-only">
        Theme
      </Label>
      <Select v-model="config.activeTheme">
        <SelectTrigger
          id="theme-selector"
          size="sm"
          class="justify-start capitalize shadow-none *:data-[slot=select-value]:w-12 *:data-[slot=select-value]:capitalize"
        >
          <span class="font-medium">Theme:</span>
          <SelectValue placeholder="Select a theme">
            {{ config.activeTheme }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem
              v-for="theme in THEMES"
              :key="theme.name"
              :value="theme.name"
              class="capitalize data-[state=checked]:opacity-50"
            >
              {{ theme.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <CopyCodeButton variant="secondary" size="sm" class="ml-auto" />
  </div>
</template>
