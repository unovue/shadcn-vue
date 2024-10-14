<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/lib/registry/new-york/ui/stepper'

import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next'

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: BookUser,
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: Truck,
}, {
  step: 3,
  title: 'Payment',
  description: 'Add any payment information you have',
  icon: CreditCard,
}, {
  step: 4,
  title: 'Checkout',
  description: 'Confirm your order',
  icon: Check,
}]
</script>

<template>
  <Stepper>
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    >
      <StepperTrigger>
        <StepperIndicator>
          <component :is="item.icon" class="w-4 h-4" />
        </StepperIndicator>
        <div class="flex flex-col">
          <StepperTitle>
            {{ item.title }}
          </StepperTitle>
          <StepperDescription>
            {{ item.description }}
          </StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="w-full h-px"
      />
    </StepperItem>
  </Stepper>
</template>
