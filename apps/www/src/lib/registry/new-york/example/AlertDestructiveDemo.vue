<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/new-york/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <AlertTriangle class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
