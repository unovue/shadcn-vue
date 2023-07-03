<template>
	<Switch v-model="isChecked" :class="isChecked ? 'text-accent-foreground bg-neutral-300' : 'bg-neutral-100'"
		class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-neutral-200/80 hover:text-black-40 h-10 px-3">
		<span>
		<slot />
		</span>
	</Switch>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps({
	modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'close'])

const isChecked = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>
  