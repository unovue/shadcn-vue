# Getting Started

From your Markdown files to a deployed website in few minutes.

## Play online

You can start playing with Docus in your browser using Stackblitz:

:button-link[Play on StackBlitz]{size="small" icon="IconStackBlitz" href="https://stackblitz.com/github/nuxt-themes/docus-starter" blank}

## Create a new project

1. Start a fresh Docus project with:

```bash [npx]
npx nuxi@latest init docs -t themes/docus
```

2. Install the dependencies in the `docs` folder:

::code-group

  ```bash [npm]
  npm install
  ```

  ```bash [yarn]
  yarn install
  ```

  ```bash [pnpm]
  pnpm install --shamefully-hoist
  ```

::

3. Run the `dev` command to start Docus in development mode:

::code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm run dev
```

::

::alert{type="success"}
✨ Well done! A browser window should automatically open for <http://localhost:3000>
::
