---
title: Typography
description: Styles for headings, paragraphs, lists...etc
---

## H1

# The Joke Tax Chronicles

## H2

## The People of the Kingdom

## H3

### The Joke Tax

## H4

#### People stopped telling jokes

## P

The king, seeing how much happier his subjects were, realized that the joke tax was a terrible idea.

## Blockquote

> After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege.

## Table

| King's Treasury | People's happiness |
| --------------- | ------------------ |
| Empty           | Overflowing        |
| Modest          | Satisfied          |
| Full            | Ecstatic           |

## List

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

## Inline code

You can use the `joke()` function to add humor to your content.

## Lead

<p class="text-xl text-muted-foreground">
  A modal dialog that interrupts the user with important content and expects a response.
</p>

## Large

<div class="text-lg">Are you absolutely sure?</div>

## Small

<small class="text-sm font-medium leading-none">Email address</small>

## Muted

<p class="text-sm text-muted-foreground">Enter your email address.</p>

## Installation

Add the following to your CSS file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl;
  }

  h2 {
    @apply scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0;
  }

  h3 {
    @apply scroll-m-20 text-2xl font-semibold tracking-tight;
  }

  h4 {
    @apply scroll-m-20 text-xl font-semibold tracking-tight;
  }

  p {
    @apply leading-7 [&:not(:first-child)]:mt-6;
  }

  blockquote {
    @apply mt-6 border-l-2 pl-6 italic;
  }

  ul {
    @apply my-6 ml-6 list-disc [&>li]:mt-2;
  }

  ol {
    @apply my-6 ml-6 list-decimal [&>li]:mt-2;
  }

  code {
    @apply relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold;
  }

  .lead {
    @apply text-xl text-muted-foreground;
  }

  .large {
    @apply text-lg font-semibold;
  }

  .small {
    @apply text-sm font-medium leading-none;
  }

  .muted {
    @apply text-sm text-muted-foreground;
  }
}
```

## Usage

### H1

```vue
<h1>The Joke Tax Chronicles</h1>
```

### H2

```vue  
<h2>The People of the Kingdom</h2>
```

### H3

```vue
<h3>The Joke Tax</h3>
```

### H4

```vue
<h4>People stopped telling jokes</h4>
```

### P

```vue
<p>
  The king, seeing how much happier his subjects were, realized that the joke
  tax was a terrible idea.
</p>
```

### Blockquote

```vue
<blockquote>
  After all," he said, "everyone enjoys a good joke, so it's only fair that they
  should pay for the privilege.
</blockquote>
```

### List

```vue
<ul>
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners : 20 gold coins</li>
</ul>
```

### Inline code

```vue
<p>
  You can use the <code>joke()</code> function to add humor to your content.
</p>
```

### Lead

```vue
<p class="text-xl text-muted-foreground">
  A modal dialog that interrupts the user with important content and expects
  a response.
</p>
```

### Large

```vue
<div class="text-lg">Are you absolutely sure?</div>
```

### Small

```vue
<small class="text-sm font-medium leading-none">Email address</small>
```

### Muted

```vue
<p class="text-sm text-muted-foreground">Enter your email address.</p>
```
