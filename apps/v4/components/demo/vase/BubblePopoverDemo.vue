<script setup lang="ts">
import { InfoIcon } from '@lucide/vue'
import { Bubble, BubbleContent, BubbleReactions } from '@/styles/vase-vega/ui/bubble'
import { Button } from '@/styles/vase-vega/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/styles/vase-vega/ui/popover'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-12">
    <Bubble align="end">
      <BubbleContent>Run the build script.</BubbleContent>
    </Bubble>
    <Bubble variant="destructive">
      <BubbleContent>Failed to run the command.</BubbleContent>
      <BubbleReactions>
        <Popover>
          <PopoverTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="ghost" size="icon-sm" aria-label="Show error details" class="aria-expanded:text-destructive rounded-full">
                <InfoIcon />
              </Button>
            </template>
          </PopoverTrigger>
          <PopoverContent>
            <div class="flex flex-col gap-1 text-sm">
              <div class="text-sm font-medium">
                Command failed with exit code 1
              </div>
              <div class="text-sm text-muted-foreground">
                ENOENT: no such file or directory, open pnpm-lock.yaml
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
