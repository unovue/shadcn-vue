<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/new-york/ui/alert'
import { ExclamationTriangleIcon } from '@radix-icons/vue'
</script>

<template>
  <Alert variant="destructive">
    <ExclamationTriangleIcon class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
