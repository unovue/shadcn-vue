<script setup lang="ts">
import { Label } from '@/lib/registry/default/ui/label'
import { Textarea } from '@/lib/registry/default/ui/textarea'
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label for="message">Your message</Label>
    <Textarea id="message" placeholder="Type your message here." />
  </div>
</template>
