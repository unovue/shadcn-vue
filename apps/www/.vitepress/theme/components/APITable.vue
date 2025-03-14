<script setup lang="ts">
import { capitalize } from 'vue'

defineProps<{
  type: 'prop' | 'emit' | 'slot' | 'method'
  data: { name: string, description: string, type: string, required: boolean }[]
}>()
</script>

<template>
  <div>
    <h3>{{ capitalize(type) }}</h3>

    <div v-for="(item, index) in data" :key="index" class="border-b py-4 text-sm">
      <div class="flex flex-wrap items-center gap-2">
        <h5 class="text-sm">
          <code>{{ item.name }}</code>
        </h5>
        <code>{{ item.type }}</code>
        <span v-if="item.required" class="text-xs font-normal text-red-500">Required*</span>
      </div>

      <div class="ml-1 [&_p]:!my-2" v-html="item.description" />
    </div>
  </div>
</template>
