export { default as FormControl } from "./FormControl.vue"
export { default as FormDescription } from "./FormDescription.vue"
export { default as FormItem } from "./FormItem.vue"
export { default as FormLabel } from "./FormLabel.vue"
export { default as FormMessage } from "./FormMessage.vue"
export { FORM_ITEM_INJECTION_KEY } from "./injectionKeys"
export { Form, Field as FormField, FieldArray as FormFieldArray } from "vee-validate"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export const formItemVariants = cva(
  "gap-2",
  {
    variants: {
      variant: {
        default: "grid",
        flex: "flex",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type FormItemVariants = VariantProps<typeof formItemVariants>
