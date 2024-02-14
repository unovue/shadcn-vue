<script setup lang="ts">
import { ref } from 'vue'
import {
  PinInput,
  PinInputInput,
} from '@/lib/registry/new-york/ui/pin-input'

const value = ref<string[]>([])
function handleComplete() {
  console.log('212121')
}
</script>

<template>
  <PinInput
    id="pin-input"
    v-model="value"
    placeholder="○"
    class="flex gap-2 items-center mt-1"
    @complete="handleComplete"
  >
    <PinInputInput
      v-for="(id, index) in 5"
      :key="id"
      :index="index"
    />
  </PinInput>
</template>
