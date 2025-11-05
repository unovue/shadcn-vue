<script setup lang="ts">
import { Button } from "@/registry/new-york/ui/button"
import { Spinner } from "@/registry/new-york/ui/spinner"
</script>

<template>
  <Button disabled>
    <Spinner />
    Processing Payment
  </Button>
</template>
