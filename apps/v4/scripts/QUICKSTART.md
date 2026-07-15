# Quick Start Guide: Adding a New Base

This guide will walk you through creating a new component base (style/theme) from scratch.

## Prerequisites

- Existing project structure
- Basic understanding of the registry system

## Step-by-Step Guide

### 1. Create Directory Structure

```bash
# Navigate to the registry directory
cd registry/bases

# Create your new base
mkdir my-base
cd my-base

# Create content type directories
mkdir -p ui blocks examples lib components
```

### 2. Add Sample Components

Create a sample button component:

```bash
# Create button directory
mkdir -p ui/button

# Create component files
touch ui/button/Button.vue
touch ui/button/index.ts
```

**ui/button/Button.vue:**
```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center rounded-md px-4 py-2',
      props.variant === 'default' && 'bg-primary text-primary-foreground',
      props.variant === 'outline' && 'border border-input',
      props.class,
    )"
  >
    <slot />
  </button>
</template>
```

**ui/button/index.ts:**
```typescript
export { default as Button } from './Button.vue'
```

### 3. Configure the Base

Edit `scripts/registry.config.ts` and add your base:

```typescript
{
  name: 'my-base',
  path: 'bases/my-base',
  buildMainRegistry: false, // Set to true if this is a standalone registry
  publicOutputDir: 'public/r/styles/my-base',
  contentTypes: [
    {
      name: 'ui',
      path: 'ui',
      outputFile: 'bases/my-base/ui/_registry.ts',
      crawlType: 'ui',
    },
    {
      name: 'blocks',
      path: 'blocks',
      outputFile: 'bases/my-base/blocks/_registry.ts',
      crawlType: 'block',
    },
    {
      name: 'examples',
      path: 'examples',
      outputFile: 'bases/my-base/examples/_registry.ts',
      crawlType: 'example',
    },
    {
      name: 'lib',
      path: 'lib',
      outputFile: 'bases/my-base/lib/_registry.ts',
      crawlType: 'composable',
    },
  ],
}
```

### 4. Generate Base Registry File

This will create the main `registry.ts` file for your base:

```bash
pnpm run registry:generate my-base
```

This creates:
- `registry/bases/my-base/registry.ts` - Main registry file
- `registry/bases/my-base/ui/_registry.ts` - UI components registry (after build)
- `registry/bases/my-base/blocks/_registry.ts` - Blocks registry (after build)
- Each with proper imports, schema validation, and TypeScript types

### 5. Build the Registry

Build all registries including your new base:

```bash
pnpm run registry:build
```

This will:
1. Crawl all component directories
2. Extract dependencies and metadata
3. Generate `_registry.ts` files in each content type folder
4. Create public JSON files (if `buildMainRegistry: true`)

### 6. Verify Output

Check the generated files:

```bash
# Main registry file
ls registry/bases/my-base/registry.ts

# Generated _registry files
ls registry/bases/my-base/ui/_registry.ts
ls registry/bases/my-base/blocks/_registry.ts

# Public files (if buildMainRegistry: true)
ls public/r/styles/my-base/
```

## Common Tasks

### Adding a New Component

1. Create component directory and files
2. Run `pnpm run registry:build`
3. The component is automatically picked up

### Adding a Block

```bash
# Create block directory
mkdir -p registry/bases/my-base/blocks/dashboard-01

# Create page file
touch registry/bases/my-base/blocks/dashboard-01/page.vue

# Create components directory
mkdir -p registry/bases/my-base/blocks/dashboard-01/components

# Build
pnpm run registry:build
```

### Adding Examples
### Add Example

```bash
# Create example folder and files
mkdir -p registry/bases/my-base/examples/button
touch registry/bases/my-base/examples/button/ButtonBasic.vue
touch registry/bases/my-base/examples/button/ButtonWithIcon.vue

# Build
pnpm run registry:build
```

**Result**: Creates one registry item named "button" with both files

### Adding Utilities

```bash
# Create utility file
touch registry/bases/my-base/lib/utils.ts

# Build
pnpm run registry:build
```

## Content Type Details

### UI Components (`crawlType: 'ui'`)

**Structure:**
```
ui/
├── component-name/
│   ├── ComponentName.vue
│   └── index.ts
```

**What it detects:**
- Component files
- Dependencies (npm packages)
- Registry dependencies (other components)
- TypeScript types

### Blocks (`crawlType: 'block'`)

**Structure:**
```
blocks/
├── block-name/
│   ├── page.vue              # Main page component
│   └── components/           # Additional components
│       └── BlockComponent.vue
```

**What it detects:**
- Page components
- Sub-components
- Metadata from `registry-block-meta.ts`

### Examples (`crawlType: 'example'`)

**Structure:**
```
examples/
├── button/
│   ├── ButtonBasic.vue
│   ├── ButtonWithIcon.vue
│   └── ButtonVariants.vue
└── card/
    ├── CardBasic.vue
    └── CardWithHeader.vue
```

**What it detects:**
- Example files grouped by folder
- Each folder becomes one registry item
- All Vue files in a folder are included
- Dependencies aggregated from all files in the folder

### Lib/Composables (`crawlType: 'composable'`)

**Structure:**
```
lib/
├── utils.ts
├── cn.ts
└── hooks.ts
```

**What it detects:**
- TypeScript utility files
- Exported functions
- Dependencies

### Charts (`crawlType: 'chart'`)

**Structure:**
```
charts/
├── ChartAreaAxes.vue
├── ChartBarDefault.vue
└── ChartLineInteractive.vue
```

**What it detects:**
- Chart components
- Auto-generates categories from component name
- Examples:
  - `ChartAreaAxes` → `["chart", "chart-area"]`
  - `ChartBarDefault` → `["chart", "chart-bar"]`
  - `ChartLineInteractive` → `["chart", "chart-line"]`
- Pattern: `Chart{Type}{Variant}` → `["chart", "chart-{type}"]`

## Troubleshooting

### Components Not Detected

**Problem:** Components aren't showing up in the registry.

**Solutions:**
1. Check directory structure matches expected format
2. Ensure `index.ts` exists for UI components
3. Verify path in `registry.config.ts` is correct
4. Check console output for errors

### Missing Dependencies

**Problem:** Dependencies aren't being detected.

**Solutions:**
1. Check import statements are using standard format
2. Add to `DEPENDENCIES` map in `scripts/crawl-content.ts`
3. Verify package name matches npm exactly

### Build Errors

**Problem:** Build fails with errors.

**Solutions:**
1. Check TypeScript syntax in components
2. Ensure all imports can be resolved
3. Verify `registry.config.ts` syntax
4. Run `pnpm run typecheck`

### Generated Files Have Errors

**Problem:** Generated registry files have linting errors.

**Solutions:**
1. Check `.eslintrc` configuration
2. Run `eslint --fix` manually on the files
3. Verify JSON.stringify output is valid

## Best Practices

### 1. Consistent Naming

Use kebab-case for:
- Component directories
- File names
- Registry names

### 2. Add Metadata

For blocks, add metadata to `registry/registry-block-meta.ts`:

```typescript
export const blockMeta: Record<string, BlockMeta> = {
  'dashboard-01': {
    description: 'A dashboard layout with sidebar and header',
    categories: ['dashboard', 'layout'],
  },
}
```

### 3. Document Dependencies

If using external packages, ensure they're in `DEPENDENCIES` map:

```typescript
const DEPENDENCIES = new Map<string, string[]>([
  ['my-package', ['peer-dependency-1', 'peer-dependency-2']],
])
```

### 4. Test Incrementally

After adding each component:
1. Run build
2. Check generated files
3. Verify in your app
4. Commit changes

### 5. Version Control

Commit both:
- Source components (`registry/bases/my-base/**/*.vue`)
- Generated files (`registry/bases/my-base/registry-*.ts`)

## Advanced Configuration

### Custom Crawl Types

If you need a custom content type:

1. Create crawler in `scripts/crawl-content.ts`
2. Add to `crawlType` union in `registry.config.ts`
3. Update `getCrawlFunction` in `build-registry.ts`

### Multiple Output Formats

To generate multiple registry formats:

```typescript
{
  name: 'my-base',
  contentTypes: [
    // Standard format
    {
      name: 'ui',
      path: 'ui',
      outputFile: 'bases/my-base/ui/_registry.ts',
      crawlType: 'ui',
    },
    // Alternative format
    {
      name: 'ui-minimal',
      path: 'ui-minimal',
      outputFile: 'bases/my-base/ui-minimal/_registry.ts',
      crawlType: 'ui',
      // Add custom options here
    },
  ],
}
```

### Conditional Builds

To build only specific bases:

```bash
# Edit build-registry.ts temporarily
const basesToBuild = ['my-base']
for (const base of registryConfig.filter(b => basesToBuild.includes(b.name))) {
  await buildBaseRegistry(base)
}
```

## Next Steps

1. **Add more components** - Expand your component library
2. **Create blocks** - Build example layouts and patterns
3. **Write documentation** - Document your components
4. **Share your base** - Publish for others to use

## Resources

- [Full Documentation](./README.md)
- [Registry Configuration](./registry.config.ts)
- [Crawl Functions](./crawl-content.ts)
- [Build Script](./build-registry.ts)

## Example: Complete Button Component

Here's a complete example of a well-structured button component:

**Directory structure:**
```
registry/bases/my-base/ui/
├── button/
│   ├── Button.vue
│   ├── index.ts
│   └── types.ts (optional)
└── _registry.ts (generated)
```

**Button.vue:**
```vue
<script setup lang="ts">
import type { ButtonVariant } from './types'
import { cn } from '@/lib/utils'
import { computed } from 'vue'

interface Props {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
})

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    props.size === 'sm' && 'h-9 px-3 text-sm',
    props.size === 'md' && 'h-10 px-4 py-2',
    props.size === 'lg' && 'h-11 px-8',
    props.variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
    props.variant === 'outline' && 'border border-input bg-background hover:bg-accent',
    props.disabled && 'pointer-events-none opacity-50',
  ),
)
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
```

**index.ts:**
```typescript
export { default as Button } from './Button.vue'
export type * from './types'
```

**types.ts:**
```typescript
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive'
```

After creating these files, run:

```bash
pnpm run registry:build
```

Your button component will be automatically registered and available! 🎉