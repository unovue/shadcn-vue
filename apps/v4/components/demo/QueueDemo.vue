<script setup lang="ts">
import {
  CircleCheckIcon,
  CircleDotIcon,
  CircleIcon,
  ListChecksIcon,
  ListTodoIcon,
} from '@lucide/vue'
import { promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

interface Todo {
  content: string
  status: 'pending' | 'in_progress' | 'completed'
}

const QUESTION = 'Add dark mode to the settings page.'
const ANSWER = 'Dark mode is in. The toggle is under Settings, Appearance.'

const TODOS = [
  'Add a dark variant to the theme tokens',
  'Read the theme from a cookie',
  'Add a toggle to the settings page',
  'Check contrast on the charts',
]

function todosAt(current: number): Todo[] {
  return TODOS.map((content, index) => ({
    content,
    status: index < current
      ? 'completed'
      : index === current
        ? 'in_progress'
        : 'pending',
  }))
}

// The last writeTodos call. Each call sends the whole list.
const todos = ref<Todo[] | undefined>(todosAt(TODOS.length))
const text = ref(ANSWER)
const busy = ref(false)

const sections = computed(() => {
  const list = todos.value ?? []
  const pending = list.filter(todo => todo.status !== 'completed')
  const completed = list.filter(todo => todo.status === 'completed')

  return [
    { id: 'pending', icon: ListTodoIcon, title: `${pending.length} to do`, todos: pending },
    { id: 'completed', icon: ListChecksIcon, title: `${completed.length} completed`, todos: completed },
  ].filter(section => section.todos.length > 0)
})

// Unmounting bumps `run`, so a running script stops at its next wait.
let run = 0
tryOnScopeDispose(() => run++)

async function wait(ms: number, id: number) {
  await promiseTimeout(ms)
  return id === run
}

async function replay() {
  const id = ++run
  busy.value = true
  todos.value = undefined
  text.value = ''

  for (let index = 0; index < TODOS.length; index++) {
    todos.value = todosAt(index)
    if (!(await wait(1400, id)))
      return
  }
  todos.value = todosAt(TODOS.length)

  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id)))
      return
    text.value += word
  }

  busy.value = false
}
</script>

<template>
  <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <Message align="end">
      <MessageContent>
        <Bubble align="end" variant="muted">
          <BubbleContent>{{ QUESTION }}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message v-if="todos || text">
      <MessageContent class="gap-4">
        <Trace v-if="todos">
          <TraceCollapsible
            v-for="section in sections"
            :key="section.id"
            default-open
          >
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <component :is="section.icon" />
                </TraceIcon>
                <TraceTitle>{{ section.title }}</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <TraceLine
                  v-for="todo in section.todos"
                  :key="todo.content"
                  :status="busy && todo.status === 'in_progress' ? 'running' : undefined"
                >
                  <TraceIcon>
                    <CircleCheckIcon v-if="todo.status === 'completed'" />
                    <CircleDotIcon v-else-if="todo.status === 'in_progress'" />
                    <CircleIcon v-else />
                  </TraceIcon>
                  <TraceTitle>{{ todo.content }}</TraceTitle>
                </TraceLine>
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
        <p v-if="text">
          {{ text }}
        </p>
      </MessageContent>
    </Message>
    <Button
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="replay"
    >
      Replay
    </Button>
  </div>
</template>
