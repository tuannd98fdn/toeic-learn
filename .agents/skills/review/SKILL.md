---
name: review
description: Review the current diff for correctness, scope creep, unnecessary code, and spec compliance.
---

# Review

READ ONLY. Review the diff against:
1. Requirement
2. Existing architecture
3. Tests
4. Project conventions

## Check

### Correctness
- Does it actually solve the problem?
- Are edge cases handled where required?
- Could this introduce regression?

### Scope
- Is every changed line necessary?
- Are unrelated files changed?
- Is there unnecessary refactoring?

### Simplicity
- Can any code be removed without losing behavior?
- Is a new abstraction actually necessary?
- Is existing functionality duplicated?

### Architecture
- Does it follow existing patterns?
- Does it introduce unnecessary coupling?
- Does it create a new dependency unnecessarily?

### Tests
- Does the test prove behavior?
- Is coverage missing for an important requirement?

## Severity
BLOCKER
- Incorrect behavior
- Regression
- Security issue
- Requirement missing

WARNING
- Unnecessary complexity
- Scope creep
- Weak test

NIT
- Style/readability only

Ignore NIT unless requested.

## Output
BLOCKER: ...
WARNING: ...
NIT: ...

VERDICT: SHIP / FIX
