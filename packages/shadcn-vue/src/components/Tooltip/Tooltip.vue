<template>
	<Float :show="show">
	<slot :enter="handleMouseEnter" :leave="handleMouseLeave"/>
		<div static>
			Help me fund my Open Source work!
		</div>
	</Float>
</template>
  
<script setup>
import { ref } from 'vue'
import { Float } from '@headlessui-float/vue'

const show = ref(false)
const handleMouseEnter = () => {
	show.value = true
}
const handleMouseLeave = () => {
	show.value = false
}
</script>