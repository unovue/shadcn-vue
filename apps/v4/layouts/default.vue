<script setup lang="ts">

</script>

<template>
  <div class="bg-background relative z-10 flex min-h-svh flex-col">
    <SiteHeader />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
