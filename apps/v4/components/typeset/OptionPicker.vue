<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TypesetIcon } from '@/lib/typeset/icons'
import type { TypesetLockableParam, TypesetParamKey } from '@/lib/typeset/params'
import { HugeiconsIcon } from '@hugeicons/vue'
import { coerceTypesetValue } from '@/lib/typeset/params'
import { cn } from '@/lib/utils'

const props = defineProps<{
  label: string
  /** Omit to render a picker that neither locks nor previews on hover. */
  param?: TypesetLockableParam
  icon?: TypesetIcon
  options: readonly { label: string, value: string }[]
  isMobile: boolean
  class?: HTMLAttributes['class']
}>()

const model = defineModel<string>({ required: true })

const { setOverride, clearOverride } = useTypesetPreviewOverride()

const current = computed(() =>
  props.options.find(option => option.value === model.value),
)

// Previews apply when the pointer settles: every mousemove re-arms the trailing
// timer in useTypesetPreviewOverride, so nothing applies while the cursor is in
// motion. Reka moves DOM focus to the highlighted item, so `focus` covers
// keyboard (arrow key) browsing. Touch gets no preview — there is no hover.
function previewItem(value: string) {
  if (props.isMobile || !props.param) {
    return
  }
  const coerced = coerceTypesetValue(props.param as TypesetParamKey, value)
  if (coerced !== null) {
    setOverride({ [props.param]: coerced })
  }
}
</script>

<template>
  <div :class="cn('group/picker relative', props.class)">
    <Picker @update:open="(open: boolean) => !open && clearOverride()">
      <PickerTrigger>
        <div class="flex min-w-0 flex-col justify-start pr-8 text-left">
          <div class="text-xs text-muted-foreground">
            {{ label }}
          </div>
          <div class="line-clamp-1 text-sm font-medium text-foreground">
            {{ current?.label }}
          </div>
        </div>
        <div
          v-if="icon"
          class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-foreground select-none md:right-2.5"
        >
          <HugeiconsIcon :icon="icon" :stroke-width="2" class="size-4.5" />
        </div>
      </PickerTrigger>
      <PickerContent
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        @mouseleave="clearOverride"
      >
        <PickerRadioGroup v-model="model">
          <PickerRadioItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            @mousemove="previewItem(option.value)"
            @focus="previewItem(option.value)"
          >
            {{ option.label }}
          </PickerRadioItem>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <TypesetLockButton
      v-if="param"
      :param="param"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
