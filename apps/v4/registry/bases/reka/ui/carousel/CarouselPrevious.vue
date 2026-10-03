<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import type { ButtonVariants } from "@/registry/bases/reka/ui/button"
import { cn } from "@/lib/utils"
import { IconPlaceholder } from "@/registry/bases/reka/components/icon-placeholder"
import { Button } from "@/registry/bases/reka/ui/button"
import { useCarousel } from "./useCarousel"

const props = withDefaults(defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}
& WithClassAsProps>(), {
  variant: "outline",
  size: "icon-sm",
})

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="cn(
      'cn-carousel-previous absolute touch-manipulation',
      orientation === 'horizontal'
        ? 'inset-y-0 -left-12 my-auto'
        : 'inset-x-0 -top-12 mx-auto rotate-90',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollPrev"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        class="cn-rtl-flip"
      />
      <span class="sr-only">Previous slide</span>
    </slot>
  </Button>
</template>
