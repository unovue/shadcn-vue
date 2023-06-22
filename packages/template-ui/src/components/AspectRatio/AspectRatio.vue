<template>
	<div class="relative w-full pb-[50%] overflow-clip">
	<div class="absolute inset-0">
		<slot />
	</div>
</div></template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
	ratio: String
})

const aspect = computed(()=>{
	return 
})
</script>