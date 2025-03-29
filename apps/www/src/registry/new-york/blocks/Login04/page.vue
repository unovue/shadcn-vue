<script lang="ts">
export const description = 'A login page with form and image.'
</script>

<script setup lang="ts">
import LoginForm from '@/registry/new-york/block/Login04/components/LoginForm.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
    </div>
  </div>
</template>
