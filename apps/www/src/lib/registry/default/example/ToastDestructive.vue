<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { ToastAction } from '@/lib/registry/default/ui/toast'
import { useToast } from '@/lib/registry/default/ui/toast/use-toast'
import { h } from 'vue'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
        action: h(ToastAction, {
          altText: 'Try again',
        }, {
          default: () => 'Try again',
        }),
      });
    }"
  >
    Show Toast
  </Button>
</template>
