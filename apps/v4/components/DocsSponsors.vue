<script setup lang="ts">
import { IconHeart } from '@tabler/icons-vue'
import { siteConfig } from '@/lib/config'
import { Button } from '@/registry/new-york-v4/ui/button'

// Generated daily by sponsorkit in https://github.com/zernonia/sponsor
const sponsorsImage = 'https://raw.githubusercontent.com/zernonia/sponsor/main/sponsorkit/sponsors.circles.svg'
</script>

<template>
  <div class="flex shrink-0 flex-col gap-3 rounded-lg bg-muted/50 p-4 text-sm">
    <p class="text-xs font-medium text-muted-foreground">
      Sponsors
    </p>

    <a
      :href="siteConfig.links.sponsor"
      target="_blank"
      rel="noreferrer"
      class="flex h-16 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      Your logo here
    </a>

    <Button variant="outline" size="sm" class="w-full shadow-none" as-child>
      <a :href="siteConfig.links.sponsor" target="_blank" rel="noreferrer">
        <IconHeart class="text-pink-500" />
        Become a sponsor
      </a>
    </Button>

    <p class="text-xs leading-relaxed text-muted-foreground">
      shadcn-vue is free and open source. Sponsorship keeps it maintained.
    </p>
  </div>
</template>
