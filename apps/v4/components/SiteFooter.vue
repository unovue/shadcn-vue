<script setup lang="ts">
import { siteConfig } from '@/lib/config'
</script>

<template>
  <footer class="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent dark:bg-transparent">
    <div class="container-wrapper px-4 xl:px-6">
      <div class="flex h-(--footer-height) items-center justify-between">
        <div class="text-muted-foreground w-full text-center text-xs leading-loose sm:text-sm">
          Ported by
          <a
            :href="siteConfig.links.twitter"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            unovue</a>
          . The source code is available on
          <a
            :href="siteConfig.links.github"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </div>
  </footer>
</template>
