<script setup lang="ts">
import { CheckIcon, ChevronDown, XIcon } from '@lucide/vue'
import { Combobox as ComboboxPart } from '@vase-ui/vue/combobox'
import { ref } from 'vue'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/styles/vase-vega/ui/combobox'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt', 'Remix', 'Astro']

const selected = ref(['Nuxt', 'Remix'])
</script>

<template>
  <Combobox v-model="selected" :items="frameworks" multiple>
    <ComboboxAnchor class="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 inline-flex w-[300px] rounded-md border px-2 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-3">
      <ComboboxPart.Value v-slot="{ value }">
        <ComboboxPart.Chips class="flex w-full flex-wrap items-center gap-2">
          <ComboboxPart.Chip
            v-for="framework in value"
            :key="framework"
            class="bg-secondary data-highlighted:ring-ring ring-offset-background flex h-5 items-center rounded-md outline-none data-highlighted:ring-2 data-highlighted:ring-offset-2"
          >
            <span class="rounded bg-transparent px-2 py-0.5 text-sm">{{ framework }}</span>
            <ComboboxPart.ChipRemove
              class="mr-1 flex rounded bg-transparent"
              :aria-label="`Remove ${framework}`"
            >
              <XIcon class="size-4" />
            </ComboboxPart.ChipRemove>
          </ComboboxPart.Chip>
          <ComboboxPart.Input
            placeholder="Frameworks..."
            class="min-h-5 flex-1 bg-transparent px-1 text-sm focus:outline-none"
          />
          <ComboboxTrigger>
            <template #element="{ props, elementRef }">
              <Button
                v-bind="props"
                :ref="elementRef"
                size="icon-sm"
                variant="ghost"
                class="order-last ml-auto self-start"
              >
                <ChevronDown class="size-3.5" />
              </Button>
            </template>
          </ComboboxTrigger>
        </ComboboxPart.Chips>
      </ComboboxPart.Value>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxEmpty>
        No options
      </ComboboxEmpty>
      <ComboboxViewport>
        <template #item="{ item }">
          <ComboboxItem :value="item">
            <span>{{ item }}</span>
            <ComboboxItemIndicator>
              <CheckIcon />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </template>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
