<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import TraceChainOfThought from "@/registry/bases/vase/examples/trace/TraceChainOfThought.vue"
import TraceChat from "@/registry/bases/vase/examples/trace/TraceChat.vue"
import TraceReasoning from "@/registry/bases/vase/examples/trace/TraceReasoning.vue"
import TraceRows from "@/registry/bases/vase/examples/trace/TraceRows.vue"
import TraceSources from "@/registry/bases/vase/examples/trace/TraceSources.vue"
import TraceTask from "@/registry/bases/vase/examples/trace/TraceTask.vue"
import TraceToolCalls from "@/registry/bases/vase/examples/trace/TraceToolCalls.vue"
import TraceTurn from "@/registry/bases/vase/examples/trace/TraceTurn.vue"
</script>

<template>
  <ExampleWrapper>
    <TraceChat />
    <TraceRows />
    <TraceToolCalls />
    <TraceReasoning />
    <TraceChainOfThought />
    <TraceTask />
    <TraceSources />
    <TraceTurn />
  </ExampleWrapper>
</template>
