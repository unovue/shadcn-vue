<script setup lang="ts">
defineProps<{
  type: 'prop' | 'emit' | 'slot' | 'method'
  data: { name: string, description: string, type: string, required: boolean }[]
}>()
</script>

<template>
  <div>
    <h2 class="capitalize">
      {{ type }}
    </h2>

    <div v-for="(item, index) in data" :key="index" class="py-4 border-b text-sm">
      <div class="flex items-center gap-2 flex-wrap">
        <h5 class="text-sm">
          <code>{{ item.name }}</code>
        </h5>
        <code>{{ item.type }}</code>
        <span v-if="item.required" class="font-normal text-red-500 text-xs">Required*</span>
      </div>

      <div class="[&_p]:!my-2 ml-1" v-html="item.description" />
    </div>
  </div>
</template>
