<script setup lang="ts">
import { ref } from "vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Progress } from "@/registry/bases/vase/ui/progress"
import { Slider } from "@/registry/bases/vase/ui/slider"

const value = ref([50])
</script>

<template>
  <Example title="Controlled">
    <div class="flex w-full flex-col gap-4">
      <Progress :value="value[0]" class="w-full" />
      <Slider
        v-model="value"
        :min="0"
        :max="100"
        :step="1"
      />
    </div>
  </Example>
</template>
