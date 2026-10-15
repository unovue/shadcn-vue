<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CodeBlockDestructive from "./CodeBlockDestructive.vue"
import CodeBlockDiff from "./CodeBlockDiff.vue"
import CodeBlockDiffWrap from "./CodeBlockDiffWrap.vue"
import CodeBlockEmpty from "./CodeBlockEmpty.vue"
import CodeBlockHeaderEdges from "./CodeBlockHeaderEdges.vue"
import CodeBlockHeight from "./CodeBlockHeight.vue"
import CodeBlockHighlighted from "./CodeBlockHighlighted.vue"
import CodeBlockHighlightedLines from "./CodeBlockHighlightedLines.vue"
import CodeBlockInCard from "./CodeBlockInCard.vue"
import CodeBlockInMessage from "./CodeBlockInMessage.vue"
import CodeBlockLanguages from "./CodeBlockLanguages.vue"
import CodeBlockLineNumbers from "./CodeBlockLineNumbers.vue"
import CodeBlockMarkdown from "./CodeBlockMarkdown.vue"
import CodeBlockPlain from "./CodeBlockPlain.vue"
import CodeBlockRtl from "./CodeBlockRtl.vue"
import CodeBlockShowMore from "./CodeBlockShowMore.vue"
import CodeBlockShowMoreScroll from "./CodeBlockShowMoreScroll.vue"
import CodeBlockSmall from "./CodeBlockSmall.vue"
import CodeBlockSmallCombinations from "./CodeBlockSmallCombinations.vue"
import CodeBlockSmallDestructive from "./CodeBlockSmallDestructive.vue"
import CodeBlockSmallest from "./CodeBlockSmallest.vue"
import CodeBlockStartLine from "./CodeBlockStartLine.vue"
import CodeBlockStreamed from "./CodeBlockStreamed.vue"
import CodeBlockTabs from "./CodeBlockTabs.vue"
import CodeBlockTrace from "./CodeBlockTrace.vue"
import CodeBlockTypeset from "./CodeBlockTypeset.vue"
import CodeBlockWithActions from "./CodeBlockWithActions.vue"
import CodeBlockWithHeader from "./CodeBlockWithHeader.vue"
import CodeBlockWrap from "./CodeBlockWrap.vue"
import CodeBlockWrapLineNumbers from "./CodeBlockWrapLineNumbers.vue"
</script>

<template>
  <ExampleWrapper class="md:grid-cols-1">
    <CodeBlockPlain />
    <CodeBlockWrap />
    <CodeBlockLineNumbers />
    <CodeBlockWithHeader />
    <CodeBlockWithActions />
    <CodeBlockDestructive />
    <CodeBlockDiff />
    <CodeBlockHighlightedLines />
    <CodeBlockHeight />
    <CodeBlockShowMore />
    <CodeBlockShowMoreScroll />
    <CodeBlockHighlighted />
    <CodeBlockEmpty />
    <CodeBlockSmall />
    <CodeBlockSmallDestructive />
    <CodeBlockTrace />
    <CodeBlockTypeset />
    <CodeBlockWrapLineNumbers />
    <CodeBlockStartLine />
    <CodeBlockDiffWrap />
    <CodeBlockHeaderEdges />
    <CodeBlockSmallest />
    <CodeBlockSmallCombinations />
    <CodeBlockStreamed />
    <CodeBlockMarkdown />
    <CodeBlockLanguages />
    <CodeBlockInCard />
    <CodeBlockInMessage />
    <CodeBlockTabs />
    <CodeBlockRtl />
  </ExampleWrapper>
</template>
