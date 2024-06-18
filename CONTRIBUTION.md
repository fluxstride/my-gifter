# Contributing to My-Gifter

First off, thanks for taking the time to contribute! ❤️

## **Linting**

Linting is the automated checking of a source code for programmatic and stylistic errors. This is done by using a lint tool (otherwise known as linter). A lint tool is a basic static code analyzer. Linting is important to reduce errors and improve the overall quality of our code.

This project uses the [Airbnb code style](https://airbnb.io/projects/javascript/).
A code style is set of conventions (sometimes arbitrary) about how to write code for that project. It is much easier to understand a large codebase when all the code in it is in a consistent style.

#

#

## Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](https://github.com/fluxstride/my-gifter/issues/new) to our [GitHub Repository](https://github.com/fluxstride/my-gifter). Even better, you can
[submit a Pull Request](https://github.com/fluxstride/my-gifter/compare) with a fix.

#

#

## Missing a Feature?

You can _request_ a new feature by [submitting an issue](https://github.com/fluxstride/my-gifter/issues/new) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](https://github.com/fluxstride/my-gifter/compare).

#

#

## **Commit Guide**

This project uses Commitlint to ensure commits messages follow a particular convention using the [Conventional Commits](https://www.conventionalcommits.org). If you're totally new to this convention, that's totally fine.

The commit message should be structured as follows:

```shell
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#

> _Commit CheatSheet_

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm, pnpm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#

> _Sample Commit Messages_

- `feat: Added a new feature` := `feat` is used here because the feature was non-existent before the commit.

#

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

#

#

## **Dev Contribution Guide**

1. Fork the repository

#

2. Clone the forked repository and then open it up on your prefered code editor

#

3. Open your terminal & set the upstream branch:

```shell
git remote add upstream https://github.com/fluxstride/my-gifter.git
```

#

4. Pull upstream

```shell
git checkout staging && git pull upstream staging
```

#

5. Create a new branch for the user story you're working on eg :

```shell
git checkout -b feat-my-feature
```

#

6. After making changes, do

```shell
git commit -m "your commit message"
```

#

8. To make sure there are no conflicts:

```shell
git pull upstream staging
```

#

9. Push changes to your new branch :

```shell
git push origin feat-my-feature
```

#

10. Create a pull request to the `staging` branch.

#

#

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/fluxstride/my-gifter/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Fork the fluxstride/my-gifter repo.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b my-feature-branch staging
   ```

1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](https://www.conventionalcommits.org).

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```shell
   git push origin my-feature-branch
   ```

1. In GitHub, send a pull request to `my-gifter:staging`.

- If we suggest changes then:

  - Make the required updates.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase staging -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-feature-branch
  ```

- Check out the master branch:

  ```shell
  git checkout staging -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-feature-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream staging
  ```
