<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/registry/new-york-v4/ui/navigation-menu'

const { path } = useRoute()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
      <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/'">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <!-- <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/charts'">
          <NuxtLink to="/charts">
            Charts
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem> -->
      <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/forms'">
          <NuxtLink to="/forms">
            Forms
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
