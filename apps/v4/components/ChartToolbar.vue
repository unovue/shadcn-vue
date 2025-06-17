<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  AreaChartIcon,
  BarChartBigIcon,
  HexagonIcon,
  LineChartIcon,
  MousePointer2Icon,
  PieChartIcon,
  RadarIcon,
} from 'lucide-vue-next'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import { cn } from '~/lib/utils'
import TooltipProvider from '~/registry/new-york-v4/ui/tooltip/TooltipProvider.vue'

const props = defineProps<{
  name: string
  code: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <div class="text-muted-foreground flex items-center gap-1.5 pl-1 text-[13px] [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]">
      <template v-if="name.includes('ChartLine')">
        <LineChartIcon /> Line Chart
      </template>
      <template v-else-if="name.includes('ChartBar')">
        <BarChartBigIcon /> Bar Chart
      </template>
      <template v-else-if="name.includes('ChartPie')">
        <PieChartIcon /> Pie Chart
      </template>
      <template v-else-if="name.includes('ChartArea')">
        <AreaChartIcon /> Area Chart
      </template>
      <template v-else-if="name.includes('ChartRadar')">
        <HexagonIcon /> Radar Chart
      </template>
      <template v-else-if="name.includes('ChartRadial')">
        <RadarIcon /> Radial Chart
      </template>
      <template v-else-if="name.includes('ChartTooltip')">
        <MousePointer2Icon /> Tooltip
      </template>
    </div>
    <div class="ml-auto flex items-center gap-2 [&>form]:flex">
      <TooltipProvider>
        <CopyButton
          :value="code"
          class="[&_svg]-h-3 text-foreground hover:bg-muted dark:text-foreground h-6 w-6 rounded-[6px] bg-transparent shadow-none [&_svg]:w-3 static"
        />
      </TooltipProvider>
      <Separator
        orientation="vertical"
        class="mx-0 hidden !h-4 md:flex"
      />
      <!-- <ChartCodeViewer chart="{chart}">
        <slot />
      </ChartCodeViewer> -->
    </div>
  </div>
</template>
