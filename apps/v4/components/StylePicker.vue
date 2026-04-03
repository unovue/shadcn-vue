<script setup lang="ts">
import type { Style, StyleName } from '@/registry/config'

const props = defineProps<{
  styles: Style[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const currentStyle = computed(() => props.styles.find(style => style.name === params.style.value))
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Style
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentStyle?.title }}
          </div>
        </div>
        <div
          v-if="currentStyle?.icon"
          class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center select-none md:right-2.5"
          v-html="currentStyle.icon"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentStyle?.name"
          @update:model-value="(value) => {
            params.style.value = value as StyleName
          }"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="style in styles"
              :key="style.name"
              :value="style.name"
              :close-on-click="isMobile"
            >
              {{ style.title }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="style"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
