<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/registry/default/ui/alert'
</script>

<template>
  <Alert>
    <Terminal class="h-4 w-4" />
    <AlertTitle aria-label="test">
      Heads up!
    </AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
