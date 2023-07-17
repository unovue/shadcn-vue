<script setup lang="ts">
import Switch from './Switch.vue';
import { ref } from 'vue'

const switchState = ref(false)
const switchState2 = ref(false)
</script>

<template>
  <Switch v-model:open="switchState">
  </Switch>

  <Switch v-model:open="switchState2" :size="2" class="ml-5">
  </Switch>
</template>
