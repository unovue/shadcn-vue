<script setup lang="ts">
import { cn } from '@/lib/utils'

// import WrapBalancer from 'vue-wrap-balancer'
</script>

<template>
  <section
    :class="cn(
      'mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </section>
</template>
