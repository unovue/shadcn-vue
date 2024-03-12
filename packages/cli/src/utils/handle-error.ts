import { consola } from 'consola'

export function handleError(error: unknown) {
  if (typeof error === 'string') {
    consola.error(error)
    process.exit(1)
  }

  if (error instanceof Error) {
    consola.error(error.message)
    process.exit(1)
  }

  consola.error('Something went wrong. Please try again.')
  process.exit(1)
}
