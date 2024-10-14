<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { Textarea } from '@/lib/registry/default/ui/textarea'
</script>

<template>
  <div class="grid w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
</template>
