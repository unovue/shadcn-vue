<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import { Kbd } from "@/registry/bases/reka/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"
</script>

<template>
  <Example title="With Keyboard Shortcut">
    <Tooltip>
      <TooltipTrigger :as-child="true">
        <Button variant="outline" size="icon-sm">
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSave3Line"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent class="pr-1.5">
        <div class="flex items-center gap-2">
          Save Changes <Kbd>S</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
