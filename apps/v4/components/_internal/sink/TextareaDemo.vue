<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import { Textarea } from '@/registry/new-york-v4/ui/textarea'
</script>

<template>
  <div class="flex w-full flex-col gap-10">
    <Textarea placeholder="Type your message here." />
    <Textarea placeholder="Type your message here." aria-invalid="true" />
    <div class="grid gap-3">
      <Label for="textarea-demo-message">Label</Label>
      <Textarea
        id="textarea-demo-message"
        placeholder="Type your message here."
        :rows="6"
      />
    </div>
    <div class="grid gap-3">
      <Label for="textarea-demo-message-2">
        With label and description
      </Label>
      <Textarea
        id="textarea-demo-message-2"
        placeholder="Type your message here."
        :rows="6"
      />
      <div class="text-muted-foreground text-sm">
        Type your message and press enter to send.
      </div>
    </div>
    <div class="grid gap-3">
      <Label for="textarea-demo-disabled">Disabled</Label>
      <Textarea
        id="textarea-demo-disabled"
        placeholder="Type your message here."
        disabled
      />
    </div>
  </div>
</template>
