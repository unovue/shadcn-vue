<script setup lang="ts">
import {
  CircleCheckIcon,
  CircleIcon,
  ListChecksIcon,
  ListTodoIcon,
} from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const todos: { title: string, description?: string, done: boolean }[] = [
  {
    title: 'Write the migration guide',
    description: 'Cover the renamed props and the new data attributes.',
    done: true,
  },
  { title: 'Add a changeset', done: true },
  {
    title: 'Fix the focus ring on the select trigger',
    description: 'It is clipped by overflow-hidden on the field.',
    done: false,
  },
  { title: 'Update the registry snapshots', done: false },
  {
    title: 'Add tests for the combobox',
    description: 'Typing, clearing and keyboard selection.',
    done: false,
  },
]

const sections = [
  {
    id: 'pending',
    icon: ListTodoIcon,
    title: `${todos.filter(todo => !todo.done).length} to do`,
    todos: todos.filter(todo => !todo.done),
    defaultOpen: true,
  },
  {
    id: 'completed',
    icon: ListChecksIcon,
    title: `${todos.filter(todo => todo.done).length} completed`,
    todos: todos.filter(todo => todo.done),
    defaultOpen: false,
  },
]
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible
      v-for="section in sections"
      :key="section.id"
      :default-open="section.defaultOpen"
      :unmount-on-hide="false"
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
          <template v-for="todo in section.todos" :key="todo.title">
            <TraceCollapsible v-if="todo.description">
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <CircleCheckIcon v-if="todo.done" />
                    <CircleIcon v-else />
                  </TraceIcon>
                  <TraceTitle>{{ todo.title }}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                {{ todo.description }}
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceLine v-else>
              <TraceIcon>
                <CircleCheckIcon v-if="todo.done" />
                <CircleIcon v-else />
              </TraceIcon>
              <TraceTitle>{{ todo.title }}</TraceTitle>
            </TraceLine>
          </template>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
