<template>
	<Disclosure as="div" v-slot="{ open }">
		<slot :open="open"></slot>
	</Disclosure>
</template>

<script setup>
import { Disclosure } from "@headlessui/vue"
</script>
