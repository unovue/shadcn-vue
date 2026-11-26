<script setup lang="ts">
import { CheckIcon } from '@lucide/vue'
import { Bubble, BubbleContent, BubbleReactions } from '@/styles/vase-vega/ui/bubble'
import { Button } from '@/styles/vase-vega/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/styles/vase-vega/ui/tooltip'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-12">
    <Bubble variant="secondary">
      <BubbleContent>Did you remove the stale route?</BubbleContent>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>Yes, removed it from the registry.</BubbleContent>
      <BubbleReactions>
        <Tooltip>
          <TooltipTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="ghost" size="icon-sm" class="rounded-full">
                <CheckIcon />
              </Button>
            </template>
          </TooltipTrigger>
          <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
        </Tooltip>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
