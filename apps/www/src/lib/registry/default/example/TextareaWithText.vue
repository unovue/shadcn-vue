<script setup lang="ts">
import { Textarea } from '@/lib/registry/default/ui/textarea'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label for="message-2">Your message</Label>
    <Textarea id="message-2" placeholder="Type your message here." />
    <p class="text-sm text-muted-foreground">
      Your message will be copied to the support team.
    </p>
  </div>
</template>
