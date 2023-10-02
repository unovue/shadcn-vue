<script setup lang="ts">
import { Input } from '@/lib/registry/default/ui/input'
import { Button } from '@/lib/registry/default/ui/button'
</script>

<template>
  <div class="flex w-full max-w-sm items-center gap-1.5">
    <Input id="email" type="email" placeholder="Email" />
    <Button type="submit">
      Subscribe
    </Button>
  </div>
</template>
