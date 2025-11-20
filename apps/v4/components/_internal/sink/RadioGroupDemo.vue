<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/registry/new-york-v4/ui/radio-group'

const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    description:
      'Perfect for small businesses getting started with our platform',
    price: '$10',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    description: 'Advanced features for growing businesses with higher demands',
    price: '$20',
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-6">
    <RadioGroup default-value="comfortable">
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r1" value="default" />
        <Label for="r1">Default</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r2" value="comfortable" />
        <Label for="r2">Comfortable</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r3" value="compact" />
        <Label for="r3">Compact</Label>
      </div>
    </RadioGroup>
    <RadioGroup default-value="starter" class="max-w-sm">
      <Label
        v-for="plan in plans"
        :key="plan.id"
        class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-green-600 has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:border-green-900 dark:has-[[data-state=checked]]:bg-green-950"
      >
        <RadioGroupItem
          :id="plan.name"
          :value="plan.id"
          class="shadow-none data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white"
        />
        <div class="grid gap-1 font-normal">
          <div class="font-medium">{{ plan.name }}</div>
          <div class="text-muted-foreground leading-snug">
            {{ plan.description }}
          </div>
        </div>
      </Label>
    </RadioGroup>
  </div>
</template>
