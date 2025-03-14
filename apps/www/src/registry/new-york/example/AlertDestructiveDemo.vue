<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/registry/new-york/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
</script>

<template>
  <Alert variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
