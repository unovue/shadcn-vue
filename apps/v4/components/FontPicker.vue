<script setup lang="ts">
import type { Font } from '@/lib/fonts'
import type { FontValue } from '~/registry/config'
import { Item, ItemContent, ItemTitle } from '@/registry/bases/reka/ui/item'
import ItemDescription from '~/registry/bases/reka/ui/item/ItemDescription.vue'

const props = defineProps<{
  fonts: Font[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const currentFont = computed(
  () => props.fonts.find(font => font.value === params.font.value),
)
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Font
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentFont?.name }}
          </div>
        </div>
        <div
          class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
          :style="{ fontFamily: currentFont?.fontFamily }"
        >
          Aa
        </div>
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="max-h-80 md:w-72"
      >
        <PickerRadioGroup
          :model-value="currentFont?.value"
          @update:model-value="(value) => {
            params.font.value = value as FontValue
          }"
        >
          <PickerGroup>
            <template v-for="(font, index) in fonts" :key="font.value">
              <PickerRadioItem :value="font.value">
                <Item size="xs">
                  <ItemContent class="gap-1">
                    <ItemTitle class="text-muted-foreground text-xs font-medium">
                      {{ font.name }}
                    </ItemTitle>
                    <ItemDescription
                      :style="{ fontFamily: font.fontFamily }"
                    >
                      Designers love packing quirky glyphs into test
                      phrases.
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </PickerRadioItem>
              <PickerSeparator v-if="index < fonts.length - 1" class="opacity-50" />
            </template>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="font"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
