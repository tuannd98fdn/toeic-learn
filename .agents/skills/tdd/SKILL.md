---
name: tdd
description: Use when implementing behavior with a testable boundary or fixing a reproducible bug.
---

# TDD

Use the smallest test-driven loop.

## Loop
RED → write one focused failing test
GREEN → write the minimum code required
VERIFY → run the test
REFACTOR → only if the suite is green
Repeat.

## Rules
- Test behavior, not implementation details.
- One behavior at a time.
- Do not create tests for trivial implementation details.
- Do not duplicate existing test coverage.
- Do not over-mock.
- Prefer existing test utilities.
- Never refactor while tests are red.

## Skip TDD when
- configuration-only changes
- documentation-only changes
- formatting-only changes
- mechanical migrations
- changes where an existing test already precisely covers the behavior

## Goal
Minimum tests that provide maximum confidence.
