<script lang='ts' setup>
import { Button } from "@/registry/default/ui/button"
import { Kbd } from "@/registry/default/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="sm" class="pr-2">
          Save
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2">
          Save Changes <Kbd>S</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
</template>
