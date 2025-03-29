<script setup lang="ts">
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/registry/new-york/ui/combobox'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/registry/new-york/ui/tags-input'
import { useFilter } from 'reka-ui'
import { computed, ref } from 'vue'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const modelValue = ref<string[]>([])
const open = ref(false)
const searchTerm = ref('')

const { contains } = useFilter({ sensitivity: 'base' })
const filteredFrameworks = computed(() => {
  const options = frameworks.filter(i => !modelValue.value.includes(i.label))
  return searchTerm.value ? options.filter(option => contains(option.label, searchTerm.value)) : options
})
</script>

<template>
  <Combobox v-model="modelValue" v-model:open="open" :ignore-filter="true">
    <ComboboxAnchor as-child>
      <TagsInput v-model="modelValue" class="px-2 gap-2 w-80">
        <div class="flex gap-2 flex-wrap items-center">
          <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
        </div>

        <ComboboxInput v-model="searchTerm" as-child>
          <TagsInputInput placeholder="Framework..." class="min-w-[200px] w-full p-0 border-none focus-visible:ring-0 h-auto" @keydown.enter.prevent />
        </ComboboxInput>
      </TagsInput>

      <ComboboxList class="w-[--reka-popper-anchor-width]">
        <ComboboxEmpty />
        <ComboboxGroup>
          <ComboboxItem
            v-for="framework in filteredFrameworks" :key="framework.value" :value="framework.label"
            @select.prevent="(ev) => {

              if (typeof ev.detail.value === 'string') {
                searchTerm = ''
                modelValue.push(ev.detail.value)
              }

              if (filteredFrameworks.length === 0) {
                open = false
              }
            }"
          >
            {{ framework.label }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxAnchor>
  </Combobox>
</template>
