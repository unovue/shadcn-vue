<script setup lang="ts">
import RadixIconsRocket from '~icons/radix-icons/rocket'
import { Alert, AlertDescription, AlertTitle } from '@/lib/registry/new-york/ui/alert'
</script>

<template>
  <Alert>
    <RadixIconsRocket class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
