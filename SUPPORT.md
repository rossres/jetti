# Getting help with Jetti

Quick guide to where to ask, by question type.

## I'm trying to install Jetti and something's not working

1. Read the [Quickstart in the README](./README.md#quickstart--with-an-ai-agent).
2. Check the [Framework Support matrix](./README.md#framework-support) — your stack might need a manual install via [`docs/install-recipes.md`](./docs/install-recipes.md).
3. If the install CLI errored, copy the full output and [open a bug report](https://github.com/rossres/jetti/issues/new?template=bug_report.yml). Include your framework, Node version, and the agent (Claude Code / Codex / Cursor) you used.

## I have a general question or want to discuss an idea

→ [GitHub Discussions](https://github.com/rossres/jetti/discussions). Better fit than issues for "is this the right approach?", "has anyone tried X?", or showing off a setup.

## I want to report a bug

→ [Open a bug report](https://github.com/rossres/jetti/issues/new?template=bug_report.yml). Include reproduction steps; the more reproducible, the faster the fix.

## I want to request a feature

→ Start in [Discussions](https://github.com/rossres/jetti/discussions) for early-stage ideas. When the proposal is concrete, file a [feature request](https://github.com/rossres/jetti/issues/new?template=feature_request.yml).

## I want to contribute code

→ Read [CONTRIBUTING.md](./CONTRIBUTING.md). The biggest unlocks are framework adapters (see the [`framework-adapter` issue label](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter)).

## I found a security issue

→ **Do not** open a public issue. See [SECURITY.md](./SECURITY.md) for the disclosure process.

## I want commercial support / self-hosting help

Self-hosting requires the internal app monorepo, which is not public. Email **rossres@icloud.com** with subject `[Jetti self-host inquiry]` and a sentence about your use case.

## I want to use Jetti for something legally adjacent (review a third-party site, etc.)

Don't. Jetti only runs on sites the developer installs it on. See the [Privacy and boundaries section](./README.md#privacy-and-boundaries) in the README. PRs that try to bypass this will be closed.
