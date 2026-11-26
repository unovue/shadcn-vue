<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/styles/vase-vega/ui/combobox'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

const selectedFrameworks = ref<typeof frameworks>([])
</script>

<template>
  <Combobox v-model="selectedFrameworks" multiple :items="frameworks">
    <ComboboxTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
          variant="outline"
          class="w-[280px] justify-between"
        >
          <span class="truncate">
            {{
              selectedFrameworks.length > 0
                ? selectedFrameworks.map(framework => framework.label).join(', ')
                : 'Select frameworks...'
            }}
          </span>
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </template>
    </ComboboxTrigger>

    <ComboboxList class="w-[280px]" align="start">
      <ComboboxInput placeholder="Search framework..." />
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
      <ComboboxViewport>
        <template #item="{ item }">
          <ComboboxItem :value="item">
            <div
              class="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
              :data-selected="selectedFrameworks.some(f => f.value === item.value)"
            >
              <CheckIcon class="size-3.5 text-current" />
            </div>
            {{ item.label }}
          </ComboboxItem>
        </template>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
