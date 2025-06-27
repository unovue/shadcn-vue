---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
---

::component-preview
---
name: TextareaDemo
description: A textarea component.
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
npx shadcn-vue@latest add textarea
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
import { Textarea } from "@/components/ui/textarea"
```

```vue showLineNumbers
<Textarea placeholder="Type your message here." />
```
