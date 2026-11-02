import type { GrammarState } from 'shiki/core'
import type { MaybeRefOrGetter } from 'vue'
import type { HighlightedToken, Highlighter } from './highlighter'
import { computed, shallowRef, toValue, watch } from 'vue'
import { loadHighlighter } from './highlighter'

export function useHighlightedCode(
  value: MaybeRefOrGetter<string>,
  language: MaybeRefOrGetter<string>,
) {
  const highlighter = shallowRef<Highlighter | null>(null)

  watch(() => toValue(language), (lang, _, onCleanup) => {
    // Highlighting runs in the browser. The server renders the plain lines.
    if (typeof window === 'undefined')
      return

    let cancelled = false
    onCleanup(() => (cancelled = true))
    highlighter.value = null

    loadHighlighter(lang)
      .then((next) => {
        if (!cancelled)
          highlighter.value = next
      })
      .catch(() => {})
  }, { immediate: true })

  // The complete lines, highlighted. While the code streams, only the new
  // lines are tokenized, starting from the grammar state of the last one.
  let done: {
    highlighter: Highlighter | null
    text: string
    lines: HighlightedToken[][]
    state?: GrammarState
  } = { highlighter: null, text: '', lines: [] }

  return computed<HighlightedToken[][]>(() => {
    const raw = toValue(value)
    // A trailing newline would render as an extra empty line.
    const code = raw.endsWith('\n') ? raw.slice(0, -1) : raw
    const current = highlighter.value

    if (!current)
      return code.split('\n').map(line => (line ? [{ content: line }] : []))

    if (done.highlighter !== current || !code.startsWith(done.text))
      done = { highlighter: current, text: '', lines: [] }

    const end = code.lastIndexOf('\n') + 1

    if (end > done.text.length) {
      const result = current.highlight(
        code.slice(done.text.length, end - 1),
        done.state,
      )

      done = {
        highlighter: current,
        text: code.slice(0, end),
        lines: [...done.lines, ...result.lines],
        state: result.state,
      }
    }

    // The last line is still being written, so it is tokenized on every change.
    const tail = current.highlight(code.slice(end), done.state).lines[0] ?? []

    return [...done.lines, tail]
  })
}
