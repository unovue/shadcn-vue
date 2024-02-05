<script setup lang="ts">
import { ref } from 'vue'
import {
  PinInput,
  PinInputInput,
} from '@/lib/registry/default/ui/pin-input'

const value = ref<string[]>([])
const handleComplete = (e: string[]) => alert(e.join(''))
</script>

<template>
  <div>
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
  </div>
</template>
