<script setup lang="ts"></script>

<template>
  <component
    :is="
      // @ts-ignore we can ignore this as we have validated the existence of 1 child in Primitive.vue
      $slots.default?.()[0].children?.[0]
    "
    v-bind="$attrs"
  />
</template>
