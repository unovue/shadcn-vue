<script setup lang="ts">
import { Button } from '@/registry/new-york/ui/button'
import { Textarea } from '@/registry/new-york/ui/textarea'
</script>

<template>
  <div class="grid w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
</template>
