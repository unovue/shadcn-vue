<script setup lang="ts">
import type { TemplateValue } from '@/lib/templates'
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { siteConfig } from '@/lib/config'
import { PACKAGE_MANAGERS, TEMPLATES } from '@/lib/templates'
import {
  getCommandForPackageManager,
  getFontsourceCommand,
  getFontsourceCss,
  getFontVariablesCss,
  getNuxtFontCode,
} from '@/lib/typeset/code'
import { findTypesetFont } from '@/lib/typeset/fonts'
import { TYPESET_MEASURES } from '@/lib/typeset/params'
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/styles/reka-nova/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/styles/reka-nova/ui/tabs'

const params = useTypesetSearchParams()
const { config } = useConfig()

const framework = ref<TemplateValue>('nuxt')
const isNuxt = computed(() => framework.value === 'nuxt')

const importSnippet = '@import "tailwindcss";\n@import "./typeset.css";'

// Served straight from public/ so the copy is always the current stylesheet,
// byte for byte what the docs tell people to save.
const { data: rawCss } = await useFetch<string>('/typeset.css', {
  responseType: 'text',
  server: false,
})

const pickedFonts = computed(() => {
  const ids = [params.body.value, params.heading.value, params.mono.value]
  return [...new Set(ids)]
    .map(id => findTypesetFont(id))
    .filter(font => font !== undefined)
})

const measureWidth = computed(
  () => TYPESET_MEASURES.find(option => option.value === params.measure.value)?.width,
)

const presetName = computed(() => `typeset-${params.item.value}`)

const presetCss = computed(() => {
  const headingId = params.heading.value === 'inherit' ? params.body.value : params.heading.value
  const bodyVar = findTypesetFont(params.body.value)?.cssVar
  const headingVar = findTypesetFont(headingId)?.cssVar
  const monoVar = findTypesetFont(params.mono.value)?.cssVar

  return `.${presetName.value} {
  --typeset-font-body: var(${bodyVar});
  --typeset-font-heading: var(${headingVar});
  --typeset-font-mono: var(${monoVar});
  --typeset-size: ${params.scale.value}px;
  --typeset-leading: ${params.leading.value};
  --typeset-flow: ${params.flow.value};
}`
})

const preset = computed(() => `/* main.css */
@import "tailwindcss";
@import "./typeset.css";

${presetCss.value}`)

const usage = computed(() => `<div class="typeset ${presetName.value} max-w-[${measureWidth.value}]">
  <!-- rendered markdown -->
</div>`)

const fontsourceCommand = computed(() => getFontsourceCommand(pickedFonts.value))
const resolvedFontsourceCommand = computed(() =>
  getCommandForPackageManager(config.value.packageManager, fontsourceCommand.value),
)
const fontsourceCss = computed(() => getFontsourceCss(pickedFonts.value))
const nuxtFontCode = computed(() => getNuxtFontCode(pickedFonts.value))
const fontVariablesCss = computed(() => getFontVariablesCss(pickedFonts.value))

const prompt = computed(() => {
  const fontStep = isNuxt.value
    ? `Register the fonts with @nuxt/fonts:

${nuxtFontCode.value}

Then declare the CSS variables in the main CSS file:

${fontVariablesCss.value}`
    : `Install the fonts:

${resolvedFontsourceCommand.value}

Then import them in the main CSS file:

${fontsourceCss.value}`

  return `Install shadcn/typeset in this project.

Typeset is a single stylesheet that styles rendered markdown: wrap the output in a \`typeset\` container and everything inside (headings, lists, tables, code, blockquotes, math) is styled. Everything outside is untouched.

1. Download ${siteConfig.url}/typeset.css and save it as typeset.css next to the project's main CSS file (where Tailwind is imported). If the file already exists, replace it with the downloaded copy.

2. Import it in the main CSS file, after the Tailwind import:

@import "./typeset.css";

3. ${fontStep}

4. Add this preset to the main CSS file, after the typeset import. If a class named .${presetName.value} already exists, update its values in place. Leave any other typeset-* presets untouched: they are separate surfaces:

${presetCss.value}

5. Do not apply the class anywhere yet. Search the project for surfaces that render markdown or rich content: Nuxt Content's ContentRenderer, markdown-it or marked output bound with v-html, MDC components, prose classes, CMS content renderers. Present the candidates you find as a short list and ask the user which surface should use typeset. Then wrap only the surface they pick:

${usage.value}

If the picked surface already has its own typography (a prose class, styled markdown components), list those styles and let the user decide what to remove before wrapping.

Notes:

- To exclude an embedded component from typeset styles, add the not-typeset class or the data-not-typeset attribute to it.
- Verify on the surface the user picked: headings, lists, tables, and code inside the container should be styled with no classes on the content itself.
- Docs: ${siteConfig.url}/docs/typeset`
})

const { copy: copyCss, copied: copiedCss } = useClipboard({ copiedDuring: 2000 })
const { copy: copyPrompt, copied: copiedPrompt } = useClipboard({ copiedDuring: 2000 })
</script>

<template>
  <Tabs default-value="docs" class="flex min-h-0 flex-1 flex-col gap-0">
    <div class="flex items-center justify-between gap-2 border-b px-4 py-3">
      <TabsList>
        <TabsTrigger value="docs">
          Docs
        </TabsTrigger>
        <TabsTrigger value="prompt">
          Prompt
        </TabsTrigger>
      </TabsList>
      <Select v-model="framework">
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem v-for="template in TEMPLATES" :key="template.value" :value="template.value">
              {{ template.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="min-h-0 flex-1 scroll-fade scrollbar-none overflow-y-auto p-4 md:p-6">
      <TabsContent value="docs" class="flex flex-col gap-6">
        <section class="flex flex-col gap-2.5">
          <h3 class="text-sm font-medium">
            1. Create typeset.css
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Copy the stylesheet into a <code class="font-mono">typeset.css</code> file next to your
            main CSS file, then import it:
          </p>
          <Button
            variant="outline"
            size="sm"
            class="w-fit"
            :disabled="!rawCss"
            @click="rawCss && copyCss(rawCss)"
          >
            <CheckIcon v-if="copiedCss" data-icon="inline-start" />
            <CopyIcon v-else data-icon="inline-start" />
            Copy typeset.css
          </Button>
          <TypesetDocsCode :code="importSnippet" />
        </section>
        <section class="flex flex-col gap-2.5">
          <h3 class="text-sm font-medium">
            2. Add the fonts
          </h3>
          <template v-if="isNuxt">
            <p class="text-sm leading-relaxed text-muted-foreground">
              Register the families with <code class="font-mono">@nuxt/fonts</code>:
            </p>
            <TypesetDocsCode :code="nuxtFontCode" />
            <p class="text-sm leading-relaxed text-muted-foreground">
              Then declare the variables in your CSS file:
            </p>
            <TypesetDocsCode :code="fontVariablesCss" />
          </template>
          <template v-else>
            <div class="rounded-lg bg-muted/60">
              <div class="flex items-center gap-3 px-3 pt-2">
                <button
                  v-for="pm in PACKAGE_MANAGERS"
                  :key="pm.value"
                  type="button"
                  :data-active="pm.value === config.packageManager"
                  class="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
                  @click="config.packageManager = pm.value"
                >
                  {{ pm.label }}
                </button>
              </div>
              <pre class="scrollbar-none overflow-x-auto p-3 font-mono text-xs leading-relaxed">{{ resolvedFontsourceCommand }}</pre>
            </div>
            <p class="text-sm leading-relaxed text-muted-foreground">
              Then import them in your CSS file:
            </p>
            <TypesetDocsCode :code="fontsourceCss" />
          </template>
        </section>
        <section class="flex flex-col gap-2.5">
          <h3 class="text-sm font-medium">
            3. Create your custom typeset
          </h3>
          <TypesetDocsCode :code="preset" />
        </section>
        <section class="flex flex-col gap-2.5">
          <h3 class="text-sm font-medium">
            4. Wrap your content
          </h3>
          <TypesetDocsCode :code="usage" />
        </section>
      </TabsContent>
      <TabsContent value="prompt" class="flex flex-col gap-2.5">
        <p class="text-sm leading-relaxed text-muted-foreground">
          One prompt with your picks baked in. Copy it and paste it into your coding agent.
        </p>
        <TypesetDocsCode :code="prompt" class="max-h-102 scroll-fade overflow-y-auto whitespace-pre-wrap" />
        <Button variant="outline" size="sm" class="w-fit" @click="copyPrompt(prompt)">
          <CheckIcon v-if="copiedPrompt" data-icon="inline-start" />
          <CopyIcon v-else data-icon="inline-start" />
          Copy Prompt
        </Button>
      </TabsContent>
    </div>
  </Tabs>
</template>
