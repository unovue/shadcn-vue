<script setup lang="ts">
import { MinusIcon, PlusIcon } from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
import { ButtonGroup } from '@/registry/new-york-v4/ui/button-group'
</script>

<template>
  <ButtonGroup
    orientation="vertical"
    aria-label="Media controls"
    class="h-fit"
  >
    <Button variant="outline" size="icon">
      <PlusIcon />
    </Button>
    <Button variant="outline" size="icon">
      <MinusIcon />
    </Button>
  </ButtonGroup>
</template>
