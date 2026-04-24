<script setup lang="ts">
import { BASES } from '@/registry/config'

const props = defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()

const currentBase = computed(() => BASES.find(base => base.name === params.base.value))

function handleValueChange(value: unknown) {
  const newBase = BASES.find(base => base.name === String(value))
  if (!newBase)
    return
  params.base.value = newBase.name
}
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Base
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentBase?.title }}
          </div>
        </div>
        <div
          v-if="currentBase?.meta?.logo"
          class="text-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 select-none md:right-2.5 *:[svg]:size-4 *:[svg]:text-foreground!"
          v-html="currentBase.meta.logo"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentBase?.name"
          @update:model-value="handleValueChange"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="base in BASES"
              :key="base.name"
              :value="base.name"
              :close-on-click="isMobile"
            >
              {{ base.title }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
  </div>
</template>
