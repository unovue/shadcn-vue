---
title: Toggle
description: A two-state button that can be either on or off.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle
  api: https://reka-ui.com/docs/components/toggle#api-reference
---

::component-preview
---
name: ToggleDemo
description: A toggle component.
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
npx shadcn-vue@latest add toggle
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
import { Toggle } from "@/components/ui/toggle"
```

```vue showLineNumbers
<Toggle>Toggle</Toggle>
```
