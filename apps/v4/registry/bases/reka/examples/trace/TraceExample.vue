<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import TraceChainOfThought from "@/registry/bases/reka/examples/trace/TraceChainOfThought.vue"
import TraceChat from "@/registry/bases/reka/examples/trace/TraceChat.vue"
import TraceReasoning from "@/registry/bases/reka/examples/trace/TraceReasoning.vue"
import TraceRows from "@/registry/bases/reka/examples/trace/TraceRows.vue"
import TraceSources from "@/registry/bases/reka/examples/trace/TraceSources.vue"
import TraceTask from "@/registry/bases/reka/examples/trace/TraceTask.vue"
import TraceToolCalls from "@/registry/bases/reka/examples/trace/TraceToolCalls.vue"
import TraceTurn from "@/registry/bases/reka/examples/trace/TraceTurn.vue"
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
