<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import { ButtonGroup } from '@/registry/new-york-v4/ui/button-group'
import { Kbd, KbdGroup } from '@/registry/new-york-v4/ui/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ButtonGroup>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button size="sm" variant="outline">
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button size="sm" variant="outline">
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Print Document
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ButtonGroup>
  </div>
</template>
