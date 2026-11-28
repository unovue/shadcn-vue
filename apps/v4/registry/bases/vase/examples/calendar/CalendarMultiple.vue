<script setup lang="ts">
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Multiple">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar multiple />
      </CardContent>
    </Card>
  </Example>
</template>
