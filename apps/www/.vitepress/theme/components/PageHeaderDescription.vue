<script setup lang="ts">
import { cn } from '@/lib/utils'
import WrapBalancer from 'vue-wrap-balancer'
</script>

<template>
  <WrapBalancer :class="cn('max-w-[750px] text-center text-lg font-light text-foreground', $attrs.class ?? '')" :prefer-native="false">
    <slot />
  </WrapBalancer>
</template>
