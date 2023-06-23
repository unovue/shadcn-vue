<template>
	<ListboxOption v-slot="{ active, selected, disabled }" as="template">
		<li :class="[
			active ? 'bg-accent text-accent-foreground' : 'text-gray-900',
			disabled ? 'opacity-50 pointer-events-none' : 'text-gray-900',
			'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
		]">
		<span v-if="selected" class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<Icon icon="lucide:check" class="h-[14px] w-[14px]" aria-hidden="true" />
			</span>
			<span>
				<slot />
			</span>
			
		</li>
	</ListboxOption>
</template>

<script setup>
import {
	ListboxOption,
} from '@headlessui/vue'
import { Icon } from "@iconify/vue";
</script>