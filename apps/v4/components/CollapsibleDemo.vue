<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/new-york-v4/ui/collapsible'
import { ChevronsUpDown } from 'lucide-vue-next'

const open = ref(false)
</script>

<template>
  <Collapsible
    v-model:open="open"
    class="flex w-full flex-col gap-2 md:w-[350px]"
  >
    <div class="flex items-center justify-between gap-4 px-4">
      <h4 class="line-clamp-1 text-sm font-semibold">
        @peduarte starred 3 repositories
      </h4>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="sm">
          <ChevronsUpDown class="h-4 w-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
      @radix-ui/primitives
    </div>
    <CollapsibleContent class="flex flex-col gap-2">
      <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
        @radix-ui/colors
      </div>
      <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
        @stitches/react
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
