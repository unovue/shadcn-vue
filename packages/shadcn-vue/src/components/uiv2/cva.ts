import { cva, type VariantProps } from "class-variance-authority";

export const AccordionClass = cva("", {
	variants: {
		variant: {
			default: "",
		},
		component: {
			root: "",
			item: "",
			header: "",
			trigger: "",
			content: "",
			contentWrapper: "",
		},
	},
	compoundVariants: [
		{ variant: "default", component: "root", class: "w-[300px]" },
		{ variant: "default", component: "item", class: "border-b w-full" },
		{
			variant: "default",
			component: "trigger",
			class:
				"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
		},
		{
			variant: "default",
			component: "content",
			class:
				"overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
		},
		{
			variant: "default",
			component: "contentWrapper",
			class: "overflow-hidden text-sm",
		},
		{ variant: "default", component: "header", class: "flex" },
	],
	defaultVariants: {
		variant: "default",
	},
});

export type AccordionClassProps = VariantProps<typeof AccordionClass>;

export const SwitchClass = cva("", {
	variants: {
		variant: {
			default: "",
		},
    size: {
      1: "",
      2: "",
    },
		component: {
			root: "unset box-border select-none [&::before]:box-border [&::after]:box-border inline-flex items-center justify-center leading-none m-0 outline-none bg-[#e6e8eb] rounded-full relative focus-within:shadow-[0_0_0_2px_#c1c8cd] data-[state=checked]:bg-[#0091ff] data-[state=checked]:focus-within:shadow-[0_0_0_2px_#5eb0ef]",
			thumb: "absolute left-0 bg-white rounded-full shadow-switch transition-transform duration-100 ease-[cubic-bezier(0.22,_1,_0.36,_1)]",
		},
	},
	compoundVariants: [
		{ size: 1, component: "root", class: "w-[25px] h-[15px]" },
		{ size: 2, component: "root", class: "w-[45px] h-[25px]" },
    { size: 1, component: "thumb", class: "w-[13px] h-[13px] translate-x-[1px] data-[state=checked]:translate-x-[11px]" },
		{ size: 2, component: "thumb", class: "w-[21px] h-[21px] translate-x-0.5 data-[state=checked]:translate-x-[22px]" },
	],
	defaultVariants: {
		variant: "default",
    size: 1,
	},
});
export type SwitchClassProps = VariantProps<typeof SwitchClass>;