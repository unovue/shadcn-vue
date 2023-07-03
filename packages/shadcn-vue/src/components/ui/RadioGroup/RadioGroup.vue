<template>
	<RadioGroup v-model="isOpen" class="flex flex-col gap-2">
		<slot />
	</RadioGroup>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { RadioGroup } from '@headlessui/vue';

const props = defineProps({
	modelValue: String
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
  