import type { RegistryBase } from './registry.config'
import { exec } from 'node:child_process'
import { existsSync, promises as fs } from 'node:fs'
import path, { resolve } from 'node:path'
import { registryConfig } from './registry.config'

/**
 * Generate a registry file that imports all content types for a base
 */
async function generateBaseRegistryFile(base: RegistryBase) {
  const basePath = resolve('registry', base.path)

  if (!existsSync(basePath)) {
    // eslint-disable-next-line no-console
    console.log(`⚠️  Base path does not exist: ${basePath}`)
    return
  }

  // eslint-disable-next-line no-console
  console.log(`\n📝 Generating registry.ts for ${base.name}...`)

  // Build imports
  const imports: string[] = []
  const itemArrays: string[] = []

  for (const contentType of base.contentTypes) {
    const sourcePath = resolve('registry', base.path, contentType.path)

    if (existsSync(sourcePath)) {
      // Import from the generated _registry file inside the content type folder
      const importPath = `@/registry/${base.path}/${contentType.path}/_registry`
      imports.push(`import { ${contentType.name} } from "${importPath}"`)
      itemArrays.push(`...${contentType.name}`)
    }
    else {
      // eslint-disable-next-line no-console
      console.log(`  ⚠️  Skipping ${contentType.name} - directory not found`)
    }
  }

  // Add additional imports
  const additionalImports = `import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"
import { fonts } from "@/registry/fonts"`

  // Build the registry file content
  const registryContent = `${additionalImports}

${imports.join('\n')}

export const registry = {
  name: "${base.name}",
  homepage: "https://shadcn-vue.com",
  items: z
    .array(registryItemSchema)
    .parse([
      ${itemArrays.join(',\n      ')},
      ...fonts,
    ]),
} satisfies Registry
`

  // Write the registry file
  const outputPath = resolve('registry', base.path, 'registry.ts')
  await fs.writeFile(outputPath, registryContent, 'utf8')

  // Format with eslint
  exec(`eslint --fix ${outputPath}`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(`  ⚠️  Could not auto-fix with eslint: ${error.message}`)
    }
    else {
      // eslint-disable-next-line no-console
      console.log(`  ✅ Generated and formatted: ${outputPath}`)
    }
  })
}

/**
 * Generate _registry.ts files for subdirectories that need them
 */
async function generateSubdirectoryRegistry(
  basePath: string,
  contentTypeName: string,
  outputFileName: string,
) {
  const fullPath = resolve('registry', basePath)

  if (!existsSync(fullPath)) {
    return
  }

  // eslint-disable-next-line no-console
  console.log(`\n📝 Generating _registry.ts for ${contentTypeName} in ${basePath}...`)

  const dir = await fs.readdir(fullPath, { withFileTypes: true })
  const subdirs = dir.filter(dirent => dirent.isDirectory())

  if (subdirs.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`  ⚠️  No subdirectories found`)
    return
  }

  // For UI components, we need to import each component
  const imports: string[] = []
  const exports: string[] = []

  for (const subdir of subdirs) {
    const componentName = subdir.name
    const componentPath = path.join(fullPath, componentName)
    const indexPath = path.join(componentPath, 'index.ts')

    if (existsSync(indexPath)) {
      // Import the default export
      imports.push(`import ${componentName} from './${componentName}'`)
      exports.push(componentName)
    }
  }

  if (exports.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`  ⚠️  No valid components found`)
    return
  }

  const registryContent = `import type { Registry } from "shadcn-vue/schema"

${imports.join('\n')}

export const ${contentTypeName}: Registry["items"] = [
  ${exports.join(',\n  ')},
]
`

  const outputPath = path.join(fullPath, outputFileName)
  await fs.writeFile(outputPath, registryContent, 'utf8')

  exec(`eslint --fix ${outputPath}`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(`  ⚠️  Could not auto-fix with eslint: ${error.message}`)
    }
    else {
      // eslint-disable-next-line no-console
      console.log(`  ✅ Generated: ${outputPath}`)
    }
  })
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2)
  const baseNameFilter = args[0] // Optional: specify which base to generate

  // eslint-disable-next-line no-console
  console.log('🚀 Generating base registry files...\n')

  for (const base of registryConfig) {
    // Skip if filter is provided and doesn't match
    if (baseNameFilter && base.name !== baseNameFilter) {
      continue
    }

    // Generate the main registry.ts for the base
    await generateBaseRegistryFile(base)

    // Note: _registry.ts files are now automatically generated in each content type folder
    // by the build-registry.ts script
  }

  // eslint-disable-next-line no-console
  console.log('\n✅ Registry generation complete!')
  // eslint-disable-next-line no-console
  console.log('\n💡 Next steps:')
  // eslint-disable-next-line no-console
  console.log('   1. Run the build script: pnpm run registry:build')
  // eslint-disable-next-line no-console
  console.log('   2. Review generated files for accuracy')
  // eslint-disable-next-line no-console
  console.log('   3. Add any missing metadata or custom configurations')
}

main().catch((error) => {
  console.error('❌ Generation failed:', error)
  process.exit(1)
})
