<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import { Switch } from '@/registry/new-york-v4/ui/switch'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <Switch id="switch-demo-airplane-mode" />
      <Label for="switch-demo-airplane-mode">Airplane Mode</Label>
    </div>
    <div class="flex items-center gap-2">
      <Switch
        id="switch-demo-bluetooth"
        class="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
        :default-value="true"
      />
      <Label for="switch-demo-bluetooth">Bluetooth</Label>
    </div>
    <Label class="flex items-center gap-6 rounded-lg border p-4 has-[[data-state=checked]]:border-blue-600">
      <div class="flex flex-col gap-1">
        <div class="font-medium">Share across devices</div>
        <div class="text-muted-foreground text-sm font-normal">
          Focus is shared across devices, and turns off when you leave the
          app.
        </div>
      </div>
      <Switch
        id="switch-demo-focus-mode"
        class="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
      />
    </Label>
  </div>
</template>
