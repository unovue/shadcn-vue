<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import { Spinner } from "@/registry/bases/reka/ui/spinner"
</script>

<template>
  <Example title="In Buttons">
    <div class="flex flex-wrap items-center gap-4">
      <Button>
        <Spinner data-icon="inline-start" /> Submit
      </Button>
      <Button disabled>
        <Spinner data-icon="inline-start" /> Disabled
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" /> Outline
      </Button>
      <Button variant="outline" size="icon" disabled>
        <Spinner data-icon="inline-start" />
        <span class="sr-only">Loading...</span>
      </Button>
    </div>
  </Example>
</template>
