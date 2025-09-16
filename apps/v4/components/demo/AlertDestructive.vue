<script setup lang="ts">
import { AlertCircleIcon } from 'lucide-vue-next'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/registry/new-york-v4/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
