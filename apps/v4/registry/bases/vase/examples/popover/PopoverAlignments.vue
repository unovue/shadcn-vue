<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/vase/ui/popover"
</script>

<template>
  <div class="flex gap-6">
    <Popover>
      <PopoverTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="sm">
            Start
          </Button>
        </template>
      </PopoverTrigger>
      <PopoverContent align="start" class="w-40">
        Aligned to start
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="sm">
            Center
          </Button>
        </template>
      </PopoverTrigger>
      <PopoverContent align="center" class="w-40">
        Aligned to center
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="sm">
            End
          </Button>
        </template>
      </PopoverTrigger>
      <PopoverContent align="end" class="w-40">
        Aligned to end
      </PopoverContent>
    </Popover>
  </div>
</template>
