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
  <Example title="Long Content">
    <Tooltip>
      <TooltipTrigger :as-child="true">
        <Button variant="outline" class="w-fit">
          Show Tooltip
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        To learn more about how this works, check out the docs. If you have
        any questions, please reach out to us.
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
