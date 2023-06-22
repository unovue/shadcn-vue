/* eslint-disable import/exports-last */
import type { PluginObject, DefineComponent } from 'vue';

// Helpers
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// All components
type TransitionComponents =
	'TransitionFade' | 'TransitionSlide' | 'TransitionExpand' | 'TransitionScale';

// Common props
type CommonProps = {
	/**
	 * Transition tag, in the case of using a transition with `group` attribute.
	 *
	 * @default 'span'
	 */
	tag: string;

	/**
	 * Whether the component should be a transition-group component.
	 *
	 * @default false
	 */
	group: boolean;

	/**
	 * Whether to apply a transition on the initial render of a node.
	 *
	 * @default false
	 */
	appear: boolean | undefined;

	/**
	 * Transition mode.
	 *
	 * @default undefined
	 */
	mode: 'in-out' | 'out-in' | undefined;

	/**
	 * Transition animation duration, ms.
	 *
	 * @default 300
	 */
	duration: number | { enter: number; leave: number };

	/**
	 * Transition animation delay, ms.
	 *
	 * @default 0
	 */
	delay: number | { enter: number; leave: number };

	/**
	 * Transition animation easing. Should be a valid CSS transition timing function.
	 *
	 * @default 'cubic-bezier(.25, .8, .5, 1)'
	 */
	easing: string | { enter: string; leave: string };

	/**
	 * Duration of animation of elements positions changing, in the case of using a transition-group.
	 *
	 * @default 300
	 */
	moveDuration: number;

	/**
	 * Whether to not animate the element opacity.
	 *
	 * @default false
	 */
	noOpacity: boolean;

	/**
	 * Whether to not animate elements positions changing, in the case of using a transition-group. \
	 * Useful in case of repeating `transition-expand` rows.
	 *
	 * @default false
	 */
	noMove: boolean;
};

export type Emits = {
	/**
	 * Called before the element is inserted into the DOM.
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onBeforeEnter: (el: HTMLElement) => void;

	/**
	 * Called one frame after the element is inserted.
	 *
	 * @param   el     Animated element(s).
	 * @param   done   Callback function used to indicate transition end.
	 *
	 * @returns        Nothing.
	 */
	 onEnter: (el: HTMLElement, done: () => void) => void;

	/**
	 * Called when the enter transition has finished.
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onAfterEnter: (el: HTMLElement) => void;

	/**
	 * Called if the enter transition was cancelled.
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onEnterCancelled: (el: HTMLElement) => void;

	/**
	 * Called before the leave hook.
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onBeforeLeave: (el: HTMLElement) => void;

	/**
	 * Called when the leave transition starts.
	 *
	 * @param   el     Animated element(s).
	 * @param   done   Callback function used to indicate transition end.
	 *
	 * @returns        Nothing.
	 */
	 onLeave: (el: HTMLElement, done: () => void) => void;

	/**
	 * Called when the leave transition has finished and the element has been removed from the DOM.
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onAfterLeave: (el: HTMLElement) => void;

	/**
	 * Called if the leave transition was cancelled. \
	 * Only available with `v-show` transitions
	 *
	 * @param   el   Animated element(s).
	 *
	 * @returns      Nothing.
	 */
	 onLeaveCancelled: (el: HTMLElement) => void;
};

// Unique props
type PropExpandAxisValue = 'x' | 'y';
type PropSlideOffsetValue = [number | string, number | string];
type PropScaleAxisValue = 'x' | 'y' | 'both';

type UniqueProps = {
	TransitionFade: never;
	TransitionSlide: {
		/**
		 * The element offset by x and y axis before/after the transition. \
		 * Should be an integer or a string representation of percentage value.
		 *
		 * @default [0, -16]
		 *
		 * @example
		 * :offset="[0, 8]"
		 * :offset="['-100%', 24]"
		 */
		offset: PropSlideOffsetValue | { enter: PropSlideOffsetValue; leave: PropSlideOffsetValue };
	};
	TransitionExpand: {
		/**
		 * Axis by which the element should be expanded.
		 *
		 * @default 'y'
		 */
		axis: PropExpandAxisValue | { enter: PropExpandAxisValue; leave: PropExpandAxisValue };
	};
	TransitionScale: {
		/**
		 * Scale axis to be animated.
		 *
		 * @default 'both'
		 */
		axis: PropScaleAxisValue | { enter: PropScaleAxisValue; leave: PropScaleAxisValue };

		/**
		 * Transform origin property. \
		 * Should be a valid CSS transform origin value.
		 *
		 * @default '50% 50%'
		 */
		origin: string | { enter: string; leave: string };

		/**
		 * The element scale value before/after the transition (the value between `0` and `1`).
		 *
		 * @default 0
		 */
		scale: number | { enter: number; leave: number };
	};
};

export type ComponentProps = DeepPartial<{
	TransitionFade: CommonProps;
	TransitionExpand: CommonProps & UniqueProps['TransitionExpand'];
	TransitionSlide: CommonProps & UniqueProps['TransitionSlide'];
	TransitionScale: CommonProps & UniqueProps['TransitionScale'];
}>;

export type ComponentPropsAndEmits = DeepPartial<{
	TransitionFade: CommonProps & Emits;
	TransitionExpand: CommonProps & UniqueProps['TransitionExpand'] & Emits;
	TransitionSlide: CommonProps & UniqueProps['TransitionSlide'] & Emits;
	TransitionScale: CommonProps & UniqueProps['TransitionScale'] & Emits;
}>;

export type PluginOptions = Partial<{
	/**
	 * Components for global registration. \
	 * Key is an original transition name written in PascalCase like `TransitionExpand`. \
	 * Value is transition name you want to use in your code. It's recommended to not override those names.
	 */
	components: Partial<{ [key in TransitionComponents]: string }>;

	/**
	 * An object allows to change plugin default prop values. \
	 * Key is the prop name, value is desired prop value. \
	 * IMPORTANT: Those props are not validated, so make sure you are using the right values.
	 */
	defaultProps: Partial<CommonProps>;

	/**
	 * An object allows to change default prop values per-component. \
	 * Key is the original transition name written in PascalCase, value is object same as `defaultProps`.
	 */
	componentDefaultProps: DeepPartial<ComponentProps>;
}>;

/* eslint-disable @typescript-eslint/naming-convention */
export declare const TransitionExpand: DefineComponent<ComponentPropsAndEmits['TransitionExpand']>;
export declare const TransitionFade: DefineComponent<ComponentPropsAndEmits['TransitionFade']>;
export declare const TransitionScale: DefineComponent<ComponentPropsAndEmits['TransitionScale']>;
export declare const TransitionSlide: DefineComponent<ComponentPropsAndEmits['TransitionSlide']>;
/* eslint-enable @typescript-eslint/naming-convention */

export const plugin: (options?: PluginOptions) => PluginObject<PluginOptions>;

declare const vueTransitions: () => PluginObject<PluginOptions>;
export default vueTransitions;
