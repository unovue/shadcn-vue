<template>
	<div class="flex">
		<DisclosureButton class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-headlessui-state=open]>svg]:rotate-180">
			<slot />
			<Icon icon="heroicons:chevron-down" class="text-[16px] transition-transform duration-200" />
		</DisclosureButton>
	</div>
</template>

<script setup lang="ts">
import { DisclosureButton } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
/*
import MorphConfig from "@/morph.config.js";
import { computed } from "vue";


const triggerClass = computed(() => {
	if (MorphConfig.ui.accordion.trigger) return MorphConfig.ui.accordion.trigger;
	return "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-headlessui-state=open]>svg]:rotate-180";
});
*/
</script>
