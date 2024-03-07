---
title: Dark Mode
description: Adding dark mode to your site.
---

<script setup>
  import { useData } from 'vitepress'
  const { isDark } = useData()
  import ViteIcon from '~icons/simple-icons/vite'
  import NuxtIcon from '~icons/simple-icons/nuxtdotjs'
  import AstroIcon from '~icons/simple-icons/astro'
</script>

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/docs/dark-mode/vite">
    <ViteIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Vite</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/nuxt">
    <NuxtIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Nuxt</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/vitepress">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.03628 7.87818C4.75336 5.83955 6.15592 3.95466 8.16899 3.66815L33.6838 0.0367403C35.6969 -0.24977 37.5581 1.1706 37.841 3.20923L42.9637 40.1218C43.2466 42.1604 41.8441 44.0453 39.831 44.3319L14.3162 47.9633C12.3031 48.2498 10.4419 46.8294 10.159 44.7908L5.03628 7.87818Z" />
      <path d="M6.85877 7.6188C6.71731 6.59948 7.41859 5.65703 8.42512 5.51378L33.9399 1.88237C34.9465 1.73911 35.8771 2.4493 36.0186 3.46861L41.1412 40.3812C41.2827 41.4005 40.5814 42.343 39.5749 42.4862L14.0601 46.1176C13.0535 46.2609 12.1229 45.5507 11.9814 44.5314L6.85877 7.6188Z" class="fill-background"/>
      <path d="M33.1857 14.9195L25.8505 34.1576C25.6991 34.5547 25.1763 34.63 24.9177 34.2919L12.3343 17.8339C12.0526 17.4655 12.3217 16.9339 12.7806 16.9524L22.9053 17.3607C22.9698 17.3633 23.0344 17.3541 23.0956 17.3337L32.5088 14.1992C32.9431 14.0546 33.3503 14.4878 33.1857 14.9195Z" />
      <path d="M27.0251 12.5756L19.9352 15.0427C19.8187 15.0832 19.7444 15.1986 19.7546 15.3231L20.3916 23.063C20.4066 23.2453 20.5904 23.3628 20.7588 23.2977L22.7226 22.5392C22.9064 22.4682 23.1021 22.6138 23.0905 22.8128L22.9102 25.8903C22.8982 26.0974 23.1093 26.2436 23.295 26.1567L24.4948 25.5953C24.6808 25.5084 24.892 25.6549 24.8795 25.8624L24.5855 30.6979C24.5671 31.0004 24.9759 31.1067 25.1013 30.8321L25.185 30.6487L29.4298 17.8014C29.5008 17.5863 29.2968 17.3809 29.0847 17.454L27.0519 18.1547C26.8609 18.2205 26.6675 18.0586 26.6954 17.8561L27.3823 12.8739C27.4103 12.6712 27.2163 12.5091 27.0251 12.5756Z" class="stroke-background"/>
    </svg>
    <p class="mt-2 font-medium">Vitepress</p>
  </LinkedCard>

  <LinkedCard href="/docs/dark-mode/astro">
    <AstroIcon class="w-10 h-10" />
    <p class="mt-2 font-medium">Astro</p>
  </LinkedCard>
</div>
