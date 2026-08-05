<script setup lang="ts">
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { CONTENT_OPTIONS, DEV_CONTENT_OPTIONS } from '@/lib/typeset/fixtures'
import { serializeTypesetSearchParams } from '@/lib/typeset/params'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/styles/reka-nova/ui/tooltip'

const params = useTypesetSearchParams()

const isDev = import.meta.dev

const openInNewTabHref = computed(() =>
  serializeTypesetSearchParams(`/preview/typeset/${params.item.value}`, params.toValues()),
)
</script>

<template>
  <div class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-1.5">
    <div class="dark flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
      <Tooltip v-for="(option, index) in CONTENT_OPTIONS" :key="option.value">
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            :data-active="params.item.value === option.value"
            class="h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
            @click="params.item.value = option.value"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" :side-offset="10">
          {{ option.label }}
        </TooltipContent>
      </Tooltip>
      <div v-if="isDev && DEV_CONTENT_OPTIONS.length" class="hidden items-center gap-1 md:flex">
        <div class="mx-0.5 h-4 w-px bg-border" />
        <Tooltip v-for="(option, index) in DEV_CONTENT_OPTIONS" :key="option.value">
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="sm"
              :data-active="params.item.value === option.value"
              class="h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              @click="params.item.value = option.value"
            >
              {{ String(CONTENT_OPTIONS.length + index + 1).padStart(2, '0') }}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" :side-offset="10">
            {{ option.label }}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
    <div class="dark flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
      <Button
        as-child
        variant="ghost"
        size="sm"
        class="h-7 cursor-pointer rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <a :href="openInNewTabHref" target="_blank" rel="noreferrer">
          <HugeiconsIcon
            :icon="LinkSquare02Icon"
            :stroke-width="2"
            class="size-3.5 md:hidden"
          />
          <span class="max-md:sr-only">Open in New Tab</span>
        </a>
      </Button>
    </div>
  </div>
</template>
