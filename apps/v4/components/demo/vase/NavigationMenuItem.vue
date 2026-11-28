<script setup lang="ts">
import { NuxtLink } from '#components'
import { NavigationMenuLink } from '@/styles/vase-vega/ui/navigation-menu'

defineProps<{
  to: string
  title: string
}>()
</script>

<template>
  <li>
    <NavigationMenuLink :as="NuxtLink" :to="to">
      <div class="flex flex-col gap-1 text-sm">
        <div class="leading-none font-medium">
          {{ title }}
        </div>
        <p class="text-muted-foreground line-clamp-2 leading-snug">
          <slot />
        </p>
      </div>
    </NavigationMenuLink>
  </li>
</template>
