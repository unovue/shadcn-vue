<script setup lang="ts">
import type { Toc } from '@nuxt/content'
import type { HTMLAttributes } from 'vue'
import { IconMenu3 } from '@tabler/icons-vue'
import { useIntersectionObserver } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'

const props = withDefaults(defineProps<{
  toc: Toc
  variant?: 'dropdown' | 'list'
  class?: HTMLAttributes['class']
}>(), {
  variant: 'list',
})

const open = ref(false)
const { path } = toRefs(useRoute())

const activeHeading = ref('')

const tocLinks = computed(() => {
  const result: Toc['links'] = []

  for (const node of props.toc.links) {
    // Add the current node (without children property)
    const { children, ...nodeWithoutChildren } = node
    result.push(nodeWithoutChildren)

    // Add all direct children if they exist
    if (children && children.length > 0) {
      for (const child of children) {
        const { children: _, ...childWithoutChildren } = child
        result.push(childWithoutChildren)
      }
    }
  }

  return result
})

onMounted(() => {
  const elements = tocLinks.value.map(link => document.getElementById(link.id))
  const observers = useIntersectionObserver(elements, (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeHeading.value = entry.target.id
      }
    }
  }, { rootMargin: '0% 0% -80% 0%' })

  onBeforeUnmount(() => {
    observers.stop()
  })
})
</script>

<template>
  <DropdownMenu v-if="variant === 'dropdown'" v-model:open="open">
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        :class="cn('h-8 md:h-7', props.class)"
      >
        <IconMenu3 /> On This Page
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      class="no-scrollbar max-h-[70svh]"
    >
      <DropdownMenuItem
        v-for="item in tocLinks"
        :key="item.id"
        as-child
        :data-depth="item.depth"
        class="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
        @click="open = true"
      >
        <a :href="`${path}#${item.id}`">{{ item.text }}</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <div v-else :class="cn('flex flex-col gap-2 p-4 pt-0 text-sm', props.class)">
    <p v-if="tocLinks.length" class="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
      On This Page
    </p>
    <a
      v-for="item in tocLinks"
      :key="item.id"
      :href="`${path}#${item.id}`"
      class="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
      :data-active="item.id === activeHeading"
      :data-depth="item.depth"
    >
      {{ item.text }}
    </a>
  </div>
</template>
