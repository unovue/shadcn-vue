import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['src/index.ts', 'src/registry/index.ts', 'src/schema/index.ts', 'src/mcp/index.ts', 'src/utils/index.ts', 'src/icons/index.ts'],
  sourcemap: true,
  shims: true,
  nodeProtocol: 'strip',
  fixedExtension: false,
})
