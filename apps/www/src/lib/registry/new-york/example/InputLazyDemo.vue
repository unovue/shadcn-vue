<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/lib/registry/new-york/ui/input'

const emailRef = ref('')
</script>

<template>
  <div class="w-full">
    <Input type="email" placeholder="Email" @change="event => emailRef = event.target.value" />

    <div>
      {{ emailRef }}
    </div>
  </div>
</template>
