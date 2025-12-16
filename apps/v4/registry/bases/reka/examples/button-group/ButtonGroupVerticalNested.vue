<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Vertical Nested">
    <ButtonGroup orientation="vertical" aria-label="Design tools palette">
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="CopyIcon"
            tabler="IconCopy"
            hugeicons="Copy01Icon"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="ShareIcon"
            tabler="IconShare"
            hugeicons="Share03Icon"
          />
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="FlipHorizontalIcon"
            tabler="IconFlipHorizontal"
            hugeicons="FlipHorizontalIcon"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="FlipVerticalIcon"
            tabler="IconFlipVertical"
            hugeicons="FlipVerticalIcon"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="RotateCwIcon"
            tabler="IconRotateClockwise2"
            hugeicons="Rotate01Icon"
          />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="TrashIcon"
            tabler="IconTrash"
            hugeicons="Delete02Icon"
          />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  </Example>
</template>
