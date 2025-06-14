<script setup lang="ts">
const { data } = await useNavigation()

const list = computed(() => data.value?.[0].children.find(item => item.title === 'Components')?.children ?? [])
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
    <NuxtLink
      v-for="component in list"
      :key="component.title"
      :to="component.path"
      class="text-lg font-medium underline-offset-4 hover:underline md:text-base"
    >
      {{ component.title }}
    </NuxtLink>
  </div>
</template>
