<script setup lang="ts">
import type { HighlightedToken } from "./highlighter"

defineProps<{
  token: HighlightedToken
}>()
</script>

<template>
  <span :style="token.htmlStyle" class="text-(--shiki-light) dark:text-(--shiki-dark)">{{ token.content }}</span>
</template>
