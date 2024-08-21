<script setup lang="ts">
import { CheckIcon, CircleIcon, DotIcon } from '@radix-icons/vue'

import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/lib/registry/new-york/ui/stepper'
import { Button } from '@/lib/registry/new-york/ui/button'

const steps = [
  {
    step: 1,
    title: 'Your details',
    description: 'Provide your name and email',
  },
  {
    step: 2,
    title: 'Company details',
    description: 'A few details about your company',
  },
  {
    step: 3,
    title: 'Invite your team',
    description: 'Start collaborating with your team',
  },
]
</script>

<template>
  <Stepper class="flex w-full items-start gap-2">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full flex-col items-center justify-center"
      :step="step.step"
    >
      <StepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />

      <StepperTrigger as-child>
        <Button
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          size="icon"
          class="z-10 rounded-full shrink-0"
          :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
        >
          <CheckIcon v-if="state === 'completed'" class="size-5" />
          <CircleIcon v-if="state === 'active'" />
          <DotIcon v-if="state === 'inactive'" />
        </Button>
      </StepperTrigger>

      <div class="mt-5 flex flex-col items-center text-center">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </StepperTitle>
        <StepperDescription
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </Stepper>
</template>
