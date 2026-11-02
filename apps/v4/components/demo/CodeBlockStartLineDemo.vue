<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from '@/registry/bases/reka/ui/code-block'

const code = `  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return projects
})`

const lines = useHighlightedCode(code, 'ts')
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>server/api/projects.get.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent line-numbers :start-line="995">
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
