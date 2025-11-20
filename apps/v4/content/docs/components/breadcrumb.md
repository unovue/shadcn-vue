---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
component: true
---

::component-preview
---
name: BreadcrumbDemo
class: '[&_.preview]:p-2'
description: A breadcrumb with a collapsible dropdown.
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
npx shadcn-vue@latest add breadcrumb
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/breadcrumb) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

## Examples

### Custom separator

Use a custom component as `children` for `<BreadcrumbSeparator />` to create a custom separator.

::component-preview
---
name: BreadcrumbCustomSeparatorDemo
---
::

```vue showLineNumbers {2,12-14}
<script setup lang="ts">
import { SlashIcon } from 'lucide-vue-next'
// ...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Dropdown
You can compose `<BreadcrumbItem />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

::component-preview
---
name: BreadcrumbDropdownDemo
---
::

```vue showLineNumbers {2-7,13-22}
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
//...
</script>

<template>
  <BreadcrumbItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        Components
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Documentation</DropdownMenuItem>
        <DropdownMenuItem>Themes</DropdownMenuItem>
        <DropdownMenuItem>GitHub</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </BreadcrumbItem>
</template>
```

----

### Collapsed

We provide a `<BreadcrumbEllipsis />` component to show a collapsed state when the breadcrumb is too long.

::component-preview
---
name: BreadcrumbCollapsedDemo
---
::

```vue showLineNumbers {2,11}
<script setup lang="ts">
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb"
//...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <!-- ... -->
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
    <!-- ... -->
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Link component
To use a custom link component from your routing library, you can use the `as-child` prop on `<BreadcrumbLink />`.

::component-preview
---
name: BreadcrumbLinkDemo
---
::

```vue showLineNumbers {2,10-12}
<script setup lang="ts">
import { NuxtLink } from '#components'
// ...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {/* ... */}
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Responsive
Here's an example of a responsive breadcrumb that composes `<BreadcrumbItem />` with `<BreadcrumbEllipsis />`, ` <DropdownMenu />`, and `<Drawer />`.

It displays a dropdown on desktop and a drawer on mobile.

::component-preview
---
name: BreadcrumbResponsiveDemo
---
::
