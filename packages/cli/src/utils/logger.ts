import { highlighter } from '@/src/utils/highlighter'
import consola from 'consola'

export const logger = {
  error(...args: unknown[]) {
    consola.log(highlighter.error(args.join(' ')))
  },
  warn(...args: unknown[]) {
    consola.log(highlighter.warn(args.join(' ')))
  },
  info(...args: unknown[]) {
    consola.log(highlighter.info(args.join(' ')))
  },
  success(...args: unknown[]) {
    consola.log(highlighter.success(args.join(' ')))
  },
  log(...args: unknown[]) {
    consola.log(args.join(' '))
  },
  break() {
    consola.log('')
  },
}
