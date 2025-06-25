<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const FEATURED_BLOCKS = [
  'dashboard-01',
  'sidebar-07',
  'sidebar-03',
  'login-03',
  'login-04',
]
</script>

<template>
  <div class="flex flex-col gap-12 md:gap-24">
    <BlockDisplay v-for="name in FEATURED_BLOCKS" :key="name" :name="name" />

    <div class="container-wrapper">
      <div class="container flex justify-center py-6">
        <Button as-child variant="outline">
          <NuxtLink to="/blocks/sidebar">
            Browse more blocks
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
