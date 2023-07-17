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
    { variant: "default", component: "trigger", class: "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180" },
    { variant: "default", component: "content", class: "overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up" },
    { variant: "default", component: "contentWrapper", class: "overflow-hidden text-sm" },
    { variant: "default", component: "header", class: "flex" },
	],
	defaultVariants: {
		variant: "default",
	},
});

export type AccordionClassProps = VariantProps<typeof AccordionClass>;
