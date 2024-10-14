<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/new-york/ui/alert'
import { RocketIcon } from '@radix-icons/vue'
</script>

<template>
  <Alert>
    <RocketIcon class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
