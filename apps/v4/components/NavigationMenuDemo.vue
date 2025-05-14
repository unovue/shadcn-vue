<script setup lang="ts">
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-vue-next'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/registry/new-york-v4/ui/navigation-menu'
// eslint-disable-next-line import/no-named-default
import { default as ListItem } from './NavigationMenuItem.vue'

const components: { title: string, href: string, description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]
</script>

<template>
  <div class="hidden w-full flex-col items-center justify-center gap-6 @xl:flex">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <NavigationMenuLink as-child class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md">
                  <a href="/">
                    <div class="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem to="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem to="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem to="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                v-for="component in components"
                :key="component.title"
                :title="component.title"
                :to="component.href"
              >
                {{ component.description }}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            as-child
            :class="navigationMenuTriggerStyle()"
          >
            <NuxtLink to="/docs">
              Documentation
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <NavigationMenu :viewport="false">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            as-child
            :class="navigationMenuTriggerStyle()"
          >
            <NuxtLink to="/docs">
              Documentation
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    <div class="font-medium">
                      Components
                    </div>
                    <div class="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    <div class="font-medium">
                      Documentation
                    </div>
                    <div class="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    <div class="font-medium">
                      Blog
                    </div>
                    <div class="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    Components
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    Documentation
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#">
                    Blocks
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#" class="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#" class="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child>
                  <NuxtLink to="#" class="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
