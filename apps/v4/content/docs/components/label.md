---
title: Label
description: Renders an accessible label associated with controls.
component: true
links:
  doc: https://reka-ui.com/docs/components/label
  api: https://reka-ui.com/docs/components/label#api-reference
---

::component-preview
---
name: LabelDemo
description: A label
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
npx shadcn-vue@latest add label
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
import { Label } from "@/components/ui/label"
```

```vue showLineNumbers
<Label for="email">Your email address</Label>
```
