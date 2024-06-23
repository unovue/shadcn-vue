import { getParameters } from 'codesandbox/lib/api/define'
import sdk from '@stackblitz/sdk'
import { dependencies as deps } from '../../../package.json'
import { Index as demoIndex } from '../../../../www/__registry__'
// @ts-expect-error ?raw
import tailwindConfigRaw from '../../../tailwind.config?raw'
// @ts-expect-error ?raw
import cssRaw from '../../../../../packages/cli/test/fixtures/nuxt/assets/css/tailwind.css?raw'
import type { Style } from '@/lib/registry/styles'

export function makeCodeSandboxParams(componentName: string, style: Style, sources: Record<string, string>) {
  let files: Record<string, any> = {}
  files = constructFiles(componentName, style, sources)
  files['.codesandbox/Dockerfile'] = {
    content: 'FROM node:18',
  }
  return getParameters({ files, template: 'node' })
}

export function makeStackblitzParams(componentName: string, style: Style, sources: Record<string, string>) {
  const files: Record<string, string> = {}
  Object.entries(constructFiles(componentName, style, sources)).forEach(([k, v]) => (files[`${k}`] = typeof v.content === 'object' ? JSON.stringify(v.content, null, 2) : v.content))

  return sdk.openProject({
    title: `${componentName} - Radix Vue`,
    files,
    template: 'node',
  }, {
    newWindow: true,
    openFile: ['src/App.vue'],
  })
}

const viteConfig = {
  'vite.config.js': {
    content: `import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`,
    isBinary: false,
  },
  'index.html': {
    content: `<!DOCTYPE html>
    <html class="dark" lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue + TS</title>
      </head>
      <body>
        <div vaul-drawer-wrapper id="app"></div>
        <script type="module" src="/src/main.ts"></script>
      </body>
    </html>
    `,
    isBinary: false,
  },
}

function constructFiles(componentName: string, style: Style, sources: Record<string, string>) {
  const componentsJson = {
    style,
    tailwind: {
      config: 'tailwind.config.js',
      css: 'src/assets/index.css',
      baseColor: 'zinc',
      cssVariables: true,
    },
    aliases: {
      utils: '@/utils',
      components: '@/components',
    },
  }

  const iconPackage = style === 'default' ? 'lucide-vue-next' : '@radix-icons/vue'
  const dependencies = {
    'vue': 'latest',
    'radix-vue': deps['radix-vue'],
    '@radix-ui/colors': 'latest',
    'clsx': 'latest',
    'class-variance-authority': 'latest',
    'tailwind-merge': 'latest',
    'tailwindcss-animate': 'latest',
    [iconPackage]: 'latest',
    'shadcn-vue': 'latest',
    'typescript': 'latest',
    'vaul-vue': 'latest',
    'vue-sonner': 'latest',
    '@unovis/vue': 'latest',
    '@unovis/ts': 'latest',
  }

  const devDependencies = {
    'vite': 'latest',
    '@vitejs/plugin-vue': 'latest',
    'vue-tsc': 'latest',
    'tailwindcss': 'latest',
    'autoprefixer': 'latest',
  }

  // We have static replace here as this is only showing for code reproduction, doesn't need dynamic codeConfig
  const transformImportPath = (code: string) => {
    let parsed = code
    parsed = parsed.replaceAll(`@/lib/registry/${style}`, '@/components')
    parsed = parsed.replaceAll('@/lib/utils', '@/utils')
    return parsed
  }

  const componentFiles = Object.keys(sources).filter(key => key.endsWith('.vue') && key !== 'index.vue')
  const components: Record<string, any> = {}
  componentFiles.forEach((i) => {
    components[`src/${i}`] = {
      isBinary: false,
      content: transformImportPath(sources[i]),
    }
  })

  // @ts-expect-error componentName might not exist in Index
  const registryDependencies = demoIndex[style][componentName as any]?.registryDependencies?.filter(i => i !== 'utils')

  const files = {
    'package.json': {
      content: {
        name: `shadcn-vue-${componentName.toLowerCase().replace(/ /g, '-')}`,
        scripts: { start: `shadcn-vue add ${registryDependencies.join(' ')} -y && vite` },
        dependencies,
        devDependencies,
      },
      isBinary: false,
    },
    'components.json': {
      content: componentsJson,
      isBinary: false,
    },
    ...viteConfig,
    'tailwind.config.js': {
      content: tailwindConfigRaw,
      isBinary: false,
    },
    'tsconfig.json': {
      content: `{
"$schema": "https://json.schemastore.org/tsconfig",
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
}`,
      isBinary: false,
    },
    'src/utils.ts': {
      isBinary: false,
      content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    },
    'src/assets/index.css': {
      content: cssRaw,
      isBinary: false,
    },
    'src/main.ts': {
      content: `import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.css';
import './assets/index.css';

createApp(App).mount('#app')`,
      isBinary: false,
    },
    'src/App.vue': {
      isBinary: false,
      content: sources['index.vue'],
    },
    ...components,
    'src/assets/global.css': {
      content: `body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
  width: 100vw;
  height: 100vh;
  background-color: hsl(var(--background));
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "rlig" 1, "calt" 1;
} 

#app {
  @apply w-full flex items-center justify-center px-12;
}`,
      isBinary: false,
    },
  }

  return files
}
