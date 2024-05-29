<script setup lang="ts">
import { Paintbrush } from 'lucide-vue-next'
import { onMounted, watch } from 'vue'
import { allColors } from './theming/utils/data'
import ThemeCustomizer from './ThemeCustomizer.vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { useConfigStore } from '@/stores/config'

const { theme, radius } = useConfigStore()

// Whenever the component is mounted, update the document class list
onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
  document.documentElement.classList.add(`theme-${theme.value}`)
})

// Whenever the theme value changes, update the document class list
watch(theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map(color => `theme-${color}`),
  )
  document.documentElement.classList.add(`theme-${theme}`)
})

// Whenever the radius value changes, update the document style
watch(radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`)
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        class="size-9"
        :variant="'ghost'"
        :size="'icon'"
      >
        <Paintbrush class="size-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent :side-offset="8" align="end" class="w-96">
      <ThemeCustomizer :all-colors="allColors" />
    </PopoverContent>
  </Popover>
</template>
