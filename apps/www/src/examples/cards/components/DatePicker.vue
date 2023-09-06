<script setup lang="ts">
import DatePickerWithRange from '@/lib/registry/default/example/DatePickerWithRange.vue'
import { Card, CardContent } from '@/lib/registry/default/ui/card'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <div class="space-y-2">
        <Label for="date" class="shrink-0">
          Pick a date
        </Label>
        <DatePickerWithRange class="[&>button]:w-[260px]" />
      </div>
    </CardContent>
  </Card>
</template>
@/lib/registry/default/example/DatePickerWithRange.vue
