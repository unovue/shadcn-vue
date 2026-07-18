<script setup lang="ts">
const items = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`)
</script>

<template>
  <div class="mx-auto flex w-full max-w-xs min-w-0 flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scrollbar-none h-48 overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div
              v-for="item in items"
              :key="item"
              class="rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-center font-mono text-xs text-muted-foreground">
        scroll-fade
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-none scrollbar-none h-48 overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div
              v-for="item in items"
              :key="item"
              class="rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-center font-mono text-xs text-muted-foreground">
        scroll-fade scroll-fade-none
      </p>
    </div>
  </div>
</template>
