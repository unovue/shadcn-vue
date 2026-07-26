<script setup lang="ts">
import { Button } from "@/registry/default/ui/button"
import { Spinner } from "@/registry/default/ui/spinner"
</script>

<template>
  <Button disabled>
    <Spinner />
    Processing Payment
  </Button>
</template>
