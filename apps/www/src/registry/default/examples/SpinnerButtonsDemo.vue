<script setup lang="ts">
import { Button } from "@/registry/default/ui/button"
import { Spinner } from "@/registry/default/ui/spinner"
</script>

<template>
  <div className="flex flex-col items-center gap-4">
    <Button disabled size="sm">
      <Spinner class="size-2" />
      Loading...
    </Button>
    <Button variant="outline" disabled size="sm">
      <Spinner class="size-2" />
      Please wait
    </Button>
    <Button variant="secondary" disabled size="sm">
      <Spinner class="size-2" />
      Processing
    </Button>
  </div>
</template>
