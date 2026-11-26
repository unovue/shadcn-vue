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
      <div class="text-sm leading-none font-medium">
        {{ title }}
      </div>
      <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
        <slot />
      </p>
    </NavigationMenuLink>
  </li>
</template>
