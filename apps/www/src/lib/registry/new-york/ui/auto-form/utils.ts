import { ZodFirstPartyTypeKind, type z } from 'zod'
import type { FieldConfig } from './interface'

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, ' $1')
  output = output.charAt(0).toUpperCase() + output.slice(1)
  return output
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny,
>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null {
  if (!schema)
    return null
  if ('innerType' in schema._def)
    return getBaseSchema(schema._def.innerType as ChildType)

  if ('schema' in schema._def)
    return getBaseSchema(schema._def.schema as ChildType)

  return schema as ChildType
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny) {
  const baseSchema = getBaseSchema(schema)
  return baseSchema ? baseSchema._def.typeName : ''
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >

  if (typedSchema._def.typeName === 'ZodDefault')
    return typedSchema._def.defaultValue()

  if ('innerType' in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny,
    )
  }
  if ('schema' in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny,
    )
  }

  return undefined
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema,
  fieldConfig?: FieldConfig<z.infer<Schema>>,
) {
  if (!schema)
    return null
  const { shape } = schema
  type DefaultValuesType = Partial<z.infer<Schema>>
  const defaultValues = {} as DefaultValuesType
  if (!shape)
    return defaultValues

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodAny

    // @ts-expect-error weird
    if (getBaseType(item) === ZodFirstPartyTypeKind.ZodObject) {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
        fieldConfig?.[key] as FieldConfig<z.infer<Schema>>,
      )

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType
          defaultValues[pathKey] = defaultItems[defaultItemKey]
        }
      }
    }
    else {
      let defaultValue = getDefaultValueInZodStack(item)
      if (
        (defaultValue === null || defaultValue === '')
        && fieldConfig?.[key]?.inputProps
      ) {
        defaultValue = (fieldConfig?.[key]?.inputProps as unknown as any)
          .defaultValue
      }
      if (defaultValue !== undefined)
        defaultValues[key as keyof DefaultValuesType] = defaultValue
    }
  }

  return defaultValues
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped,
): z.ZodObject<any, any> {
  if (schema?._def.typeName === 'ZodEffects') {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>
    return getObjectFormSchema(typedSchema._def.schema)
  }
  return schema as z.ZodObject<any, any>
}
