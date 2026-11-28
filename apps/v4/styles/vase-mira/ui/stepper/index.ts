import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export { default as Stepper } from './Stepper.vue'
export { default as StepperDescription } from './StepperDescription.vue'
export { default as StepperIndicator } from './StepperIndicator.vue'
export { default as StepperItem } from './StepperItem.vue'
export { default as StepperSeparator } from './StepperSeparator.vue'
export { default as StepperTitle } from './StepperTitle.vue'
export { default as StepperTrigger } from './StepperTrigger.vue'

export type StepperItemState = 'completed' | 'active' | 'inactive'

export interface StepperRootContext {
  modelValue: Ref<number>
  changeModelValue: (value: number) => void
  orientation: Readonly<Ref<'horizontal' | 'vertical'>>
  dir: Readonly<Ref<'ltr' | 'rtl'>>
  linear: Readonly<Ref<boolean>>
  items: Map<number, { disabled: boolean }>
  triggers: Set<HTMLElement>
}

export interface StepperItemContext {
  titleId: string
  descriptionId: string
  state: Readonly<Ref<StepperItemState>>
  disabled: Readonly<Ref<boolean>>
  step: Readonly<Ref<number>>
  isFocusable: Readonly<Ref<boolean>>
}

const rootContextKey: InjectionKey<StepperRootContext> = Symbol('Stepper')
const itemContextKey: InjectionKey<StepperItemContext> = Symbol('StepperItem')

export function provideStepperRootContext(context: StepperRootContext) {
  provide(rootContextKey, context)
  return context
}

export function injectStepperRootContext() {
  const context = inject(rootContextKey, null)

  if (!context) {
    throw new Error('`Stepper` parts must be used inside `Stepper`.')
  }

  return context
}

export function provideStepperItemContext(context: StepperItemContext) {
  provide(itemContextKey, context)
  return context
}

export function injectStepperItemContext() {
  const context = inject(itemContextKey, null)

  if (!context) {
    throw new Error('`StepperItem` parts must be used inside `StepperItem`.')
  }

  return context
}

export function getElement(target: unknown): HTMLElement | null {
  const element = (target as { $el?: unknown } | null)?.$el ?? target

  return element instanceof HTMLElement ? element : null
}
