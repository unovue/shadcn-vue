<template>
	<div class="flex items-center justify-center border border-neutral-200 shadow-sm rounded-xl min-h-[300px] relative px-6 py-4">
		<p class="text-2xl font-semibold absolute left-5 top-3">{{ props.title }}</p>
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: String
})
</script>