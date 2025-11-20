<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useConfigStore } from '@/stores/config'
import { Index } from '../../../__registry__'
import Spinner from './Spinner.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  name: string
  typeName?: 'example' | 'block'
}>()
const { style } = useConfigStore()
const styleIndex = Index[style.value]

const componentRegistry = styleIndex[props.name]

const Component = defineAsyncComponent({
  loader: componentRegistry.component,
  timeout: 5000,
})
</script>

<template>
  <Suspense>
    <Component :is="Component" v-bind="$attrs" />

    <template #fallback>
      <div class="w-full flex items-center justify-center" :class="[typeName === 'block' ? 'h-screen' : '']">
        <Spinner />
      </div>
    </template>
  </Suspense>
</template>
