<script setup lang="ts">
import { Button } from "@/registry/new-york/ui/button"
import { ButtonGroup } from "@/registry/new-york/ui/button-group"
import { Kbd, KbdGroup } from "@/registry/new-york/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ButtonGroup>
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
    </ButtonGroup>
  </div>
</template>
