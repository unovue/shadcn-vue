export function transformCJSToESM(filename: string, code: string) {
  if (!filename.endsWith('.mjs')) {
    return code
      .replace(/const\s([\w\d_]+)\s*=\s*require\((.*)\);?/g, 'import $1 from $2')
      .replace(/module\.exports = /g, 'export default ')
  }
  return code
}
