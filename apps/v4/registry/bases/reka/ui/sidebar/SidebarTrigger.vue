<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { IconPlaceholder } from "@/registry/bases/reka/components/icon-placeholder"
import { Button } from "@/registry/bases/reka/ui/button"
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon-sm"
    :class="cn('cn-sidebar-trigger', props.class)"
    @click="toggleSidebar"
  >
    <IconPlaceholder
      lucide="PanelLeftIcon"
      tabler="IconLayoutSidebar"
      hugeicons="SidebarLeftIcon"
      phosphor="SidebarIcon"
      remixicon="RiSideBarLine"
      class="cn-rtl-flip"
    />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
