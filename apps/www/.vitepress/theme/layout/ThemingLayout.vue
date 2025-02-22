<script setup lang="ts">
import type { Color } from '../types/colors'
import { Button } from '@/registry/new-york/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/registry/new-york/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/registry/new-york/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover'
import { useConfigStore } from '@/stores/config'
import { onMounted, watch } from 'vue'
import Announcement from '../components/Announcement.vue'
import CustomizerCode from '../components/CustomizerCode.vue'
import InlineThemePicker from '../components/InlineThemePicker.vue'
import PageAction from '../components/PageAction.vue'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import ThemeCustomizer from '../components/ThemeCustomizer.vue'

// Create an array of color values
const allColors: Color[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
]

const { theme, radius } = useConfigStore()

// Whenever the component is mounted, update the document class list
onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
  document.documentElement.classList.add(`theme-${theme.value}`)
})

// Whenever the theme value changes, update the document class list
watch(theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map(color => `theme-${color}`),
  )
  document.documentElement.classList.add(`theme-${theme}`)
})

// Whenever the radius value changes, update the document style
watch(radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`)
})
</script>

<template>
  <div>
    <PageHeader>
      <Announcement />
      <PageHeaderHeading class="hidden md:block">
        Add colors. Make it yours.
      </PageHeaderHeading>
      <PageHeaderHeading class="md:hidden">
        Make it yours
      </PageHeaderHeading>
      <PageHeaderDescription>
        Hand-picked themes that you can copy and paste into your apps.
      </PageHeaderDescription>

      <PageAction>
        <InlineThemePicker class="gap-x-1 me-4 hidden lg:flex" />

        <Drawer>
          <DrawerTrigger as-child>
            <Button size="sm" class="md:hidden">
              Customize
            </Button>
          </DrawerTrigger>
          <DrawerContent class="p-6 pt-0">
            <ThemeCustomizer />
          </DrawerContent>
        </Drawer>

        <Popover>
          <PopoverTrigger as-child>
            <Button size="sm">
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent :side-offset="8" :align-offset="-76" align="end" class="w-[380px] p-6">
            <ThemeCustomizer />
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger as-child>
            <Button variant="ghost" size="sm">
              Copy code
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Theme</DialogTitle>
              <DialogDescription>
                Copy and paste the following code into your CSS file.
              </DialogDescription>
            </DialogHeader>
            <CustomizerCode />
          </DialogContent>
        </Dialog>
      </PageAction>
    </PageHeader>
  </div>

  <section class="container-wrapper">
    <div class="container py-6">
      <slot />
    </div>
  </section>
</template>
