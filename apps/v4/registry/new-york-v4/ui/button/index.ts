import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "rounded-md font-medium flex items-center justify-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        solid: "",
        outline: "",
        soft: "",
        subtle: "",
        ghost: "",
        link: "",
        default: "",
        destructive: "",
        secondary: "",
      },
      size: {
        xs: "px-2 py-1 text-xs gap-1",
        sm: "px-2.5 py-1.5 text-xs gap-1.5",
        md: "px-2.5 py-1.5 text-sm gap-1.5",
        lg: "px-3 py-2 text-sm gap-2",
        xl: "px-3 py-2 text-base gap-2",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
    },
    compoundVariants: [
      // ----------------
      // SOLID
      // ----------------
      {
        variant: ["solid", "default"],
        color: "primary",
        class:
          "text-primary-content bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
      },
      {
        variant: ["solid", "secondary"],
        color: "secondary",
        class:
          "text-secondary-content bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary",
      },
      {
        variant: ["solid", "destructive"],
        color: "error",
        class:
          "text-error-content bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-error",
      },
      {
        variant: "solid",
        color: "success",
        class:
          "text-success-content bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-success",
      },
      {
        variant: "solid",
        color: "info",
        class:
          "text-info-content bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-info",
      },
      {
        variant: "solid",
        color: "warning",
        class:
          "text-warning-content bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-warning",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-inverted",
      },

      // ----------------
      // OUTLINE
      // ----------------
      {
        variant: "outline",
        color: "primary",
        class:
          "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-primary",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-secondary",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-success",
      },
      {
        variant: "outline",
        color: "info",
        class:
          "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-info",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-warning",
      },
      {
        variant: "outline",
        color: "error",
        class:
          "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-error",
      },
      {
        variant: "outline",
        color: "neutral",
        class:
          "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus-visible:ring-2 focus-visible:ring-inverted",
      },

      // ----------------
      // SOFT
      // ----------------
      {
        variant: "soft",
        color: "primary",
        class:
          "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10",
      },
      {
        variant: "soft",
        color: "success",
        class:
          "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10",
      },
      {
        variant: "soft",
        color: "info",
        class:
          "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10",
      },
      {
        variant: "soft",
        color: "warning",
        class:
          "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10",
      },
      {
        variant: "soft",
        color: "error",
        class:
          "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10",
      },
      {
        variant: "soft",
        color: "neutral",
        class:
          "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated",
      },

      // ----------------
      // SUBTLE
      // ----------------
      {
        variant: "subtle",
        color: "primary",
        class:
          "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary",
      },
      {
        variant: "subtle",
        color: "secondary",
        class:
          "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus-visible:ring-2 focus-visible:ring-secondary",
      },
      {
        variant: "subtle",
        color: "success",
        class:
          "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus-visible:ring-2 focus-visible:ring-success",
      },
      {
        variant: "subtle",
        color: "info",
        class:
          "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus-visible:ring-2 focus-visible:ring-info",
      },
      {
        variant: "subtle",
        color: "warning",
        class:
          "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus-visible:ring-2 focus-visible:ring-warning",
      },
      {
        variant: "subtle",
        color: "error",
        class:
          "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus-visible:ring-2 focus-visible:ring-error",
      },
      {
        variant: "subtle",
        color: "neutral",
        class:
          "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus-visible:ring-2 focus-visible:ring-inverted",
      },

      // ----------------
      // GHOST
      // ----------------
      {
        variant: "ghost",
        color: "primary",
        class:
          "text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-primary/10",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-secondary/10",
      },
      {
        variant: "ghost",
        color: "success",
        class:
          "text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-success/10",
      },
      {
        variant: "ghost",
        color: "info",
        class:
          "text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-info/10",
      },
      {
        variant: "ghost",
        color: "warning",
        class:
          "text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-warning/10",
      },
      {
        variant: "ghost",
        color: "error",
        class:
          "text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:bg-error/10",
      },
      {
        variant: "ghost",
        color: "neutral",
        class:
          "text-default hover:bg-elevated active:bg-elevated focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
      },

      // ----------------
      // LINK
      // ----------------
      {
        variant: "link",
        color: "primary",
        class:
          "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
      },
      {
        variant: "link",
        color: "secondary",
        class:
          "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
      },
      {
        variant: "link",
        color: "success",
        class:
          "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
      },
      {
        variant: "link",
        color: "info",
        class:
          "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
      },
      {
        variant: "link",
        color: "warning",
        class:
          "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
      },
      {
        variant: "link",
        color: "error",
        class:
          "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
      },
      {
        variant: "link",
        color: "neutral",
        class:
          "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
