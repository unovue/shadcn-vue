<script setup lang="ts">
import type { RegistryEntry } from '@/registry/registries'
import { SearchIcon, XIcon } from '@lucide/vue'
import { IconArrowUpRight, IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-vue'
import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/registry/new-york-v4/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/registry/new-york-v4/ui/drawer'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/registry/new-york-v4/ui/item'
import { registries } from '@/registry/registries'

const PAGE_SIZE = 10

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()

const query = ref(String(route.query.q ?? ''))

watchDebounced(query, (value) => {
  router.replace({
    query: { ...route.query, q: value || undefined, page: undefined },
  })
}, { debounce: 250 })

watch(() => route.query.q, (value) => {
  const next = String(value ?? '')
  if (next !== query.value)
    query.value = next
})

function normalizeQuery(value: string) {
  return value.toLowerCase().replaceAll(' ', '').replaceAll('@', '')
}

const filtered = computed<RegistryEntry[]>(() => {
  const q = normalizeQuery(query.value.trim())
  if (!q)
    return registries

  return registries.filter(registry =>
    normalizeQuery(registry.name).includes(q)
    || normalizeQuery(registry.title).includes(q)
    || normalizeQuery(registry.description).includes(q),
  )
})

const totalPages = computed(() => Math.ceil(filtered.value.length / PAGE_SIZE))

const page = computed(() => {
  const raw = Number.parseInt(String(route.query.page ?? '1'), 10) || 1
  return Math.max(1, Math.min(raw, totalPages.value || 1))
})

const paginated = computed(() =>
  filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
)

function setPage(target: number) {
  if (target === page.value || target < 1 || target > totalPages.value)
    return
  router.push({
    query: { ...route.query, page: target > 1 ? String(target) : undefined },
  })
}

// Mirrors shadcn-ui's directory pagination: first/last always visible,
// ellipsis only when it would hide more than one page number.
const pageNumbers = computed<(number | 'ellipsis')[]>(() => {
  const current = page.value
  const total = totalPages.value

  if (total <= 7)
    return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | 'ellipsis')[] = [1]

  if (current > 4)
    pages.push('ellipsis')
  else if (current >= 4)
    pages.push(2)

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 3)
    pages.push('ellipsis')
  else if (current <= total - 3)
    pages.push(total - 1)

  pages.push(total)

  return pages
})

function getHomepageUrl(homepage: string) {
  const url = new URL(homepage)
  url.searchParams.set('utm_source', 'shadcn-vue.com')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'directory')
  return url.toString()
}

const isAddOpen = ref(false)
const selectedRegistry = ref<RegistryEntry | null>(null)

function openAdd(registry: RegistryEntry) {
  selectedRegistry.value = registry
  isAddOpen.value = true
}

const commands = computed<Record<string, string> | null>(() => {
  if (!selectedRegistry.value)
    return null
  const item = `${selectedRegistry.value.name}/[component]`
  return {
    pnpm: `pnpm dlx shadcn-vue@latest add ${item}`,
    npm: `npx shadcn-vue@latest add ${item}`,
    yarn: `yarn dlx shadcn-vue@latest add ${item}`,
    bun: `bunx --bun shadcn-vue@latest add ${item}`,
  }
})
</script>

<template>
  <div data-not-typeset class="not-prose mt-6">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        v-model="query"
        class="h-full"
        placeholder="Search"
      />
      <InputGroupAddon align="inline-end">
        <span class="text-muted-foreground tabular-nums sm:text-xs">
          {{ filtered.length }} {{ filtered.length === 1 ? 'registry' : 'registries' }}
        </span>
      </InputGroupAddon>
      <InputGroupAddon v-if="query.length" align="inline-end">
        <InputGroupButton
          aria-label="Clear"
          title="Clear"
          size="icon-xs"
          @click="query = ''"
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>

    <ItemGroup class="my-8">
      <template v-for="(registry, index) in paginated" :key="registry.name">
        <Item class="group/item relative gap-6 px-0">
          <ItemMedia
            variant="image"
            class="grayscale [&_svg]:size-8 [&_svg]:fill-foreground"
          >
            <div class="contents" v-html="registry.logo" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <a
                :href="getHomepageUrl(registry.homepage)"
                target="_blank"
                rel="noopener noreferrer external"
                class="group flex items-center gap-1"
              >
                {{ registry.name }}
                <IconArrowUpRight class="size-4 opacity-0 group-hover:opacity-100" />
              </a>
            </ItemTitle>
            <ItemDescription v-if="registry.description" class="text-pretty">
              {{ registry.description }}
            </ItemDescription>
          </ItemContent>
          <ItemActions class="relative z-10 hidden self-start sm:flex">
            <Button size="sm" variant="outline" class="relative z-10" @click="openAdd(registry)">
              Add <IconPlus />
            </Button>
          </ItemActions>
          <ItemFooter class="justify-start pl-16 sm:hidden">
            <Button
              size="sm"
              variant="outline"
              as="a"
              :href="getHomepageUrl(registry.homepage)"
              target="_blank"
              rel="noopener noreferrer external"
            >
              View <IconArrowUpRight />
            </Button>
            <Button size="sm" variant="outline" @click="openAdd(registry)">
              Add <IconPlus />
            </Button>
          </ItemFooter>
        </Item>
        <ItemSeparator v-if="index < paginated.length - 1" class="my-1" />
      </template>
    </ItemGroup>

    <p v-if="!filtered.length" class="text-muted-foreground my-8 text-sm">
      No registries found.
    </p>

    <nav
      v-if="totalPages > 1"
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class="mx-auto flex w-full justify-center"
    >
      <ul data-slot="pagination-content" class="flex flex-row items-center gap-1">
        <li data-slot="pagination-item">
          <a
            aria-label="Go to previous page"
            :aria-disabled="page <= 1 || undefined"
            :tabindex="page <= 1 ? -1 : undefined"
            :class="cn(
              buttonVariants({ variant: 'ghost', size: 'default' }),
              'pl-1.5!',
              page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer',
            )"
            @click.prevent="setPage(page - 1)"
          >
            <IconChevronLeft class="size-4" />
            <span class="hidden sm:block">Previous</span>
          </a>
        </li>
        <template v-for="(p, i) in pageNumbers" :key="p === 'ellipsis' ? `ellipsis-${i}` : p">
          <li v-if="p === 'ellipsis'" data-slot="pagination-item">
            <span class="flex size-9 items-center justify-center text-sm">…</span>
          </li>
          <li v-else data-slot="pagination-item">
            <a
              :aria-current="p === page ? 'page' : undefined"
              data-slot="pagination-link"
              :data-active="p === page"
              :class="cn(
                buttonVariants({ variant: p === page ? 'outline' : 'ghost', size: 'icon' }),
                'cursor-pointer',
              )"
              @click.prevent="setPage(p)"
            >
              {{ p }}
            </a>
          </li>
        </template>
        <li data-slot="pagination-item">
          <a
            aria-label="Go to next page"
            :aria-disabled="page >= totalPages || undefined"
            :tabindex="page >= totalPages ? -1 : undefined"
            :class="cn(
              buttonVariants({ variant: 'ghost', size: 'default' }),
              'pr-1.5!',
              page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer',
            )"
            @click.prevent="setPage(page + 1)"
          >
            <span class="hidden sm:block">Next</span>
            <IconChevronRight class="size-4" />
          </a>
        </li>
      </ul>
    </nav>

    <Drawer v-if="isMobile" v-model:open="isAddOpen">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Registry</DrawerTitle>
          <DrawerDescription>
            Run this command to add {{ selectedRegistry?.name }} to your project.
          </DrawerDescription>
        </DrawerHeader>
        <div class="px-4">
          <RegistryAddCommand v-if="commands" :commands="commands" />
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button size="sm">
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <Dialog v-else v-model:open="isAddOpen">
      <DialogContent class="animate-none! sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Registry</DialogTitle>
          <DialogDescription>
            Run this command to add {{ selectedRegistry?.name }} to your project.
          </DialogDescription>
        </DialogHeader>
        <RegistryAddCommand v-if="commands" :commands="commands" />
        <DialogFooter>
          <DialogClose as-child>
            <Button size="sm" variant="outline">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
