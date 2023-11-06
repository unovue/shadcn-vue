<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
</script>

<template>
  <Button as-child>
    <NuxtLink to="/login">
      Login
    </NuxtLink>
  </Button>
</template>
