<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { Button } from '@/styles/vase-vega/ui/button'
import { ButtonGroup } from '@/styles/vase-vega/ui/button-group'
import { Input } from '@/styles/vase-vega/ui/input'
</script>

<template>
  <ButtonGroup>
    <Input placeholder="Search..." />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>
