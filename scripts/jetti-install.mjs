#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = args.root || process.cwd()
  const install = args.snippet
    ? {
      snippetCode: args.snippet,
      reviewerLink: requireArg(args['reviewer-link'], '--reviewer-link'),
    }
    : await fetchAgentInstall(args)
  const target = path.join(root, 'index.html')
  const html = await readFile(target, 'utf8')
  const nextHtml = installSnippet(html, install.snippetCode)

  if (nextHtml !== html) {
    await writeFile(target, nextHtml)
  }

  process.stdout.write([
    nextHtml === html ? 'Jetti already installed.' : 'Jetti installed.',
    `Reviewer link: ${install.reviewerLink}`,
    `Changed file: ${target}`,
    '',
  ].join('\n'))
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index]
    if (!key || !key.startsWith('--')) continue
    const value = argv[index + 1]
    if (!value || value.startsWith('--')) {
      args[key.slice(2)] = 'true'
      continue
    }
    args[key.slice(2)] = value
    index += 1
  }
  return args
}

function requireArg(value, label) {
  if (!value) {
    throw new Error(`${label} is required`)
  }
  return value
}

async function fetchAgentInstall(args) {
  const apiOrigin = requireArg(args['api-origin'], '--api-origin').replace(/\/+$/, '')
  const response = await fetch(`${apiOrigin}/api/agent-installs`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      targetUrl: requireArg(args['target-url'], '--target-url'),
      sessionName: requireArg(args['session-name'], '--session-name'),
      creatorEmail: requireArg(args['creator-email'], '--creator-email'),
      ...(args['reviewer-email'] ? { reviewerEmail: args['reviewer-email'] } : {}),
    }),
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body && body.error ? body.error : `Jetti install request failed with ${response.status}`)
  }
  if (!body.snippetCode || !body.reviewerLink) {
    throw new Error('Jetti install response must include snippetCode and reviewerLink')
  }
  return body
}

function installSnippet(html, snippet) {
  const session = extractSession(snippet)
  if (session && html.includes(`data-jetti-session="${session}"`)) {
    return html
  }
  if (html.includes(snippet)) {
    return html
  }

  const formattedSnippet = `\n    ${snippet}\n`
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${formattedSnippet}</head>`)
  }
  if (/<body[^>]*>/i.test(html)) {
    return html.replace(/<body[^>]*>/i, (match) => `${match}${formattedSnippet}`)
  }
  return `${html.trimEnd()}${formattedSnippet}`
}

function extractSession(snippet) {
  return snippet.match(/data-jetti-session="([^"]+)"/)?.[1] ?? ''
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
