<script setup lang="ts">
import { SquareIcon } from 'lucide-vue-next'
import { computed, defineAsyncComponent } from 'vue'

// manually type from  `import type { IconLibraryName } from 'shadcn-vue/icons'`
const props = defineProps<{ lucide: string, tabler: string, hugeicons: string }>()

const { iconLibrary } = useDesignSystemSearchParams()

const IconLucide = defineAsyncComponent(() =>
  import('@/registry/icons/icon-lucide').then(mod => mod.IconLucide),
)

const IconTabler = defineAsyncComponent(() =>
  import('@/registry/icons/icon-tabler').then(mod => mod.IconTabler),
)

const IconHugeicons = defineAsyncComponent(() =>
  import('@/registry/icons/icon-hugeicons').then(mod => mod.IconHugeicons),
)

const iconName = computed(() => props[iconLibrary.value])

const svgProps = computed(() => {
  const { lucide, tabler, hugeicons, ...rest } = props
  return rest
})
</script>

<template>
  <Suspense v-if="iconName">
    <template #default>
      <IconLucide
        v-if="iconLibrary === 'lucide'"
        :name="iconName"
        v-bind="svgProps"
      />
      <IconTabler
        v-else-if="iconLibrary === 'tabler'"
        :name="iconName"
        v-bind="svgProps"
      />
      <IconHugeicons
        v-else-if="iconLibrary === 'hugeicons'"
        :name="iconName"
        v-bind="svgProps"
      />
    </template>
    <template #fallback>
      <SquareIcon v-bind="svgProps" />
    </template>
  </Suspense>
</template>
