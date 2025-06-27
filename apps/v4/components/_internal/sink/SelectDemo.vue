<script setup lang="ts">
import {
  ChartBarIcon,
  ChartLineIcon,
  ChartPieIcon,
  CircleDashed,
} from 'lucide-vue-next'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'

const selectedChart = ref<keyof typeof chartOptions>()
const chartOptions = {
  line: h(() => [h(ChartLineIcon), 'Line']),
  bar: h(() => [h(ChartBarIcon), 'Bar']),
  pie: h(() => [h(ChartPieIcon), 'Pie']),
}
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Select>
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">
            Apple
          </SelectItem>
          <SelectItem value="banana">
            Banana
          </SelectItem>
          <SelectItem value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem value="grapes" disabled>
            Grapes
          </SelectItem>
          <SelectItem value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select>
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Large List" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="i in 100" :key="i" :value="`item-${i}`">
          Item {{ i }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select disabled>
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">
          Apple
        </SelectItem>
        <SelectItem value="banana">
          Banana
        </SelectItem>
        <SelectItem value="blueberry">
          Blueberry
        </SelectItem>
        <SelectItem value="grapes" disabled>
          Grapes
        </SelectItem>
        <SelectItem value="pineapple">
          Pineapple
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="selectedChart">
      <SelectTrigger class="w-[180px]">
        <SelectValue>
          <template v-if="selectedChart">
            <component :is="chartOptions[selectedChart]" />
          </template>
          <template v-else>
            <CircleDashed class="text-muted-foreground" />
            With Icon
          </template>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="(children, value) of chartOptions" :key="value" :value>
          <component :is="children" />
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
