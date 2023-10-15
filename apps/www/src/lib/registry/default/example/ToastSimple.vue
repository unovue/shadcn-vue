<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { useToast } from '@/lib/registry/default/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        description: 'Your message has been sent.',
      });
    }"
  >
    Show Toast
  </Button>
</template>
