<script setup lang="ts">
import type { IconLibraryName } from 'shadcn-vue/icons'
import { SquareIcon } from 'lucide-vue-next'
import { computed, defineAsyncComponent } from 'vue'
import { useDesignSystemParam } from '@/app/(create)/hooks/use-design-system'

interface Props extends Record<IconLibraryName, string> {
}

const props = defineProps<Props>()

const IconLucide = defineAsyncComponent(() =>
  import('@/registry/icons/icon-lucide').then(mod => mod.IconLucide),
)

const IconTabler = defineAsyncComponent(() =>
  import('@/registry/icons/icon-tabler').then(mod => mod.IconTabler),
)

const IconHugeicons = defineAsyncComponent(() =>
  import('@/registry/icons/icon-hugeicons').then(mod => mod.IconHugeicons),
)

const iconLibrary = useDesignSystemParam('iconLibrary')
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
