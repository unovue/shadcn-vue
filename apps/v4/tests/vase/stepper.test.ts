// @vitest-environment happy-dom
import assert from 'node:assert/strict'
import { afterEach, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/registry/bases/vase/ui/stepper'
import { flush, mount, press } from './mount'

const cleanups: (() => void)[] = []

afterEach(() => cleanups.splice(0).forEach(cleanup => cleanup()))

interface Api {
  modelValue: number
  totalSteps: number
  isNextDisabled: boolean
  isPrevDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

async function render(props: Record<string, unknown> = {}, itemProps: Record<number, Record<string, unknown>> = {}, triggerProps: Record<string, unknown> = {}) {
  const step = ref<number | undefined>(undefined)
  const api = {} as { current: Api }
  const Host = defineComponent({
    setup: () => () => h(Stepper, {
      'modelValue': step.value,
      'onUpdate:modelValue': (value: number) => {
        step.value = value
      },
      ...props,
    }, {
      default: (slot: Api) => {
        api.current = slot

        return [1, 2, 3].map(n => h(StepperItem, { step: n, key: n, ...itemProps[n] }, () => [
          h(StepperTrigger, { id: `trigger-${n}`, ...triggerProps }, () => [
            h(StepperIndicator),
            h(StepperTitle, null, () => `Title ${n}`),
            h(StepperDescription, null, () => `Description ${n}`),
          ]),
          n < 3 ? h(StepperSeparator) : null,
        ]))
      },
    }),
  })
  const mounted = mount(Host)
  cleanups.push(mounted.unmount)
  await flush()

  const items = () => [...mounted.host.querySelectorAll<HTMLElement>('[data-slot=stepper-item]')]
  const trigger = (n: number) => mounted.host.querySelector<HTMLButtonElement>(`#trigger-${n}`)!

  return { host: mounted.host, api, step, items, trigger, states: () => items().map(item => item.dataset.state) }
}

it('starts at the first step and announces it', async () => {
  const { host, items, states } = await render()

  assert.deepEqual(states(), ['active', 'inactive', 'inactive'])
  assert.equal(items()[0]!.getAttribute('aria-current'), 'true')
  assert.equal(host.querySelector('[role=status]')!.textContent!.trim(), 'Step 1 of 3')
  assert.equal(host.querySelector('[role=group]')!.getAttribute('data-orientation'), 'horizontal')
})

it('moves one step at a time and completes the steps behind', async () => {
  const { api, step, states } = await render()

  api.current.nextStep()
  await flush()
  assert.equal(step.value, 2)
  assert.deepEqual(states(), ['completed', 'active', 'inactive'])

  api.current.prevStep()
  await flush()
  assert.deepEqual(states(), ['active', 'inactive', 'inactive'])
})

it('counts more than one step in a tick', async () => {
  const { api, step, states } = await render()

  api.current.nextStep()
  api.current.nextStep()
  await flush()

  assert.equal(step.value, 3)
  assert.deepEqual(states(), ['completed', 'completed', 'active'])
})

it('keeps the order of a linear stepper, and frees it when it is not linear', async () => {
  const linear = await render()

  linear.api.current.goToStep(3)
  await flush()
  assert.equal(linear.step.value, undefined)
  assert.equal(linear.trigger(3).hasAttribute('disabled'), true)

  const free = await render({ linear: false })

  free.api.current.goToStep(3)
  await flush()
  assert.equal(free.step.value, 3)
  assert.equal(free.trigger(3).hasAttribute('disabled'), false)
})

it('skips a disabled step', async () => {
  const { api, step, trigger } = await render({ linear: false }, { 2: { disabled: true } })

  assert.equal(api.current.isNextDisabled, true)
  api.current.goToStep(2)
  await flush()
  assert.equal(step.value, undefined)
  assert.equal(trigger(2).hasAttribute('disabled'), true)
})

it('gives the position to the slot', async () => {
  const { api } = await render({ defaultValue: 3 })

  assert.equal(api.current.totalSteps, 3)
  assert.equal(api.current.isLastStep, true)
  assert.equal(api.current.isFirstStep, false)
  assert.equal(api.current.hasNext(), false)
  assert.equal(api.current.hasPrev(), true)
  assert.equal(api.current.isNextDisabled, true)
  assert.equal(api.current.isPrevDisabled, false)
})

it('goes to the step of a trigger by the pointer and by the keys', async () => {
  const { step, trigger } = await render()

  trigger(3).dispatchEvent(new MouseEvent('mousedown', { button: 0, bubbles: true, cancelable: true }))
  await flush()
  assert.equal(step.value, undefined)

  trigger(2).dispatchEvent(new MouseEvent('mousedown', { button: 0, bubbles: true, cancelable: true }))
  await flush()
  assert.equal(step.value, 2)

  press(trigger(3), 'Enter')
  await flush()
  assert.equal(step.value, 3)
})

it('moves the focus between the triggers with the arrow keys', async () => {
  const { trigger } = await render({ linear: false }, { 2: { disabled: true } })

  trigger(1).focus()
  press(trigger(1), 'ArrowRight')
  assert.equal(document.activeElement, trigger(3))
  press(trigger(3), 'ArrowLeft')
  assert.equal(document.activeElement, trigger(1))
})

it('uses the vertical arrow keys in a vertical stepper', async () => {
  const { trigger } = await render({ orientation: 'vertical' })

  trigger(1).focus()
  press(trigger(1), 'ArrowRight')
  assert.equal(document.activeElement, trigger(1))
  press(trigger(1), 'ArrowDown')
  assert.equal(document.activeElement, trigger(2))
})

it('works when a component renders the trigger', async () => {
  const CustomButton = defineComponent({
    setup: (_, { slots }) => () => h('button', { class: 'custom' }, slots.default?.()),
  })
  const { trigger, step } = await render({ linear: false }, {}, { as: CustomButton })

  assert.ok(trigger(1).classList.contains('custom'))
  trigger(1).focus()
  press(trigger(1), 'ArrowRight')
  assert.equal(document.activeElement, trigger(2))

  press(trigger(2), 'Enter')
  await flush()
  assert.equal(step.value, 2)
})

it('does not block cross-axis arrows or enter on an unreachable linear step', async () => {
  const { trigger, step } = await render()

  const down = press(trigger(1), 'ArrowDown')
  assert.equal(down.defaultPrevented, false)

  const right = press(trigger(1), 'ArrowRight')
  assert.equal(right.defaultPrevented, true)

  const enter = press(trigger(3), 'Enter')
  await flush()
  assert.equal(enter.defaultPrevented, false)
  assert.equal(step.value, undefined)
})
