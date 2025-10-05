<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'
</script>

<template>
  <Button disabled>
    <Spinner />
    Processing Payment
  </Button>
</template>
