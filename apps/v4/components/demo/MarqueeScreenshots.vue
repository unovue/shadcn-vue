<script setup lang="ts">
import { Marquee } from '@/registry/new-york-v4/ui/marquee'

const scenes = [
  { light: '/examples/dashboard-light.png', dark: '/examples/dashboard-dark.png', alt: 'Dashboard' },
  { light: '/examples/authentication-light.png', dark: '/examples/authentication-dark.png', alt: 'Authentication' },
  { light: '/examples/cards-light.png', dark: '/examples/cards-dark.png', alt: 'Cards' },
  { light: '/examples/playground-light.png', dark: '/examples/playground-dark.png', alt: 'Playground' },
  { light: '/examples/tasks-light.png', dark: '/examples/tasks-dark.png', alt: 'Tasks' },
]

const col1 = scenes.slice(0, 3)
const col2 = scenes.slice(2, 5)
const col3 = scenes.slice(0, 3)
</script>

<template>
  <div class="relative h-[450px] w-full overflow-hidden bg-muted">
    <!-- Column 1: reversed -->
    <Marquee
      orientation="vertical"
      reverse
      :overlay="false"
      class="absolute left-[calc(50%_-_740px)] top-[calc(50%_-_1020px)] h-[1900px] w-[460px] [--duration:40s] [--gap:2rem] [transform:rotateX(55deg)_rotateZ(30deg)] [transform-style:preserve-3d]"
    >
      <template v-for="img in col1" :key="img.alt">
        <img :src="img.light" :alt="img.alt" width="460" height="258" loading="lazy" class="block dark:hidden aspect-video rounded-lg border border-border object-cover shadow-md">
        <img :src="img.dark" :alt="img.alt" width="460" height="258" loading="lazy" class="hidden dark:block aspect-video rounded-lg border border-border object-cover shadow-md">
      </template>
    </Marquee>

    <!-- Column 2: normal -->
    <Marquee
      orientation="vertical"
      :overlay="false"
      class="absolute left-[calc(50%_-_230px)] top-[calc(50%_-_1000px)] h-[2000px] w-[460px] [--duration:40s] [--gap:2rem] [transform:rotateX(55deg)_rotateZ(30deg)] [transform-style:preserve-3d]"
    >
      <template v-for="img in col2" :key="img.alt">
        <img :src="img.light" :alt="img.alt" width="460" height="258" loading="lazy" class="block dark:hidden aspect-video rounded-lg border border-border object-cover shadow-md">
        <img :src="img.dark" :alt="img.alt" width="460" height="258" loading="lazy" class="hidden dark:block aspect-video rounded-lg border border-border object-cover shadow-md">
      </template>
    </Marquee>

    <!-- Column 3: reversed, hidden on mobile -->
    <Marquee
      orientation="vertical"
      reverse
      :overlay="false"
      class="absolute left-[calc(50%_+_250px)] top-[calc(50%_-_850px)] hidden h-[1900px] w-[460px] [--duration:40s] [--gap:2rem] [transform:rotateX(55deg)_rotateZ(30deg)] [transform-style:preserve-3d] md:flex"
    >
      <template v-for="img in col3" :key="img.alt">
        <img :src="img.light" :alt="img.alt" width="460" height="258" loading="lazy" class="block dark:hidden aspect-video rounded-lg border border-border object-cover shadow-md">
        <img :src="img.dark" :alt="img.alt" width="460" height="258" loading="lazy" class="hidden dark:block aspect-video rounded-lg border border-border object-cover shadow-md">
      </template>
    </Marquee>
  </div>
</template>
