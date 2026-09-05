<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Coding Agent Rules

## Core principle
Make the smallest correct change.

## Mandatory
- Read relevant code before editing.
- Follow existing architecture and patterns.
- Reuse existing utilities.
- Prefer minimal diffs.
- Do not change unrelated code.
- Do not add speculative features.
- Do not introduce abstractions without need.
- Do not duplicate existing functionality.
- Verify changes before claiming completion.

## Scope
Every changed file must be justified by the requirement. If a file is not necessary, do not change it.

## Code
Prefer:
existing abstraction > existing pattern > small local change > new abstraction

Avoid:
- unnecessary wrappers
- premature generalization
- speculative error handling
- comments that narrate code
- unnecessary dependencies
- unrelated refactoring

## Testing
Test behavior. Use focused tests during implementation. Run the relevant test suite before completion.

## Completion
A task is complete only when:
1. The requirement is satisfied.
2. Relevant tests pass.
3. Typecheck/lint passes when applicable.
4. The diff contains no unrelated changes.
Then STOP.

## Output
Be concise. Report:
- what changed
- verification performed
- remaining issue, if any
Do not provide unnecessary explanations.
