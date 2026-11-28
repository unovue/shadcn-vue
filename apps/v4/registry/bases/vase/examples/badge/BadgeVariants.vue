<script setup lang="ts">
import { Badge } from "@/registry/bases/vase/ui/badge"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Variants">
    <div class="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">
        Secondary
      </Badge>
      <Badge variant="destructive">
        Destructive
      </Badge>
      <Badge variant="outline">
        Outline
      </Badge>
      <Badge variant="ghost">
        Ghost
      </Badge>
      <Badge variant="link">
        Link
      </Badge>
    </div>
  </Example>
</template>
