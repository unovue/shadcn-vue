<script setup lang="ts">
import { Textarea } from '@/lib/registry/new-york/ui/textarea'
import { Button } from '@/lib/registry/new-york/ui/button'
</script>

<template>
  <div class="grid w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
</template>
