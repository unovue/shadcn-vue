<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisGroupedBar, VisXYContainer } from "@unovis/vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"

const HOLDINGS = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    data: [
      { q: "Q1", index: 0, value: 380 },
      { q: "Q2", index: 1, value: 420 },
      { q: "Q3", index: 2, value: 390 },
      { q: "Q4", index: 3, value: 652 },
    ],
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    data: [
      { q: "Q1", index: 0, value: 180 },
      { q: "Q2", index: 1, value: 210 },
      { q: "Q3", index: 2, value: 320 },
      { q: "Q4", index: 3, value: 218 },
    ],
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    data: [
      { q: "Q1", index: 0, value: 60 },
      { q: "Q2", index: 1, value: 70 },
      { q: "Q3", index: 2, value: 120 },
      { q: "Q4", index: 3, value: 90 },
    ],
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    data: [
      { q: "Q1", index: 0, value: 240 },
      { q: "Q2", index: 1, value: 260 },
      { q: "Q3", index: 2, value: 280 },
      { q: "Q4", index: 3, value: 360 },
    ],
  },
]

type HoldingData = typeof HOLDINGS[number]["data"][number]

const miniChartConfig = {
  value: {
    label: "Dividend",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Hard-edged styles (lyra, sera) flatten the bar corners — mirrors shadcn-ui.
const params = useDesignSystemSearchParams()
const isRounded = computed(() => !["lyra", "sera"].includes(params.style.value))
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Q2 Dividend Income</CardTitle>
      <CardDescription>
        Quarterly dividend payouts across your portfolio holdings.
      </CardDescription>
      <CardAction>
        <Button variant="ghost" size="icon-sm" class="bg-muted">
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <ItemGroup>
        <Item v-for="holding in HOLDINGS" :key="holding.name" variant="muted">
          <ItemContent>
            <ItemTitle>{{ holding.name }}</ItemTitle>
            <ItemDescription>{{ holding.shares }}</ItemDescription>
          </ItemContent>
          <ChartContainer
            :config="miniChartConfig"
            class="hidden h-8 w-24 md:block"
          >
            <VisXYContainer :data="holding.data" :margin="{ top: 0, right: 0, bottom: 0, left: 0 }">
              <VisGroupedBar
                :x="(d: HoldingData) => d.index"
                :y="[(d: HoldingData) => d.value]"
                :color="[miniChartConfig.value.color]"
                :rounded-corners="isRounded ? 3 : 0"
              />
              <ChartTooltip />
              <ChartCrosshair
                :template="componentToString(miniChartConfig, ChartTooltipContent, { hideLabel: true })"
                color="#0000"
              />
            </VisXYContainer>
          </ChartContainer>
          <span class="hidden text-sm font-semibold tabular-nums md:block">
            {{ holding.amount }}
          </span>
        </Item>
      </ItemGroup>
    </CardContent>
  </Card>
</template>
