<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/vase/ui/code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/bases/vase/ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/vase/ui/trace"
</script>

<template>
  <Example title="Rows">
    <Trace class="max-w-md">
      <TraceLine status="running">
        <TraceIcon>
          <IconPlaceholder
            lucide="FileSearchIcon"
            tabler="IconFileSearch"
            hugeicons="FileSearchIcon"
            phosphor="FileSearchIcon"
            remixicon="RiFileSearchLine"
          />
        </TraceIcon>
        <TraceTitle>Scanning 52 files</TraceTitle>
      </TraceLine>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder
                lucide="TerminalIcon"
                tabler="IconTerminal"
                hugeicons="ComputerTerminal01Icon"
                phosphor="TerminalIcon"
                remixicon="RiTerminalBoxLine"
              />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              {{ "v24.18.0" }}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <a href="#rows">
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="File02Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </TraceIcon>
          <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
          <TraceIcon>
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
            />
          </TraceIcon>
        </TraceLine>
      </a>
      <Sheet>
        <SheetTrigger>
          <template #element="{ props, elementRef }">
            <button v-bind="props" :ref="elementRef" type="button">
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="FileSearchIcon"
                    tabler="IconFileSearch"
                    hugeicons="FileSearchIcon"
                    phosphor="FileSearchIcon"
                    remixicon="RiFileSearchLine"
                  />
                </TraceIcon>
                <TraceTitle>Explored 4 files</TraceTitle>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  />
                </TraceIcon>
              </TraceLine>
            </button>
          </template>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Explored 4 files</SheetTitle>
            <SheetDescription>
              Files read while preparing the response.
            </SheetDescription>
          </SheetHeader>
          <ul class="flex flex-col gap-2 px-4 font-mono text-xs">
            <li>apps/v4/lib/docs.ts</li>
            <li>apps/v4/lib/components.ts</li>
            <li>apps/v4/nuxt.config.ts</li>
            <li>apps/v4/package.json</li>
          </ul>
        </SheetContent>
      </Sheet>
      <Dialog>
        <DialogTrigger>
          <template #element="{ props, elementRef }">
            <button v-bind="props" :ref="elementRef" type="button">
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="GlobeIcon"
                    tabler="IconGlobe"
                    hugeicons="Globe02Icon"
                    phosphor="GlobeIcon"
                    remixicon="RiGlobeLine"
                  />
                </TraceIcon>
                <TraceTitle>Searched the web for cache keys</TraceTitle>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  />
                </TraceIcon>
              </TraceLine>
            </button>
          </template>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Searched the web for cache keys</DialogTitle>
            <DialogDescription>
              Three results were used in the response.
            </DialogDescription>
          </DialogHeader>
          <ul class="flex flex-col gap-2 text-sm">
            <li>Caching build outputs</li>
            <li>Image optimization reference</li>
            <li>Deploy hooks and cache keys</li>
          </ul>
        </DialogContent>
      </Dialog>
    </Trace>
  </Example>
</template>
