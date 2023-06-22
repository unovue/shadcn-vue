import type { AllowedComponentProps } from 'vue';
import type { ComponentCustomProps } from 'vue';
import type { ComponentOptionsMixin } from 'vue';
import type { DefineComponent } from 'vue';
import type { IconifyIcon } from '@iconify/types';
import type { IconifyJSON } from '@iconify/types';
import { IconifyTransformations } from '@iconify/types';
import type { VNodeProps } from 'vue';

/**
 * Add collection to storage, allowing to call icons by name
 *
 * @param data Icon set
 * @param prefix Optional prefix to add to icon names, true (default) if prefix from icon set should be used.
 */
export declare function addCollection(data: IconifyJSON, prefix?: string | boolean): void;

/**
 * Add icon to storage, allowing to call it by name
 *
 * @param name
 * @param data
 */
export declare function addIcon(name: string, data: IconifyIcon): void;

/**
 * Component
 */
export declare const Icon: DefineComponent<IconProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<IconProps>, {}>;

/**
 * Properties for element that are mentioned in render.ts
 */
declare interface IconifyElementProps {
    id?: string;
    style?: unknown;
    onLoad?: IconifyIconOnLoad;
}

export { IconifyIcon }

/**
 * Icon customisations
 */
export declare type IconifyIconCustomisations = IconifyIconCustomisations_2 & {
    rotate?: string | number;
    inline?: boolean;
};

/**
 * Icon customisations
 */
declare interface IconifyIconCustomisations_2 extends IconifyTransformations, IconifyIconSizeCustomisations {
}

/**
 * Callback for when icon has been loaded (only triggered for icons loaded from API)
 */
declare type IconifyIconOnLoad = (name: string) => void;

/**
 * Icon properties
 */
export declare interface IconifyIconProps extends IconifyIconCustomisations {
    icon: IconifyIcon | string;
    mode?: IconifyRenderMode;
    color?: string;
    flip?: string;
}

/**
 * Icon size
 */
export declare type IconifyIconSize = null | string | number;

/**
 * Dimensions
 */
declare interface IconifyIconSizeCustomisations {
    width?: IconifyIconSize;
    height?: IconifyIconSize;
}

export { IconifyJSON }

/**
 * Icon render mode
 *
 * 'style' = 'bg' or 'mask', depending on icon content
 * 'bg' = <span> with style using `background`
 * 'mask' = <span> with style using `mask`
 * 'svg' = <svg>
 */
export declare type IconifyRenderMode = 'style' | 'bg' | 'mask' | 'svg';

/**
 * Mix of icon properties and HTMLElement properties
 */
export declare type IconProps = IconifyElementProps & IconifyIconProps;

export { }
