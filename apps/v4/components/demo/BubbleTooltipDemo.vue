<script setup lang="ts">
import { CheckIcon } from '@lucide/vue'
import { Bubble, BubbleContent, BubbleReactions } from '@/registry/new-york-v4/ui/bubble'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip'
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
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon-sm" class="rounded-full">
              <CheckIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
        </Tooltip>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
