<script setup lang="ts">
import { MoonIcon, SunIcon } from '@radix-icons/vue'

const isDark = ref(true)
useHead({ htmlAttrs: { class: () => isDark.value ? 'dark' : '' } })
</script>

<template>
  <main class="flex flex-col min-h-dvh">
    <header class="border-b py-1 ">
      <div class="container flex justify-between items-center ">
        <h1 class="font-medium">
          shadcn-vue Playground
        </h1>

        <ClientOnly>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          >
            <component
              :is="isDark ? SunIcon : MoonIcon"
              class="size-5"
            />
          </button>
        </ClientOnly>
      </div>
    </header>

    <!-- Try your components here -->
    <section class="container grow my-4 p-4 rounded-md border grid place-content-center">
      <UiButton variant="destructive">
        Hi
      </UiButton>
    </section>
  </main>
</template>
