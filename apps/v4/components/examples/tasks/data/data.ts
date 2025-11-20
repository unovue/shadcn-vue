import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from 'lucide-vue-next'
import { h } from 'vue'

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
    icon: h(HelpCircle),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(Circle),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(Timer),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircle),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(CircleOff),
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: h(ArrowDown),
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: h(ArrowRight),
  },
  {
    label: 'High',
    value: 'high',
    icon: h(ArrowUp),
  },
]
