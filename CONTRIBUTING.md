<!-- Adapted from shadcn-ui -->

# Contributing

Thanks for your interest in contributing to datepicker.bryanberger.dev. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@bryanberger.dev](https://www.threads.net/@bryanberger.dev).

## About this repository

This repository is a monorepo.

-   We use [npm](https://npmjs.org) and [`workspaces`](https://docs.npmjs.com/cli/v7/using-npm/workspaces) for development.
-   We use [Vite](https://vitejs.dev/) as our build system.
-   We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```any
apps
└── www
    ├── app
    ├── components
		├── icons
		├── nav
		├── ui
    ├── content
	├── config
	├── types
	├── utils
packages
└── datepicker
```

| Path                  | Description                              |
| --------------------- | ---------------------------------------- |
| `apps/www/app`        | The Next.js application for the website. |
| `apps/www/components` | The React components for the website.    |
| `apps/www/content`    | The content for the website.             |
| `apps/www/config`     | The config for the website.              |
| `apps/www/utils`      | The utility functions for the website.   |
| `packages/datepicker` | The `@bryanberger/datepicker` package.   |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/datepicker.git
```

### Navigate to project directory

```bash
cd datepicker
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
npm install
```

### Run a workspace

You can use the `--workspace=[WORKSPACE]` flag to select the workspace you want work with.

#### Examples

To run the `datepicker.bryanberger.dev` website:

```bash
npm run dev --workspace=apps/www
```

To run the `@bryanberger/datepicker` package:

```bash
npm run dev --workspace=packages/datepicker
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
npm run dev --workspace=apps/www
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `apps/www/content/docs` directory.

## Components

When adding or modifying components, please ensure that you update the documentation.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

-   `feat`: all changes that introduce completely new code or new
  features
-   `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
-   `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
-   `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
-   `test`: all changes regarding tests (adding new tests or changing existing
  ones)
-   `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
-   `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## Testing

No tests yet.
