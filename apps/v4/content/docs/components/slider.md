---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
links:
  doc: https://reka-ui.com/docs/components/slider
  api: https://reka-ui.com/docs/components/slider#api-reference
---

::component-preview
---
name: SliderDemo
description: A slider component.
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
npx shadcn-vue@latest add slider
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
import { Slider } from "@/components/ui/slider"
```

```vue showLineNumbers
<Slider :default-value="[33]" :max="100" :step="1" />
```
