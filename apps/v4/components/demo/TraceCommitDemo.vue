<script setup lang="ts">
import {
  ChevronRightIcon,
  FilePenIcon,
  FilePlusIcon,
  GitCommitHorizontalIcon,
} from '@lucide/vue'
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
} from '@/registry/bases/reka/ui/code-block'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/bases/reka/ui/sheet'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const files = [
  {
    path: 'pages/login.vue',
    added: false,
    additions: 2,
    deletions: 2,
    diff: `@@ -1,6 +1,6 @@
 <script setup lang="ts">
 const route = useRoute()
 const next = route.query.next as string | undefined
-const redirectTo =
-  next && next.startsWith('/') ? next : '/'
+const redirectTo = safeRedirect(next)
+
 <\/script>`,
  },
  {
    path: 'utils/redirect.ts',
    added: true,
    additions: 7,
    deletions: 0,
    diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith('/') || next.startsWith('//')) {
+    return '/'
+  }
+
+  return next
+}`,
  },
]

function diffLines(diff: string) {
  return diff.split('\n').map((line) => {
    if (line.startsWith('@@'))
      return { hunk: true, variant: 'default' as const, text: line }

    return {
      hunk: false,
      variant: line.startsWith('+')
        ? 'added' as const
        : line.startsWith('-')
          ? 'removed' as const
          : 'default' as const,
      text: line.slice(1),
    }
  })
}
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <GitCommitHorizontalIcon />
          </TraceIcon>
          <TraceTitle>Committed a1b2c3: Fix the login redirect</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <Sheet v-for="file in files" :key="file.path">
            <SheetTrigger as-child>
              <button type="button">
                <TraceLine>
                  <TraceIcon>
                    <FilePlusIcon v-if="file.added" />
                    <FilePenIcon v-else />
                  </TraceIcon>
                  <TraceTitle>
                    {{ file.added ? 'Added' : 'Edited' }} {{ file.path }}
                  </TraceTitle>
                  <TraceDescription class="font-mono">
                    +{{ file.additions }} −{{ file.deletions }}
                  </TraceDescription>
                  <TraceIcon>
                    <ChevronRightIcon />
                  </TraceIcon>
                </TraceLine>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle class="font-mono">
                  {{ file.path }}
                </SheetTitle>
                <SheetDescription>
                  {{ file.additions }} additions, {{ file.deletions }} deletions
                </SheetDescription>
              </SheetHeader>
              <CodeBlock class="mx-6 mb-6 w-auto">
                <CodeBlockContent>
                  <CodeBlockLine
                    v-for="(line, index) in diffLines(file.diff)"
                    :key="index"
                    :variant="line.variant"
                    :class="line.hunk ? 'text-muted-foreground' : undefined"
                  >
                    {{ line.text }}
                  </CodeBlockLine>
                </CodeBlockContent>
              </CodeBlock>
            </SheetContent>
          </Sheet>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
