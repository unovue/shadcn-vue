<script setup lang="ts">
import { h } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import { useToast } from '@/lib/registry/default/ui/toast/use-toast'
import { ToastAction } from '@/lib/registry/default/ui/toast'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
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
