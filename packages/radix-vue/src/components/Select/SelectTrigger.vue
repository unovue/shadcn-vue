<template>
	<ListboxButton v-slot="{ open }"
		class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
		<span>
			<slot />
		</span>
		<Icon icon="lucide:chevron-down" :class="`h-4 w-4 opacity-50 transition-all ${open ? 'rotate-180' : ''}`" />
	</ListboxButton>
</template>

<script setup>
import {
	ListboxButton,
} from '@headlessui/vue'
import { Icon } from "@iconify/vue";
</script>