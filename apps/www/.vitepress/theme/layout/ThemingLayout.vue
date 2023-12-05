<script setup lang="ts">
import { onMounted, watch } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import CustomizerCode from '../components/CustomizerCode.vue'
import ThemePopover from '../components/ThemePopover.vue'
import { allColors } from '../components/theming/utils/data'
import { useConfigStore } from '@/stores/config'
import { colors } from '@/lib/registry'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/registry/new-york/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/registry/new-york/ui/dialog'
import RadixIconsCheck from '~icons/radix-icons/check'

const { theme, setTheme } = useConfigStore()
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
            <ThemePopover title="Customize" />
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
