<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <Button disabled>
    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
    Please wait
  </Button>
</template>
