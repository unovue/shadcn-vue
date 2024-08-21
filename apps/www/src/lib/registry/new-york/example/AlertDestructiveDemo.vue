<script setup lang="ts">
import { ExclamationTriangleIcon } from '@radix-icons/vue'
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/new-york/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <ExclamationTriangleIcon class="size-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
