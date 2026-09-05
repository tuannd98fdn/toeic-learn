---
name: plan
description: Create the smallest implementation plan that satisfies the requirement.
---

# Minimal Plan

Create the smallest plan that fully satisfies the requirement.

## Rules
1. Reuse existing abstractions.
2. Reuse existing patterns.
3. Do not introduce a new abstraction unless necessary.
4. Do not redesign unrelated code.
5. Do not refactor unrelated code.
6. Prefer one change over multiple changes.
7. Prefer existing files over creating new files.
8. Every planned change must map to a requirement.
9. Every requirement must map to a verification.

## Before planning
Determine:
- What behavior is required?
- Where does that behavior currently live?
- What is the closest existing pattern?
- What is the smallest possible change?

## Output
### Goal
One sentence.

### Changes
Numbered list, maximum 7 items.

### Verification
Exact tests/checks to run.

### Non-goals
Explicitly list things that must NOT be changed.
Do not output implementation code.
