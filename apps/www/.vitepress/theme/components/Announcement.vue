<script setup lang="ts">
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import { announcementConfig } from '../config/site'
</script>

<template>
  <a
    :href="announcementConfig.link"
    class="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
  >
    <span class="underline-offset-4 group-hover:underline sm:hidden">{{ announcementConfig.title }}</span>
    <span class="hidden underline-offset-4 group-hover:underline sm:inline">
      {{ announcementConfig.title }}
    </span>
    <ArrowRightIcon class="ml-1 h-4 w-4" />
  </a>
</template>
