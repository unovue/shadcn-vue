import fsp from 'node:fs/promises'

function rmdir(dirs) {
  dirs.forEach(async (dir) => {
    await fsp.unlink(dir).catch(() => {})
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {})
  })
}

rmdir(['dist', 'components'])
