<script setup lang="ts">
import WrapBalancer from 'vue-wrap-balancer'
import { cn } from '@/lib/utils'
</script>

<template>
  <WrapBalancer :class="cn('max-w-[750px] text-center text-lg font-light text-foreground', $attrs.class ?? '')" :prefer-native="false">
    <slot />
  </WrapBalancer>
</template>
