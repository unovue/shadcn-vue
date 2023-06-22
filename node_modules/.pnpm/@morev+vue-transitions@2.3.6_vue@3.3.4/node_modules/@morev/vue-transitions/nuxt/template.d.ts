import type { DefineComponent } from 'vue';
import type { ComponentPropsAndEmits } from '@morev/vue-transitions';

declare module 'vue' {
	export interface GlobalComponents {<%= options.declarations %>}
}
