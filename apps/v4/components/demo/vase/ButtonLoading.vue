<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import { Spinner } from '@/styles/vase-vega/ui/spinner'
</script>

<template>
  <Button size="sm" variant="outline" disabled>
    <Spinner class="animate-spin" />
    Submit
  </Button>
</template>
