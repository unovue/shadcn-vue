<script setup lang="ts">
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="picture">Picture</Label>
    <Input id="picture" type="file" />
  </div>
</template>
