<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(true)
useHead({ htmlAttrs: { class: () => isDark.value ? 'dark' : '' } })
</script>

<template>
  <main class="flex min-h-dvh flex-col">
    <header class="border-b py-1 ">
      <div class="container flex items-center justify-between ">
        <h1 class="font-medium">
          shadcn-vue Playground
        </h1>

        <ClientOnly>
          <button
            class="rounded-md p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          >
            <component
              :is="isDark ? Sun : Moon"
              class="size-5"
            />
          </button>
        </ClientOnly>
      </div>
    </header>

    <!-- Try your components here -->
    <section class="container my-4 grid grow place-content-center rounded-md border p-4">
      <UiButton variant="destructive">
        Hi
      </UiButton>
    </section>
  </main>
</template>
