<script lang="ts" setup>
const array: (number | string)[] = [1, 2, 3]
</script>

<template>
  <div v-bind="{ array }">
    template
  </div>
</template>

<style scoped>
</style>
