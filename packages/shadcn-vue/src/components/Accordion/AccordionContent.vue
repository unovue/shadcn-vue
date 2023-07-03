<template>
	<DisclosurePanel class="overflow-hidden text-sm">
		<div class="pb-4 pt-0"><slot /></div>
	</DisclosurePanel>
</template>
  
<script setup>
import {
	DisclosurePanel,
} from '@headlessui/vue'
</script>