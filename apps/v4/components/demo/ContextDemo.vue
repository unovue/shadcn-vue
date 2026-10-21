<script setup lang="ts">
import { Button } from '@/registry/bases/reka/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/bases/reka/ui/hover-card'
import { Progress } from '@/registry/bases/reka/ui/progress'

const usage = {
  input: 8420,
  output: 1260,
  reasoning: 980,
  limit: 128000,
}

const used = usage.input + usage.output + usage.reasoning
const percent = Math.round((used / usage.limit) * 100)

function formatTokens(value: number) {
  if (value < 1000)
    return String(value)

  return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`
}

const rows = [
  { label: 'Input', value: usage.input },
  { label: 'Output', value: usage.output },
  { label: 'Reasoning', value: usage.reasoning },
]
</script>

<template>
  <div class="flex justify-center py-12">
    <HoverCard :open-delay="10" :close-delay="100">
      <HoverCardTrigger as-child>
        <Button variant="outline" size="sm">
          {{ percent }}% context
        </Button>
      </HoverCardTrigger>
      <HoverCardContent class="flex w-64 flex-col gap-3">
        <div class="flex items-center justify-between gap-3 text-sm">
          <span class="font-medium">Context</span>
          <span class="text-muted-foreground">
            {{ formatTokens(used) }} / {{ formatTokens(usage.limit) }}
          </span>
        </div>
        <Progress :model-value="percent" aria-label="Context used" />
        <div class="flex flex-col gap-1 text-sm">
          <div
            v-for="row in rows"
            :key="row.label"
            class="flex justify-between gap-3"
          >
            <span class="text-muted-foreground">{{ row.label }}</span>
            <span>{{ formatTokens(row.value) }}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
