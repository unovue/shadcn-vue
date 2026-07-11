<script setup lang="ts">
import type { RegistryEntry } from '@/registry/registries'
import { ExternalLinkIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import CodeBlockCommand from '@/components/CodeBlockCommand.vue'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import { Input } from '@/registry/new-york-v4/ui/input'
import { registries } from '@/registry/registries'

const query = ref('')
const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const set = new Set<string>()
  for (const r of registries) r.tags?.forEach(t => set.add(t))
  return [...set].sort()
})

const filtered = computed<RegistryEntry[]>(() => {
  const q = query.value.trim().toLowerCase()
  return registries.filter((r) => {
    const matchesTag = !activeTag.value || r.tags?.includes(activeTag.value)
    const matchesQuery
      = !q
        || r.title.toLowerCase().includes(q)
        || r.name.toLowerCase().includes(q)
        || r.description.toLowerCase().includes(q)
    return matchesTag && matchesQuery
  })
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}
</script>

<template>
  <div class="not-prose flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <Input v-model="query" placeholder="Search registries..." class="max-w-sm" />
      <div v-if="allTags.length" class="flex flex-wrap gap-2">
        <Badge
          v-for="tag in allTags"
          :key="tag"
          as="button"
          type="button"
          :variant="activeTag === tag ? 'default' : 'outline'"
          :aria-pressed="activeTag === tag"
          class="cursor-pointer"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </Badge>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <Card v-for="registry in filtered" :key="registry.name" class="flex flex-col">
        <CardHeader>
          <div class="flex items-center justify-between gap-2">
            <CardTitle>{{ registry.title }}</CardTitle>
            <Badge variant="secondary" class="font-mono">
              {{ registry.name }}
            </Badge>
          </div>
          <CardDescription>{{ registry.description }}</CardDescription>
        </CardHeader>
        <CardContent class="flex-1">
          <CodeBlockCommand :code="`npx shadcn-vue@latest add ${registry.name}/[item]`" />
          <p v-if="registry.author" class="mt-2 text-sm text-muted-foreground">
            by {{ registry.author }}
          </p>
        </CardContent>
        <CardFooter>
          <Button as="a" :href="registry.homepage" target="_blank" rel="noreferrer" variant="outline" size="sm">
            Visit
            <ExternalLinkIcon class="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>

    <p v-if="!filtered.length" class="text-sm text-muted-foreground">
      No registries found.
    </p>
  </div>
</template>
