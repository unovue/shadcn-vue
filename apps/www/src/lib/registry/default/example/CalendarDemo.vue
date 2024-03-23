<script setup lang="ts">
import { ref } from 'vue'
import { getLocalTimeZone, today } from 'flat-internationalized-date'
import { Calendar } from '@/lib/registry/default/ui/calendar'

const value = ref(today(getLocalTimeZone()))
</script>

<template>
  <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />
</template>
