<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Badge } from "@/registry/bases/vase/ui/badge"
import { Spinner } from "@/registry/bases/vase/ui/spinner"
</script>

<template>
  <Example title="In Badges" class="items-center justify-center">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Badge
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Badge
      </Badge>
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Badge
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Badge
      </Badge>
    </div>
  </Example>
</template>
