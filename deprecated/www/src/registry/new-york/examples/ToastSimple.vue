<script setup lang="ts">
import { Button } from "@/registry/new-york/ui/button"
import { useToast } from "@/registry/new-york/ui/toast/use-toast"

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
