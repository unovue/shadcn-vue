<script setup lang="ts">
import { Button } from "@/registry/new-york/ui/button"
import { useToast } from "@/registry/new-york/ui/toast/use-toast"

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
