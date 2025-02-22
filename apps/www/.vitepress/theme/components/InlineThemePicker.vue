<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/registry/new-york/ui/tooltip'
import { baseColors } from '@/registry/registry-base-colors'
import { useConfigStore } from '@/stores/config'
import { Check } from 'lucide-vue-next'
import { useData } from 'vitepress'

const { theme, setTheme } = useConfigStore()
const { isDark } = useData()

const pickedColors = baseColors.filter((color, index) => [0, 6, 8, 9, 10].includes(index))
</script>

<template>
  <div>
    <TooltipProvider
      v-for="(color, index) in pickedColors"
      :key="index"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            :key="index"
            class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border text-xs"
            :class="
              color.name === theme
                ? 'border-primary'
                : 'border-transparent'
            "
            :style="{
              '--theme-primary': `hsl(${
                color?.activeColor[isDark ? 'dark' : 'light']
              })`,
            }"
            @click="setTheme(color.name)"
          >
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full  bg-[--theme-primary]"
            >
              <Check
                v-if="color.name === theme"
                class="h-4 w-4 text-white"
              />
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          :side-offset="1"
          class="capitalize bg-zinc-900 text-zinc-50"
        >
          {{ color.label }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
