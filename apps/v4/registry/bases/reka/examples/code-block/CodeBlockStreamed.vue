<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import { offsets, streamed, streamedLength, useStream } from "./data"
import StreamedBlock from "./StreamedBlock.vue"

const [position, replay] = useStream(streamedLength)
</script>

<template>
  <Example title="Streaming">
    <div class="flex flex-col gap-4">
      <template v-for="(block, index) in streamed" :key="block.code">
        <StreamedBlock
          v-if="position > offsets[index]!"
          :block="block"
          :code="block.code.slice(0, position - offsets[index]!)"
        />
      </template>
      <Button
        variant="outline"
        size="sm"
        class="self-start"
        :disabled="position < streamedLength"
        @click="replay"
      >
        Replay
      </Button>
    </div>
  </Example>
</template>
