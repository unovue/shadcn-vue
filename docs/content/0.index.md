---
title: Home
navigation: false
layout: page
main:
  fluid: false
---

:ellipsis{right=0px width=75% blur=150px}

::block-hero
---
cta:
  - Get started
  - /introduction/getting-started
secondary:
  - Open on GitHub →
  - https://github.com/nuxt-themes/docus
---

#title
The best place to start your documentation.

#description
Write pages in [Markdown](https://content.nuxtjs.org), use [Vue](https://vuejs.org) components and enjoy the power of [Nuxt](https://nuxt.com).

#extra
  ::list
  - **+50 Components** ready to build rich pages
  - **Docs** and **Page** layouts
  - Start from a `README`, scale to a framework documentation
  - Navigation and Table of Contents generation
  - Fully configurable design system
  - Leverages [**Typography**](https://typography.nuxt.space/) and [**Elements**](https://elements.nuxt.dev)
  - Used on [Content Documentation](https://content.nuxtjs.org)
  ::

#support
  ::terminal
  ---
  content:
  - npx nuxi@latest init -t themes/docus
  - cd docs
  - npm install
  - npm run dev
  ---
  ::
::

::card-grid
#title
What's included

#root
:ellipsis{left=0px width=40rem top=10rem blur=140px}

#default
  ::card{icon=logos:nuxt-icon}
  #title
  Nuxt Architecture
  #description
  Harness the full power of [Nuxt 3](https://v3.nuxtjs.org) and its [modules](https://modules.nuxtjs.org) ecosystem.
  ::

  ::card{icon=IconNuxtStudio}
  #title
  Nuxt Studio ready
  #description
  Edit your theme content and appearance with live-preview within [Nuxt Studio](https://nuxt.studio).
  ::

  ::card{icon=logos:vue}
  #title
  Vue Components
  #description
  Use built-in components (or your own!) inside your content.
  ::

  ::card{icon=simple-icons:markdown}
  #title
  Write Markdown
  #description
  Enjoy the ease and simplicity of Markdown and discover [MDC syntax](https://content.nuxtjs.org/guide/writing/mdc).
  ::

  ::card{icon=noto:rocket}
  #title
  Deploy anywhere
  #description
  Zero config on [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Choose between static generation, on-demand rendering (Node) or edge-side rendering on [CloudFlare workers](https://workers.cloudflare.com).
  ::

  ::card{icon=noto:puzzle-piece}
  #title
  Extensible.
  #description
  Customize the whole design, or add components using slots - you can make Docus your own.
  ::
::
