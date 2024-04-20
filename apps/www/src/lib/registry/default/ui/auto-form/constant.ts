import { AutoFormFieldArray, AutoFormFieldBoolean, AutoFormFieldDate, AutoFormFieldEnum, AutoFormFieldFile, AutoFormFieldInput, AutoFormFieldNumber, AutoFormFieldObject } from './'

export const INPUT_COMPONENTS = {
  date: AutoFormFieldDate,
  select: AutoFormFieldEnum,
  radio: AutoFormFieldEnum,
  checkbox: AutoFormFieldBoolean,
  switch: AutoFormFieldBoolean,
  textarea: AutoFormFieldInput,
  number: AutoFormFieldNumber,
  string: AutoFormFieldInput,
  file: AutoFormFieldFile,
  array: AutoFormFieldArray,
  object: AutoFormFieldObject,
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
  ZodArray: 'array',
  ZodObject: 'object',
}
