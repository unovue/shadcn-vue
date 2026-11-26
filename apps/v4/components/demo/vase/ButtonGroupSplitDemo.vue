<script setup lang="ts">
import { PlusIcon } from '@lucide/vue'
import { Button } from '@/styles/vase-vega/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/styles/vase-vega/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button variant="secondary">
      Button
    </Button>
    <ButtonGroupSeparator />
    <Button size="icon" variant="secondary">
      <PlusIcon />
    </Button>
  </ButtonGroup>
</template>
