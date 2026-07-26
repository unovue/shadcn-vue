<script setup lang="ts">
import { Button } from '@/styles/reka-nova/ui/button'

const open = ref(false)
</script>

<template>
  <Button v-bind="$attrs" @click="open = true">
    Create Project
  </Button>
  <CreateProjectDialog v-model:open="open" />
</template>
