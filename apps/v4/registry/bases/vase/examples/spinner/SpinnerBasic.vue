<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Spinner } from "@/registry/bases/vase/ui/spinner"
</script>

<template>
  <Example title="Basic">
    <div class="flex items-center gap-6">
      <Spinner />
      <Spinner class="size-6" />
    </div>
  </Example>
</template>
