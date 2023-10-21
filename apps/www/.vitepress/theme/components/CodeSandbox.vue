<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { makeCodeSandboxParams } from '../utils/codeeditor'
import Tooltip from './Tooltip.vue'

const props = defineProps<{
  name: string
}>()

const sources = ref<Record<string, string>>({})

onMounted(() => {
  // props.files?.forEach((file) => {
  //   if (file.endsWith('.vue')) {
  //     import(`../components/demo/${props.name}/${file.replace('.vue', '')}.vue?raw`).then(
  //       res => (sources.value[file] = res.default),
  //     )
  //   }
  //   else if (file.endsWith('.js')) {
  //     import(`../components/demo/${props.name}/${file.replace('.js', '')}.js?raw`).then(
  //       res => (sources.value[file] = res.default),
  //     )
  //   }
  // })
})
</script>

<template>
  <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
    <input type="hidden" name="query" value="file=src/App.vue">
    <input type="hidden" name="environment" value="server">
    <input type="hidden" name="hidedevtools" value="1">
    <input type="hidden" name="parameters" :value="makeCodeSandboxParams(name, sources)">

    <Tooltip :content="`Open ${name} in CodeSandbox`">
      <button type="submit">
        <Icon icon="ph-codesandbox-logo" />
      </button>
    </Tooltip>
  </form>
</template>
