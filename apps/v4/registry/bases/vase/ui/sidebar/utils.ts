import type { ComputedRef, InjectionKey, Ref } from "vue"
import { inject, provide } from "vue"

export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"
export const SIDEBAR_MOBILE_BREAKPOINT = 768

interface SidebarContext {
  state: ComputedRef<"expanded" | "collapsed">
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  isMobile: Ref<boolean>
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
}

const sidebarContextKey: InjectionKey<SidebarContext> = Symbol("Sidebar")

export function provideSidebarContext(context: SidebarContext) {
  provide(sidebarContextKey, context)
}

export function useSidebar() {
  const context = inject(sidebarContextKey, null)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}
