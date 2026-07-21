<script lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { TimeslotSegmentItemProps } from "./TimeslotSegmentItem.vue"

export interface TimeslotSegmentProps<T extends number> extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  options?: readonly T[]
  modelValue?: T
  isItemDisabled?: (value: T) => boolean
}

export interface TimeslotSegmentEmits<T extends number> {
  (event: "change", value: T | undefined): void
}

export interface TimeslotSegmentItemSlotProps<T extends number> extends TimeslotSegmentItemProps<T> {
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
import TimeslotScrollArea from "./TimeslotScrollArea.vue"
import TimeslotSegmentItem from "./TimeslotSegmentItem.vue"

const props = withDefaults(defineProps<TimeslotSegmentProps<T>>(), {
  options: () => [],
  orientation: "vertical",
})

const emit = defineEmits<TimeslotSegmentEmits<T>>()

const scrollArea = useTemplateRef("scroll-area")
const elements = useTemplateRefsList<HTMLElement>()

const model = defineModel<T | undefined>()
const selectedOption = ref<T | undefined>()
watch(selectedOption, (selectedOption) => {
  model.value = selectedOption
})

const commonsegmentItemOptions = computed(() => {
  return {
    ref: elements.value?.set,
    onSelect(target) {
      return onItemClick(target)
    },
  } satisfies Pick<TimeslotSegmentItemSlotProps<T>, "ref" | "onSelect">
})

const segmentItems: ComputedRef<TimeslotSegmentItemSlotProps<T>[]> = computed(() => {
  const uniqueOptions = new Set(props.options)
  const selectedValue = selectedOption.value

  return [...uniqueOptions].toSorted((a, b) => a - b).map((value) => {
    return {
      ...commonsegmentItemOptions.value,
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

watch([selectedEntry, segmentItems], ([selectedEntry, segmentItems]) => {
  if (undefined === selectedEntry)
    return

  const segmentItem = segmentItems.find(({ value }) => {
    return `${value}` === selectedEntry
  })

  selectedOption.value = segmentItem?.value
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
    data-timeslot-segment
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
        v-for="segmentItem in segmentItems"
        :key="segmentItem.value"
      >
        <slot
          v-bind="{ segmentItem }"
        >
          <TimeslotSegmentItem
            v-bind="segmentItem"
          />
        </slot>
      </template>

      <TimeslotSegmentItem
        v-if="!segmentItems.length"
        v-bind="commonsegmentItemOptions"
        :value="-1"
        disabled
      >
        <span class="text-secondary">--</span>
      </TimeslotSegmentItem>
    </TimeslotScrollArea>
  </Primitive>
</template>
