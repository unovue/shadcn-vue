<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'
</script>

<template>
  <Button size="sm" variant="outline" disabled>
    <Spinner class="animate-spin" />
    Submit
  </Button>
</template>
