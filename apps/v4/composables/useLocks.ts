import { reactive } from 'vue'

export type LockableParam
  = | 'style'
    | 'baseColor'
    | 'theme'
    | 'iconLibrary'
    | 'font'
    | 'menuAccent'
    | 'menuColor'
    | 'radius'

// Optional: Composable version that can be used without provider for standalone use
export function useLocks() {
  const locks = reactive<Set<LockableParam>>(new Set())

  const isLocked = (param: LockableParam) => {
    return locks.has(param)
  }

  const toggleLock = (param: LockableParam) => {
    if (locks.has(param)) {
      locks.delete(param)
    }
    else {
      locks.add(param)
    }
  }

  return {
    locks,
    isLocked,
    toggleLock,
  }
}
