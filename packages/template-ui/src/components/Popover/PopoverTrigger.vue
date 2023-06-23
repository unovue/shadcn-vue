<template>
	<FloatReference>
	<PopoverButton><slot /></PopoverButton>
</FloatReference>
</template>

<script setup>
import { PopoverButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
</script>