---
title: Rendering Large Data
description: In some cases, you may need to render a large amount of data. This can be done using the useVirtualList Component from VueUse library to render only the visible items. This can help to improve performance.
sidebar: false
---

## Introduction

For Table logic we use [TanStack Table](https://tanstack.com/table/latest/) library. It's a powerful and flexible library for building tables in Vue, React and other frameworks. It's designed to be easy to use and flexible, while still providing the features you need.

## How to render large data

When you have a large amount of data to render, you can use the [useVirtualList](https://vueuse.org/core/useVirtualList/#usevirtuallist) Component from [VueUse](https://vueuse.org/) library to render only the visible items. This can help to improve performance.

`useVirtualList` waiting for a `MaybeRef<T[]>` so firstly you need to wrap your data with `ref` or `computed` function. So we will convert our `table.getRowModel().rows` to `computed` function.

<<< @/examples/big-data/components/DataTable.vue#tableRows{ts}

Next step is to create a `useVirtualList` instance and pass our `tableRows` to it. For better experience list elements must be same height, which you define inside `itemHeight` property. `overscan` property is used to define how many items should be rendered outside of the visible area.

<<< @/examples/big-data/components/DataTable.vue#useVirtualList{2-3 ts}

As you see `useVirtualList` function returns `list` object which contains `list` property with only visible items and `containerProps`, `wrapperProps` which should be passed to the container and wrapper element.

<<< @/examples/big-data/components/DataTable.vue#template{4,5,14-24 vue:line-numbers}

## Example

Here is an example of how to use `useVirtualList` to render a large amount of data. For test purposes, we will use 2000 rows for our table, you can change statuses, priorities, and view to see speed difference.

<script setup>
import BigDataExample from "@/examples/big-data/Example.vue"
</script>

<Suspense>
    <BigDataExample />
</Suspense>
