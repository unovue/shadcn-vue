<template>
	<div :class="`shrink-0 bg-border ${props.orientation  == 'vertical' ? 'w-[1px] h-full' : 'w-full h-[1px]'}`"></div>
</template>

<script setup>
const props = defineProps({
	orientation: {
		type: String,
		required: false,
		default: "horizontal"
	}
})
</script>