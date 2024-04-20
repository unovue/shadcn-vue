import type * as z from 'zod'
import type { Ref } from 'vue'
import { computed, inject, ref, watch } from 'vue'
import { FieldContextKey, FormContextKey } from 'vee-validate'
import { createContext } from 'radix-vue'
import { type Dependency, DependencyType, type EnumValues } from './interface'
import { getIndexIfArray } from './utils'

export const [injectDependencies, provideDependencies] = createContext<Ref<Dependency<z.infer<z.ZodObject<any>>>[] | undefined>>('AutoFormDependencies')

function getValueByPath<T extends Record<string, any>>(obj: T, path: string): any {
  const keys = path.split('.')
  let value = obj

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value)
      value = value[key]
    else
      return undefined
  }

  return value
}

export default function useDependencies(
  fieldName: string,
) {
  const form = inject(FormContextKey)
  const field = inject(FieldContextKey)

  const currentFieldName = fieldName.replace(/\[\d+\]/g, '')

  if (!form)
    throw new Error('useDependencies should be used within <AutoForm>')

  const { controlledValues } = form
  const dependencies = injectDependencies()
  const isDisabled = ref(false)
  const isHidden = ref(false)
  const isRequired = ref(false)
  const overrideOptions = ref<EnumValues | undefined>()

  const currentFieldValue = computed(() => field?.value.value)
  const currentFieldDependencies = computed(() => dependencies.value?.filter(
    dependency => dependency.targetField === currentFieldName,
  ))

  function getSourceValue(dep: Dependency<any>) {
    const source = dep.sourceField as string
    const lastKey = source.split('.').at(-1)
    if (source.includes('.') && lastKey) {
      if (Array.isArray(field?.value.value)) {
        const index = getIndexIfArray(fieldName) ?? -1
        return field?.value.value[index][lastKey]
      }

      return getValueByPath(form!.values, source)
    }

    return controlledValues.value[source as string]
  }

  const sourceFieldValues = computed(() => currentFieldDependencies.value?.map(dep => getSourceValue(dep)))

  const resetConditionState = () => {
    isDisabled.value = false
    isHidden.value = false
    isRequired.value = false
    overrideOptions.value = undefined
  }

  watch([sourceFieldValues, dependencies], () => {
    resetConditionState()
    currentFieldDependencies.value?.forEach((dep) => {
      const sourceValue = getSourceValue(dep)

      const conditionMet = dep.when(sourceValue, currentFieldValue.value)

      switch (dep.type) {
        case DependencyType.DISABLES:
          if (conditionMet)
            isDisabled.value = true

          break
        case DependencyType.REQUIRES:
          if (conditionMet)
            isRequired.value = true

          break
        case DependencyType.HIDES:
          if (conditionMet)
            isHidden.value = true

          break
        case DependencyType.SETS_OPTIONS:
          if (conditionMet)
            overrideOptions.value = dep.options

          break
      }
    })
  }, { immediate: true, deep: true })

  return {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  }
}
