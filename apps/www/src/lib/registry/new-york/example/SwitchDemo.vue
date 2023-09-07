<script setup lang="ts">
import { Label } from '@/lib/registry/new-york/ui/label'
import { Switch } from '@/lib/registry/new-york/ui/switch'
</script>

<template>
  <div className="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>
