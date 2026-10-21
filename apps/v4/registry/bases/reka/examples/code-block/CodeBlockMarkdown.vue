<script setup lang="ts">
import { Markdown } from "@comark/vue"
import { computed, h, provide } from "vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import { answer, markdownStreamKey, useStream } from "./data"
import MarkdownCode from "./MarkdownCode.vue"

const [position, replay] = useStream(answer.length)

const text = computed(() => answer.slice(0, position.value))
const streaming = computed(() => position.value < answer.length)

provide(markdownStreamKey, { text, streaming })

const markdownComponents = {
  pre: MarkdownCode,
  code: (_: unknown, { slots }: { slots: { default?: () => unknown } }) =>
    h("code", { class: "rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]" }, slots.default?.() as never),
}
</script>

<template>
  <Example title="Markdown">
    <div class="flex flex-col gap-4 text-sm">
      <Suspense>
        <Markdown
          class="typeset"
          :value="text"
          :components="markdownComponents"
          :streaming="streaming"
        />
      </Suspense>
      <Button
        variant="outline"
        size="sm"
        class="self-start"
        :disabled="streaming"
        @click="replay"
      >
        Replay
      </Button>
    </div>
  </Example>
</template>
