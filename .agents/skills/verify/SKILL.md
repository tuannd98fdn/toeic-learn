---
name: verify
description: Prove that the requested change works before declaring completion.
---

# Verify

Never trust previous claims.

## Steps
1. Inspect git diff.
2. Inspect git status.
3. Run targeted tests.
4. Run typecheck if available.
5. Run lint if available.
6. Run broader tests when appropriate.
7. Confirm no unrelated files changed.
8. Confirm every requirement has evidence.

## Evidence table
Requirement | Evidence | Result

Do not mark PASS without command output.

## Failure
If verification fails:
- identify the failure
- determine whether it is caused by the change
- fix only the relevant issue
- rerun verification

## Final response
Only report:
- changed
- verified
- remaining issue, if any

Never claim a command passed unless it was actually executed.
