<script setup lang="ts">
import OTPForm from "~/registry/new-york-v4/blocks/otp-02/components/OTPForm.vue"
</script>

<template>
  <div class="flex min-h-svh w-full">
    <div class="flex w-full items-center justify-center p-6 lg:w-1/2">
      <div class="w-full max-w-xs">
        <OTPForm />
      </div>
    </div>
    <div class="relative hidden w-1/2 lg:block">
      <img
        alt="Authentication"
        class="absolute inset-0 h-full w-full object-cover"
        height="{1080}"
        src="/placeholder.svg"
        width="{1920}"
      >
    </div>
  </div>
</template>
