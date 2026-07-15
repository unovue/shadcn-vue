<script setup lang="ts">
import {
  ComputerTerminal01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/registry/new-york-v4/ui/button'

const dialogOpen = ref(false)
</script>

<template>
  <Button
    size="sm"
    class="hidden h-[31px] rounded-lg pl-2 md:flex"
    @click="dialogOpen = true"
  >
    <HugeiconsIcon
      :icon="ComputerTerminal01Icon"
      class="hidden xl:flex"
    />
    Create Project
  </Button>
  <CreateProjectDialog v-model:open="dialogOpen" />
</template>
