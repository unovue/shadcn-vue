<template>
	<button @mouseenter="emit('enter')" @mouseleave="emit('leave')">Sponsor me</button>
</template>
  
<script setup>
import { ref } from 'vue'
import { Float } from '@headlessui-float/vue'

const show = ref(false)
const toggle = () => {
	show.value = !show.value
}

const emit = defineEmits(['enter', 'leave'])
</script>