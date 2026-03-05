<script setup lang="ts">
import { Marquee } from '@/registry/new-york-v4/ui/marquee'

const testimonials = [
  {
    name: 'Sofia Davis',
    username: '@sofia_d',
    avatar: '/avatars/01.png',
    quote: 'The component library has transformed our development workflow. Building UIs has never been faster.',
  },
  {
    name: 'Marcus Chen',
    username: '@mchen_dev',
    avatar: '/avatars/02.png',
    quote: 'Beautifully designed and incredibly easy to use. Our entire team was up and running in minutes.',
  },
  {
    name: 'Priya Nair',
    username: '@priyanair',
    avatar: '/avatars/03.png',
    quote: 'I\'ve tried many component libraries but this one strikes the perfect balance of flexibility and convention.',
  },
  {
    name: 'James Okafor',
    username: '@jokafor',
    avatar: '/avatars/04.png',
    quote: 'Accessibility baked in from the start. It just works and my users are happier for it.',
  },
  {
    name: 'Elena Vasquez',
    username: '@evasquez',
    avatar: '/avatars/05.png',
    quote: 'The dark mode support is flawless. Saved us days of work on our design system.',
  },
  {
    name: 'Tom Nguyen',
    username: '@tomn',
    avatar: '/avatars/shadcn.jpg',
    quote: 'Shadcn-vue is the best thing that happened to my Vue projects. The quality is outstanding.',
  },
  {
    name: 'Aisha Patel',
    username: '@aishap',
    avatar: '/avatars/01.png',
    quote: 'Copy-paste components that actually make sense. My codebase has never looked this clean.',
  },
  {
    name: 'Lucas Moreau',
    username: '@lmoreau',
    avatar: '/avatars/02.png',
    quote: 'Tailwind integration is seamless. I can customise every component to match our brand instantly.',
  },
]

const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))
</script>

<template>
  <div class="flex flex-col gap-4 overflow-hidden">
    <Marquee pause-on-hover :overlay="false" class="[--duration:35s] [--gap:1rem]">
      <div
        v-for="t in firstRow"
        :key="t.username"
        class="w-72 shrink-0 rounded-xl border border-border bg-background p-4 shadow-sm"
      >
        <p class="line-clamp-3 text-sm text-foreground">
          "{{ t.quote }}"
        </p>
        <div class="mt-3 flex items-center gap-2">
          <img
            :src="t.avatar"
            :alt="t.name"
            class="size-7 rounded-full"
          >
          <div>
            <p class="text-xs font-semibold leading-none">
              {{ t.name }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ t.username }}
            </p>
          </div>
        </div>
      </div>
    </Marquee>

    <Marquee reverse pause-on-hover :overlay="false" class="[--duration:35s] [--gap:1rem]">
      <div
        v-for="t in secondRow"
        :key="t.username"
        class="w-72 shrink-0 rounded-xl border border-border bg-background p-4 shadow-sm"
      >
        <p class="line-clamp-3 text-sm text-foreground">
          "{{ t.quote }}"
        </p>
        <div class="mt-3 flex items-center gap-2">
          <img
            :src="t.avatar"
            :alt="t.name"
            class="size-7 rounded-full"
          >
          <div>
            <p class="text-xs font-semibold leading-none">
              {{ t.name }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ t.username }}
            </p>
          </div>
        </div>
      </div>
    </Marquee>
  </div>
</template>
