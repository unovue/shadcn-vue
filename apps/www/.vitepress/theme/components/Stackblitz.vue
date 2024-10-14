<script setup lang="ts">
import type { Style } from '@/lib/registry/styles'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Icon } from '@iconify/vue'
import { ref, toRefs, watch } from 'vue'
import { makeStackblitzParams } from '../utils/codeeditor'
import Tooltip from './Tooltip.vue'

const props = defineProps<{
  name: string
  code: string
  style: Style
}>()

const { code } = toRefs(props)
const sources = ref<Record<string, string>>({})

watch(code, () => {
  sources.value['App.vue'] = code.value
}, { immediate: true })

function handleClick() {
  makeStackblitzParams(props.name, props.style, sources.value)
}
</script>

<template>
  <div>
    <Tooltip :content="`Open ${name} in Stackblitz`">
      <Button :variant="'ghost'" :size="'icon'" @click="handleClick">
        <Icon icon="simple-icons:stackblitz" />
      </Button>
    </Tooltip>
  </div>
</template>
