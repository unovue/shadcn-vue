<script setup lang="ts">
import type { TabsListProps as VaseTabsListProps } from "@vase-ui/vue/tabs"
import type { HTMLAttributes } from "vue"
import type { TabsListVariants } from "."
import { Tabs } from "@vase-ui/vue/tabs"
import { cn } from "cn"
import { tabsListVariants } from "."

interface Props extends /* @vue-ignore */ VaseTabsListProps {
  class?: HTMLAttributes["class"]
  variant?: TabsListVariants["variant"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
</script>

<template>
  <Tabs.List
    data-slot="tabs-list"
    :data-variant="variant"
    :class="cn(tabsListVariants({ variant }), props.class)"
  >
    <slot />
  </Tabs.List>
</template>
