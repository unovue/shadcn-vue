---
title: Rendering Large Data
description: In some cases, you may need to render a large amount of data. This can be done using the useVirtualList Component from VueUse library to render only the visible items. This can help to improve performance.
sidebar: false
---

## How to render large data

When you have a large amount of data to render, you can use the [useVirtualList](https://vueuse.org/core/useVirtualList/#usevirtuallist) Component from [VueUse](https://vueuse.org/) library to render only the visible items. This can help to improve performance.

`useVirtualList` waiting for a `MaybeRef<T[]>` so firstly you need to wrap your data with `ref` or `computed` function. So we will convert our `table.getRowModel().rows` to `computed` function.

<<< @/examples/big-data/components/DataTable.vue#tableRows{ts}

Next step is to create a `useVirtualList` instance and pass our `tableRows` to it. For better experience list elements must be same height, which you define inside `itemHeight` property. `overscan` property is used to define how many items should be rendered outside of the visible area.

<<< @/examples/big-data/components/DataTable.vue#useVirtualList{2-3 ts}

## Example

Here is an example of how to use `useVirtualList` to render a large amount of data. For test purposes, we will use 2000 rows for our table, you can change statuses, priorities, and view to see speed difference.

<script setup>
import BigDataExample from "@/examples/big-data/Example.vue"
</script>

<Suspense>
    <BigDataExample />
</Suspense>
