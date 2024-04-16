import FieldNumber from './fields/Number.vue'
import FieldInput from './fields/Input.vue'
import FieldBoolean from './fields/Boolean.vue'
import FieldDate from './fields/Date.vue'
import FieldEnum from './fields/Enum.vue'

export const INPUT_COMPONENTS = {
  date: FieldDate,
  select: FieldEnum,
  radio: FieldEnum,
  checkbox: FieldBoolean,
  switch: FieldBoolean,
  textarea: FieldInput,
  number: FieldNumber,
  string: FieldInput,
}

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodString: 'string',
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
}
