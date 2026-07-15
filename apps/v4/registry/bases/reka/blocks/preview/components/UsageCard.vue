<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"

const items = [
  {
    name: "Edge Requests",
    value: "$1.83K",
    percentage: 67.34,
  },
  {
    name: "Fast Data Transfer",
    percentage: 52.18,
    value: "$952.51",
  },
  {
    name: "Monitoring data points",
    percentage: 89.42,
    value: "$901.20",
  },
  {
    name: "Web Analytics Events",
    percentage: 45.67,
    value: "$603.71",
  },
  {
    name: "ISR Writes",
    percentage: 26.23,
    value: "524.52K / 2M",
  },
  {
    name: "Function Duration",
    percentage: 5.11,
    value: "5.11 GB Hrs / 1K GB Hrs",
  },
]
</script>

<template>
  <Card class="w-full max-w-sm gap-4">
    <CardHeader>
      <CardTitle class="px-1 text-sm">
        5 days remaining in cycle
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ItemGroup class="gap-0">
        <Item
          v-for="item in items"
          :key="item.name"
          size="xs"
          class="px-0 group-hover/item-group:bg-transparent"
          :as-child="true"
        >
          <a href="#">
            <ItemMedia variant="icon" class="text-primary">
              <!-- Circular Gauge SVG -->
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                width="16"
                stroke-width="2"
                viewBox="0 0 100 100"
                class="-rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42.5"
                  stroke-width="12"
                  stroke-dashoffset="0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="opacity-20"
                  stroke="currentColor"
                  :style="{
                    strokeDasharray: `${2 * Math.PI * 42.5} ${2 * Math.PI * 42.5}`,
                  }"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42.5"
                  stroke-width="12"
                  stroke-dashoffset="0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="currentColor"
                  class="transition-all duration-300"
                  :style="{
                    strokeDasharray: `${(Math.min(Math.max(item.percentage, 0), 100) / 100) * 2 * Math.PI * 42.5} ${2 * Math.PI * 42.5}`,
                  }"
                />
              </svg>
            </ItemMedia>
            <ItemContent class="inline-block truncate">
              <ItemTitle class="inline">{{ item.name }}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <span class="font-mono text-xs font-medium text-muted-foreground tabular-nums">
                {{ item.value }}
              </span>
            </ItemActions>
          </a>
        </Item>
      </ItemGroup>
    </CardContent>
  </Card>
</template>
