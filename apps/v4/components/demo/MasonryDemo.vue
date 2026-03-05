<script setup lang="ts">
import { Card, CardContent } from '@/registry/new-york-v4/ui/card'
import { Masonry } from '@/registry/new-york-v4/ui/masonry'

const testimonials = [
  {
    name: 'Sofia Davis',
    role: 'Indie Hacker',
    avatar: '/avatars/01.png',
    quote: 'Took me less than 90 seconds to deploy an app with DB, KV, File storage and Caching, all on the edge with just a single command.',
  },
  {
    name: 'Marcus Chen',
    role: 'Core team Vue.js, Vite & Nuxt',
    avatar: '/avatars/02.png',
    quote: 'It\'s amazing to be able to run a single command and get an existing project deployed on edge within minutes! It felt like unlocking the missing infrastructure and UI for the developer experience.',
  },
  {
    name: 'Priya Nair',
    role: 'UX Developer',
    avatar: '/avatars/03.png',
    quote: 'Beautifully designed and incredibly easy to use. Our entire team was up and running in minutes.',
  },
  {
    name: 'James Okafor',
    role: 'Web Developer',
    avatar: '/avatars/04.png',
    quote: 'Accessibility baked in from the start. It just works and my users are happier for it.',
  },
  {
    name: 'Elena Vasquez',
    role: 'Founder',
    avatar: '/avatars/05.png',
    quote: 'The DX is joyous and far superior to any other platform I\'ve used. My team is able to iterate quickly and build beautiful, performant apps with ease.',
  },
  {
    name: 'Tom Nguyen',
    role: 'Software Engineer',
    avatar: '/avatars/shadcn.jpg',
    quote: 'I love the polish and the batteries-included approach. shadcn-vue takes web framework and hosting integration to a new level!',
  },
  {
    name: 'Aisha Patel',
    role: 'Senior Creative Technologist',
    avatar: '/avatars/01.png',
    quote: 'shadcn-vue is hands down the easiest way to get a project from zero to production.',
  },
  {
    name: 'Lucas Moreau',
    role: 'Lead Developer',
    avatar: '/avatars/02.png',
    quote: 'Migrating our hosting workflow not only took just a few minutes but saved us money. shadcn-vue provides an excellent management layer and we\'re super happy about the move!',
  },
  {
    name: 'Fayaz Ahmed',
    role: 'Full Stack Developer',
    avatar: '/avatars/03.png',
    quote: 'Just deployed my first site using shadcn-vue. Very sleek experience!',
  },
]
</script>

<template>
  <Masonry class="w-full">
    <Card v-for="t in testimonials" :key="t.name">
      <CardContent class="p-4">
        <p class="text-sm text-foreground">
          "{{ t.quote }}"
        </p>
        <div class="mt-3 flex items-center gap-2">
          <img
            :src="t.avatar"
            :alt="t.name"
            class="size-8 rounded-full"
          >
          <div>
            <p class="text-sm font-semibold leading-none">
              {{ t.name }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ t.role }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </Masonry>
</template>
