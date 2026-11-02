<script setup lang="ts">
import { ChevronRightIcon, FolderSearchIcon } from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/bases/reka/ui/sheet'
import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'
</script>

<template>
  <Trace class="max-w-sm">
    <Sheet>
      <SheetTrigger as-child>
        <button type="button">
          <TraceLine>
            <TraceIcon>
              <FolderSearchIcon />
            </TraceIcon>
            <TraceTitle>Explored 4 files</TraceTitle>
            <TraceIcon>
              <ChevronRightIcon />
            </TraceIcon>
          </TraceLine>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Explored 4 files</SheetTitle>
          <SheetDescription>
            Files read while preparing the response.
          </SheetDescription>
        </SheetHeader>
        <ul class="flex flex-col gap-2 px-6 font-mono text-xs">
          <li>apps/v4/lib/docs.ts</li>
          <li>apps/v4/lib/components.ts</li>
          <li>apps/v4/nuxt.config.ts</li>
          <li>apps/v4/package.json</li>
        </ul>
      </SheetContent>
    </Sheet>
  </Trace>
</template>
