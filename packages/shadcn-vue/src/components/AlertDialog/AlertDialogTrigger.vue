<template>
	<div class="flex items-center justify-center border-2 border-neutral-300 rounded-xl min-h-[300px] relative">
		<p class="text-2xl font-semibold absolute left-5 top-3">{{ props.title }}</p>
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: String
})
</script>