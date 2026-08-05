<script setup lang="ts">
// Exactly one caller sets up the undo stack's recording watcher and its ⌘Z
// shortcuts; every other component just reads the shared state.
useTypesetHistory({ record: true })

const title = 'Typeset'
const description = 'Typography for markdown you don\'t control.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
    <ClientOnly>
      <div
        data-slot="designer"
        class="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <TypesetDocsPanel />
        <TypesetPreview />
        <TypesetCustomizer />
      </div>
      <template #fallback>
        <TypesetSkeleton />
      </template>
    </ClientOnly>
  </div>
</template>
