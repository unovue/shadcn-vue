<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { useToast } from '@/lib/registry/default/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }"
  >
    Add to calander
  </Button>
</template>
