<script setup lang="ts">
import type { MenuSeparatorProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ MenuSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.Separator
    data-slot="menubar-separator"
    :class="cn('cn-menubar-separator -mx-1 my-1 h-px', props.class)"
  />
</template>
