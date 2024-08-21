<script lang="ts" setup>
import type { Color } from '../types/colors'
import { useConfigStore } from '@/stores/config'
import { colors } from '@/lib/registry'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/registry/new-york/ui/tooltip'
import RadixIconsCheck from '~icons/radix-icons/check'

defineProps<{
  allColors: Color[]
}>()

const { theme, setTheme } = useConfigStore()
</script>

<template>
  <div>
    <TooltipProvider
      v-for="(color, index) in allColors.slice(0, 5)"
      :key="index"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            :key="index"
            class="flex size-9 items-center justify-center rounded-full border-2 border-border text-xs"
            :class="
              color === theme
                ? 'border-primary'
                : 'border-transparent'
            "
            @click="setTheme(color)"
          >
            <span
              class="flex size-6 items-center justify-center rounded-full"
              :style="{ backgroundColor: colors[color][6].rgb }"
            >
              <RadixIconsCheck
                v-if="color === theme"
                class="size-4 text-white"
              />
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          :side-offset="1"
          class="capitalize bg-zinc-900 text-zinc-50"
        >
          {{ allColors[index] }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
