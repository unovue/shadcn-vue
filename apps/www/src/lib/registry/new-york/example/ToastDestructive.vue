<script setup lang="ts">
import { h } from 'vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import { useToast } from '@/lib/registry/new-york/ui/toast/use-toast'
import { ToastAction } from '@/lib/registry/new-york/ui/toast'

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
