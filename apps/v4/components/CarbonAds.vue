<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const { path } = toRefs(useRoute())
const carbonOptions = {
  code: 'CW7DK27U',
  placement: 'wwwshadcn-vuecom',
}
const container = ref()

let isInitialized = false

function init() {
  if (!isInitialized) {
    isInitialized = true
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.id = '_carbonads_js'
    s.src = `//cdn.carbonads.com/carbon.js?serve=${carbonOptions.code}&placement=${carbonOptions.placement}&format=cover`
    s.async = true
    container.value.appendChild(s)
  }
}

watch(path, () => {
  if (isInitialized) {
    ;(window as any)._carbonads?.refresh()
  }
})

// no need to account for option changes during dev, we can just
// refresh the page
if (carbonOptions) {
  onMounted(() => {
    if (import.meta.env.DEV)
      return

    // if the page is loaded when aside is active, load carbon directly.
    // otherwise, only load it if the page resizes to wide enough. this avoids
    // loading carbon at all on mobile where it's never shown
    init()
  })
}
</script>

<template>
  <div ref="container" />
</template>

<style>
@reference "../assets/css/main.css";

#carbon-responsive {
  @apply !w-[238px];
}

.carbon-responsive-wrap {
	@apply !bg-muted/50 !border-0 !p-6 !rounded-lg !flex !flex-col !items-center;
}

.carbon-responsive-wrap .carbon-img {
	@apply !flex-none !rounded !overflow-hidden;
}

.carbon-responsive-wrap .carbon-text {
  @apply !text-muted-foreground !text-sm !flex-none !font-sans;
}

#carbonads .carbon-poweredby {
	@apply !bg-background !text-muted-foreground !block !text-right !text-[10px] !uppercase !no-underline;
}
</style>
