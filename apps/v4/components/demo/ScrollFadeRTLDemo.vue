<script setup lang="ts">
const ltrTags = [
  'Design',
  'Engineering',
  'Marketing',
  'Product',
  'Research',
  'Sales',
  'Support',
  'Operations',
  'Finance',
  'Legal',
]

const rtlTags = [
  'تصميم',
  'هندسة',
  'تسويق',
  'منتج',
  'أبحاث',
  'مبيعات',
  'دعم',
  'عمليات',
  'مالية',
  'قانوني',
]
</script>

<template>
  <div class="mx-auto grid w-full max-w-lg gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-3">
      <div dir="ltr" class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-x scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in ltrTags"
              :key="tag"
              class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-center font-mono text-xs text-muted-foreground">
        dir="ltr"
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <div dir="rtl" class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-x scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in rtlTags"
              :key="tag"
              class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-center font-mono text-xs text-muted-foreground">
        dir="rtl"
      </p>
    </div>
  </div>
</template>
