---
title: Badge
description: Displays a badge or a component that looks like a badge.
component: true
---

::component-preview
---
name: BadgeDemo
class: '[&_.preview]:min-h-[200px]'
description: A default badge
align: center
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add badge
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the GitHub source code into your project.
    ::
    
    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
import { Badge } from "@/components/ui/badge"
```

```vue showLineNumbers
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

### Link

You can use the `as-child` prop to make another component look like a badge. Here's an example of a link that looks like a badge.

```vue showLineNumbers
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge as-child>
    <a href="#">Badge</a>
  </Badge>
</template>
```
