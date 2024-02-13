import { h } from 'vue'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CheckCircledIcon from '~icons/radix-icons/check-circled'
import CircleIcon from '~icons/radix-icons/circle'
import CrossCircledIcon from '~icons/radix-icons/cross-circled'
import QuestionMarkCircledIcon from '~icons/radix-icons/question-mark-circled'
import StopwatchIcon from '~icons/radix-icons/stopwatch'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(CircleIcon),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(StopwatchIcon),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircledIcon),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(CrossCircledIcon),
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: h(ArrowDownIcon),
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: h(ArrowRightIcon),
  },
  {
    label: 'High',
    value: 'high',
    icon: h(ArrowUpIcon),
  },
]
