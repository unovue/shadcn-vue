<script setup lang="ts">
import { InfoIcon } from '@lucide/vue'
import { Bubble, BubbleContent, BubbleReactions } from '@/registry/new-york-v4/ui/bubble'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york-v4/ui/popover'
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
          <PopoverTrigger as-child>
            <Button variant="ghost" size="icon-sm" aria-label="Show error details" class="aria-expanded:text-destructive rounded-full">
              <InfoIcon />
            </Button>
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
