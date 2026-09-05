---
name: explore
description: Inspect the smallest relevant part of the codebase before making changes.
---

# Explore

Your job is to understand, not modify.

## Rules
1. Start from the user's requested behavior.
2. Find the existing implementation.
3. Find the closest existing pattern.
4. Find the relevant tests.
5. Identify the smallest change surface.
6. Do not inspect unrelated directories.
7. Do not read the entire repository.
8. Do not write code.

## Output
Return only:
- Relevant files
- Existing pattern
- Relevant tests
- Constraints
- Smallest likely change surface

If the existing code already supports the requirement, say so.
