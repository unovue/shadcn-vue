<script setup lang="ts">
import { Button } from "@/registry/default/ui/button"
import { Kbd } from "@/registry/default/ui/kbd"
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Button variant="outline" size="sm" class="pr-2">
      Accept <Kbd>⏎</Kbd>
    </Button>
    <Button variant="outline" size="sm" class="pr-2">
      Cancel <Kbd>Esc</Kbd>
    </Button>
  </div>
</template>
