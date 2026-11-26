<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Card, CardContent, CardHeader } from "@/registry/bases/vase/ui/card"
import { Skeleton } from "@/registry/bases/vase/ui/skeleton"
</script>

<template>
  <Example title="Card">
    <Card class="w-full">
      <CardHeader>
        <Skeleton class="h-4 w-2/3" />
        <Skeleton class="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton class="aspect-square w-full" />
      </CardContent>
    </Card>
  </Example>
</template>
