<script setup lang="ts">
import { cn } from '@/lib/utils'

// import WrapBalancer from 'vue-wrap-balancer'
</script>

<template>
  <section :class="cn('border-grid border-b', $attrs.class ?? '')">
    <div class="container-wrapper">
      <div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
        <slot />
      </div>
    </div>
  </section>
</template>
