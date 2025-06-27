<script setup lang="ts">
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import { Label } from '@/registry/new-york-v4/ui/label'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center space-x-2">
      <Checkbox id="terms1" />
      <Label for="terms1">Accept terms and conditions</Label>
    </div>

    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <Label for="terms2">Accept terms and conditions</Label>
      </div>
      <p class="text-sm text-muted-foreground">
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>

    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <Checkbox id="notifications" />
        <Label for="notifications">Enable notifications</Label>
      </div>
      <div class="space-y-1">
        <p class="text-sm font-medium">
          Enable notifications
        </p>
        <p class="text-sm text-muted-foreground">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </div>
  </div>
</template>
