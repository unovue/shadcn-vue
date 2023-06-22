import type { DefineComponent } from 'vue';
import type { ComponentPropsAndEmits } from './index.d';

declare module 'vue' {
	export interface GlobalComponents {
		TransitionFade: DefineComponent<ComponentPropsAndEmits['TransitionFade']>;
		TransitionExpand: DefineComponent<ComponentPropsAndEmits['TransitionExpand']>;
		TransitionScale: DefineComponent<ComponentPropsAndEmits['TransitionScale']>;
		TransitionSlide: DefineComponent<ComponentPropsAndEmits['TransitionSlide']>;
	}
}
