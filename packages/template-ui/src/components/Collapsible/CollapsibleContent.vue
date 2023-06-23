<template>
	<DisclosurePanel class="overflow-hidden text-sm">
		<slot />
	</DisclosurePanel>
</template>
  
<script setup>
import {
	DisclosurePanel,
} from '@headlessui/vue'
</script>