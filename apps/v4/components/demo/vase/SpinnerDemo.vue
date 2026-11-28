<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import { Spinner } from '@/styles/vase-vega/ui/spinner'
</script>

<template>
  <Button disabled>
    <Spinner />
    Processing Payment
  </Button>
</template>
