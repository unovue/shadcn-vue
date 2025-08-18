import type { Component } from 'vue'

// Base UI components interface for dependency injection
export interface BaseUIComponents {
  Button: Component
  Checkbox: Component
  DropdownMenu: Component
  DropdownMenuCheckboxItem: Component
  DropdownMenuContent: Component
  DropdownMenuTrigger: Component
  Input: Component
  Select: Component
  SelectContent: Component
  SelectItem: Component
  SelectTrigger: Component
  SelectValue: Component
  Table: Component
  TableBody: Component
  TableCell: Component
  TableHead: Component
  TableHeader: Component
  TableRow: Component
}

// Extended interfaces for specific component needs
export interface AdvancedFilteringUIComponents extends BaseUIComponents {
  Badge: Component
  DropdownMenuSeparator: Component
  DropdownMenuLabel: Component
  Label: Component
  Popover: Component
  PopoverContent: Component
  PopoverTrigger: Component
  Slider: Component
}

export interface CrudActionsUIComponents extends BaseUIComponents {
  Badge: Component
  Dialog: Component
  DialogContent: Component
  DialogDescription: Component
  DialogFooter: Component
  DialogHeader: Component
  DialogTitle: Component
  DropdownMenuItem: Component
  DropdownMenuLabel: Component
  DropdownMenuSeparator: Component
  useToast: () => {
    toast: (options: { title: string; description: string }) => void
  }
}

export interface ExpandableRowsUIComponents {
  Button: Component
  Checkbox: Component
  DropdownMenu: Component
  DropdownMenuCheckboxItem: Component
  DropdownMenuContent: Component
  DropdownMenuTrigger: Component
  Input: Component
  Table: Component
  TableBody: Component
  TableCell: Component
  TableHead: Component
  TableHeader: Component
  TableRow: Component
  Badge: Component
  Card: Component
  CardContent: Component
  CardHeader: Component
  CardTitle: Component
  Separator: Component
}

export interface ServerSideUIComponents extends BaseUIComponents {
  Label: Component
}