---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
links:
  doc: https://reka-ui.com/docs/components/aspect-ratio
  api: https://reka-ui.com/docs/components/aspect-ratio#api-reference
---

::component-preview
---
name: AspectRatioDemo
class: '[&_.preview]:min-h-[400px]'
description: A component that displays an image with a 16:9 aspect ratio.
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
npx shadcn-vue@latest add aspect-ratio
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
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

```vue showLineNumbers
<AspectRatio :ratio="16 / 9">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Photo by Drew Beamer"
    class="rounded-md object-cover"
  />
</AspectRatio>
```
