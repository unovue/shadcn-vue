<script setup lang="ts">
import { BotIcon, ChevronDownIcon } from '@lucide/vue'
import { Button } from '@/styles/vase-vega/ui/button'
import { ButtonGroup } from '@/styles/vase-vega/ui/button-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/styles/vase-vega/ui/popover'
import { Separator } from '@/styles/vase-vega/ui/separator'
import { Textarea } from '@/styles/vase-vega/ui/textarea'
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">
      <BotIcon /> Copilot
    </Button>
    <Popover>
      <PopoverTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="icon" aria-label="Open Popover">
            <ChevronDownIcon />
          </Button>
        </template>
      </PopoverTrigger>
      <PopoverContent align="end" class="p-0 text-sm rounded-xl">
        <div class="px-4 py-3">
          <div class="text-sm font-medium">
            Agent Tasks
          </div>
        </div>
        <Separator />
        <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
          <Textarea
            placeholder="Describe your task in natural language."
            class="mb-4 resize-none"
          />
          <p class="font-medium">
            Start a new task with Copilot
          </p>
          <p class="text-muted-foreground">
            Describe your task in natural language. Copilot will work in the
            background and open a pull request for your review.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  </ButtonGroup>
</template>
