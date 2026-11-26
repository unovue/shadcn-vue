<script setup lang="ts">
import { BASES } from '@/registry/bases'

const props = defineProps<{
  section: string
  base: string
  name: string
}>()

const { config } = useConfig()
const { paths } = await useNavigation()

const activeBase = computed(() => BASES.find(item => item.name === props.base))

function pathFor(name: string) {
  const path = `/docs/${props.section}/${name}/${props.name}`
  return paths.value.has(path) ? path : `/docs/${props.section}`
}
</script>

<template>
  <nav aria-label="Base" class="flex w-full items-center gap-6">
    <NuxtLink
      v-for="item in BASES"
      :key="item.name"
      :to="pathFor(item.name)"
      :data-active="item.name === base"
      class="relative inline-flex items-center justify-center gap-1 pt-1 pb-0.5 text-base font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity hover:text-foreground data-[active=true]:text-foreground data-[active=true]:after:opacity-100"
      @click="config.base = item.name"
    >
      {{ item.title }}
    </NuxtLink>
    <div
      v-if="activeBase?.meta?.logo"
      class="ml-auto size-4 shrink-0 text-muted-foreground opacity-80 *:[svg]:size-4"
      aria-hidden="true"
      v-html="activeBase.meta.logo"
    />
  </nav>
</template>
