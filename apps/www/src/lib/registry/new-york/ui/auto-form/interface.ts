import type { InputHTMLAttributes, SelectHTMLAttributes } from 'vue'
import type { z } from 'zod'
import type { INPUT_COMPONENTS } from './constant'

export interface ConfigItem {
  label?: string
  description?: string
  component?: keyof typeof INPUT_COMPONENTS
  inputProps?: InputHTMLAttributes
  enumProps?: SelectHTMLAttributes & { options?: any[] }
}

export type Config<SchemaType extends object> = {
  // If SchemaType.key is an object, create a nested Config, otherwise ConfigItem
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? Config<SchemaType[Key]>
    : ConfigItem;
}

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

interface BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof SchemaType
  type: DependencyType
  targetField: keyof SchemaType
  when: (sourceFieldValue: any, targetFieldValue: any) => boolean
}

export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  BaseDependency<SchemaType> & {
    type:
      | DependencyType.DISABLES
      | DependencyType.REQUIRES
      | DependencyType.HIDES
  }

export type EnumValues = readonly [string, ...string[]]

export type OptionsDependency<
  SchemaType extends z.infer<z.ZodObject<any, any>>,
> = BaseDependency<SchemaType> & {
  type: DependencyType.SETS_OPTIONS

  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues
}

export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  | ValueDependency<SchemaType>
  | OptionsDependency<SchemaType>
