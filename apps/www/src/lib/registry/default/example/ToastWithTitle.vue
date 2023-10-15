<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { useToast } from '@/lib/registry/default/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }"
  >
    Show Toast
  </Button>
</template>
