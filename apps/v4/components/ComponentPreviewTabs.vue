<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'

const props = withDefaults(defineProps<{
  component: string | Component
  class?: HTMLAttributes['class']
  previewClass?: HTMLAttributes['class']
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  align?: 'center' | 'start' | 'end'
}>(), {
  align: 'center',
})
const tab = ref<'preview' | 'code'>('preview')

const isMobileCodeVisible = ref(false)
</script>

<template>
  <div
    data-slot="component-preview"
    :class="cn(
      'group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border',
      props.class,
    )"
  >
    <div data-slot="preview">
      <div
        data-slot="preview"
        dir="ltr"
      >
        <div
          :data-align="align"
          :data-chromeless="chromeLessOnMobile"
          :class="cn(
            'preview relative flex min-h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0',
            props.previewClass,
          )"
        >
          <component :is="component" />
        </div>
      </div>

      <div
        v-if="!hideCode"
        data-slot="code"
        :data-mobile-code-visible="isMobileCodeVisible"
        class="relative overflow-hidden **:data-[slot=copy-button]:right-4 **:data-[slot=copy-button]:hidden data-[mobile-code-visible=true]:**:data-[slot=copy-button]:flex [&_[data-pretty-code-figure]]:m-0! [&_[data-pretty-code-figure]]:rounded-t-none [&_[data-pretty-code-figure]]:border-t [&_pre]:max-h-72"
      >
        <div class="relative" :class="!isMobileCodeVisible && 'h-[103px]' ">
          <slot />
          <div v-if="!isMobileCodeVisible" class="absolute inset-0 flex items-center justify-center pb-4">
            <div
              class="absolute inset-0"
              :style="{
                background:
                  'linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)',
              }"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              class="relative z-10 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
              @click="isMobileCodeVisible = true"
            >
              View Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
