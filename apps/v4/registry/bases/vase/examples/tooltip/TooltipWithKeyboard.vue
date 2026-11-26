<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import { Kbd } from "@/registry/bases/vase/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/vase/ui/tooltip"
</script>

<template>
  <Example title="With Keyboard Shortcut">
    <Tooltip>
      <TooltipTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="icon-sm">
            <IconPlaceholder
              lucide="SaveIcon"
              tabler="IconDeviceFloppy"
              hugeicons="FloppyDiskIcon"
              phosphor="FloppyDiskIcon"
              remixicon="RiSave3Line"
            />
          </Button>
        </template>
      </TooltipTrigger>
      <TooltipContent class="pr-1.5">
        <div class="flex items-center gap-2">
          Save Changes <Kbd>S</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
