import type { TypesetLockableParam } from '@/lib/typeset/params'

/**
 * Which params Shuffle must leave alone.
 *
 * Backed by `useState` so every LockButton and the shuffle action share one
 * store without leaking between SSR requests (a module-level ref would).
 * Stored as an array rather than a Set because useState serialises into the
 * Nuxt payload.
 */
export function useTypesetLocks() {
  const locks = useState<TypesetLockableParam[]>('typeset-locks', () => [])

  function isLocked(param: TypesetLockableParam) {
    return locks.value.includes(param)
  }

  function toggleLock(param: TypesetLockableParam) {
    locks.value = isLocked(param)
      ? locks.value.filter(lock => lock !== param)
      : [...locks.value, param]
  }

  return { locks, isLocked, toggleLock }
}
