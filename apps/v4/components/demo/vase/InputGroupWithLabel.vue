<script setup lang="ts">
import { InfoIcon } from '@lucide/vue'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/styles/vase-vega/ui/input-group'
import { Label } from '@/styles/vase-vega/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/styles/vase-vega/ui/tooltip'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput id="email" placeholder="shadcn" />
      <InputGroupAddon>
        <Label for="email">@</Label>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
      <InputGroupAddon align="block-start">
        <Label for="email-2" class="text-foreground">
          Email
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <template #element="{ props, elementRef }">
                <InputGroupButton
                  v-bind="props" :ref="elementRef"
                  variant="ghost"
                  aria-label="Help"
                  class="ml-auto rounded-full"
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
              </template>
            </TooltipTrigger>
            <TooltipContent>
              <p>We'll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
