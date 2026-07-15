<script setup lang="ts">
import { Calendar } from "@/registry/bases/reka/ui/calendar"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Multiple">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar type="multiple" />
      </CardContent>
    </Card>
  </Example>
</template>
