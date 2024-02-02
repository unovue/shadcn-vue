<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/lib/registry/new-york/ui/button'
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    }"
  >
    Add to calander
  </Button>
</template>
