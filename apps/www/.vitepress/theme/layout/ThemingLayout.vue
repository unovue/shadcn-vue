<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Paintbrush } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import CustomizerCode from '../components/CustomizerCode.vue'
import type { Color } from '../types/colors'
import ThemeCustomizer from '../components/ThemeCustomizer.vue'
import InlineThemePicker from '../components/InlineThemePicker.vue'
import PageAction from '../components/PageAction.vue'
import { useConfigStore } from '@/stores/config'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/registry/new-york/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/lib/registry/new-york/ui/drawer'

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
  <div class="container relative">
    <PageHeader>
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
        <InlineThemePicker class="gap-x-1 me-4 hidden lg:flex" :all-colors="allColors" />

        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline" class="md:hidden h-9 rounded-lg">
              <Paintbrush class="size-4 mr-2" />
              Customize
            </Button>
          </DrawerTrigger>
          <DrawerContent class="p-6 pt-0">
            <ThemeCustomizer :all-colors="allColors" />
          </DrawerContent>
        </Drawer>

        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="hidden md:flex h-9 rounded-lg">
              <Paintbrush class="size-4 mr-2" />
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent :side-offset="8" align="end" class="w-96">
            <ThemeCustomizer :all-colors="allColors" />
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger as-child>
            <Button class="h-9 ml-2 rounded-lg">
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

    <section>
      <slot />
    </section>
  </div>
</template>
