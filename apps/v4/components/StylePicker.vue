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
        <div v-if="currentStyle?.icon" class="pointer-events-none absolute top-1/2 right-4 size-4 flex  -translate-y-1/2 items-center justify-center select-none" v-html="currentStyle.icon" />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="md:w-64"
      >
        <PickerRadioGroup
          :model-value="currentStyle?.name"
          @update:model-value="(value) => {
            params.style.value = value as StyleName
          }"
        >
          <PickerGroup>
            <template v-for="(style, index) in styles" :key="style.name">
              <PickerRadioItem :value="style.name">
                <div class="flex items-start gap-2">
                  <div v-if="style.icon" class="flex size-4 translate-y-0.5 items-center justify-center" v-html="style.icon" />
                  <div class="flex flex-col justify-start pointer-coarse:gap-1">
                    <div>{{ style.title }}</div>
                    <div class="text-muted-foreground text-xs pointer-coarse:text-sm">
                      {{ style.description }}
                    </div>
                  </div>
                </div>
              </PickerRadioItem>
              <PickerSeparator v-if="index < styles.length - 1" class="opacity-50" />
            </template>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="style"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
