<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CommandItemEntry } from '.'
import { Autocomplete } from '@vase-ui/vue/autocomplete'
import { cn } from 'cn'
import { computed, nextTick, onMounted, ref, shallowReactive, toRef, useId, watch } from 'vue'
import { provideCommandContext } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: any
  multiple?: boolean
  disabled?: boolean
  highlightOnHover?: boolean
}>(), {
  modelValue: '',
  highlightOnHover: true,
})

const emits = defineEmits<{
  'update:modelValue': [value: any]
  'highlight': [value: unknown]
}>()

const rootElement = ref<HTMLElement | null>(null)
const localValue = ref<any>(props.modelValue)
const model = computed<any>({
  get: () => localValue.value,
  set: (value) => {
    localValue.value = value
    emits('update:modelValue', value)
  },
})

watch(() => props.modelValue, (value) => {
  localValue.value = value
}, { deep: true })

const search = ref('')
const highlightedId = ref<string | null>(null)
const listId = useId()
const items = shallowReactive(new Map<string, CommandItemEntry>())
const { contains } = Autocomplete.useFilter({ sensitivity: 'base' })

function isVisible(id: string) {
  const entry = items.get(id)

  // An item that is not in the map yet renders once, to add itself.
  return !search.value || !entry || contains(entry.text, search.value)
}

const visibleCount = computed(() => {
  if (!search.value) {
    return items.size
  }

  return Array.from(items.keys()).filter(isVisible).length
})

function isGroupVisible(groupId: string) {
  if (!search.value) {
    return true
  }

  return Array.from(items).some(([id, entry]) => entry.groupId === groupId && isVisible(id))
}

function isSelected(value: unknown) {
  return Array.isArray(model.value)
    ? model.value.some(selected => Object.is(selected, value))
    : Object.is(model.value, value)
}

function select(value: unknown) {
  if (props.disabled) {
    return
  }

  if (props.multiple) {
    const selected: unknown[] = Array.isArray(model.value) ? model.value : []

    model.value = isSelected(value) ? selected.filter(item => !Object.is(item, value)) : [...selected, value]
  }
  else {
    model.value = value
  }
}

function getOptions() {
  return Array.from(
    rootElement.value?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? [],
  )
}

function highlight(id: string | null) {
  if (highlightedId.value === id) {
    return
  }

  highlightedId.value = id
  emits('highlight', id ? items.get(id)?.value : undefined)
}

function moveHighlight(direction: 'next' | 'previous') {
  const options = getOptions()

  if (!options.length) {
    return
  }

  const current = options.findIndex(option => option.id === highlightedId.value)
  const next = direction === 'next'
    ? Math.min(current + 1, options.length - 1)
    : Math.max(current === -1 ? options.length - 1 : current - 1, 0)

  highlight(options[next]!.id)
  options[next]!.scrollIntoView?.({ block: 'nearest' })
}

function selectHighlighted(originalEvent: Event) {
  if (highlightedId.value) {
    items.get(highlightedId.value)?.select(originalEvent)
  }
}

function highlightFirst() {
  highlight(getOptions()[0]?.id ?? null)
}

function unregisterItem(id: string) {
  items.delete(id)

  if (highlightedId.value === id) {
    highlight(null)
    void nextTick(highlightFirst)
  }
}

watch(search, async () => {
  await nextTick()
  highlightFirst()
})

onMounted(highlightFirst)

provideCommandContext({
  search,
  disabled: computed(() => Boolean(props.disabled)),
  listId,
  highlightedId,
  highlightOnHover: toRef(props, 'highlightOnHover'),
  items,
  visibleCount,
  isVisible,
  isGroupVisible,
  isSelected,
  highlight,
  moveHighlight,
  selectHighlighted,
  select,
  unregisterItem,
})
</script>

<template>
  <div
    ref="rootElement"
    data-slot="command"
    :class="cn('bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden', props.class)"
  >
    <slot />
  </div>
</template>
