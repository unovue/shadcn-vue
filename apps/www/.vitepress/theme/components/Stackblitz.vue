<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { makeStackblitzParams } from '../utils/codeeditor'
import Tooltip from './Tooltip.vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import { type Style } from '@/lib/registry/styles'

const props = defineProps<{
  name: string
  code: string
  newYorkCode: string
  style: Style
  extraFiles?: string[]
}>()

const sources = ref<Record<string, string>>({})

onMounted(() => {
  sources.value['App.vue'] = props.style === 'default' ? props.code : props.newYorkCode
  if (props.extraFiles) {
    props.extraFiles.forEach((file) => {
      import(`../../../src/lib/registry/${props.style}/example/${file}.vue?raw`).then((module) => {
        sources.value[`${file}.vue`] = module.default
      })
    })
  }
})

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
