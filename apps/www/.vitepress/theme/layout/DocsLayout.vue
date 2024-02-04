<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { docsConfig } from '../config/docs'
import TableOfContentVue from '../components/TableOfContent.vue'
import EditLink from '../components/EditLink.vue'
import { ScrollArea } from '@/lib/registry/default/ui/scroll-area'
import { Badge } from '@/lib/registry/default/ui/badge'
import RadixIconsCode from '~icons/radix-icons/code'
import RadixIconsExternalLink from '~icons/radix-icons/external-link'
import ChevronRightIcon from '~icons/lucide/chevron-right'

const $route = useRoute()
const { frontmatter } = useData()

const sourceLink = 'https://github.com/radix-vue/shadcn-vue/tree/dev/'
</script>

<template>
  <div class="border-b">
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside
        class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto"
      >
        <ScrollArea orientation="vertical" class="relative overflow-hidden h-full py-6 pr-6 lg:py-8" :type="'auto'">
          <div class="w-full">
            <div v-for="docsGroup in docsConfig.sidebarNav" :key="docsGroup.title" class="pb-4">
              <h4
                class="mb-1 rounded-md px-2 py-1 text-sm font-semibold"
              >
                {{ docsGroup.title }}
              </h4>

              <div
                v-for="doc in docsGroup.items "
                :key="doc.title"
                class="grid grid-flow-row auto-rows-max text-sm"
              >
                <a
                  v-if="doc.href"
                  :disabled="doc.disabled"
                  :href="doc.href"
                  class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                  :class="{
                    '!font-semibold !text-foreground': $route.path === `${doc.href}.html`,
                  }"
                >
                  {{ doc.title }}

                  <span v-if="doc.label" class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                    {{ doc.label }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div class="mx-auto w-full min-w-0">
          <div class="block xl:hidden">
            <TableOfContentVue />
          </div>

          <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <div class="overflow-hidden text-ellipsis whitespace-nowrap">
              Docs
            </div>
            <ChevronRightIcon class="h-4 w-4" />
            <div class="font-medium text-foreground">
              {{ frontmatter.title }}
            </div>
          </div>

          <div class="space-y-2">
            <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
              {{ frontmatter.title }}
            </h1>
            <p class="text-lg text-muted-foreground">
              {{ frontmatter.description }}
            </p>
          </div>

          <div class="flex items-center space-x-2 pt-4">
            <a v-if="frontmatter.docs" :href="frontmatter.docs" target="_blank" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <RadixIconsExternalLink class="mr-1" />
              Docs
            </a>
            <a v-if="frontmatter.source" :href="sourceLink + frontmatter.source" target="_blank" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <RadixIconsCode class="mr-1" />
              Component Source
            </a>
            <a v-if="frontmatter.primitive" :href="frontmatter.primitive" target="_blank" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Primitive API Reference
            </a>
          </div>

          <div class="vp-doc">
            <slot />
          </div>

          <EditLink />
        </div>

        <div class="hidden text-sm xl:block">
          <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
            <TableOfContentVue />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
