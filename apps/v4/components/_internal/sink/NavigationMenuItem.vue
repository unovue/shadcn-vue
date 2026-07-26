<script setup lang="ts">
import { NavigationMenuLink } from '@/registry/new-york-v4/ui/navigation-menu'

defineProps<{
  to: string
  title: string
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <NuxtLink :to="to">
        <div class="text-sm leading-none font-medium">
          {{ title }}
        </div>
        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
          <slot />
        </p>
      </NuxtLink>
    </NavigationMenuLink>
  </li>
</template>
