<script setup lang="ts">
import { Marquee } from '@/registry/new-york-v4/ui/marquee'

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: 'I\'ve never seen anything like this before. It\'s amazing. I love it.',
    img: '/avatars/01.png',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: 'I don\'t know what to say. I\'m speechless. This is amazing.',
    img: '/avatars/02.png',
  },
  {
    name: 'John',
    username: '@john',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: '/avatars/03.png',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: 'Absolutely fantastic! The best thing I have seen in a while.',
    img: '/avatars/04.png',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: 'Great work! Keep it up. This is truly remarkable.',
    img: '/avatars/05.png',
  },
  {
    name: 'James',
    username: '@james',
    body: 'This changed the way I think about UI components.',
    img: '/avatars/shadcn.jpg',
  },
]
</script>

<template>
  <Marquee pause-on-hover class="[--duration:20s]">
    <div
      v-for="review in reviews"
      :key="review.username"
      class="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-border bg-background p-4 shadow-sm"
    >
      <div class="flex items-center gap-2">
        <img
          :src="review.img"
          :alt="review.name"
          class="size-8 rounded-full"
        >
        <div>
          <p class="text-sm font-semibold leading-none">
            {{ review.name }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ review.username }}
          </p>
        </div>
      </div>
      <p class="mt-2 text-sm">
        {{ review.body }}
      </p>
    </div>
  </Marquee>
</template>
