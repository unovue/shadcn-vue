<template>
	<div class="relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11">
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: String
})
</script>