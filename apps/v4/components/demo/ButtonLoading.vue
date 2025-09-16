<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
</script>

<template>
  <Button disabled>
    <Loader2Icon class="animate-spin" />
    Please wait
  </Button>
</template>
