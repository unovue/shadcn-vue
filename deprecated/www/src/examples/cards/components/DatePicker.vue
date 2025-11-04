<script setup lang="ts">
import DatePickerWithRange from '@/registry/default/examples/DatePickerWithRange.vue'
import { Card, CardContent } from '@/registry/new-york/ui/card'
import { Label } from '@/registry/new-york/ui/label'
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <div class="space-y-2">
        <Label for="date" class="shrink-0">
          Pick a date
        </Label>
        <DatePickerWithRange />
      </div>
    </CardContent>
  </Card>
</template>
