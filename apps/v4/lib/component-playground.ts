const STACKBLITZ_REPOSITORY = 'unovue/shadcn-vue'
const STACKBLITZ_BRANCH = 'dev'

export function getComponentPlaygroundUrl(file: string) {
  const query = new URLSearchParams({
    file,
    startScript: 'dev',
  })

  return `https://stackblitz.com/github/${STACKBLITZ_REPOSITORY}/tree/${STACKBLITZ_BRANCH}?${query.toString()}`
}
