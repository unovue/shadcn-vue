<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/lib/registry/new-york/ui/pin-input'
import { ref } from 'vue'

const value = ref<string[]>([])
const handleComplete = (e: string[]) => alert(e.join(''))
</script>

<template>
  <div>
    <PinInput
      id="pin-input"
      v-model="value"
      placeholder="○"
      @complete="handleComplete"
    >
      <PinInputGroup>
        <PinInputInput
          v-for="(id, index) in 5"
          :key="id"
          :index="index"
        />
      </PinInputGroup>
    </PinInput>
  </div>
</template>
