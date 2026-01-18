<script setup lang="ts">
import type { DirectoryRegistry } from "~/lib/directory-registry"
import { IconArrowUpRight } from "@tabler/icons-vue"
import { PlusIcon, Search, X } from "lucide-vue-next"
import { directoryRegistryList } from "~/lib/directory-registry"
import { Button } from "~/registry/new-york-v4/ui/button"
import { Field } from "~/registry/new-york-v4/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/registry/new-york-v4/ui/input-group"
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
} from "~/registry/new-york-v4/ui/item"
import AddRegistryModal from "./AddRegistryModal.vue"

const searchQuery = ref("")
const addRegistryOpen = ref(false)
const selectedRegistry = ref<DirectoryRegistry | null>(null)

const registryList = computed(() => {
  return directoryRegistryList.filter((r) => {
    return r.name.includes(searchQuery.value) || r.description.includes(searchQuery.value)
  })
})
function toggleAddRegistryModal(registry: DirectoryRegistry | null) {
  if (registry) {
    selectedRegistry.value = registry
  }
  addRegistryOpen.value = !addRegistryOpen.value
}
</script>

<template>
  <div class="mt-6">
    <Field>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput v-model="searchQuery" placeholder="search" />
        <InputGroupAddon align="inline-end">
          <span class="text-muted-foreground tabular-nums sm:text-xs">
            {{ directoryRegistryList.length }}
            {{ directoryRegistryList.length === 1 ? "Registry" : "Registries" }}
          </span>
        </InputGroupAddon>
        <InputGroupAddon
          align="inline-end"
          :data-disabled="false"
          class-name="data-[disabled=true]:hidden"
        >
          <InputGroupButton
            aria-label="Clear"
            title="Clear"
            size="icon-xs"
          >
            <X />
          </InputGroupButton>
        </inputgroupaddon>
      </InputGroup>
    </Field>
    <ItemGroup>
      <template v-for="registry in registryList" :key="registry.name">
        <Item class="group/item relative gap-6 px-0">
          <ItemMedia
            variant="image"
            class="*:[svg]:fill-foreground grayscale *:[svg]:size-8"
          >
            <span v-if="registry.logo.startsWith('<svg')" v-html="registry.logo" />
            <NuxtImg v-else :src="registry.logo" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <a
                :href="registry.link"
                rel="noopener noreferrer external"
                class="group flex items-center gap-1"
                target="_blank"
              >
                {{ registry.name }}
                <IconArrowUpRight
                  class="size-4 opacity-0 group-hover:opacity-100"
                />
              </a>
            </ItemTitle>
            <ItemDescription v-if="registry.description" class="text-pretty">
              {{ registry.description }}
            </ItemDescription>
          </ItemContent>
          <ItemActions class="">
            <Button variant="outline" @click.prevent="toggleAddRegistryModal(registry)">
              <PlusIcon />
              Add
            </Button>
          </ItemActions>
          <ItemFooter class="justify-start pl-16 sm:hidden">
            <Button size="sm" variant="outline">
              View <IconArrowUpRight />
            </Button>
          </ItemFooter>
        </Item>
        <ItemSeparator />
      </template>
    </ItemGroup>
    <AddRegistryModal v-if="selectedRegistry" :open="addRegistryOpen" :registry="selectedRegistry" @update:open="toggleAddRegistryModal(null)" />
  </div>
</template>
