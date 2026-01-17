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
  nuxt: 'nuxt',
  vite: 'vite',
  start: 'start',
} as const

export type TemplateType = keyof typeof TEMPLATES

export async function createProject(
  options: Pick<
    z.infer<typeof initOptionsSchema>,
    'cwd' | 'force' | 'components' | 'template'
  >,
) {
  let template: TemplateType
    = options.template && TEMPLATES[options.template as TemplateType]
      ? (options.template as TemplateType)
      : 'nuxt'
  let projectName = 'my-vue-app'

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
          { title: 'TanStack Start', value: 'start' },
        ],
        initial: 0,
      },
      {
        type: 'text',
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
    projectName = name
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

  if (template === TEMPLATES.start) {
    await createTanStackStartProject(projectPath, {
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

async function createTanStackStartProject(
  projectPath: string,
  options: {
    cwd: string
    packageManager: string
  },
) {
  const createSpinner = spinner(
    `Creating a new TanStack Start project. This may take a few minutes.`,
  ).start()

  try {
    const projectName = path.basename(projectPath)

    // Create project directory
    await fs.ensureDir(projectPath)

    // Initialize package.json
    const packageJson = {
      name: projectName,
      private: true,
      type: 'module',
      scripts: {
        dev: 'vinxi dev',
        build: 'vinxi build',
        start: 'vinxi start',
      },
      dependencies: {
        '@tanstack/react-router': 'latest',
        '@tanstack/start': 'latest',
        'vinxi': 'latest',
        'vue': 'latest',
      },
      devDependencies: {
        '@types/node': 'latest',
        'typescript': 'latest',
        'vue-tsc': 'latest',
      },
    }

    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 })

    // Create basic app.config.ts
    const appConfig = `import { defineConfig } from '@tanstack/start/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  vite: {
    plugins: [vue()],
  },
})
`
    await fs.writeFile(path.join(projectPath, 'app.config.ts'), appConfig)

    // Create basic tsconfig.json
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
          '@/*': ['./app/*'],
        },
      },
      include: ['app/**/*.ts', 'app/**/*.tsx', 'app/**/*.vue'],
    }

    await fs.writeJson(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 })

    // Create app directory structure
    await fs.ensureDir(path.join(projectPath, 'app'))
    await fs.ensureDir(path.join(projectPath, 'app/routes'))

    // Create basic root route
    const rootRoute = `<script setup lang="ts">
// Root layout component
</script>

<template>
  <div>
    <slot />
  </div>
</template>
`
    await fs.writeFile(path.join(projectPath, 'app/routes/__root.vue'), rootRoute)

    // Create index route
    const indexRoute = `<script setup lang="ts">
// Index page
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <h1 class="text-4xl font-bold">Welcome to TanStack Start + Vue</h1>
  </div>
</template>
`
    await fs.writeFile(path.join(projectPath, 'app/routes/index.vue'), indexRoute)

    // Install dependencies
    await x(options.packageManager, ['install'], {
      nodeOptions: {
        cwd: projectPath,
      },
    })

    createSpinner?.succeed('Created a new TanStack Start project.')
  }
  catch (error) {
    createSpinner?.fail('Something went wrong creating a new TanStack Start project.')
    handleError(error)
  }
}
