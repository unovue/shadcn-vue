<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { makeCodeSandboxParams } from '../utils/codeeditor'
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
</script>

<template>
  <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
    <input type="hidden" name="query" value="file=src/App.vue">
    <input type="hidden" name="environment" value="server">
    <input type="hidden" name="hidedevtools" value="1">
    <input type="hidden" name="parameters" :value="makeCodeSandboxParams(name, style, sources)">

    <Tooltip :content="`Open ${name} in CodeSandbox`">
      <Button :variant="'ghost'" :size="'icon'" type="submit">
        <Icon icon="ph-codesandbox-logo" />
      </Button>
    </Tooltip>
  </form>
</template>
