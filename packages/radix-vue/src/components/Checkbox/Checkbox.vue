<template>
	<Switch v-model="isOpen" :class="isOpen ? 'text-primary-foreground bg-primary' : ''"
		class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
		<span class="flex items-center justify-center text-current" v-if="isOpen"><Icon icon="lucide:check"/></span>
	</Switch>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { Switch } from '@headlessui/vue'
import { Icon } from "@iconify/vue";

const props = defineProps({
	modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'close'])

const isOpen = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>
  