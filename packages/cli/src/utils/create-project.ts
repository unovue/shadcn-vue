import type { z } from 'zod'
import type { initOptionsSchema } from '@/src/commands/init'
import fs from 'fs-extra'
import { detectPackageManager } from 'nypm'
import path from 'pathe'
import prompts from 'prompts'
import { x } from 'tinyexec'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { spinner } from '@/src/utils/spinner'

export const TEMPLATES = {
  'nuxt': 'nuxt',
  'vite': 'vite',
  'vite-router': 'vite-router',
} as const

export type TemplateType = keyof typeof TEMPLATES

export async function createProject(
  options: Pick<
    z.infer<typeof initOptionsSchema>,
    'cwd' | 'name' | 'force' | 'components' | 'template'
  >,
) {
  let template: TemplateType
    = options.template && TEMPLATES[options.template as TemplateType]
      ? (options.template as TemplateType)
      : 'nuxt'
  let projectName = options.name ?? 'my-vue-app'

  if (!options.force) {
    const { type, name } = await prompts([
      {
        type: options.template ? null : 'select',
        name: 'type',
        message: `The path ${highlighter.info(
          options.cwd,
        )} does not contain a package.json file.\n  Would you like to start a new project?`,
        choices: [
          { title: 'Nuxt', value: 'nuxt' },
          { title: 'Vite', value: 'vite' },
          { title: 'Vite + Vue Router', value: 'vite-router' },
        ],
        initial: 0,
      },
      {
        type: options.name ? null : 'text',
        name: 'name',
        message: 'What is your project named?',
        initial: projectName,
        format: (value: string) => value.trim(),
        validate: (value: string) =>
          value.length > 128
            ? `Name should be less than 128 characters.`
            : true,
      },
    ])

    template = type ?? template
    projectName = name ?? projectName
  }

  const packageManager = await detectPackageManager(options.cwd)

  const projectPath = `${options.cwd}/${projectName}`

  // Check if path is writable.
  try {
    await fs.access(options.cwd, fs.constants.W_OK)
  }
  catch {
    logger.break()
    logger.error(`The path ${highlighter.info(options.cwd)} is not writable.`)
    logger.error(
      `It is likely you do not have write permissions for this folder or the path ${highlighter.info(
        options.cwd,
      )} does not exist.`,
    )
    logger.break()
    process.exit(1)
  }

  if (fs.existsSync(path.resolve(options.cwd, projectName, 'package.json'))) {
    logger.break()
    logger.error(
      `A project with the name ${highlighter.info(projectName)} already exists.`,
    )
    logger.error(`Please choose a different name and try again.`)
    logger.break()
    process.exit(1)
  }

  if (template === TEMPLATES.nuxt) {
    await createNuxtProject(projectPath, {
      cwd: options.cwd,
      packageManager: packageManager?.name || 'npm',
    })
  }

  if (template === TEMPLATES.vite) {
    await createViteProject(projectPath, {
      cwd: options.cwd,
      packageManager: packageManager?.name || 'npm',
    })
  }

  if (template === TEMPLATES['vite-router']) {
    await createViteRouterProject(projectPath, {
      cwd: options.cwd,
      packageManager: packageManager?.name || 'npm',
    })
  }

  return {
    projectPath,
    projectName,
    template,
  }
}

async function createNuxtProject(
  projectPath: string,
  options: {
    cwd: string
    packageManager: string
  },
) {
  const createSpinner = spinner(
    `Creating a new Nuxt project. This may take a few minutes.`,
  ).start()

  try {
    // Use nuxi to create a new Nuxt project
    const args = [
      'nuxi@latest',
      'init',
      projectPath,
      '--packageManager',
      options.packageManager,
      '--no-install',
    ]

    await x('npx', args, {
      nodeOptions: {
        cwd: options.cwd,
      },
    })

    // Install dependencies
    await x(options.packageManager, ['install'], {
      nodeOptions: {
        cwd: projectPath,
      },
    })

    createSpinner?.succeed('Created a new Nuxt project.')
  }
  catch (error) {
    createSpinner?.fail('Something went wrong creating a new Nuxt project.')
    handleError(error)
  }
}

async function createViteProject(
  projectPath: string,
  options: {
    cwd: string
    packageManager: string
  },
) {
  const createSpinner = spinner(
    `Creating a new Vite + Vue project. This may take a few minutes.`,
  ).start()

  try {
    // Use create-vite to create a new Vue project
    const projectName = path.basename(projectPath)

    const args = [
      'create-vite@latest',
      projectName,
      '--template',
      'vue-ts',
    ]

    await x('npx', args, {
      nodeOptions: {
        cwd: options.cwd,
      },
    })

    // Install dependencies
    await x(options.packageManager, ['install'], {
      nodeOptions: {
        cwd: projectPath,
      },
    })

    createSpinner?.succeed('Created a new Vite + Vue project.')
  }
  catch (error) {
    createSpinner?.fail('Something went wrong creating a new Vite + Vue project.')
    handleError(error)
  }
}

async function createViteRouterProject(
  projectPath: string,
  options: {
    cwd: string
    packageManager: string
  },
) {
  const createSpinner = spinner(
    `Creating a new Vite + Vue Router project. This may take a few minutes.`,
  ).start()

  try {
    const projectName = path.basename(projectPath)

    // Create project directory
    await fs.ensureDir(projectPath)

    // Initialize package.json
    const packageJson = {
      name: projectName,
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vue-tsc -b && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        'vue': '^3.5.13',
        'vue-router': '^4.5.0',
      },
      devDependencies: {
        '@types/node': '^22.10.0',
        '@vitejs/plugin-vue': '^5.2.1',
        'typescript': '~5.7.2',
        'vite': '^6.0.0',
        'vue-tsc': '^2.2.0',
      },
    }

    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 })

    // Create vite.config.ts
    const viteConfig = `import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
`
    await fs.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfig)

    // Create tsconfig.json
    const tsConfig = {
      compilerOptions: {
        target: 'ES2022',
        useDefineForClassFields: true,
        module: 'ESNext',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'preserve',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        paths: {
          '@/*': ['./src/*'],
        },
      },
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      references: [{ path: './tsconfig.node.json' }],
    }
    await fs.writeJson(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 })

    // Create tsconfig.node.json
    const tsConfigNode = {
      compilerOptions: {
        target: 'ES2022',
        lib: ['ES2023'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['vite.config.ts'],
    }
    await fs.writeJson(path.join(projectPath, 'tsconfig.node.json'), tsConfigNode, { spaces: 2 })

    // Create directory structure
    await fs.ensureDir(path.join(projectPath, 'src'))
    await fs.ensureDir(path.join(projectPath, 'src/components'))
    await fs.ensureDir(path.join(projectPath, 'src/views'))
    await fs.ensureDir(path.join(projectPath, 'src/router'))

    // Create index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
    await fs.writeFile(path.join(projectPath, 'index.html'), indexHtml)

    // Create main.ts
    const mainTs = `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
`
    await fs.writeFile(path.join(projectPath, 'src/main.ts'), mainTs)

    // Create App.vue
    const appVue = `<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
`
    await fs.writeFile(path.join(projectPath, 'src/App.vue'), appVue)

    // Create router/index.ts
    const routerTs = `import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
`
    await fs.writeFile(path.join(projectPath, 'src/router/index.ts'), routerTs)

    // Create HomeView.vue
    const homeView = `<script setup lang="ts">
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <h1 class="text-4xl font-bold">Welcome to Vue + Vite</h1>
  </main>
</template>
`
    await fs.writeFile(path.join(projectPath, 'src/views/HomeView.vue'), homeView)

    // Create assets directory with empty CSS file
    await fs.ensureDir(path.join(projectPath, 'src/assets'))
    await fs.writeFile(path.join(projectPath, 'src/assets/index.css'), '')

    // Install dependencies
    await x(options.packageManager, ['install'], {
      nodeOptions: {
        cwd: projectPath,
      },
    })

    createSpinner?.succeed('Created a new Vite + Vue Router project.')
  }
  catch (error) {
    createSpinner?.fail('Something went wrong creating a new Vite + Vue Router project.')
    handleError(error)
  }
}
