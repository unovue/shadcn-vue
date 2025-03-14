<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { useRoute } from 'vitepress'

interface BreadCrumbItemProps {
  path?: string
  lastItem?: boolean
  as?: string | object
}

const props = withDefaults(defineProps<BreadCrumbItemProps>(), {
  as: 'span',
})
const route = useRoute()
</script>

<template>
  <li class="text-sm text-muted">
    <component
      :is="props.as"
      :to="props.path"
      class="flex items-center"
      :class="{
        '!font-semibold !text-foreground': route.path === props.path,
      }"
    >
      <slot />
      <ChevronRight
        v-if="!props.lastItem"
        class="mx-2 h-3 w-3 shrink-0 text-muted"
      />
    </component>
  </li>
</template>
