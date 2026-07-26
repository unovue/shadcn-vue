<script setup lang="ts">
const { params } = toRefs(useRoute())
const { data } = await useFetch(() => `/api/category/${params.value.categories}`)
</script>

<template>
  <div class="flex flex-col gap-12 md:gap-24">
    <BlockDisplay v-for="name in data?.blocks" :key="name" :name="name" />
  </div>
</template>
