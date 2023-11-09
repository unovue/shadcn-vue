<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/default/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <AlertCircle class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
