<template>
		<ListboxOptions
			class="w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md p-1 focus:outline-none">
			<slot />
		</ListboxOptions>
</template>

<script setup>
import {
	ListboxOptions,
} from '@headlessui/vue'
</script>