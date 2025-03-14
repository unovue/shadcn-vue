<script setup lang="ts">
import { Button } from '@/registry/default/ui/button'
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <Button disabled>
    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    Please wait
  </Button>
</template>
