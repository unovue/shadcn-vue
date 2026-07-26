<script setup lang="ts">
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Spinner } from "@/registry/bases/reka/ui/spinner"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Spinner" class="max-w-fit">
    <div class="flex flex-wrap gap-2">
      <Badge>
        <Spinner data-icon="inline-start" />
        Default
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Secondary
      </Badge>
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Destructive
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Outline
      </Badge>
      <Badge variant="ghost">
        <Spinner data-icon="inline-start" />
        Ghost
      </Badge>
      <Badge variant="link">
        <Spinner data-icon="inline-start" />
        Link
      </Badge>
    </div>
  </Example>
</template>
