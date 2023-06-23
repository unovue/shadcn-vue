<template>
	<div class="py-1.5 pl-8 pr-2 text-sm font-semibold">
		
	
	<ListboxLabel>
		<slot />
	</ListboxLabel>
</div>
</template>

<script setup>
import {
	ListboxLabel,
} from '@headlessui/vue'
</script>