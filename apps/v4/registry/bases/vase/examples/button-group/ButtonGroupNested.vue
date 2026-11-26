<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/vase/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/vase/ui/tooltip"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Nested">
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger>
              <template #element="{ props, elementRef }">
                <InputGroupAddon v-bind="props" :ref="elementRef" align="inline-end">
                  <IconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconHeadphones"
                    hugeicons="AudioWave01Icon"
                    phosphor="WaveformIcon"
                    remixicon="RiSoundModuleLine"
                  />
                </InputGroupAddon>
              </template>
            </TooltipTrigger>
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  </Example>
</template>
