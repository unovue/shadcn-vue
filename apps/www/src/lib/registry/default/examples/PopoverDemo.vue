<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button>
        Open popover
      </button>
    </PopoverTrigger>
    <PopoverContent class="w-80" @open-auto-focus.prevent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">
            Dimensions
          </h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <label for="width">Width</label>
            <input
              id="width"
              type="text"
              default-value="100%"
              class="col-span-2 h-8"
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label for="maxWidth">Max. width</label>
            <input
              id="maxWidth"
              type="text"
              default-value="300px"
              class="col-span-2 h-8"
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label for="height">Height</label>
            <input
              id="height"
              type="text"
              default-value="25px"
              class="col-span-2 h-8"
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label for="maxHeight">Max. height</label>
            <input
              id="maxHeight"
              type="text"
              default-value="none"
              class="col-span-2 h-8"
            >
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
