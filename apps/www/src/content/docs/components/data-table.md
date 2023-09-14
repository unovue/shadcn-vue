---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
---


<ComponentPreview name="DataTableDemo"  /> 

## Introduction

Every data table or datagrid I've created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/v8/docs/guide/introduction#what-is-headless-ui) provides.

So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

<Callout class="mt-4">

**Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

</Callout>