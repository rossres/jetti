# Security Policy

## Supported versions

Jetti is pre-1.0. Only the latest commit on `main` of this repo and the latest deploy of `jetti.co` are supported. There is no LTS branch yet.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Email: **rossres@icloud.com**
Subject line: `[Jetti security] <short summary>`

Please include:

- A description of the vulnerability and its impact
- Steps to reproduce, ideally a minimal proof-of-concept
- The affected commit SHA, repo, or `main` if reproduced against `jetti.co`
- Whether the issue affects the snippet runtime, the API, the install CLI, the apply CLI, or the dev landing page

## What to expect

- Acknowledgement within 3 business days.
- A target remediation window depending on severity:
  - Critical (data exfiltration, auth bypass, RCE): 7 days
  - High (privilege escalation, snippet runtime tampering): 30 days
  - Medium / Low: best effort
- Coordinated disclosure. We'll credit you in the release notes if you'd like, or keep the report anonymous if you prefer.

## Scope

In scope:

- The hosted Jetti instance at `jetti.co`
- The snippet runtime served from `jetti.co/snippet.js`
- The agent install contract: `jetti.co/install.md`, `jetti.co/.well-known/jetti-install.json`, `POST jetti.co/api/agent-installs`
- The install CLI in this repo (`scripts/jetti-install.mjs`)
- The apply CLI on npm (`npx jetti apply`)
- The developer landing at `rossres.github.io/jetti/`

Out of scope:

- Issues in third-party sites that have installed the Jetti snippet (report to that site's owner).
- Social engineering, phishing of Jetti staff, or physical security.
- Findings that require the attacker to already control the developer's repo, agent, or browser session.
- Reports that effectively ask Jetti to bypass access controls, anti-bot systems, paywalls, or third-party site protections — those will be closed as out-of-scope.
