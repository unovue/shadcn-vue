import { computed, onScopeDispose, ref, shallowRef } from 'vue'

// Shared helpers for the MessageScroller documentation demos. This is a lean
// stand-in for the ai-sdk `useChat` harness the React docs use: a scripted
// conversation that reveals a user turn instantly and streams the assistant
// reply token by token.

export type MessageAnimationId
  = | 'fade'
    | 'slide-up'
    | 'slide-side'
    | 'pop'
    | 'spring-bounce'
    | 'blur-fade'
    | 'scale-fade'

export const MESSAGE_ANIMATION_PRESETS: { id: MessageAnimationId, name: string }[] = [
  { id: 'fade', name: 'Fade' },
  { id: 'slide-up', name: 'Slide Up' },
  { id: 'slide-side', name: 'Slide Side' },
  { id: 'pop', name: 'Pop' },
  { id: 'spring-bounce', name: 'Spring Bounce' },
  { id: 'blur-fade', name: 'Blur Fade' },
  { id: 'scale-fade', name: 'Scale Fade' },
]

export type DemoRole = 'user' | 'assistant'

export interface DemoMessage {
  id: string
  role: DemoRole
  text: string
}

export type DemoStatus = 'ready' | 'streaming'

interface DemoTurn {
  role: DemoRole
  text: string
}

export interface DemoChat {
  user: (text: string) => DemoChat
  assistant: (text: string) => DemoChat
  /** No-op kept for parity with the upstream `.sleep()` builder. */
  sleep: (ms?: number) => DemoChat
  turns: DemoTurn[]
}

export function createDemoChat(): DemoChat {
  const turns: DemoTurn[] = []
  const chat: DemoChat = {
    user(text) {
      turns.push({ role: 'user', text })
      return chat
    },
    assistant(text) {
      turns.push({ role: 'assistant', text })
      return chat
    },
    sleep() {
      return chat
    },
    turns,
  }
  return chat
}

function toMessages(turns: DemoTurn[], count: number): DemoMessage[] {
  return turns.slice(0, count).map((turn, index) => ({
    id: `demo-${index}`,
    role: turn.role,
    text: turn.text,
  }))
}

export interface UseDemoChatOptions {
  /** Number of turns shown before the first send. Defaults to 0 (empty). */
  initialCount?: number
  /** Delay between streamed chunks, in ms. */
  chunkDelayMs?: number
  /** Characters revealed per chunk while streaming. */
  chunkSize?: number
}

export function useDemoChat(chat: DemoChat, options: UseDemoChatOptions = {}) {
  const { initialCount = 0, chunkDelayMs = 20, chunkSize = 3 } = options
  const turns = chat.turns

  const messages = ref<DemoMessage[]>(toMessages(turns, initialCount))
  const status = shallowRef<DemoStatus>('ready')

  let timer: ReturnType<typeof setInterval> | null = null

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // The next turn to send is the next scripted user turn after what's shown.
  const nextMessage = computed<DemoMessage | null>(() => {
    const turn = turns[messages.value.length]
    if (!turn || turn.role !== 'user')
      return null
    return { id: `demo-${messages.value.length}`, role: 'user', text: turn.text }
  })

  function streamAssistant(turn: DemoTurn, index: number) {
    const message: DemoMessage = { id: `demo-${index}`, role: 'assistant', text: '' }
    messages.value = [...messages.value, message]
    status.value = 'streaming'

    let cursor = 0
    stop()
    timer = setInterval(() => {
      cursor = Math.min(turn.text.length, cursor + chunkSize)
      const target = messages.value[messages.value.length - 1]
      if (target && target.id === message.id)
        target.text = turn.text.slice(0, cursor)
      if (cursor >= turn.text.length) {
        stop()
        status.value = 'ready'
      }
    }, chunkDelayMs)
  }

  function send() {
    if (status.value === 'streaming')
      return
    const index = messages.value.length
    const userTurn = turns[index]
    if (!userTurn || userTurn.role !== 'user')
      return
    messages.value = [
      ...messages.value,
      { id: `demo-${index}`, role: 'user', text: userTurn.text },
    ]
    const assistantTurn = turns[index + 1]
    if (assistantTurn && assistantTurn.role === 'assistant')
      streamAssistant(assistantTurn, index + 1)
  }

  function reset() {
    stop()
    status.value = 'ready'
    messages.value = toMessages(turns, initialCount)
  }

  onScopeDispose(stop)

  return { messages, status, nextMessage, send, reset }
}
