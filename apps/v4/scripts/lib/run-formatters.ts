import { execFile } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const require = createRequire(import.meta.url)
const execFileAsync = promisify(execFile)
const maxBuffer = 64 * 1024 * 1024
const currentDir = path.dirname(fileURLToPath(import.meta.url))
const v4Root = path.resolve(currentDir, '../..')
const repoRoot = path.resolve(v4Root, '../..')
const cliTsconfigPath = path.join(repoRoot, 'packages/cli/tsconfig.json')
const cliEntryPath = path.join(repoRoot, 'packages/cli/src/index.ts')

function resolvePackageBin(packageName: string, binPath: string) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`)
  return path.join(path.dirname(packageJsonPath), binPath)
}

async function runNodeBin(binPath: string, args: string[], cwd = process.cwd()) {
  return execFileAsync(process.execPath, [binPath, ...args], {
    cwd,
    maxBuffer,
  })
}

export function runEslintFix(args: string[], cwd?: string) {
  return runNodeBin(resolvePackageBin('eslint', 'bin/eslint.js'), ['--fix', ...args], cwd)
}

export function runPrettierWrite(args: string[], cwd?: string) {
  return runNodeBin(resolvePackageBin('prettier', 'bin/prettier.cjs'), ['--write', ...args], cwd)
}

export function runShadcnVueCli(args: string[], cwd?: string) {
  return runNodeBin(resolvePackageBin('tsx', 'dist/cli.mjs'), [
    '--tsconfig',
    cliTsconfigPath,
    cliEntryPath,
    ...args,
  ], cwd)
}
