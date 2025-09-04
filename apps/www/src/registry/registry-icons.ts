export const iconLibraries = {
  lucide: {
    name: "lucide-vue-next",
    package: "lucide-vue-next",
    import: "lucide-vue-next",
  },
  radix: {
    name: "@radix-icons/vue",
    package: "@radix-icons/vue",
    import: "@radix-icons/vue",
  },
  tabler: {
    name: "@tabler/icons-vue",
    package: "@tabler/icons-vue",
    import: "@tabler/icons-vue",
  },
} as const

export const icons: Record<
  string,
  Record<keyof typeof iconLibraries, string>
> = {
  AlertCircle: {
    lucide: "AlertCircle",
    radix: "ExclamationTriangleIcon",
    tabler: "IconExclamationCircle",
  },
  ArrowLeft: {
    lucide: "ArrowLeft",
    radix: "ArrowLeftIcon",
    tabler: "IconArrowLeft",
  },
  ArrowRight: {
    lucide: "ArrowRight",
    radix: "ArrowRightIcon",
    tabler: "IconArrowRight",
  },
  ArrowUpDown: {
    lucide: "ArrowUpDown",
    radix: "CaretSortIcon",
    tabler: "IconArrowsSort",
  },
  BellRing: {
    lucide: "BellRing",
    radix: "BellIcon",
    tabler: "IconBellRinging",
  },
  Bold: {
    lucide: "Bold",
    radix: "FontBoldIcon",
    tabler: "IconBold",
  },
  Calculator: {
    lucide: "Calculator",
    radix: "ComponentPlaceholderIcon",
    tabler: "IconCalculator",
  },
  Calendar: {
    lucide: "Calendar",
    radix: "CalendarIcon",
    tabler: "IconCalendar",
  },
  Check: {
    lucide: "Check",
    radix: "CheckIcon",
    tabler: "IconCheck",
  },
  ChevronDown: {
    lucide: "ChevronDown",
    radix: "ChevronDownIcon",
    tabler: "IconChevronDown",
  },
  ChevronLeft: {
    lucide: "ChevronLeft",
    radix: "ChevronLeftIcon",
    tabler: "IconChevronLeft",
  },
  ChevronRight: {
    lucide: "ChevronRight",
    radix: "ChevronRightIcon",
    tabler: "IconChevronRight",
  },
  ChevronUp: {
    lucide: "ChevronUp",
    radix: "ChevronUpIcon",
    tabler: "IconChevronUp",
  },
  ChevronsUpDown: {
    lucide: "ChevronsUpDown",
    radix: "CaretSortIcon",
    tabler: "IconSelector",
  },
  Circle: {
    lucide: "Circle",
    radix: "DotFilledIcon",
    tabler: "IconCircle",
  },
  Copy: {
    lucide: "Copy",
    radix: "CopyIcon",
    tabler: "IconCopy",
  },
  CreditCard: {
    lucide: "CreditCard",
    radix: "ComponentPlaceholderIcon",
    tabler: "IconCreditCard",
  },
  GripVertical: {
    lucide: "GripVertical",
    radix: "DragHandleDots2Icon",
    tabler: "IconGripVertical",
  },
  Italic: {
    lucide: "Italic",
    radix: "FontItalicIcon",
    tabler: "IconItalic",
  },
  Loader2: {
    lucide: "Loader2",
    radix: "ReloadIcon",
    tabler: "IconLoader2",
  },
  Mail: {
    lucide: "Mail",
    radix: "EnvelopeClosedIcon",
    tabler: "IconMail",
  },
  MailOpen: {
    lucide: "MailOpen",
    radix: "EnvelopeOpenIcon",
    tabler: "IconMailOpened",
  },
  Minus: {
    lucide: "Minus",
    radix: "MinusIcon",
    tabler: "IconMinus",
  },
  Moon: {
    lucide: "Moon",
    radix: "MoonIcon",
    tabler: "IconMoon",
  },
  MoreHorizontal: {
    lucide: "MoreHorizontal",
    radix: "DotsHorizontalIcon",
    tabler: "IconDots",
  },
  PanelLeft: {
    lucide: "PanelLeft",
    radix: "ViewVerticalIcon",
    tabler: "IconLayoutSidebar",
  },
  Plus: {
    lucide: "Plus",
    radix: "PlusIcon",
    tabler: "IconPlus",
  },
  Search: {
    lucide: "Search",
    radix: "MagnifyingGlassIcon",
    tabler: "IconSearch",
  },
  Send: {
    lucide: "Send",
    radix: "PaperPlaneIcon",
    tabler: "IconSend",
  },
  Settings: {
    lucide: "Settings",
    radix: "GearIcon",
    tabler: "IconSettings",
  },
  Slash: {
    lucide: "Slash",
    radix: "SlashIcon",
    tabler: "IconSlash",
  },
  Smile: {
    lucide: "Smile",
    radix: "FaceIcon",
    tabler: "IconMoodSmile",
  },
  Sun: {
    lucide: "Sun",
    radix: "SunIcon",
    tabler: "IconSun",
  },
  Terminal: {
    lucide: "Terminal",
    radix: "RocketIcon",
    tabler: "IconTerminal",
  },
  Underline: {
    lucide: "Underline",
    radix: "UnderlineIcon",
    tabler: "IconUnderline",
  },
  User: {
    lucide: "User",
    radix: "PersonIcon",
    tabler: "IconUser",
  },
  X: {
    lucide: "X",
    radix: "Cross2Icon",
    tabler: "IconX",
  },
} as const
