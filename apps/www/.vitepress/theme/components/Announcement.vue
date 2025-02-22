<script setup lang="ts">
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import { announcementConfig } from '../config/site'
</script>

<template>
  <a
    :href="announcementConfig.link"
    class="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
  >
    <span class="sm:hidden underline-offset-4 group-hover:underline">{{ announcementConfig.title }}</span>
    <span class="hidden sm:inline underline-offset-4 group-hover:underline">
      {{ announcementConfig.title }}
    </span>
    <ArrowRightIcon class="ml-1 h-4 w-4" />
  </a>
</template>
