---
title: Introduction
description: Re-usable components built with Radix Vue, and Tailwind CSS.
---

<script setup >
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'
</script>

An unofficial, community-led [Vue](https://vuejs.org/) port of [shadcn/ui](https://ui.shadcn.com). We are not affiliated with [shadcn](https://twitter.com/shadcn), but we did get his blessing before creating a Vue version of his work. This project was born out of the need for a similar project for the Vue ecosystem.

This is **NOT** a component library. It's a collection of re-usable components that you can copy and paste or use the CLI to add to your apps.

**What do you mean not a component library?**

It means you do not install it as a dependency. It is not available or distributed via npm, with no plans to publish it.

Pick the components you need. Use the CLI to automatically add the components, or copy and paste the code into your project and customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

## FAQ

<Accordion  type="multiple">

<AccordionItem value="faq-1">
<AccordionTrigger>
Why not packaged as a dependency?
</AccordionTrigger>
<AccordionContent>

The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-2">
<AccordionTrigger>
Which frameworks are supported?
</AccordionTrigger>
<AccordionContent>

This port is built to be used with Vue/Nuxt.

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-3">
<AccordionTrigger>
Can I use this in my project?
</AccordionTrigger>
<AccordionContent>
Yes. Free to use for personal and commercial projects. No attribution required.

But let us know if you do use it. We'd love to see what you build with it.
</AccordionContent>
</AccordionItem>
</Accordion>
