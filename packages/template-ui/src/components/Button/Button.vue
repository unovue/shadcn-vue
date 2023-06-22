<template>
	<button
		:class="`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4
		${props.variant==='outline' ? 'border border-neutral-200 hover:bg-neutral-100' : 'bg-black text-white hover:bg-black/80' }`">
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	label: String,
	variant: String,
});
</script>
