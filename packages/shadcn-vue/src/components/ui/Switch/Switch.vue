<template>
	<Switch v-model="isOpen" :class="isOpen ? 'bg-black' : 'bg-neutral-300'"
		class="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50">
		<span :class="isOpen ? 'translate-x-5' : 'translate-x-0'"
			class="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform" />
	</Switch>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { Switch } from '@headlessui/vue'

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
  