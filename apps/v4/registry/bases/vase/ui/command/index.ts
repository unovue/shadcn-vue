import type { InjectionKey, Ref } from "vue"
import { inject, provide } from "vue"

export { default as Command } from "./Command.vue"
export { default as CommandDialog } from "./CommandDialog.vue"
export { default as CommandEmpty } from "./CommandEmpty.vue"
export { default as CommandGroup } from "./CommandGroup.vue"
export { default as CommandInput } from "./CommandInput.vue"
export { default as CommandItem } from "./CommandItem.vue"
export { default as CommandList } from "./CommandList.vue"
export { default as CommandSeparator } from "./CommandSeparator.vue"
export { default as CommandShortcut } from "./CommandShortcut.vue"

export type CommandSelectEvent = CustomEvent<{ originalEvent: Event, value: any }>

export interface CommandItemEntry {
  text: string
  value: unknown
  groupId?: string
  select: (originalEvent: Event) => void
}

export interface CommandContext {
  search: Ref<string>
  disabled: Readonly<Ref<boolean>>
  listId: string
  highlightedId: Ref<string | null>
  highlightOnHover: Readonly<Ref<boolean>>
  /** The items that the command knows, including the ones that the search hides. */
  items: Map<string, CommandItemEntry>
  visibleCount: Readonly<Ref<number>>
  isVisible: (id: string) => boolean
  isGroupVisible: (groupId: string) => boolean
  isSelected: (value: unknown) => boolean
  highlight: (id: string | null) => void
  moveHighlight: (direction: "next" | "previous") => void
  selectHighlighted: (originalEvent: Event) => void
  select: (value: unknown) => void
  unregisterItem: (id: string) => void
}

const commandKey: InjectionKey<CommandContext> = Symbol("Command")
const groupKey: InjectionKey<{ id: string }> = Symbol("CommandGroup")

export function provideCommandContext(context: CommandContext) {
  provide(commandKey, context)
  return context
}

export function useCommand() {
  const context = inject(commandKey, null)

  if (!context) {
    throw new Error("`Command` parts must be used inside `Command`.")
  }

  return context
}

export function provideCommandGroupContext(context: { id: string }) {
  provide(groupKey, context)
  return context
}

export function useCommandGroup() {
  return inject(groupKey, null)
}
