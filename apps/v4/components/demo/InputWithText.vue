<script setup lang="ts">
import { Input } from '@/registry/new-york-v4/ui/input'
import { Label } from '@/registry/new-york-v4/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="Email" />
    <p class="text-sm text-muted-foreground">
      Enter your email address.
    </p>
  </div>
</template>
