<script setup lang="ts">
import type {
  BaseColor,
} from '@/registry/registry-base-colors'
import { IconCopy } from '@tabler/icons-vue'
import { useClipboard } from '@vueuse/core'
import { CheckIcon } from 'lucide-vue-next'
import { Icons } from '@/components/Icons'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'
import {
  baseColors,
  baseColorsOKLCH,
} from '@/registry/registry-base-colors'

interface BaseColorOKLCH {
  light: Record<string, string>
  dark: Record<string, string>
}

const props = defineProps<{
  themeName: string
}>()

const tailwindVersion = ref('v4')
const activeTheme = computed(() => baseColors.find(theme => theme.name === props.themeName))
const activeThemeOKLCH = computed(() => baseColorsOKLCH[props.themeName as keyof typeof baseColorsOKLCH])

const { copy, copied } = useClipboard()

function getThemeCodeOKLCH(theme: BaseColorOKLCH | undefined, radius: number) {
  if (!theme) {
    return ''
  }

  const rootSection
    = `:root {\n  --radius: ${
      radius
    }rem;\n${
      Object.entries(theme.light)
        .map(entry => `  --${entry[0]}: ${entry[1]};`)
        .join('\n')
    }\n}\n\n.dark {\n${
      Object.entries(theme.dark)
        .map(entry => `  --${entry[0]}: ${entry[1]};`)
        .join('\n')
    }\n}\n`

  return rootSection
}

function getThemeCodeHSLV4(theme: BaseColor | undefined, radius: number) {
  if (!theme) {
    return ''
  }

  const rootSection
    = `:root {\n  --radius: ${
      radius
    }rem;\n${
      Object.entries(theme.cssVars.light)
        .map(entry => `  --${entry[0]}: hsl(${entry[1]});`)
        .join('\n')
    }\n}\n\n.dark {\n${
      Object.entries(theme.cssVars.dark)
        .map(entry => `  --${entry[0]}: hsl(${entry[1]});`)
        .join('\n')
    }\n}\n`

  return rootSection
}

function template(base: string, data: Record<string, any>) {
  return base.replace(/<%-(.*?)%>/g, (match, path) => {
    return path.trim().split(/[.[\]"']/).filter(Boolean).reduce((obj: any, key: any) => obj?.[key], data) ?? ''
  })
};

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}
`

function getThemeCode(theme: BaseColor | undefined, radius: number) {
  if (!theme) {
    return ''
  }

  return template(BASE_STYLES_WITH_VARIABLES, {
    colors: theme.cssVars,
    radius: radius.toString(),
  })
}
</script>

<template>
  <Tabs
    v-model="tailwindVersion"
    class="min-w-0 px-4 pb-4 md:p-0"
  >
    <TabsList>
      <TabsTrigger value="v4-oklch">
        OKLCH
      </TabsTrigger>
      <TabsTrigger value="v4-hsl">
        HSL
      </TabsTrigger>
      <TabsTrigger value="v3">
        Tailwind v3
      </TabsTrigger>
    </TabsList>
    <TabsContent value="v4-oklch">
      <figure
        data-pretty-code-figure
        class="!mx-0 mt-0 rounded-lg"
      >
        <figcaption
          class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-pretty-code-title=""
          data-language="css"
          data-theme="github-dark github-light-default"
        >
          <Icons.css class="fill-foreground" />
          app/assets/css/tailwind.css
        </figcaption>
        <pre class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 md:max-h-[450px]"><code data-line-numbers data-language="css">
            <span data-line class="line text-code-foreground">&nbsp;:root &#123;</span>
            <span data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--radius: 0.65rem;</span>
            <span v-for="([key, value]) of Object.entries(activeThemeOKLCH.light)" :key="key" data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{{ key }}: <ColorIndicator :color="value" /> {{ value }};</span>
            <span data-line class="line text-code-foreground">&nbsp;&#125;</span>
            <span data-line class="line text-code-foreground">&nbsp;</span>
            <span data-line class="line text-code-foreground">&nbsp;.dark &#123;</span>
            <span v-for="([key, value]) of Object.entries(activeThemeOKLCH.dark)" :key="key" data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{{ key }}: <ColorIndicator :color="value" /> {{ value }};</span>
            <span data-line class="line text-code-foreground">&nbsp;&#125;</span>
          </code><Button
            data-slot="copy-button"
            size="icon"
            variant="ghost"
            class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
            @click="() => {
            copy(tailwindVersion === 'v3'
              ? getThemeCode(activeTheme, 0.65)
              : getThemeCodeOKLCH(activeThemeOKLCH, 0.65))
            }"
          >
          <span class="sr-only">Copy</span>
          <CheckIcon v-if="copied" />  <IconCopy v-else />
        </Button></pre>
      </figure>
    </TabsContent>

    <TabsContent value="v4-hsl">
      <figure
        data-pretty-code-figure
        class="!mx-0 mt-0 rounded-lg"
      >
        <figcaption
          class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-pretty-code-title=""
          data-language="css"
          data-theme="github-dark github-light-default"
        >
          <Icons.css class="fill-foreground" />
          app/assets/css/tailwind.css
        </figcaption>
        <pre class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 md:max-h-[450px]"><code data-line-numbers data-language="css">
            <span data-line class="line text-code-foreground">&nbsp;:root &#123;</span>
            <span data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--radius: 0.65rem;</span>
            <span v-for="([key, value]) of Object.entries(activeTheme?.cssVars.light || {})" :key="key" data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{{ key }}: <ColorIndicator :color="`hsl(${value})`" /> hsl({{ value }});</span>
            <span data-line class="line text-code-foreground">&nbsp;&#125;</span>
            <span data-line class="line text-code-foreground">&nbsp;</span>
            <span data-line class="line text-code-foreground">&nbsp;.dark &#123;</span>
            <span v-for="([key, value]) of Object.entries(activeTheme?.cssVars.dark || {})" :key="key" data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{{ key }}: <ColorIndicator :color="`hsl(${value})`" /> hsl({{ value }});</span>
            <span data-line class="line text-code-foreground">&nbsp;&#125;</span>
          </code><Button
            data-slot="copy-button"
            size="icon"
            variant="ghost"
            class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
            @click="() => {
            copy(getThemeCodeHSLV4(activeTheme, 0.65))
            }"
          >
          <span class="sr-only">Copy</span>
          <CheckIcon v-if="copied" />  <IconCopy v-else />
        </Button></pre>
      </figure>
    </TabsContent>
    <TabsContent value="v3">
      <figure
        data-pretty-code-figure
        class="!mx-0 mt-0 rounded-lg"
      >
        <figcaption
          class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-pretty-code-title=""
          data-language="css"
          data-theme="github-dark github-light-default"
        >
          <Icons.css class="fill-foreground" />
          app/assets/css/tailwind.css
        </figcaption>
        <pre class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 md:max-h-[450px]"><code data-line-numbers data-language="css">
          <span data-line class="line">@layer base &#123;</span>
          <span data-line class="line">&nbsp;&nbsp;:root &#123;</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--background: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light.background})`" /> {{ activeTheme?.cssVars.light.background }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--foreground: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light.foreground})`" /> {{ activeTheme?.cssVars.light.foreground }};</span>
          <template v-for="prefix in ['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive']" :key="prefix">
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light[prefix as keyof typeof activeTheme.cssVars.light]})`" /> {{ activeTheme?.cssVars.light[ prefix as keyof typeof activeTheme.cssVars.light ] }};</span>
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}-foreground: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light[`${prefix}-foreground` as keyof typeof activeTheme.cssVars.light]})`" /> {{ activeTheme?.cssVars.light[ `${prefix}-foreground` as keyof typeof activeTheme.cssVars.light ] }};</span>
          </template>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--border: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light.border})`" /> {{ activeTheme?.cssVars.light.border }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--input: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light.input})`" /> {{ activeTheme?.cssVars.light.input }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--ring: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light.ring})`" /> {{ activeTheme?.cssVars.light.ring }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--radius: 0.5rem;</span>
          <template v-for="prefix in ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']" :key="prefix">
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.light[prefix as keyof typeof activeTheme.cssVars.light]})`" /> {{ activeTheme?.cssVars.light[ prefix as keyof typeof activeTheme.cssVars.light ] }};</span>
          </template>

          <span data-line class="line">&nbsp;&nbsp;&#125;</span>
          <span data-line class="line">&nbsp;</span>
          <span data-line class="line">&nbsp;&nbsp;.dark &#123;</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--background: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark.background})`" /> {{ activeTheme?.cssVars.dark.background }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--foreground: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark.foreground})`" /> {{ activeTheme?.cssVars.dark.foreground }};</span>

          <template v-for="prefix in ['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive']" :key="prefix">
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark[prefix as keyof typeof activeTheme.cssVars.dark]})`" /> {{ activeTheme?.cssVars.dark[prefix as keyof typeof activeTheme.cssVars.dark] }};</span>
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}-foreground: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark[`${prefix}-foreground` as keyof typeof activeTheme.cssVars.dark]})`" /> {{ activeTheme?.cssVars.dark[ `${prefix}-foreground` as keyof typeof activeTheme.cssVars.dark ] }};</span>
          </template>

          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--border: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark.border})`" /> {{ activeTheme?.cssVars.dark.border }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--input: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark.input})`" /> {{ activeTheme?.cssVars.dark.input }};</span>
          <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--ring: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark.ring})`" /> {{ activeTheme?.cssVars.dark.ring }};</span>

          <template v-for="prefix in ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']" :key="prefix">
            <span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--{{ prefix }}: <ColorIndicator :color="`hsl(${activeTheme?.cssVars.dark[prefix as keyof typeof activeTheme.cssVars.dark]})`" /> {{ activeTheme?.cssVars.dark[ prefix as keyof typeof activeTheme.cssVars.dark ] }};</span>
          </template>

          <span data-line class="line">&nbsp;&nbsp;&#125;</span>
          <span data-line class="line">&#125;</span>
    </code><Button
              data-slot="copy-button"
              size="icon"
              variant="ghost"
              class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
            @click="() => {
copy(tailwindVersion === 'v3'
    ? getThemeCode(activeTheme, 0.65)
    : getThemeCodeOKLCH(activeThemeOKLCH, 0.65))
              }"
            >
              <span class="sr-only">Copy</span>
              <CheckIcon v-if="copied" />  <IconCopy v-else />
            </Button></pre>
      </figure>
    </TabsContent>
  </Tabs>
</template>
