<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/vue'

import { Button } from '@/styles/reka-nova/ui/button'
import { ButtonGroup } from '@/styles/reka-nova/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <ButtonGroup>
      <Button variant="outline" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="outline" size="icon-sm" aria-label="Previous">
        <ArrowLeftIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Next">
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  </ButtonGroup>
</template>
