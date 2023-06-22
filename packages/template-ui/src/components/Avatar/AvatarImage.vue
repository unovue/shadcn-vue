<template>
	<img :src="props.src" :alt="props.alt">
</template>

<script setup>
const props = defineProps({
	src: String,
	alt: String
})
</script>