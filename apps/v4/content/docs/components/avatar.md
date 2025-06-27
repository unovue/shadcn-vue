---
title: Avatar
description: An image element with a fallback for representing the user.
component: true
links:
  doc: https://reka-ui.com/docs/components/avatar
  api: https://reka-ui.com/docs/components/avatar#api-reference
---

::component-preview
---
name: AvatarDemo
class: '[&_.preview]:min-h-[200px]'
description: An avatar with a fallback.
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
npx shadcn-vue@latest add avatar
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install reka-ui
    ```

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

```vue showLineNumbers
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```
