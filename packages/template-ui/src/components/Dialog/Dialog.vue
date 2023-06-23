<template>
	<TransitionRoot :appear="appear" :show="isOpen" as="template">
		<Dialog class="relative z-50" @close="close">
			<TransitionChild v-if="overlay" as="template" :appear="appear" enter='ease-out duration-300'
				enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100'
				leaveTo='opacity-0'>
				<div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in" />
			</TransitionChild>

			<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
					<TransitionChild as="template" :appear="appear" enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
						<DialogPanel
							class="fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-white p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full">
							<slot />
						</DialogPanel>
					</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
  
<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	appear: {
		type: Boolean,
		default: false
	},
	overlay: {
		type: Boolean,
		default: true
	},
	transition: {
		type: Boolean,
		default: true
	}
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

function close(value: boolean) {
	isOpen.value = value
	emit('close')
}
</script>