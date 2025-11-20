import {
  isAbsolute,
  normalize,
  resolve,
  sep,
} from 'pathe'

export function isSafeTarget(targetPath: string, cwd: string): boolean {
  // Check for null bytes which can be used to bypass validations.
  if (targetPath.includes('\0')) {
    return false
  }

  // Decode URL-encoded sequences to catch encoded traversal attempts.
  let decodedPath: string
  try {
    decodedPath = targetPath
    let prevPath = ''
    while (decodedPath !== prevPath && decodedPath.includes('%')) {
      prevPath = decodedPath
      decodedPath = decodeURIComponent(decodedPath)
    }
  }
  catch {
    return false
  }

  // Normalize both paths to handle separators
  const normalizedTarget = normalize(decodedPath)
  const normalizedRoot = normalize(cwd)

  // Check for explicit path traversal sequences in both encoded and decoded forms.
  // Allow [...] pattern which is common in framework routing (e.g., [...slug])
  const hasPathTraversal = (path: string) => {
    // Remove [...] patterns before checking for ..
    const withoutBrackets = path.replace(/\[\.\.\..*?\]/g, '')
    return withoutBrackets.includes('..')
  }

  // Check for explicit traversal indicators
  if (
    hasPathTraversal(normalizedTarget)
    || hasPathTraversal(decodedPath)
    || hasPathTraversal(targetPath)
  ) {
    return false
  }

  // Check for current directory references that might be used in traversal.
  // First, remove [...] patterns to avoid false positives
  const cleanPath = (path: string) => path.replace(/\[\.\.\..*?\]/g, '')
  const cleanTarget = cleanPath(targetPath)
  const cleanDecoded = cleanPath(decodedPath)

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\.\.[/\\]/,
    /[/\\]\.\./,
    /\.\./,
    /\.\.%/,
    /\0/,
    // eslint-disable-next-line no-control-regex
    /[\x01-\x1F]/,
  ]

  if (
    suspiciousPatterns.some(
      pattern => pattern.test(cleanTarget) || pattern.test(cleanDecoded),
    )
  ) {
    return false
  }

  // Check for unsafe use of ~
  if (
    (targetPath.includes('~') || decodedPath.includes('~'))
    && (targetPath.includes('../') || decodedPath.includes('../'))
  ) {
    return false
  }

  // Reject Windows drive letter absolute paths on non-Windows
  const driveLetterRegex = /^[a-z]:[/\\]/i
  if (driveLetterRegex.test(decodedPath)) {
    if (process.platform === 'win32') {
      return decodedPath.toLowerCase().startsWith(cwd.toLowerCase())
    }
    return false
  }

  // Final absolute path resolution
  const absoluteTarget = isAbsolute(normalizedTarget)
    ? normalizedTarget
    : resolve(normalizedRoot, normalizedTarget)

  const safeRoot = normalizedRoot.endsWith(sep)
    ? normalizedRoot
    : normalizedRoot + sep

  return (
    absoluteTarget === normalizedRoot
    || absoluteTarget.startsWith(safeRoot)
  )
}
