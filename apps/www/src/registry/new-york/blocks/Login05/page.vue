<script lang="ts">
export const description = 'A simple email-only login page.'
</script>

<script setup lang="ts">
import LoginForm from '@/registry/new-york/block/Login05/components/LoginForm.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>
