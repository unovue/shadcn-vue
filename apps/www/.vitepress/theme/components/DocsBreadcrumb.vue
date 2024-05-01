<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/registry/new-york/ui/breadcrumb'

const route = useRoute()

interface Item {
  title: string
  href: string
}

function generateBreadcrumb(url: string): Item[] {
  const breadcrumbItems: Item[] = []
  const segments = url.split('/').filter(segment => segment !== '') // Remove empty segments

  // Construct breadcrumb for each segment
  let href = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].replace('.html', '')
    href += `/${segment}`
    breadcrumbItems.push({ title: segment, href })
  }
  return breadcrumbItems
}

const breadcrumbs = computed(() => generateBreadcrumb(route.path))
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.title">
        <BreadcrumbItem>
          <BreadcrumbLink
            class="capitalize"
            :href="index === 0 ? undefined : breadcrumb.href"
            :class="{ 'text-foreground': index === breadcrumbs.length - 1 }"
          >
            {{ breadcrumb.title }}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
