# Contributing

Thanks for your interest in contributing to shadcn-vue.com. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to the core team on [Discord](https://chat.radix-vue.com/).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.

## Structure

This repository is structured as follows:

```
apps
└── www
    ├── src
    │   └── content
    └── registry
        ├── default
        │   ├── example
        │   └── ui
        └── new-york
            ├── example
            └── ui
packages
└── cli
```

| Path                        | Description                                |
| ----------------------------| -------------------------------------------|
| `apps/www/.vitepress`       | The Vitepress application for the website. |
| `apps/www/src/content`      | The content for the website.               |
| `apps/www/src/lib/registry` | The registry for the components.           |
| `packages/cli`              | The `shadcn-vue` package.                  |

## Development

### Start by cloning the repository:

```
git clone git@github.com:radix-vue/shadcn-vue.git
```

### Install dependencies

```
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace or some of the shortcut command that we have setup.

#### Examples

1. To run the `shadcn-vue.com` website:

```
pnpm dev
```

2. To run the `shadcn-vue` cli package:

```
pnpm dev:cli
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm dev
```

Documentation is written using [md](https://vitepress.dev/guide/markdown). You can find the documentation files in the `apps/www/src/content` directory.

## Components

We use a registry system for developing components. You can find the source code for the components under `apps/www/src/lib/registry`. The components are organized by styles.

```bash
apps
└── www
    └── src
        └── lib
            └── registry
                ├── default
                │   ├── example
                │   └── ui
                └── new-york
                    ├── example
                    └── ui
```

When adding or modifying components, please ensure that:

1. You make the changes for every style.
2. You update the documentation.
3. You run `pnpm build:registry` to update the registry.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## CLI

The `shadcn-vue` package is a CLI for adding components to your project. You can find the documentation for the CLI [here](https://shadcn-vue.com/docs/cli).

Any changes to the CLI should be made in the `packages/cli` directory. If you can, it would be great if you could add tests for your changes.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
