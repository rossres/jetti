<!-- Keep this short. Reviewers will close PRs that look auto-generated. -->

## What

<!-- One sentence: what does this PR change? -->

## Why

<!-- One or two sentences: what problem does it solve? Link an issue if there is one. -->

## How to verify

<!--
A reviewer should be able to copy-paste these steps. Examples:

- `node --check scripts/jetti-install.mjs`
- Open `docs/index.html` in a browser and verify it still renders correctly
- Run the install CLI against a test directory: `node scripts/jetti-install.mjs --snippet '<script ...>' --reviewer-link 'https://...' --root /tmp/test-app`
-->

## Risk and rollback

<!--
- Does this touch the install CLI behavior? Note any user-visible change.
- Does this change any URLs in the README / dev landing page? Make sure cross-links (jetti.co, the agent prompt) still resolve.
- How would we roll this back if it broke?
-->

## Checklist

- [ ] CI passes (`node --check` + required-files job)
- [ ] No new claims of features that aren't shipped (framework matrix, README, install docs)
- [ ] Cross-links to `jetti.co` and the agent prompt still resolve
