<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Paintbrush } from 'lucide-vue-next'
import { useData } from 'vitepress'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import CustomizerCode from '../components/CustomizerCode.vue'
import { RADII, useConfigStore } from '@/stores/config'
import { colors } from '@/lib/registry'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Label } from '@/lib/registry/new-york/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/registry/new-york/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/registry/new-york/ui/dialog'
import RadixIconsCheck from '~icons/radix-icons/check'
import RadixIconsSun from '~icons/radix-icons/sun'
import RadixIconsMoon from '~icons/radix-icons/moon'

type Color =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet'

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

const { theme, radius, setRadius, setTheme } = useConfigStore()
const { isDark } = useData()

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
    <div class="flex justify-between items-center">
      <div>
        <PageHeader class="page-header pb-8">
          <PageHeaderHeading class="hidden md:block">
            Make it yours.
          </PageHeaderHeading>
          <PageHeaderDescription>
            Hand-picked themes that you can copy and paste into your apps.
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div class="px-4 pb-8 md:ml-auto md:pb-0">
        <div class="flex items-center space-x-2">
          <div class="hidden md:flex">
            <div class="mr-4 hidden items-center space-x-1 lg:flex">
              <TooltipProvider
                v-for="(color, index) in allColors.slice(0, 5)"
                :key="index"
              >
                <Tooltip>
                  <TooltipTrigger as-child>
                    <button
                      :key="index"
                      class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border text-xs"
                      :class="
                        color === theme
                          ? 'border-primary'
                          : 'border-transparent'
                      "
                      @click="setTheme(color)"
                    >
                      <span
                        class="flex h-6 w-6 items-center justify-center rounded-full"
                        :style="{ backgroundColor: colors[color][6].rgb }"
                      >
                        <RadixIconsCheck
                          v-if="color === theme"
                          class="h-4 w-4 text-white"
                        />
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    :side-offset="1"
                    class="capitalize bg-zinc-900 text-zinc-50"
                  >
                    {{ allColors[index] }}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Popover>
              <PopoverTrigger as-child>
                <Button variant="outline" class="h-9 rounded-[0.5rem]">
                  <Paintbrush class="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </PopoverTrigger>
              <PopoverContent :side-offset="8" align="end" class="w-96">
                <div class="p-4">
                  <div class="grid space-y-1">
                    <h1 class="text-md text-foreground font-semibold">
                      Customize
                    </h1>
                    <p class="text-xs text-muted-foreground">
                      Pick a style and color for your components.
                    </p>
                  </div>
                  <div class="space-y-1.5 pt-6">
                    <Label for="color" class="text-xs"> Color </Label>
                    <div class="grid grid-cols-3 gap-2 py-1.5">
                      <Button
                        v-for="(color, index) in allColors"
                        :key="index"
                        variant="outline"
                        class="h-8 justify-start px-3"
                        :class="
                          color === theme
                            ? 'border-foreground border-2'
                            : ''
                        "
                        @click="setTheme(color)"
                      >
                        <span
                          class="h-5 w-5 rounded-full flex items-center justify-center"
                          :style="{ backgroundColor: colors[color][7].rgb }"
                        >
                          <RadixIconsCheck
                            v-if="color === theme"
                            class="h-3 w-3 text-white"
                          />
                        </span>
                        <span class="ml-2 text-xs capitalize">
                          {{ color }}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div class="space-y-1.5 pt-6">
                    <Label for="radius" class="text-xs"> Radius </Label>
                    <div class="grid grid-cols-5 gap-2 py-1.5">
                      <Button
                        v-for="(r, index) in RADII"
                        :key="index"
                        variant="outline"
                        class="h-8 justify-center px-3"
                        :class="
                          r === radius
                            ? 'border-foreground border-2'
                            : ''
                        "
                        @click="setRadius(r)"
                      >
                        <span class="text-xs">
                          {{ r }}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div class="space-y-1.5 pt-6">
                    <Label for="theme" class="text-xs"> Theme </Label>

                    <div class="flex space-x-2 py-1.5">
                      <Button
                        class="h-8"
                        variant="outline"
                        :class="{ 'border-2 border-foreground': !isDark }"
                        @click="isDark = false"
                      >
                        <RadixIconsSun class="w-4 h-4 mr-2" />
                        <span class="text-xs">Light</span>
                      </Button>
                      <Button
                        class="h-8"
                        variant="outline"
                        :class="{ 'border-2 border-foreground': isDark }"
                        @click="isDark = true"
                      >
                        <RadixIconsMoon class="w-4 h-4 mr-2" />
                        <span class="text-xs">Dark</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Dialog>
              <DialogTrigger as-child>
                <Button class="h-9 ml-2 rounded-[0.5rem]">
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
          </div>
        </div>
      </div>
    </div>
    <section>
      <slot />
    </section>
  </div>
</template>
