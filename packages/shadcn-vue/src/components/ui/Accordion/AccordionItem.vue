<template>
	<div class="border-b w-full">
		<Disclosure>
			<slot />
		</Disclosure>
	</div>
</template>

<script setup>
import { Disclosure } from "@headlessui/vue"
</script>
