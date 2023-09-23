<script setup lang="ts">
import { VisLine, VisScatter, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/registry/new-york/ui/card'
import { useConfigStore } from '@/stores/config'
import { themes } from '@/lib/registry/themes'

type Data = typeof data[number]
const data = [
  { revenue: 10400, subscription: 240 },
  { revenue: 14405, subscription: 300 },
  { revenue: 9400, subscription: 200 },
  { revenue: 8200, subscription: 278 },
  { revenue: 7000, subscription: 189 },
  { revenue: 9600, subscription: 239 },
  { revenue: 11244, subscription: 278 },
  { revenue: 26475, subscription: 189 },
]

const cfg = useConfigStore()

const { isDark } = useData()
const theme = computed(() => themes.find(theme => theme.name === cfg.config.value.theme))

const lineX = (d: Data, i: number) => i
const lineY = (d: Data) => d.revenue
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-normal">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          $15,231.89
        </div>
        <p class="text-xs text-muted-foreground">
          +20.1% from last month
        </p>

        <div class="h-[80px]">
          <VisXYContainer
            height="80px"
            :data="data" :margin="{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }"
            :style="{
              '--theme-primary': `hsl(${
                theme?.cssVars[isDark ? 'dark' : 'light'].primary
              })`,
            }"
          >
            <VisLine :x="lineX" :y="lineY" color="var(--theme-primary)" />
            <VisScatter :x="lineX" :y="lineY" :size="6" stroke-color="var(--theme-primary)" :stroke-width="2" color="white" />
          </VisXYContainer>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="pb-2">
        <CardTitle class="text-lg">
          Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          +2,350
        </div>
        <p class="text-xs text-muted-foreground">
          +54.8% from last month
        </p>

        <div class="mt-4 h-[80px]">
          <VisXYContainer
            height="80px" :data="data" :style="{
              '--theme-primary': `hsl(${
                theme?.cssVars[isDark ? 'dark' : 'light'].primary
              })`,
            }"
          >
            <VisStackedBar
              :x="lineX"
              :y="(d: Data) => d.subscription"
              :bar-padding="0.1"
              :rounded-corners="0" color="var(--theme-primary)"
            />
          </VisXYContainer>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
