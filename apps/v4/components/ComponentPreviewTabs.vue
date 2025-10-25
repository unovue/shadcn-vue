<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  component: string | Component
  class?: HTMLAttributes['class']
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  align?: 'center' | 'start' | 'end'
}>(), {
  align: 'center',
})
const tab = ref<'preview' | 'code'>('preview')
</script>

<template>
  <div
    :class="cn(
      'group relative mt-4 mb-12 flex flex-col gap-2 rounded-lg border',
      props.class,
    )"
  >
    <div data-slot="preview">
      <div
        :data-align="align"
        :class="cn(
          'preview flex w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start',
          chromeLessOnMobile ? 'sm:p-10' : 'h-[450px] p-10',
        )"
      >
        <component :is="component" />
      </div>
      <div
        v-if="!hideCode"
        data-slot="code"
        class="overflow-hidden [&_[data-pretty-code-figure]]:!m-0 [&_[data-pretty-code-figure]]:rounded-t-none [&_[data-pretty-code-figure]]:border-t [&_pre]:max-h-[400px]"
      >
        <slot /> <!-- {{source}} -->
      </div>
    </div>
  </div>
</template>
