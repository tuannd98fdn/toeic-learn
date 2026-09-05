---
name: implement
description: Implement an approved plan with the smallest correct diff.
---

# Implement

Implement the approved plan.

## Hard rules
1. Read before writing.
2. Follow the existing architecture.
3. Prefer existing code over new abstractions.
4. Make the smallest change that satisfies the requirement.
5. Do not change unrelated files.
6. Do not refactor unrelated code.
7. Do not add speculative features.
8. Do not add defensive code without a demonstrated failure mode.
9. Do not add comments that merely describe the code.
10. Do not create helpers used only once unless they materially improve clarity.
11. Do not duplicate existing utilities.
12. Do not change public APIs unless required.
13. Preserve existing behavior outside the requested change.

## Before editing
Check:
- relevant files
- relevant tests
- existing patterns
- project conventions

## While editing
Prefer:
existing function > new function
existing module > new module
existing dependency > new dependency
existing pattern > new pattern
small diff > elegant rewrite

## After editing
Run the narrowest useful checks first. Then:
- inspect git diff
- inspect git status
- run relevant tests
- run typecheck/lint when applicable

Never claim success without verification.

## Stop condition
STOP when:
1. requirement is satisfied
2. tests pass
3. typecheck/lint passes where applicable
4. diff contains no unrelated changes

Do not continue improving the code after the stop condition.
