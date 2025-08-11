<script lang="ts">
export const description = "A simple login form."
</script>

<script setup lang="ts">
import LoginForm from "@/registry/new-york-v4/blocks/Login01/components/LoginForm.vue"
</script>

<template>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>
