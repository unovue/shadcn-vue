<template>
	<label :for="props.htmlFor"  :class="`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${props.class}`"><slot/></label>
</template>

<script setup>
const props = defineProps({
	class: String,
	id: String,
	htmlFor: String
})
</script>