<script lang='ts' setup>
import { InfoIcon } from "lucide-vue-next"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/new-york/ui/input-group"
import { Label } from "@/registry/new-york/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/new-york/ui/tooltip"
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
        <Tooltip>
          <TooltipTrigger as-child>
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              class="ml-auto rounded-full"
              size="icon-xs"
            >
              <InfoIcon />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>We&apos;ll use this to send you notifications</p>
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
