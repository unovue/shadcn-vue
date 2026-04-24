<script setup lang="ts">
import { SquareIcon } from "lucide-vue-next"
import { computed, defineAsyncComponent } from "vue"

const props = defineProps<{
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
}>()

const { iconLibrary } = useDesignSystemSearchParams()

const IconLucide = defineAsyncComponent(() =>
  import("@/registry/icons/icon-lucide").then(mod => mod.IconLucide),
)

const IconTabler = defineAsyncComponent(() =>
  import("@/registry/icons/icon-tabler").then(mod => mod.IconTabler),
)

const IconHugeicons = defineAsyncComponent(() =>
  import("@/registry/icons/icon-hugeicons").then(mod => mod.IconHugeicons),
)

const IconPhosphor = defineAsyncComponent(() =>
  import("@/registry/icons/icon-phosphor").then(mod => mod.IconPhosphor),
)

const IconRemixicon = defineAsyncComponent(() =>
  import("@/registry/icons/icon-remixicon").then(mod => mod.IconRemixicon),
)

const iconName = computed(() => {
  const lib = iconLibrary.value as keyof typeof props
  return props[lib]
})

const svgProps = computed(() => {
  const { lucide, tabler, hugeicons, phosphor, remixicon, ...rest } = props
  return rest
})
</script>

<template>
  <Suspense v-if="iconName">
    <template #default>
      <IconLucide
        v-if="iconLibrary === 'lucide'"
        :name="iconName"
        v-bind="{ ...svgProps, ...$attrs }"
      />
      <IconTabler
        v-else-if="iconLibrary === 'tabler'"
        :name="iconName"
        v-bind="{ ...svgProps, ...$attrs }"
      />
      <IconHugeicons
        v-else-if="iconLibrary === 'hugeicons'"
        :name="iconName"
        v-bind="{ ...svgProps, ...$attrs }"
      />
      <IconPhosphor
        v-else-if="iconLibrary === 'phosphor'"
        :name="iconName"
        v-bind="{ ...svgProps, ...$attrs }"
      />
      <IconRemixicon
        v-else-if="iconLibrary === 'remixicon'"
        :name="iconName"
        v-bind="{ ...svgProps, ...$attrs }"
      />
    </template>
    <template #fallback>
      <SquareIcon v-bind="{ ...svgProps, ...$attrs }" />
    </template>
  </Suspense>
</template>
