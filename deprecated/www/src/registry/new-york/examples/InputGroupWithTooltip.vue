<script setup lang="ts">
import { HelpCircle, InfoIcon } from "lucide-vue-next"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/new-york/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/new-york/ui/tooltip"
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput placeholder="Enter password" type="password" />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger as-child>
            <InputGroupButton
              variant="ghost"
              aria-label="Info"
              size="icon-xs"
            >
              <InfoIcon />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Password must be at least 8 characters</p>
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Your email address" />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger as-child>
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              size="icon-xs"
            >
              <HelpCircle />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>We&apos;ll use this to send you notifications</p>
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Enter API key" />
      <Tooltip>
        <TooltipTrigger as-child>
          <InputGroupAddon>
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              size="icon-xs"
            >
              <HelpCircle />
            </InputGroupButton>
          </InputGroupAddon>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Click for help with API keys</p>
        </TooltipContent>
      </Tooltip>
    </InputGroup>
  </div>
</template>
