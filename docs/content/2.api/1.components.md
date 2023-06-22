# Components

Discover every component you can use in your content.


## `<Alert />`

::code-group

  ::code-block{label="Preview" preview}
    ::alert{type="info" style="margin-top: 0;"}
    Check out an **info** alert with `code` and a [link](/).
    ::

    ::alert{type="success"}
    Check out a **success** alert with `code` and a [link](/).
    ::

    ::alert{type="warning"}
    Check out a **warning** alert with `code` and a [link](/).
    ::

    ::alert{type="danger" style="margin-bottom: 0;"}
    Check out a **danger** alert with `code` and a [link](/).
    ::
  ::

  ```md [Code]
  ::alert{type="info"}
  Check out an **info** alert with `code` and a [link](/).
  ::

  ::alert{type="success"}
  Check out a **success** alert with `code` and a [link](/).
  ::

  ::alert{type="warning"}
  Check out a **warning** alert with `code` and a [link](/).
  ::

  ::alert{type="danger"}
  Check out a **danger** alert with `code` and a [link](/).
  ::
  ```

::

<!-- 
::props{of="Alert"}
::
-->

::source-link
---
source: "components/content/Alert.vue"
---
::

---

## `<Badge />`

`<Badge />` support same types as `<Alert />`.

::code-group

  ::code-block{label="Preview" preview}
    ::div{style="display:flex; gap: 1rem;"}
      :badge[v1.2]

      :badge[Deprecated]{type="warning"}

      ::badge{type="danger"}
      Not found!
      ::
    ::
  ::

  ```md [Code]
  :badge[v1.2]
  
  :badge[Deprecated]{type="warning"}
  
  ::badge{type="danger"}
  Not found!
  ::
  ```

::

<!-- 
::props{of="Badge"}
::
-->

::source-link
---
source: "components/content/Badge.vue"
---
::

---

## `<BlockHero />`

::code-group

   ::code-block{label="Preview"}
    ::block-hero
    ---
    cta:
      - Get started
      - /introduction/getting-started
    secondary:
      - Open on GitHub →
      - https://github.com/nuxtlabs/docus
    snippet: npx nuxi@latest init docus-app -t nuxtlabs/docus-starter
    ---
    #title
    Document-driven framework
  
    #description
    Docus reconciles content creators and developers by offering to both the best tools to create and scale content-based websites.
    ::
   ::

   ```md [Code]
   ::block-hero
   ---
   cta:
     - Get started
     - /get-started
   secondary:
     - Open on GitHub →
     - https://github.com/nuxtlabs/docus
   snippet: npx nuxi@latest init docus-app -t nuxtlabs/docus-starter
   ---
   #title
   Document-driven framework
 
   #description
   Docus reconciles content creators and developers by offering to both the best tools to create and scale content-based websites.
   ::
   ```

::

<!-- 
::props{of="BlockHero"}
::
-->

::source-link
---
source: "components/content/BlockHero.vue"
---
::

---

## `<ButtonLink />`
::code-group

  ::code-block{label="Preview" preview}
    :button-link[Play on StackBlitz]{icon="IconStackBlitz" href="https://stackblitz.com/github/nuxtlabs/docus-starter" blank}
  ::

  ```md [Code]
  :button-link[Play on StackBlitz]{icon="IconStackBlitz" href="https://stackblitz.com/github/nuxtlabs/docus-starter" blank}
  ```

::

<!-- 
::props{of="Alert"}
::
-->

::source-link
---
source: "components/content/ButtonLink.vue"
---
::

---

## `<Callout />`

`<Callout />` support same types as `<Alert />`.

::code-group

  ::code-block{label="Preview"}
    ::callout
    #summary
    This is a callout! Click me to open.

    #content
    This is the content of the callout.
    ::

    ::callout{type="warning"}
    #summary
    This is a callout! Click me to open.

    #content
    This is the content of the callout.
    ::
  ::

   ```md [Code]
   ::callout
   #summary
   This is a callout! Click me to open.

   #content
   This is the content of the callout.
   ::
    
   ::callout{type="warning"}
   #summary
   This is a callout! Click me to open.

   #content
   This is the content of the callout.
   ::
   ```

::

<!-- 
::props{of="Callout"}
::
-->

::source-link
---
source: "components/content/Callout.vue"
---
::

---

## `<Card />`

::code-group

  ::code-block{label="Preview"}
    ::card
    ---
    icon: logos:nuxt-icon
    ---
    #title
    Nuxt Architecture.
    #description
    Based on **Nuxt 3** and **Nuxt Content**. :br
    Use Nuxt to build a static site, or a serverless app.
    ::
  ::

  ```md [Code]
   ::card{icon="logos:nuxt-icon"}
   #title
   Nuxt Architecture.
   #description
   Based on **Nuxt 3** and **Nuxt Content**. :br
   Use Nuxt to build a static site, or a serverless app.
   ::
   ```

::

<!-- 
::props{of="Card"}
::
-->

::source-link
---
source: "components/content/Card.vue"
---
::

---

## `<CardGrid />`

::code-group
  
  ::code-block{label="Preview"}
    ::card-grid
    #title
    What's included?

    #root
    :ellipsis

    #default
      ::card
      #title
      Nuxt Architecture.
      #description
      Harness the full power of Nuxt and the Nuxt ecosystem.
      ::
      ::card
      #title
      Vue Components.
      #description
      Use built-in components (or your own!) inside your content.
      ::
      ::card
      #title
      Write Markdown.
      #description
      Enjoy the ease and simplicity of Markdown and discover MDC syntax.
      ::
    ::
  ::

  ```md [Code]
  ::card-grid
  #title
  What's included

  #root
  :ellipsis

  #default
    ::card
    #title
    Nuxt Architecture.
    #description
    Harness the full power of Nuxt and the Nuxt ecosystem.
    ::
    ::card
    #title
    Vue Components.
    #description
    Use built-in components (or your own!) inside your content.
    ::
    ::card
    #title
    Write Markdown.
    #description
    Enjoy the ease and simplicity of Markdown and discover MDC syntax.
    ::
  ::
  ```

::

<!-- 
::props{of="CardGrid"}
::
-->

::source-link
---
source: "components/content/CardGrid.vue"
---
::

---

## `<CodeGroup />`

This component uses `slots` to create a tab panel of your code examples or preview.

::code-group

  ::code-block{label="Preview" preview}
    ::code-group
      ```bash [Yarn]
      yarn add docus
      ```

      ```bash [NPM]
      npm install docus
      ```
    ::
  ::

  ```md [Code]
  ::code-group
    ```bash [Yarn]
    yarn add docus
    ```
    ```bash [NPM]
    npm install docus
    ```
  ::
  ```

::

::source-link
---
source: "components/content/CodeGroup.vue"
---
::

---

## `<CodeBlock />`

To be used inside a `<CodeGroup />` component to display a preview of some rendered code.

::code-group

::code-block{label="Preview" preview}
  ::badge
  Hello World!
  ::
::

```md [Code]
/* Added as a child of `<CodeGroup />` */

::code-block{label="Preview" preview}
  ::badge
  Hello World!
  ::
::
```

::

<!-- 
::props{of="CodeBlock"}
::
-->

::source-link
---
source: "components/content/CodeBlock.vue"
---
::

---

## `<CopyButton />`


::code-group

::code-block{label="Preview" preview}
  :copy-button{content="hey!"}
::

```md [Code]
:copy-button{content="hey!"}
```

::

<!-- 
::props{of="CodeBlock"}
::
-->

::source-link
---
source: "components/content/CopyButton.vue"
---
::

---

## `<Icon />`

Icon component gives you access to all **100,000+** icons from [icones.js.org](https://icones.js.org).

::code-group

  ::code-block{label="Preview" preview}
  :icon{name="logos:nuxt-icon"}
  :icon{name="logos:vue"}
  :icon{name="logos:nuxt-icon"}
  ::

  ```md [Code]
  :icon{name="logos:nuxt-icon"}
  :icon{name="logos:vue"}
  :icon{name="logos:nuxt-icon"}
  ```

::

<!-- 
::props{of="Icon"}
::
-->

::source-link
---
source: "components/content/Icon.vue"
---
::

---

## `<List />`

::code-group

  ::code-block{label="Preview" preview}
    ::list{type="primary"}
    - **Important**
    - Always
    ::

    ::list{type="success"}
    - Amazing
    - Congrats
    ::

    ::list{type="info"}
    - Do you know?
    - You can also do this
    ::

    ::list{type="warning"}
    - Be careful
    - Use with precautions
    ::

    ::list{type="danger"}
    - Drinking too much
    - Driving drunk
    ::

  ::

  ```md [Code]
  ::list{type="primary"}
  - **Important**
  - Always
  ::

  ::list{type="success"}
  - Amazing
  - Congrats
  ::

  ::list{type="info"}
  - Do you know?
  - You can also do this
  ::

  ::list{type="warning"}
  - Be careful
  - Use with precautions
  ::

  ::list{type="danger"}
  - Drinking too much
  - Driving drunk
  ::
  ```

::

<!-- 
::props{of="List"}
::
-->

::source-link
---
source: "components/content/List.vue"
---
::

<!--
---

## `<Props />`

The props component lets you display the available props from any other component in your project.

It is powered by [nuxt-component-meta](https://github.com/nuxtlabs/nuxt-component-meta).

::code-group

  ::code-block{label="Preview" preview}
    ::props{of="Icon"}
    ::
  ::

  ```md [Code]
  ::props{of="Icon"}
  ::
  ```

::

::props{of="Props"}
::

::source-link
---
source: "components/content/Props.vue"
---
::

---
-->
## `<Sandbox />`

Embed CodeSandbox/StackBlitz easily in your documentation with great performances.

Using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to load when visible in the viewport.

::code-group

  ::code-block{label="Preview" preview}
    :sandbox{src="https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark"}
  ::

  ```md [Code]
  :sandbox{src="https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark"}
  ```

::

<!-- 
::props{of="Sandbox"}
::
-->

::source-link
---
source: "components/content/Sandbox.vue"
---
::

---

## `<Terminal />`

::code-group

  ::code-block{label="Preview" preview}
    :terminal{content="nuxi build"}
  ::

  ```md [Code]
  :terminal{content="nuxi build"}
  ```

::

<!-- 
::props{of="Terminal"}
::
-->

::source-link
---
source: "components/content/Terminal.vue"
---
::

---

## `<VideoPlayer />`

::code-group

  ::code-block{label="Preview" preview}
    ::div
      :video-player{src="https://www.youtube.com/watch?v=o9e12WbKrd8"}
    ::
  ::

  ```md [Code]
  ::div
    :video-player{src="https://www.youtube.com/watch?v=o9e12WbKrd8"}
  ::
  ```

::

<!-- 
::props{of="VideoPlayer"}
::
-->

::source-link
---
source: "components/content/VideoPlayer.vue"
---
::
