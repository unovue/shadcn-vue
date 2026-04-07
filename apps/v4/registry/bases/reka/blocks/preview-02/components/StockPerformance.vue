<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisArea, VisLine, VisXYContainer } from "@unovis/vue"
import { computed, ref } from "vue"
import {
  Card,
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
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@/registry/bases/reka/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Separator } from "@/registry/bases/reka/ui/separator"

const TICKERS = ["VOO", "VIG", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]

const CHART_DATA: Record<string, { month: string, index: number, price: number }[]> = {
  VOO: [
    { month: "Jan", index: 0, price: 412 },
    { month: "Feb", index: 1, price: 438 },
    { month: "Mar", index: 2, price: 395 },
    { month: "Apr", index: 3, price: 450 },
    { month: "May", index: 4, price: 420 },
    { month: "Jun", index: 5, price: 462 },
  ],
  AAPL: [
    { month: "Jan", index: 0, price: 185 },
    { month: "Feb", index: 1, price: 210 },
    { month: "Mar", index: 2, price: 172 },
    { month: "Apr", index: 3, price: 198 },
    { month: "May", index: 4, price: 178 },
    { month: "Jun", index: 5, price: 215 },
  ],
}

const DEFAULT_DATA = [
  { month: "Jan", index: 0, price: 100 },
  { month: "Feb", index: 1, price: 118 },
  { month: "Mar", index: 2, price: 95 },
  { month: "Apr", index: 3, price: 125 },
  { month: "May", index: 4, price: 108 },
  { month: "Jun", index: 5, price: 130 },
]

interface Data { month: string, index: number, price: number }

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const ticker = ref("VOO")
const data = computed(() => CHART_DATA[ticker.value] ?? DEFAULT_DATA)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Stock Performance</CardTitle>
      <CardDescription>6-month price history.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel for="ticker-select">
            Ticker
          </FieldLabel>
          <Combobox
            :items="TICKERS"
            :model-value="ticker"
            @update:model-value="(value) => { if (value !== null) ticker = value as string }"
          >
            <ComboboxInput
              id="ticker-select"
              placeholder="Search ticker..."
            />
            <ComboboxList>
              <ComboboxViewport>
                <ComboboxEmpty>No tickers found.</ComboboxEmpty>
                <ComboboxItem
                  v-for="item in TICKERS"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </ComboboxItem>
              </ComboboxViewport>
            </ComboboxList>
          </Combobox>
        </Field>
      </FieldGroup>
      <Separator />
      <ChartContainer :config="chartConfig" class="h-[200px] w-full">
        <VisXYContainer :data="data" :margin="{ left: 0, right: 0, top: 8, bottom: 0 }">
          <VisArea
            :x="(d: Data) => d.index"
            :y="(d: Data) => d.price"
            :color="chartConfig.price.color"
            :opacity="0.3"
          />
          <VisLine
            :x="(d: Data) => d.index"
            :y="(d: Data) => d.price"
            :color="chartConfig.price.color"
            :line-width="2"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
            :color="chartConfig.price.color"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
