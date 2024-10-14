<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/default/ui/alert'
import { Terminal } from 'lucide-vue-next'
</script>

<template>
  <Alert>
    <Terminal class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
