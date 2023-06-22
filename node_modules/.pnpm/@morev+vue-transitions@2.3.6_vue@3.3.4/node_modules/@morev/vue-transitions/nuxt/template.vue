<template>
	<the-transition v-bind="<%= options.propsDeclaration %>">
		<slot></slot>
	</the-transition>
</template>

<script>
	import { <%= options.originalPascalName %> as TheTransition } from '@morev/vue-transitions';

	export default {
		name: '<%= options.neededName %>',
		inheritAttrs: false,
		components: { TheTransition },
	};
</script>
