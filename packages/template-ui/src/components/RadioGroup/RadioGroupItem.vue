<template>
	<RadioGroupOption v-slot="{ active, checked }" class="list-none focus:outline-none flex items-center space-x-2 [&>[role='indicator']]:focus:outline-none [&>[role='indicator']]:focus-visible:ring-2 [&>[role='indicator']]:focus-visible:ring-ring [&>[role='indicator']]:focus-visible:ring-offset-2">
			<button role="indicator"
				class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center">
				<span v-show="checked" class="bg-black h-2.5 w-2.5 rounded-full"></span>
			</button>
			<slot />
	</RadioGroupOption>
</template>

<script setup>
import { RadioGroupOption } from '@headlessui/vue';
</script>