<script setup lang="ts">
import {
  ArrowHorizontalIcon,
  ParagraphSpacingIcon,
  TextSmallcapsIcon,
} from '@hugeicons/core-free-icons'
import { LineHeightIcon } from '@/lib/typeset/icons'
import {
  TYPESET_FLOWS,
  TYPESET_LEADINGS,
  TYPESET_MEASURES,
  TYPESET_SIZES,
} from '@/lib/typeset/params'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/styles/reka-nova/ui/card'
import { FieldGroup, FieldSeparator } from '@/styles/reka-nova/ui/field'

const params = useTypesetSearchParams()
const isMobile = useIsMobile()

// The resolved px rhythm is a design-time aid, not something to ship.
const isDev = import.meta.dev

// Resolve the rhythm to px off the current size: leading is a multiple, flow is
// an em value.
const sizePx = computed(() => Number(params.scale.value))
const leadingPx = computed(() => Math.round(sizePx.value * Number(params.leading.value)))
const flowPx = computed(() => Math.round(sizePx.value * Number.parseFloat(params.flow.value)))
</script>

<template>
  <Card
    size="sm"
    class="dark isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl bg-card/90 backdrop-blur-xl md:w-(--customizer-width)"
  >
    <CardHeader class="hidden items-center justify-between gap-2 border-b md:flex">
      <TypesetMainMenu />
    </CardHeader>
    <CardContent class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden max-md:px-0 md:overflow-y-auto">
      <FieldGroup class="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto max-md:px-3 md:flex-col md:gap-3.25">
        <!-- Below ~60ch the viewport already constrains width, so measure does
             nothing: hide it. -->
        <TypesetOptionPicker
          v-model="params.measure.value"
          label="Measure"
          param="measure"
          class="max-[28rem]:hidden"
          :icon="ArrowHorizontalIcon"
          :options="TYPESET_MEASURES"
          :is-mobile="isMobile"
        />
        <FieldSeparator class="hidden md:block" />
        <TypesetFontPicker label="Heading" param="heading" :is-mobile="isMobile" />
        <TypesetFontPicker label="Body" param="body" :is-mobile="isMobile" />
        <TypesetFontPicker label="Mono" param="mono" :is-mobile="isMobile" />
        <FieldSeparator class="hidden md:block" />
        <TypesetOptionPicker
          v-model="params.scale.value"
          label="Size"
          param="scale"
          :icon="TextSmallcapsIcon"
          :options="TYPESET_SIZES"
          :is-mobile="isMobile"
        />
        <TypesetOptionPicker
          v-model="params.leading.value"
          label="Leading"
          param="leading"
          :icon="LineHeightIcon"
          :options="TYPESET_LEADINGS"
          :is-mobile="isMobile"
        />
        <TypesetOptionPicker
          v-model="params.flow.value"
          label="Flow"
          param="flow"
          :icon="ParagraphSpacingIcon"
          :options="TYPESET_FLOWS"
          :is-mobile="isMobile"
        />
        <div
          v-if="isDev"
          class="hidden px-1 pt-0.5 text-center font-mono text-xs text-muted-foreground tabular-nums md:block"
        >
          {{ sizePx }}px / {{ leadingPx }}px / {{ flowPx }}px
        </div>
        <!-- Scroll-end spacer: the group is a CQ container (inline-size
             containment), so trailing padding cannot grow it. -->
        <div aria-hidden class="w-0.5 shrink-0 md:hidden" />
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex min-w-0 flex-row-reverse gap-2 border-t md:flex-col md:**:[button]:w-full">
      <TypesetRandomButton class="min-w-0 flex-1 md:flex-none" />
      <TypesetGetCodeDrawer class="min-w-0 flex-1 touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! md:flex-none xl:hidden pointer-coarse:h-10!" />
    </CardFooter>
  </Card>
</template>
