<script setup lang="ts">
import { useDesignSystemSearchParams } from "@/composables/useDesignSystemSearchParams"
import { FONTS } from "@/lib/fonts"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { STYLES } from "@/registry/styles"

const { style, font, fontHeading } = useDesignSystemSearchParams("replace")

const currentStyleTitle = computed(() => STYLES.find(s => s.name === style.value)?.title ?? style.value)
const currentFontName = computed(() => FONTS.find(f => f.value === font.value)?.name ?? font.value)
const currentFontHeadingName = computed(() => fontHeading.value === "inherit" ? "" : (FONTS.find(f => f.value === fontHeading.value)?.name ?? fontHeading.value))

const colorVariants = [
  "--background",
  "--foreground",
  "--primary",
  "--secondary",
  "--muted",
  "--accent",
  "--border",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
]
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-6 style-lyra:gap-4 style-mira:gap-4">
      <div class="flex flex-col gap-1">
        <div class="cn-font-heading text-2xl font-medium style-lyra:text-lg style-mira:text-lg">
          {{ currentStyleTitle }} -
          {{ currentFontHeadingName && currentFontHeadingName !== currentFontName
            ? currentFontHeadingName
            : currentFontName }}
        </div>
        <div class="line-clamp-2 text-base text-muted-foreground style-lyra:text-sm style-mira:text-sm">
          Designers love packing quirky glyphs into test phrases. This is a
          preview of the typography styles.
        </div>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <div
          v-for="variant in colorVariants"
          :key="variant"
          class="flex flex-col flex-wrap items-center gap-2"
        >
          <div
            class="relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
            :style="{ '--color': `var(${variant})` }"
          />
          <div class="hidden max-w-14 truncate font-mono text-[0.60rem] md:block style-lyra:max-w-10 style-mira:max-w-10">
            {{ variant }}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
