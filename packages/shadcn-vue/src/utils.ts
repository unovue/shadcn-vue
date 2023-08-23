import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ParseEmits<T extends Record<string, any>> = {
  [K in keyof T]: (...args: T[K]) => void;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
