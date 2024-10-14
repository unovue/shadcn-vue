<script setup lang="ts">
import { Calendar } from '@/lib/registry/default/ui/v-calendar'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <Calendar v-model="date" class="rounded-md border" />
</template>
