<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"

const chartItems = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select :items="chartItems">
      <SelectTrigger size="sm">
        <SelectValue v-slot="{ value }">
          <template v-if="value === 'line'">
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Line
          </template>
          <template v-else-if="value === 'bar'">
            <IconPlaceholder
              lucide="ChartBarIcon"
              tabler="IconChartBar"
              hugeicons="Chart03Icon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
            />
            Bar
          </template>
          <template v-else-if="value === 'pie'">
            <IconPlaceholder
              lucide="ChartPieIcon"
              tabler="IconChartPie"
              hugeicons="Chart03Icon"
              phosphor="ChartPieIcon"
              remixicon="RiPieChartLine"
            />
            Pie
          </template>
          <template v-else>
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Chart Type
          </template>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="line">
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Line
          </SelectItem>
          <SelectItem value="bar">
            <IconPlaceholder
              lucide="ChartBarIcon"
              tabler="IconChartBar"
              hugeicons="Chart03Icon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
            />
            Bar
          </SelectItem>
          <SelectItem value="pie">
            <IconPlaceholder
              lucide="ChartPieIcon"
              tabler="IconChartPie"
              hugeicons="Chart03Icon"
              phosphor="ChartPieIcon"
              remixicon="RiPieChartLine"
            />
            Pie
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select :items="chartItems">
      <SelectTrigger size="default">
        <SelectValue v-slot="{ value }">
          <template v-if="value === 'line'">
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Line
          </template>
          <template v-else-if="value === 'bar'">
            <IconPlaceholder
              lucide="ChartBarIcon"
              tabler="IconChartBar"
              hugeicons="Chart03Icon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
            />
            Bar
          </template>
          <template v-else-if="value === 'pie'">
            <IconPlaceholder
              lucide="ChartPieIcon"
              tabler="IconChartPie"
              hugeicons="Chart03Icon"
              phosphor="ChartPieIcon"
              remixicon="RiPieChartLine"
            />
            Pie
          </template>
          <template v-else>
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Chart Type
          </template>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="line">
            <IconPlaceholder
              lucide="ChartLineIcon"
              tabler="IconChartLine"
              hugeicons="Chart03Icon"
              phosphor="ChartLineIcon"
              remixicon="RiLineChartLine"
            />
            Line
          </SelectItem>
          <SelectItem value="bar">
            <IconPlaceholder
              lucide="ChartBarIcon"
              tabler="IconChartBar"
              hugeicons="Chart03Icon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
            />
            Bar
          </SelectItem>
          <SelectItem value="pie">
            <IconPlaceholder
              lucide="ChartPieIcon"
              tabler="IconChartPie"
              hugeicons="Chart03Icon"
              phosphor="ChartPieIcon"
              remixicon="RiPieChartLine"
            />
            Pie
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
