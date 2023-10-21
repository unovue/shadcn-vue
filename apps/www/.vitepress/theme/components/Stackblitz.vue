<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { makeStackblitzParams } from '../utils/codeeditor'
import Tooltip from './Tooltip.vue'
import { type Style } from '@/lib/registry/styles'

const props = defineProps<{
  name: string
  code: string
  style: Style
}>()

const sources = ref<Record<string, string>>({})

onMounted(() => {
  sources.value['App.vue'] = props.code
})

function handleClick() {
  makeStackblitzParams(props.name, props.style, sources.value)
}
</script>

<template>
  <div>
    <Tooltip :content="`Open ${name} in Stackblitz`">
      <button @click="handleClick">
        <Icon icon="simple-icons:stackblitz" />
      </button>
    </Tooltip>
  </div>
</template>
