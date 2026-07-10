import type { InjectionKey, Ref } from "vue"
import { getCurrentInstance, inject, onUnmounted, provide, shallowRef } from "vue"

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor"
export type MessageScrollerButtonDirection = "start" | "end"
export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest"

export interface MessageScrollerScrollOptions {
  align?: MessageScrollerScrollAlign
  behavior?: ScrollBehavior
  scrollMargin?: number
}

export interface MessageScrollerScrollable {
  start: boolean
  end: boolean
}

export interface MessageScrollerVisibilityState {
  currentAnchorId: string | null
  visibleMessageIds: string[]
}

export interface MessageScrollerProviderProps {
  autoScroll?: boolean
  defaultScrollPosition?: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold?: number
  scrollPreviousItemPeek?: number
  scrollMargin?: number
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const DEFAULT_SCROLL_EDGE_THRESHOLD = 8
const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64
const DEFAULT_SCROLL_MARGIN = 0
const SCROLL_EPSILON = 0.5
const AUTOSCROLLING_TIMEOUT = 180

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
])

const EMPTY_SCROLLABLE: MessageScrollerScrollable = { start: false, end: false }
const EMPTY_VISIBLE_IDS: string[] = []
const EMPTY_VISIBILITY: MessageScrollerVisibilityState = {
  currentAnchorId: null,
  visibleMessageIds: EMPTY_VISIBLE_IDS,
}

type Mode
  = | "following-bottom"
    | "free-scrolling"
    | "anchored-to-message"
    | "settling-jump"

interface PrependRestore {
  element: HTMLElement
  viewportTop: number
}

interface PendingScrollToMessage {
  messageId: string
  options?: MessageScrollerScrollOptions
}

// A minimal ref object mirroring React's `useRef`.
interface MutRef<T> {
  current: T
}

function mutRef<T>(value: T): MutRef<T> {
  return { current: value }
}

// -----------------------------------------------------------------------------
// External store (subscribe / getSnapshot / setSnapshot)
// -----------------------------------------------------------------------------

interface Store<T> {
  getSnapshot: () => T
  hasListeners: () => boolean
  setSnapshot: (next: T) => void
  subscribe: (
    listener: () => void,
    onFirstListener?: () => void,
    onLastListener?: () => void,
  ) => () => void
}

function createStore<T>(initial: T, isEqual: (a: T, b: T) => boolean): Store<T> {
  let snapshot = initial
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => snapshot,
    hasListeners: () => listeners.size > 0,
    setSnapshot: (next) => {
      if (!isEqual(snapshot, next)) {
        snapshot = next
        listeners.forEach(listener => listener())
      }
    },
    subscribe: (listener, onFirstListener, onLastListener) => {
      const isFirst = listeners.size === 0
      listeners.add(listener)
      if (isFirst)
        onFirstListener?.()
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0)
          onLastListener?.()
      }
    },
  }
}

function scrollableEqual(a: MessageScrollerScrollable, b: MessageScrollerScrollable) {
  return a.start === b.start && a.end === b.end
}

function visibilityEqual(
  a: MessageScrollerVisibilityState,
  b: MessageScrollerVisibilityState,
) {
  if (
    a.currentAnchorId !== b.currentAnchorId
    || a.visibleMessageIds.length !== b.visibleMessageIds.length
  ) {
    return false
  }
  return a.visibleMessageIds.every((id, index) => id === b.visibleMessageIds[index])
}

// -----------------------------------------------------------------------------
// DOM measurement helpers
// -----------------------------------------------------------------------------

function parseNumber(value: string | null | undefined): number {
  if (!value)
    return 0
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function getPadding(element: HTMLElement): { start: number, end: number } {
  const style = window.getComputedStyle(element)
  return {
    end: parseNumber(style.paddingBlockEnd || style.paddingBottom),
    start: parseNumber(style.paddingBlockStart || style.paddingTop),
  }
}

function getContentPadding(spacer: HTMLElement | null): { start: number, end: number } {
  const parent = spacer?.parentElement
  return parent ? getPadding(parent) : { end: 0, start: 0 }
}

function getRowGap(element: HTMLElement | null): number {
  if (!element)
    return 0
  const style = window.getComputedStyle(element)
  const gap = style.rowGap === "normal" ? style.gap : style.rowGap
  return parseNumber(gap)
}

function getMessageChildren(
  content: HTMLElement,
  spacer: HTMLElement | null,
): HTMLElement[] {
  return Array.from(content.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child !== spacer,
  )
}

function getElementOffsetTop(element: HTMLElement, viewport: HTMLElement): number {
  const elementRect = element.getBoundingClientRect()
  const viewportRect = viewport.getBoundingClientRect()
  return elementRect.top - viewportRect.top + viewport.scrollTop
}

function getRelativeTop(element: HTMLElement, viewport: HTMLElement): number {
  return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top
}

function measureContentHeight({
  content,
  spacer,
  viewport,
}: {
  content: HTMLElement
  spacer: HTMLElement | null
  viewport: HTMLElement
}): number {
  const children = getMessageChildren(content, spacer)
  const padding = getPadding(content)
  const viewportRect = viewport.getBoundingClientRect()
  const scrollTop = viewport.scrollTop
  let height = padding.start + padding.end
  for (const child of children) {
    const rect = child.getBoundingClientRect()
    height = Math.max(height, rect.bottom - viewportRect.top + scrollTop + padding.end)
  }
  return height
}

function maxScrollTop(element: HTMLElement): number {
  return Math.max(0, element.scrollHeight - element.clientHeight)
}

function computeSpacerHeight({
  content,
  scrollTop,
  spacer,
  viewport,
}: {
  content: HTMLElement
  scrollTop: number
  spacer: HTMLElement | null
  viewport: HTMLElement
}): number {
  const contentHeight = measureContentHeight({ content, spacer, viewport })
  return scrollTop + viewport.clientHeight - contentHeight
}

function computeScrollTopForElement({
  align,
  element,
  scrollMargin,
  spacer,
  viewport,
}: {
  align: MessageScrollerScrollAlign
  element: HTMLElement
  scrollMargin: number
  spacer: HTMLElement | null
  viewport: HTMLElement
}): number {
  const offsetTop = getElementOffsetTop(element, viewport)
  const height = element.getBoundingClientRect().height
  const padding = getContentPadding(spacer)

  if (align === "center") {
    const available = Math.max(0, viewport.clientHeight - padding.start - padding.end)
    return offsetTop - padding.start - (available - height) / 2 - scrollMargin
  }
  if (align === "end")
    return offsetTop - viewport.clientHeight + height + padding.end + scrollMargin
  if (align === "nearest") {
    const bottom = offsetTop + height
    const visibleTop = viewport.scrollTop + padding.start
    const visibleBottom = viewport.scrollTop + viewport.clientHeight - padding.end
    if (offsetTop >= visibleTop && bottom <= visibleBottom)
      return viewport.scrollTop
    return offsetTop < visibleTop
      ? offsetTop - padding.start - scrollMargin
      : bottom - viewport.clientHeight + padding.end + scrollMargin
  }
  return offsetTop - padding.start - scrollMargin
}

function computeScrollable({
  content,
  scrollEdgeThreshold,
  spacer,
  viewport,
}: {
  content: HTMLElement | null
  scrollEdgeThreshold: number
  spacer: HTMLElement | null
  viewport: HTMLElement | null
}): MessageScrollerScrollable {
  if (!viewport || !content)
    return EMPTY_SCROLLABLE
  const contentHeight = measureContentHeight({ content, spacer, viewport })
  return {
    start: viewport.scrollTop > scrollEdgeThreshold,
    end: contentHeight - viewport.scrollTop - viewport.clientHeight > scrollEdgeThreshold,
  }
}

function computeVisibility({
  content,
  scrollMargin,
  scrollPreviousItemPeek,
  spacer,
  viewport,
  visibleMessageIds,
}: {
  content: HTMLElement | null
  scrollMargin: number
  scrollPreviousItemPeek: number
  spacer: HTMLElement | null
  viewport: HTMLElement | null
  visibleMessageIds: Set<string>
}): MessageScrollerVisibilityState {
  if (!content || !viewport)
    return EMPTY_VISIBILITY
  const viewportRect = viewport.getBoundingClientRect()
  const anchorLine = viewportRect.top + scrollMargin + scrollPreviousItemPeek
  const noIntersectionObserver = typeof IntersectionObserver === "undefined"
  const visible: string[] = []
  let currentAnchorId: string | null = null

  for (const child of getMessageChildren(content, spacer)) {
    const messageId = child.dataset.messageId
    if (!messageId)
      continue
    const isAnchor = child.dataset.scrollAnchor === "true"
    const rect = isAnchor || noIntersectionObserver ? child.getBoundingClientRect() : null
    const isVisible = noIntersectionObserver && rect
      ? rect.bottom > anchorLine && rect.top < viewportRect.bottom
      : visibleMessageIds.has(messageId)
    if (isVisible)
      visible.push(messageId)
    if (isAnchor && rect && rect.top <= anchorLine + SCROLL_EPSILON)
      currentAnchorId = messageId
  }

  return visible.length === 0 && currentAnchorId === null
    ? EMPTY_VISIBILITY
    : { currentAnchorId, visibleMessageIds: visible }
}

function findFirstAnchorFrom(
  elements: HTMLElement[],
  startIndex: number,
): HTMLElement | null {
  for (let i = startIndex; i < elements.length; i++) {
    const element = elements[i]
    if (element?.dataset.scrollAnchor === "true")
      return element
  }
  return null
}

function findFirstUnhandledAnchor(
  elements: HTMLElement[],
  handled: WeakSet<HTMLElement>,
): HTMLElement | null {
  for (const element of elements) {
    if (element.dataset.scrollAnchor === "true" && !handled.has(element))
      return element
  }
  return null
}

function hasMultipleAnchorsFrom(
  elements: HTMLElement[],
  startIndex: number,
): boolean {
  let count = 0
  for (let i = startIndex; i < elements.length; i++) {
    if (elements[i]?.dataset.scrollAnchor === "true") {
      count += 1
      if (count > 1)
        return true
    }
  }
  return false
}

function findLastAnchor(elements: HTMLElement[]): HTMLElement | null {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i]
    if (element?.dataset.scrollAnchor === "true")
      return element
  }
  return null
}

function findFirstVisibleMessage({
  content,
  spacer,
  viewport,
}: {
  content: HTMLElement
  spacer: HTMLElement | null
  viewport: HTMLElement
}): HTMLElement | null {
  const viewportRect = viewport.getBoundingClientRect()
  for (const child of getMessageChildren(content, spacer)) {
    if (!child.dataset.messageId)
      continue
    const rect = child.getBoundingClientRect()
    if (rect.bottom > viewportRect.top && rect.top < viewportRect.bottom)
      return child
  }
  return null
}

// -----------------------------------------------------------------------------
// Engine
// -----------------------------------------------------------------------------

export interface MessageScrollerContext {
  handleContentChange: () => void
  handleResize: () => void
  observeVisibility: () => void
  preserveScrollOnPrependRef: MutRef<boolean>
  scrollToEnd: (options?: { behavior?: ScrollBehavior }) => boolean
  scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean
  scrollToStart: (options?: { behavior?: ScrollBehavior }) => boolean
  setContentElement: (element: HTMLElement | null) => void
  setRootElement: (element: HTMLElement | null) => void
  setSpacerElement: (element: HTMLElement | null) => void
  setViewportElement: (element: HTMLElement | null) => void
  stateStore: Store<MessageScrollerScrollable>
  syncAfterScroll: () => void
  unobserveVisibility: () => void
  userScrollIntent: () => void
  viewportRef: MutRef<HTMLElement | null>
  visibilityStore: Store<MessageScrollerVisibilityState>
  applyDefaultScrollPosition: () => void
  onAutoScrollChange: () => void
}

export type RegisterMessage = (
  messageId: string,
  element: HTMLElement | null,
  previousElement: HTMLElement | null,
) => void

const CONTEXT_KEY: InjectionKey<MessageScrollerContext> = Symbol("MessageScrollerContext")
const REGISTER_KEY: InjectionKey<RegisterMessage> = Symbol("MessageScrollerRegister")

function createEngine(props: Required<MessageScrollerProviderProps>) {
  const {
    autoScroll,
    defaultScrollPosition,
    scrollEdgeThreshold,
    scrollPreviousItemPeek,
    scrollMargin,
  } = props

  const autoScrollRef = mutRef(autoScroll)
  const autoscrollingRef = mutRef(false)
  const autoscrollingTimeoutRef = mutRef<number | null>(null)
  const streamingTurnRef = mutRef<HTMLElement | null>(null)
  const contentRef = mutRef<HTMLElement | null>(null)
  const defaultScrollPositionAppliedRef = mutRef(false)
  const firstItemRef = mutRef<HTMLElement | null>(null)
  const itemCountRef = mutRef(0)
  const lastScrollTopRef = mutRef(0)
  const messageElementsRef = mutRef(new Map<string, HTMLElement>())
  const modeRef = mutRef<Mode>(autoScroll ? "following-bottom" : "free-scrolling")
  const pendingScrollFrameRef = mutRef<number | null>(null)
  const pendingScrollToMessageRef = mutRef<PendingScrollToMessage | null>(null)
  const prependRestoreRef = mutRef<PrependRestore | null>(null)
  const preserveScrollOnPrependRef = mutRef(true)
  const rootRef = mutRef<HTMLElement | null>(null)
  const scrollEdgeThresholdRef = mutRef(scrollEdgeThreshold)
  const scrollMarginRef = mutRef(scrollMargin)
  const scrollPreviousItemPeekRef = mutRef(scrollPreviousItemPeek)
  const spacerGapRef = mutRef(0)
  const spacerHeightRef = mutRef(0)
  const spacerRef = mutRef<HTMLElement | null>(null)
  const stateFrameRef = mutRef<number | null>(null)
  const viewportRef = mutRef<HTMLElement | null>(null)
  const visibilityFrameRef = mutRef<number | null>(null)
  const visibilityObserverRef = mutRef<IntersectionObserver | null>(null)
  const visibleMessageIdsRef = mutRef(new Set<string>())
  const handledScrollAnchorsRef = mutRef(new WeakSet<HTMLElement>())

  const stateStore = createStore(EMPTY_SCROLLABLE, scrollableEqual)
  const visibilityStore = createStore(EMPTY_VISIBILITY, visibilityEqual)

  // --- scroll-state commit / visibility scheduling ---------------------------

  function applyScrollableAttributes(scrollable: MessageScrollerScrollable) {
    const attr = [scrollable.start && "start", scrollable.end && "end"]
      .filter(Boolean)
      .join(" ")
    const autoscrolling = autoscrollingRef.current
    for (const element of [rootRef.current, viewportRef.current]) {
      if (!element)
        continue
      if (attr)
        element.setAttribute("data-scrollable", attr)
      else
        element.removeAttribute("data-scrollable")
      element.toggleAttribute("data-autoscrolling", autoscrolling)
    }
  }

  function updateModeFromScroll(scrollable: MessageScrollerScrollable) {
    const scrollTop = viewportRef.current?.scrollTop ?? 0
    const scrolledUp = scrollTop < lastScrollTopRef.current - SCROLL_EPSILON
    lastScrollTopRef.current = scrollTop
    if (
      autoScrollRef.current
      && !scrollable.end
      && modeRef.current !== "settling-jump"
      && modeRef.current !== "anchored-to-message"
    ) {
      modeRef.current = "following-bottom"
    }
    else if (
      modeRef.current === "following-bottom"
      && scrollable.end
      && scrolledUp
      && !autoscrollingRef.current
    ) {
      modeRef.current = "free-scrolling"
    }
  }

  function commitScrollState() {
    const scrollable = computeScrollable({
      content: contentRef.current,
      scrollEdgeThreshold: scrollEdgeThresholdRef.current,
      spacer: spacerRef.current,
      viewport: viewportRef.current,
    })
    updateModeFromScroll(scrollable)
    const next = modeRef.current === "following-bottom"
      ? { ...scrollable, end: false }
      : scrollable
    applyScrollableAttributes(next)
    stateStore.setSnapshot(next)
  }

  function scheduleStateCommit() {
    if (stateFrameRef.current === null) {
      stateFrameRef.current = window.requestAnimationFrame(() => {
        stateFrameRef.current = null
        commitScrollState()
      })
    }
  }

  function scheduleVisibilitySync() {
    if (!visibilityStore.hasListeners())
      return
    if (visibilityFrameRef.current === null) {
      visibilityFrameRef.current = window.requestAnimationFrame(() => {
        visibilityFrameRef.current = null
        if (visibilityStore.hasListeners()) {
          visibilityStore.setSnapshot(
            computeVisibility({
              content: contentRef.current,
              scrollMargin: scrollMarginRef.current,
              scrollPreviousItemPeek: scrollPreviousItemPeekRef.current,
              spacer: spacerRef.current,
              viewport: viewportRef.current,
              visibleMessageIds: visibleMessageIdsRef.current,
            }),
          )
        }
      })
    }
  }

  // --- imperative scroll primitives ------------------------------------------

  function setAutoscrolling(active: boolean) {
    if (autoscrollingTimeoutRef.current !== null) {
      window.clearTimeout(autoscrollingTimeoutRef.current)
      autoscrollingTimeoutRef.current = null
    }
    if (autoscrollingRef.current !== active) {
      autoscrollingRef.current = active
      commitScrollState()
    }
    if (active) {
      autoscrollingTimeoutRef.current = window.setTimeout(() => {
        autoscrollingTimeoutRef.current = null
        autoscrollingRef.current = false
        commitScrollState()
      }, AUTOSCROLLING_TIMEOUT)
    }
  }

  function setSpacerHeight(height: number) {
    const spacer = spacerRef.current
    if (!spacer)
      return
    const next = Math.max(0, Math.ceil(height))
    if (spacerHeightRef.current !== next) {
      spacerHeightRef.current = next
      spacer.hidden = next === 0
      spacer.style.height = `${next}px`
      spacer.style.marginTop = next > 0 ? `${-spacerGapRef.current}px` : ""
    }
  }

  function scrollTo(
    top: number,
    { behavior = "auto", autoscrolling = false }: { behavior?: ScrollBehavior, autoscrolling?: boolean } = {},
  ) {
    const viewport = viewportRef.current
    if (!viewport)
      return
    const target = Math.max(0, top)
    if (Math.abs(viewport.scrollTop - target) <= SCROLL_EPSILON) {
      viewport.scrollTop = target
      commitScrollState()
      return
    }
    if (autoscrolling)
      setAutoscrolling(true)
    viewport.scrollTo({ top: target, behavior })
    scheduleStateCommit()
  }

  function scrollToStart({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}): boolean {
    if (!viewportRef.current)
      return false
    setSpacerHeight(0)
    streamingTurnRef.current = null
    modeRef.current = "free-scrolling"
    scrollTo(0, { behavior })
    scheduleVisibilitySync()
    return true
  }

  function scrollToEnd({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}): boolean {
    const viewport = viewportRef.current
    if (!viewport)
      return false
    setSpacerHeight(0)
    streamingTurnRef.current = null
    modeRef.current = autoScrollRef.current ? "following-bottom" : "free-scrolling"
    scrollTo(maxScrollTop(viewport), { autoscrolling: true, behavior })
    scheduleVisibilitySync()
    return true
  }

  function scrollToElement(
    element: HTMLElement,
    {
      align = "start",
      behavior = "auto",
      scrollMargin: margin = scrollMarginRef.current,
    }: MessageScrollerScrollOptions = {},
    { keepPreviousPeek = false }: { keepPreviousPeek?: boolean } = {},
  ): boolean {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport || !content.contains(element))
      return false
    const targetScrollTop = computeScrollTopForElement({
      align,
      element,
      scrollMargin: keepPreviousPeek ? margin + scrollPreviousItemPeekRef.current : margin,
      spacer: spacerRef.current,
      viewport,
    })
    const spacerHeight = computeSpacerHeight({
      content,
      scrollTop: targetScrollTop,
      spacer: spacerRef.current,
      viewport,
    })
    setSpacerHeight(spacerHeight)
    prependRestoreRef.current = { element, viewportTop: getRelativeTop(element, viewport) }
    modeRef.current = keepPreviousPeek ? "anchored-to-message" : "settling-jump"
    streamingTurnRef.current = keepPreviousPeek ? element : null
    scrollTo(targetScrollTop, { behavior })
    scheduleVisibilitySync()
    return true
  }

  function reanchorToAnchoredMessage(): boolean {
    const element = streamingTurnRef.current
    if (!element || !element.isConnected || modeRef.current !== "anchored-to-message")
      return false
    return scrollToElement(element, { align: "start" }, { keepPreviousPeek: true })
  }

  function scrollToMessage(
    messageId: string,
    options?: MessageScrollerScrollOptions,
  ): boolean {
    const element = messageElementsRef.current.get(messageId)
    if (element) {
      defaultScrollPositionAppliedRef.current = true
      if (scrollToElement(element, options)) {
        pendingScrollToMessageRef.current = null
        return true
      }
      pendingScrollToMessageRef.current = { messageId, options }
      return true
    }
    if (itemCountRef.current === 0) {
      pendingScrollToMessageRef.current = { messageId, options }
      defaultScrollPositionAppliedRef.current = true
      return true
    }
    return false
  }

  function flushPendingScrollToMessage(): boolean {
    const pending = pendingScrollToMessageRef.current
    if (!pending)
      return false
    const element = messageElementsRef.current.get(pending.messageId)
    if (!element || !scrollToElement(element, pending.options))
      return false
    pendingScrollToMessageRef.current = null
    defaultScrollPositionAppliedRef.current = true
    return true
  }

  // --- prepend preservation --------------------------------------------------

  function applyPrependRestore(): boolean {
    const restore = prependRestoreRef.current
    const viewport = viewportRef.current
    if (!restore || !viewport || !restore.element.isConnected)
      return false
    const delta = getRelativeTop(restore.element, viewport) - restore.viewportTop
    if (Math.abs(delta) <= SCROLL_EPSILON)
      return false
    viewport.scrollTop += delta
    restore.viewportTop = getRelativeTop(restore.element, viewport)
    scheduleStateCommit()
    scheduleVisibilitySync()
    return true
  }

  function capturePrependAnchor() {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport) {
      prependRestoreRef.current = null
      return
    }
    const element = findFirstVisibleMessage({ content, spacer: spacerRef.current, viewport })
    prependRestoreRef.current = element
      ? { element, viewportTop: getRelativeTop(element, viewport) }
      : null
  }

  function schedulePrependFlush() {
    if (pendingScrollFrameRef.current === null) {
      pendingScrollFrameRef.current = window.requestAnimationFrame(() => {
        pendingScrollFrameRef.current = null
        if (flushPendingScrollToMessage())
          capturePrependAnchor()
      })
    }
  }

  // --- default scroll position -----------------------------------------------

  function applyDefaultScrollPosition(): boolean {
    if (
      !defaultScrollPosition
      || defaultScrollPositionAppliedRef.current
      || itemCountRef.current === 0
    ) {
      return false
    }
    let applied = false
    if (defaultScrollPosition === "last-anchor") {
      const content = contentRef.current
      const viewport = viewportRef.current
      const lastAnchor = content && viewport
        ? findLastAnchor(getMessageChildren(content, spacerRef.current))
        : null
      if (!content || !viewport || !lastAnchor) {
        applied = scrollToEnd({ behavior: "auto" })
      }
      else {
        const anchorOffset = getElementOffsetTop(lastAnchor, viewport)
        const contentHeight = measureContentHeight({
          content,
          spacer: spacerRef.current,
          viewport,
        })
        applied = contentHeight - anchorOffset <= viewport.clientHeight
          ? scrollToEnd({ behavior: "auto" })
          : scrollToElement(lastAnchor, { align: "start" }, { keepPreviousPeek: true })
      }
    }
    else {
      applied = defaultScrollPosition === "end"
        ? scrollToEnd({ behavior: "auto" })
        : scrollToStart({ behavior: "auto" })
    }
    if (applied) {
      defaultScrollPositionAppliedRef.current = true
      return true
    }
    return false
  }

  // --- content / resize handling ---------------------------------------------

  function handleContentChange() {
    const content = contentRef.current
    if (!content)
      return
    const children = getMessageChildren(content, spacerRef.current)
    const previousCount = itemCountRef.current
    const previousFirst = firstItemRef.current
    itemCountRef.current = children.length
    firstItemRef.current = children[0] ?? null

    ;(() => {
      if (flushPendingScrollToMessage())
        return
      if (previousCount === 0) {
        if (
          applyDefaultScrollPosition()
          || (children.length > 0 && autoScrollRef.current && scrollToEnd({ behavior: "auto" }))
        ) {
          return
        }
        commitScrollState()
        scheduleVisibilitySync()
        return
      }
      const previousIndex = previousFirst ? children.indexOf(previousFirst) : -1
      if (preserveScrollOnPrependRef.current && previousIndex > 0) {
        applyPrependRestore()
        return
      }
      if (children.length > previousCount) {
        const anchor = findFirstAnchorFrom(children, previousCount)
        if (anchor) {
          if (
            autoScrollRef.current
            && modeRef.current === "following-bottom"
            && hasMultipleAnchorsFrom(children, previousCount)
          ) {
            scrollToEnd({ behavior: "auto" })
            return
          }
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
          handledScrollAnchorsRef.current.add(anchor)
          return
        }
      }
      if (children.length === previousCount) {
        const anchor = findFirstUnhandledAnchor(children, handledScrollAnchorsRef.current)
        if (anchor) {
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
          handledScrollAnchorsRef.current.add(anchor)
          return
        }
      }
      if (modeRef.current === "following-bottom" && autoScrollRef.current) {
        scrollToEnd({ behavior: "auto" })
      }
      else {
        commitScrollState()
        scheduleVisibilitySync()
      }
    })()

    capturePrependAnchor()
  }

  function handleResize() {
    if (modeRef.current === "following-bottom" && autoScrollRef.current) {
      scrollToEnd({ behavior: "auto" })
      return
    }
    const previousStartScrollable = stateStore.getSnapshot().start
    if (reanchorToAnchoredMessage()) {
      if (
        autoScrollRef.current
        && previousStartScrollable
        && !stateStore.getSnapshot().start
      ) {
        scrollToEnd({ behavior: "auto" })
      }
      return
    }
    scheduleStateCommit()
    scheduleVisibilitySync()
  }

  // --- visibility observation ------------------------------------------------

  function observeVisibility() {
    const viewport = viewportRef.current
    if (!viewport || !visibilityStore.hasListeners())
      return
    if (typeof IntersectionObserver === "undefined") {
      scheduleVisibilitySync()
      return
    }
    if (!visibilityObserverRef.current) {
      visibilityObserverRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const messageId = (entry.target as HTMLElement).dataset.messageId
            if (!messageId)
              continue
            if (entry.isIntersecting)
              visibleMessageIdsRef.current.add(messageId)
            else
              visibleMessageIdsRef.current.delete(messageId)
          }
          scheduleVisibilitySync()
        },
        {
          root: viewport,
          rootMargin: `${-(scrollMarginRef.current + scrollPreviousItemPeekRef.current)}px 0px 0px 0px`,
          threshold: [0, 0.01, 0.5, 1],
        },
      )
    }
    messageElementsRef.current.forEach((element) => {
      visibilityObserverRef.current?.observe(element)
    })
    scheduleVisibilitySync()
  }

  function unobserveVisibility() {
    if (visibilityFrameRef.current !== null) {
      window.cancelAnimationFrame(visibilityFrameRef.current)
      visibilityFrameRef.current = null
    }
    visibilityObserverRef.current?.disconnect()
    visibilityObserverRef.current = null
    visibleMessageIdsRef.current.clear()
    visibilityStore.setSnapshot(EMPTY_VISIBILITY)
  }

  const registerMessage: RegisterMessage = (messageId, element, previousElement) => {
    if (element) {
      messageElementsRef.current.set(messageId, element)
      visibilityObserverRef.current?.observe(element)
      scheduleVisibilitySync()
      if (pendingScrollToMessageRef.current?.messageId === messageId)
        schedulePrependFlush()
      return
    }
    if (previousElement && messageElementsRef.current.get(messageId) === previousElement) {
      messageElementsRef.current.delete(messageId)
      visibleMessageIdsRef.current.delete(messageId)
      visibilityObserverRef.current?.unobserve(previousElement)
      scheduleVisibilitySync()
    }
  }

  // --- user intent + element setters -----------------------------------------

  function userScrollIntent() {
    if (
      modeRef.current === "following-bottom"
      || modeRef.current === "anchored-to-message"
      || modeRef.current === "settling-jump"
    ) {
      streamingTurnRef.current = null
      modeRef.current = "free-scrolling"
    }
  }

  function reapplyAttributes() {
    applyScrollableAttributes(stateStore.getSnapshot())
  }

  function setRootElement(element: HTMLElement | null) {
    rootRef.current = element
    if (element)
      reapplyAttributes()
  }

  function setViewportElement(element: HTMLElement | null) {
    viewportRef.current = element
    if (element) {
      reapplyAttributes()
      // A visibility consumer may have subscribed before the viewport mounted,
      // in which case observeVisibility() bailed out. Retry now it exists.
      observeVisibility()
    }
  }

  function setContentElement(element: HTMLElement | null) {
    contentRef.current = element
  }

  function setSpacerElement(element: HTMLElement | null) {
    spacerRef.current = element
    spacerGapRef.current = getRowGap(element?.parentElement ?? null)
  }

  function syncAfterScroll() {
    commitScrollState()
    scheduleVisibilitySync()
    capturePrependAnchor()
  }

  function onAutoScrollChange() {
    if (autoScrollRef.current && modeRef.current === "following-bottom" && itemCountRef.current > 0) {
      scrollToEnd({ behavior: "auto" })
      return
    }
    commitScrollState()
  }

  function destroy() {
    if (stateFrameRef.current !== null) {
      window.cancelAnimationFrame(stateFrameRef.current)
      stateFrameRef.current = null
    }
    if (visibilityFrameRef.current !== null) {
      window.cancelAnimationFrame(visibilityFrameRef.current)
      visibilityFrameRef.current = null
    }
    if (autoscrollingTimeoutRef.current !== null) {
      window.clearTimeout(autoscrollingTimeoutRef.current)
      autoscrollingTimeoutRef.current = null
    }
    if (pendingScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(pendingScrollFrameRef.current)
      pendingScrollFrameRef.current = null
    }
    visibilityObserverRef.current?.disconnect()
    visibilityObserverRef.current = null
  }

  const context: MessageScrollerContext = {
    handleContentChange,
    handleResize,
    observeVisibility,
    preserveScrollOnPrependRef,
    scrollToEnd,
    scrollToMessage,
    scrollToStart,
    setContentElement,
    setRootElement,
    setSpacerElement,
    setViewportElement,
    stateStore,
    syncAfterScroll,
    unobserveVisibility,
    userScrollIntent,
    viewportRef,
    visibilityStore,
    applyDefaultScrollPosition,
    onAutoScrollChange,
  }

  return {
    context,
    registerMessage,
    destroy,
    setProps(next: Required<MessageScrollerProviderProps>) {
      autoScrollRef.current = next.autoScroll
      scrollEdgeThresholdRef.current = next.scrollEdgeThreshold
      scrollMarginRef.current = next.scrollMargin
      scrollPreviousItemPeekRef.current = next.scrollPreviousItemPeek
    },
  }
}

// -----------------------------------------------------------------------------
// Provider wiring (provide/inject)
// -----------------------------------------------------------------------------

export function provideMessageScroller(props: Required<MessageScrollerProviderProps>) {
  const engine = createEngine(props)
  provide(CONTEXT_KEY, engine.context)
  provide(REGISTER_KEY, engine.registerMessage)
  if (getCurrentInstance())
    onUnmounted(() => engine.destroy())
  return engine
}

export function useMessageScrollerContext(): MessageScrollerContext {
  const context = inject(CONTEXT_KEY, null)
  if (!context)
    throw new Error("useMessageScroller must be used within a MessageScroller.")
  return context
}

export function useMessageScrollerRegister(): RegisterMessage {
  const register = inject(REGISTER_KEY, null)
  if (!register)
    throw new Error("MessageScrollerItem must be used within a MessageScroller.")
  return register
}

// -----------------------------------------------------------------------------
// Public composables
// -----------------------------------------------------------------------------

function useStore<T>(
  store: Store<T>,
  subscribe: (listener: () => void) => () => void,
): Ref<T> {
  const state = shallowRef(store.getSnapshot())
  const unsubscribe = subscribe(() => {
    state.value = store.getSnapshot()
  })
  if (getCurrentInstance())
    onUnmounted(unsubscribe)
  return state
}

export function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScrollerContext()
  return { scrollToEnd, scrollToMessage, scrollToStart }
}

export function useMessageScrollerScrollable(): Ref<MessageScrollerScrollable> {
  const { stateStore } = useMessageScrollerContext()
  return useStore(stateStore, listener => stateStore.subscribe(listener))
}

export function useMessageScrollerVisibility(): Ref<MessageScrollerVisibilityState> {
  const { observeVisibility, unobserveVisibility, visibilityStore } = useMessageScrollerContext()
  return useStore(visibilityStore, listener =>
    visibilityStore.subscribe(listener, observeVisibility, unobserveVisibility))
}

export const DEFAULTS = {
  scrollEdgeThreshold: DEFAULT_SCROLL_EDGE_THRESHOLD,
  scrollPreviousItemPeek: DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
  scrollMargin: DEFAULT_SCROLL_MARGIN,
}

export { SCROLL_KEYS }
