<template>
	<Popover v-slot="{ open }">
		<Float portal composable placement="bottom" flip strategy="fixed" enter="transition duration-200 ease-out"
			enter-from="scale-95 opacity-0" enter-to="scale-100 opacity-100" leave="transition duration-150 ease-in"
			leave-from="scale-100 opacity-100" leave-to="scale-95 opacity-0" tailwindcss-origin-class :offset="6" as="div"
			class="relative">
			<slot :open="open"/>
		</Float>
	</Popover>
</template>

<script setup>
import { Popover } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
</script>