<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'

const isDark = useDark()
</script>

<template>
  <Calendar :is-dark="isDark" borderless trim-weeks expanded />
</template>

<style>
:root {
  --vc-font-family: "Inter", sans-serif;
  --vc-rounded-full: var(--radius);
  --vc-font-bold: 500;
  --vc-font-semibold: 600;
  --vc-text-lg: 14px;
}

.vc-light,
.vc-dark {
  --vc-bg: var(--background);
  --vc-border: var(--border);
  --vc-focus-ring: 0 0 0 3px rgba(0, 0, 0, 0.2);
  --vc-weekday-color: var(--muted);
  --vc-popover-content-color: var(--muted);
  --vc-popover-content-bg: var(--background);
  --vc-popover-content-border: var(--border);

  &.vc-attr,
  & .vc-attr {
    --vc-content-color: var(--primary);
    --vc-highlight-outline-bg: var(--primary);
    --vc-highlight-outline-border: var(--primary);
    --vc-highlight-outline-content-color: var(--primary-foreground);
    --vc-highlight-light-bg: var(
      --vc-accent-200
    ); /* Highlighted color between two dates */
    --vc-highlight-light-content-color: var(--secondary-foreground);
    --vc-highlight-solid-bg: var(--primary);
    --vc-highlight-solid-content-color: var(--primary-foreground);
    --vc-dot-bg: var(--primary);
    --vc-bar-bg: var(--primary);
  }
}

.vc-blue {
  --vc-accent-200: var(--secondary);
  --vc-accent-400: var(--primary);
  --vc-accent-500: var(--primary);
  --vc-accent-600: var(--primary);
}

.dark {
  .vc-blue {
    --vc-accent-200: var(--secondary);
    --vc-accent-400: var(--primary);
    --vc-accent-500: var(--secondary);
  }
}
</style>
