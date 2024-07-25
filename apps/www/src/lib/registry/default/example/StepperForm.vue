<script setup lang="ts">
import { Check, Circle, Dot } from 'lucide-vue-next'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/lib/registry/default/ui/stepper'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'
import { Input } from '@/lib/registry/default/ui/input'
import { Button } from '@/lib/registry/default/ui/button'

const formSchema = [
  z.object({
    username: z.string().min(2).max(50),
  }),
  z.object({
    password: z.string().min(2).max(50),
  }),
]

const stepIndex = ref(1)

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
  <Form v-slot="{ meta }" :validation-schema="toTypedSchema(formSchema[stepIndex - 1]) || undefined">
    <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
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
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
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

    {{ meta.valid }}

    {{ stepIndex.toString() || 'a' }}

    <template v-if="stepIndex === 1">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </template>

    <template v-if="stepIndex === 2">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </template>

    <template v-if="stepIndex === 3">
      <h1>BRUH</h1>
    </template>

    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
