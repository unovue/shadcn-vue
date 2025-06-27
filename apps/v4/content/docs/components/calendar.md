---
title: Calendar
description: A date field component that allows users to enter and edit date.
component: true
links:
  doc: https://reka-ui.com/docs/components/calendar
  api: https://reka-ui.com/docs/components/calendar#api-reference
---

::component-preview
---
name: CalendarDemo
description: A calendar component.
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
npx shadcn-vue@latest add calendar
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
import { Calendar } from "@/components/ui/calendar"
```

```vue showLineNumbers
<Calendar />
```
