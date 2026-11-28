<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/bases/vase/ui/dropdown-menu"

const position = ref("bottom")
</script>

<template>
  <Example title="With Radio Group">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit">
            Radio Group
          </Button>
        </template>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup v-model="position">
            <DropdownMenuRadioItem value="top">
              <IconPlaceholder
                lucide="ArrowUpIcon"
                tabler="IconArrowUp"
                hugeicons="ArrowUp01Icon"
                phosphor="ArrowUpIcon"
                remixicon="RiArrowUpLine"
              />
              Top
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              <IconPlaceholder
                lucide="ArrowDownIcon"
                tabler="IconArrowDown"
                hugeicons="ArrowDown01Icon"
                phosphor="ArrowDownIcon"
                remixicon="RiArrowDownLine"
              />
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" :disabled="true">
              <IconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight01Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              />
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
</template>
