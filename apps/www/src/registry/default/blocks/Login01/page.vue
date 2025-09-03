<script lang="ts">
export const description
  = "A simple login form with email and password. The submit button says 'Sign in'."
export const iframeHeight = "870px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
import LoginForm from "@/registry/default/blocks/Login01/components/LoginForm.vue"
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <LoginForm />
  </div>
</template>
