<script setup lang="ts">
import { Rocket } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/registry/new-york/ui/alert'
</script>

<template>
  <Alert>
    <Rocket class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
