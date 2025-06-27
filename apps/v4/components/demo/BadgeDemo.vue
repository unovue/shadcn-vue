<script setup lang="ts">
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from 'lucide-vue-next'
import { Badge } from '@/registry/new-york-v4/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Badge>Badge</Badge>
    <Badge variant="secondary">
      Secondary
    </Badge>
    <Badge variant="destructive">
      Destructive
    </Badge>
    <Badge variant="outline">
      Outline
    </Badge>

    <Badge variant="secondary">
      <BadgeCheckIcon class="h-3 w-3" />
      Verified
    </Badge>
    <Badge variant="destructive">
      <AlertCircleIcon class="h-3 w-3" />
      8
    </Badge>
    <Badge variant="outline">
      <CheckIcon class="h-3 w-3" />
      99
    </Badge>
    <Badge>
      20+
    </Badge>
  </div>
</template>
