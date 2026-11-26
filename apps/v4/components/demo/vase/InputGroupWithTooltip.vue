<script setup lang="ts">
import { HelpCircle, InfoIcon } from '@lucide/vue'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/styles/vase-vega/ui/input-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/styles/vase-vega/ui/tooltip'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput placeholder="Enter password" type="password" />
      <InputGroupAddon align="inline-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <template #element="{ props, elementRef }">
                <InputGroupButton
                  v-bind="props" :ref="elementRef"
                  variant="ghost"
                  aria-label="Info"
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
              </template>
            </TooltipTrigger>
            <TooltipContent>
              <p>Password must be at least 8 characters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Your email address" />
      <InputGroupAddon align="inline-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <template #element="{ props, elementRef }">
                <InputGroupButton
                  v-bind="props" :ref="elementRef"
                  variant="ghost"
                  aria-label="Help"
                  size="icon-xs"
                >
                  <HelpCircle />
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
    <InputGroup>
      <InputGroupInput placeholder="Enter API key" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <template #element="{ props, elementRef }">
              <InputGroupAddon v-bind="props" :ref="elementRef">
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  size="icon-xs"
                >
                  <HelpCircle />
                </InputGroupButton>
              </InputGroupAddon>
            </template>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Click for help with API keys</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </InputGroup>
  </div>
</template>
