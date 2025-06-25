<script setup lang="ts">
const { params } = toRefs(useRoute())
const chartType = computed(() => params.value.type.toString())
</script>

<template>
  <div class="grid flex-1 gap-12 lg:gap-24">
    hi
  </div>
</template>
