import fsExtra from 'fs-extra'

export const FILE_BACKUP_SUFFIX = '.bak'

export function createFileBackup(filePath: string): string | null {
  if (!fsExtra.existsSync(filePath)) {
    return null
  }

  const backupPath = `${filePath}${FILE_BACKUP_SUFFIX}`
  try {
    fsExtra.renameSync(filePath, backupPath)
    return backupPath
  }
  catch (error) {
    console.error(`Failed to create backup of ${filePath}: ${error}`)
    return null
  }
}

export function restoreFileBackup(filePath: string): boolean {
  const backupPath = `${filePath}${FILE_BACKUP_SUFFIX}`

  if (!fsExtra.existsSync(backupPath)) {
    return false
  }

  try {
    fsExtra.renameSync(backupPath, filePath)
    return true
  }
  catch (error) {
    console.error(
      `Warning: Could not restore backup file ${backupPath}: ${error}`,
    )
    return false
  }
}

export function deleteFileBackup(filePath: string): boolean {
  const backupPath = `${filePath}${FILE_BACKUP_SUFFIX}`

  if (!fsExtra.existsSync(backupPath)) {
    return false
  }

  try {
    fsExtra.unlinkSync(backupPath)
    return true
  }
  catch {
    // Best effort - don't log as this is just cleanup
    return false
  }
}

interface WithFileCopyBackupOptions {
  suffix?: string
  onBackupFailure?: (filePath: string) => void
}

/**
 * Runs `task` with a **copy** of `filePath` kept under `<filePath><suffix>`,
 * restoring it if the task throws OR if the process exits before the task
 * returns. The original file stays in place for the task to read.
 *
 * This is the rollback primitive `apply` wraps around `runInit`. A plain
 * try/catch isn't enough because `runInit → addComponents → handleError`
 * funnels failures into `process.exit(1)`, which bypasses any catch block.
 * The process-exit listener fires before that, so rollback still runs.
 *
 * Unlike shadcn-ui's `withFileBackup` (which renames), this copies so the
 * original file stays readable by code that re-reads it during the task —
 * shadcn-vue's `runInit` reads `components.json` from disk via
 * `getProjectConfig`, so the original must stay in place.
 */
export async function withFileCopyBackup<T>(
  filePath: string,
  task: () => Promise<T>,
  options: WithFileCopyBackupOptions = {},
) {
  if (!fsExtra.existsSync(filePath)) {
    return task()
  }

  const suffix = options.suffix ?? FILE_BACKUP_SUFFIX
  const backupPath = `${filePath}${suffix}`

  try {
    fsExtra.copyFileSync(filePath, backupPath)
  }
  catch (error) {
    options.onBackupFailure?.(filePath)
    throw new Error(`Could not back up ${filePath}: ${(error as Error).message}`)
  }

  const restoreOnExit = () => {
    if (fsExtra.existsSync(backupPath)) {
      try {
        fsExtra.copyFileSync(backupPath, filePath)
        fsExtra.unlinkSync(backupPath)
      }
      catch {
        // Best effort — we're already on the exit path.
      }
    }
  }

  process.on('exit', restoreOnExit)

  try {
    const result = await task()
    process.removeListener('exit', restoreOnExit)
    if (fsExtra.existsSync(backupPath)) {
      fsExtra.unlinkSync(backupPath)
    }
    return result
  }
  catch (error) {
    process.removeListener('exit', restoreOnExit)
    restoreOnExit()
    throw error
  }
}
