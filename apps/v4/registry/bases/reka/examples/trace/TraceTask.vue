<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/reka/ui/trace"
</script>

<template>
  <Example title="Task">
    <TraceCollapsible class="max-w-md" default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceTitle>Found the project files</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="Search01Icon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
            </TraceIcon>
            <TraceTitle>Searched for app/page.tsx</TraceTitle>
          </TraceLine>
          <a href="#task">
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
              <TraceTitle>Read app/page.tsx</TraceTitle>
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
            <TraceTitle>Scanned 52 files</TraceTitle>
          </TraceLine>
          <a href="#task">
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
              <TraceTitle>Read app/layout.tsx</TraceTitle>
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
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Example>
</template>
