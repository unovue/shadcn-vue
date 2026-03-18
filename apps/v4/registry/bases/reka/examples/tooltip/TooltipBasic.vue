<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"
</script>

<template>
  <Example title="Basic">
    <Tooltip>
      <TooltipTrigger :as-child="true">
        <Button variant="outline" class="w-fit">
          Show Tooltip
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
