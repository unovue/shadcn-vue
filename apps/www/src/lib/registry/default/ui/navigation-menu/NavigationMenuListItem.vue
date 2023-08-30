<script setup lang="ts">
import { NavigationMenuLink } from 'radix-vue'

const props = defineProps({
  title: String,
  href: String,
})
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
        :href="props.href"
        v-bind="$attrs"
        class="focus:shadow-sm hover:bg-outline-hover block select-none rounded-sm p-3 text-sm leading-none no-underline outline-none transition-colors"
      >
        <div class="text-foreground mb-1 font-medium leading-4">
          {{ props.title }}
        </div>
        <p class="text-muted my-0 leading-5">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
