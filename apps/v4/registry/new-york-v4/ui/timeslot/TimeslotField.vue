<script lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { TimeslotFieldItemProps } from "./TimeslotFieldItem.vue"

export interface TimeslotFieldProps<T extends number> extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  options?: Iterable<T>
  modelValue?: T
  isItemDisabled?: (value: T) => boolean
}

export interface TimeslotFieldEmits<T extends number> {
  (event: "change", value: T | undefined): void
}

interface TimeslotFieldItemSlotProps<T extends number> extends TimeslotFieldItemProps<T> {
  ref?: (el: object | null) => void
  onSelect: (target: HTMLElement) => void
}
</script>

<script setup lang="ts" generic="T extends number">
import type { MaybeElement } from "@vueuse/core"
import type { HTMLAttributes } from "vue"
import { useIntersectionObserver, useTemplateRefsList } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "~/lib/utils"
import TimeslotFieldItem from "./TimeslotFieldItem.vue"
import TimeslotScrollArea from "./TimeslotScrollArea.vue"

const props = withDefaults(defineProps<TimeslotFieldProps<T>>(), {
  options: () => [],
  orientation: "vertical",
})

const emit = defineEmits<TimeslotFieldEmits<T>>()

const scrollArea = useTemplateRef("scroll-area")
const elements = useTemplateRefsList<HTMLElement>()

const model = defineModel<T | undefined>()
const selectedOption = ref<T | undefined>()
watch(selectedOption, (selectedOption) => {
  model.value = selectedOption
})

const commonFieldItemOptions = computed(() => {
  return {
    ref: elements.value?.set,
    onSelect(target) {
      return onItemClick(target)
    },
  } satisfies Pick<TimeslotFieldItemSlotProps<T>, "ref" | "onSelect">
})

const fieldItems: ComputedRef<TimeslotFieldItemSlotProps<T>[]> = computed(() => {
  const uniqueOptions = new Set(props.options)
  const selectedValue = selectedOption.value

  return [...uniqueOptions].toSorted((a, b) => a - b).map((value) => {
    return {
      ...commonFieldItemOptions.value,
      value,
      disabled: isItemDisabled(value),
      selected: selectedValue === value,
    }
  })
})

// onBeforeMount(() => {
//   // TODO: scroll int initial position
// })

const isScrolling = ref(false)

watch([isScrolling, selectedOption], ([isScrolling, selectedOption]) => {
  if (!isScrolling && void 0 !== selectedOption) {
    emit("change", selectedOption)
  }
})

const intersectedElement = useIntersectedElement(elements)

const selectedEntry = computed(() => {
  const el = intersectedElement.value

  if (el instanceof HTMLElement) {
    return el.dataset.value
  }

  return void 0
})

function onItemClick(target: HTMLElement) {
  const scrollContainer = scrollArea.value?.$el

  const top = target.offsetTop - (scrollContainer.clientHeight - target.clientHeight) / 2
  const left = target.offsetLeft - (scrollContainer.clientWidth - target.clientWidth) / 2

  scrollArea.value?.scrollTo({ top, left })
}

function isItemDisabled(value: T) {
  return props.isItemDisabled
    ? props.isItemDisabled(value)
    : false
}

watch([selectedEntry, fieldItems], ([selectedEntry, fieldItems]) => {
  if (undefined === selectedEntry)
    return

  const fieldItem = fieldItems.find(({ value }) => {
    return `${value}` === selectedEntry
  })

  selectedOption.value = fieldItem?.value
})

function useIntersectedElement(elements: Ref<MaybeElement[]>) {
  const el = shallowRef<Element>()
  const root = computed(() => scrollArea.value?.$el)

  function onIntersectionChange(entries: IntersectionObserverEntry[]) {
    const intersectingEntry = entries.filter((entry) => {
      return entry.isIntersecting
    }).reduce((entry, other) => {
      if (!entry)
        return other
      return entry.time < other.time
        ? other
        : entry
    }, void 0 as IntersectionObserverEntry | undefined)
    el.value = intersectingEntry?.target
  }

  useIntersectionObserver(
    elements,
    onIntersectionChange,
    {
      root,
      rootMargin: "-50% ".repeat(4),
      threshold: 0,
    },
  )

  return el
}
</script>

<template>
  <Primitive
    data-timeslot-field
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative max-w-full max-h-full',
      props.class,
    )"
  >
    <TimeslotScrollArea
      ref="scroll-area"
      class="size-full max-w-full max-h-full"
      @scrolling="value => isScrolling = value"
    >
      <template
        v-for="fieldItem in fieldItems"
        :key="fieldItem.value"
      >
        <slot
          v-bind="{ fieldItem }"
        >
          <TimeslotFieldItem
            v-bind="fieldItem"
          />
        </slot>
      </template>

      <TimeslotFieldItem
        v-if="!fieldItems.length"
        v-bind="commonFieldItemOptions"
        :value="-1"
        disabled
      >
        <span class="text-secondary">--</span>
      </TimeslotFieldItem>
    </TimeslotScrollArea>
  </Primitive>
</template>
