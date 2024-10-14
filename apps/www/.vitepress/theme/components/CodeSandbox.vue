<script setup lang="ts">
import type { Style } from '@/lib/registry/styles'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Icon } from '@iconify/vue'
import { ref, toRefs, watch } from 'vue'
import { makeCodeSandboxParams } from '../utils/codeeditor'
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
