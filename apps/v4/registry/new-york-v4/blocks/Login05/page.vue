<script lang="ts">
export const description = "A simple email-only login page."
</script>

<script setup lang="ts">
import LoginForm from "@/registry/new-york-v4/blocks/Login05/components/LoginForm.vue"
</script>

<template>
  <div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>
