---
title: Timeslot
description: A Timeslot component.
component: true
links:
  doc: https://reka-ui.com/docs/components/timeslot
  api: https://reka-ui.com/docs/components/timeslot#api-reference
---

::component-preview
---
name: TimeslotDemo
description: A Timeslot component for showing available time slots to choose from. The default implementation includes hours and minutes fields.
---
::

## Installation

Timeslot is built using `<ScrollArea />`.

See installation instructions for the [ScrollArea](/docs/components/scroll-area).

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
npx shadcn-vue@latest add timeslot
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install reka-ui lucide-vue-next @internationalized/date
    ```

    ::step
    Copy and paste the [Timeslot source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/timeslot) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Examples

### With Localization and Orientation Options

::component-preview
---
name: TimeslotWithOptionsDemo
description: Timeslot with 12/24-hour format and meridiem swithers.
---
::

### With Calendar

::component-preview
---
name: TimeslotWithCalendarDemo
description: A meeting scheduling component.
---
::
