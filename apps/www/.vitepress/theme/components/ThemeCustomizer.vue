<script lang="ts" setup>
import { Button } from '@/registry/new-york/ui/button'
import { Label } from '@/registry/new-york/ui/label'
import { baseColors } from '@/registry/registry-base-colors'
import { RADII, useConfigStore } from '@/stores/config'
import { Check, Moon, Repeat, Sun } from 'lucide-vue-next'
import { useData } from 'vitepress'

const { config, theme, radius, setRadius, setTheme } = useConfigStore()
const { isDark } = useData()
</script>

<template>
  <div class="flex flex-col space-y-4 md:space-y-6">
    <div class="flex items-start pt-4 md:pt-0">
      <div class="space-y-1 pr-2">
        <div class="font-semibold leading-none tracking-tight">
          Theme Customizer
        </div>
        <div class="text-xs text-muted-foreground">
          Customize your components colors.
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        class="ml-auto rounded-[0.5rem]"
        @click="() => {
          config = {
            ...config,
            theme: 'zinc',
            radius: 0.5,
          }
        }"
      >
        <Repeat />
        <span class="sr-only">Reset</span>
      </Button>
    </div>
    <div class="flex flex-1 flex-col space-y-4 md:space-y-6">
      <div class="space-y-1.5 ">
        <Label for="color" class="text-xs"> Color </Label>
        <div class="grid grid-cols-3 gap-2">
          <Button
            v-for="(color, index) in baseColors"
            :key="index"
            variant="outline"
            class="h-8 justify-start px-3"
            :class="
              color.name === theme
                ? 'border-foreground border-2'
                : ''
            "
            :style="{
              '--theme-primary': `hsl(${
                color?.activeColor[isDark ? 'dark' : 'light']
              })`,
            }"
            @click="setTheme(color.name)"
          >
            <span
              class="h-5 w-5 rounded-full flex items-center justify-center shrink-0 bg-[--theme-primary]"
            >
              <Check
                v-if="color.name === theme"
                class="h-3 w-3 text-white"
              />
            </span>
            <span class="ml-2 text-xs capitalize">
              {{ color.name }}
            </span>
          </Button>
        </div>
      </div>
      <div class="space-y-1.5 ">
        <Label for="radius" class="text-xs"> Radius </Label>
        <div class="grid grid-cols-5 gap-2">
          <Button
            v-for="(r, index) in RADII"
            :key="index"
            variant="outline"
            class="h-8 justify-center px-3"
            :class="
              r === radius
                ? 'border-foreground border-2'
                : ''
            "
            @click="setRadius(r)"
          >
            <span class="text-xs">
              {{ r }}
            </span>
          </Button>
        </div>
      </div>
      <div class="space-y-1.5 ">
        <Label for="theme" class="text-xs"> Theme </Label>

        <div class="flex space-x-2">
          <Button
            class="h-8"
            variant="outline"
            :class="{ 'border-2 border-foreground': !isDark }"
            @click="isDark = false"
          >
            <Sun class="w-4 h-4 mr-2" />
            <span class="text-xs">Light</span>
          </Button>
          <Button
            class="h-8"
            variant="outline"
            :class="{ 'border-2 border-foreground': isDark }"
            @click="isDark = true"
          >
            <Moon class="w-4 h-4 mr-2" />
            <span class="text-xs">Dark</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
