import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['src/index.ts', 'src/registry/index.ts', 'src/schema/index.ts', 'src/mcp/index.ts', 'src/utils/index.ts', 'src/icons/index.ts', 'src/preset/index.ts', 'src/tailwind.css'],
  sourcemap: true,
  shims: true,
  nodeProtocol: 'strip',
  fixedExtension: false,
  // tsdown 0.22 delegates CSS to @tsdown/css, which names the bundled output
  // `style.css` by default. Pin it back to `tailwind.css` so the
  // `./tailwind.css` export (dist/tailwind.css) keeps resolving.
  css: {
    fileName: 'tailwind.css',
  },
})
