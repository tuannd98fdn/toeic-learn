import json
import re

with open("/private/tmp/ets4_extract/test4.json", "r") as f:
    data = json.load(f)

segments = data.get("segments", [])

print(f"Total segments: {len(segments)}")

# Let's inspect Part 1 (Q1 - Q6)
print("\n=== PART 1 CUTS ===")
p1_markers = [
    (1, r"\bnumber 1\b"),
    (2, r"\bnumber 2\b"),
    (3, r"\bnumber 3\b"),
    (4, r"\bnumber 4\b"),
    (5, r"\bnumber 5\b"),
    (6, r"\bnumber 6\b"),
]
# Let's find segments matching each marker
for num, pat in p1_markers:
    for i, s in enumerate(segments):
        if re.search(pat, s["text"], re.IGNORECASE):
            print(f"Q{num}: seg {i} [{s['start']:.2f}s - {s['end']:.2f}s] {s['text']}")

# Let's inspect Part 2 (Q7 - Q31)
print("\n=== PART 2 CUTS ===")
for q in range(7, 32):
    pat = rf"\bnumber {q}\b"
    for i, s in enumerate(segments):
        if re.search(pat, s["text"], re.IGNORECASE):
            print(f"Q{q}: seg {i} [{s['start']:.2f}s - {s['end']:.2f}s] {s['text']}")

# Let's inspect Part 3 (Q32 - Q70)
print("\n=== PART 3 CUTS ===")
p3_starts = [32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68]
for q in p3_starts:
    pat = rf"questions? {q}"
    found = False
    for i, s in enumerate(segments):
        if re.search(pat, s["text"], re.IGNORECASE):
            print(f"P3 Set (Q{q}): seg {i} [{s['start']:.2f}s - {s['end']:.2f}s] {s['text']}")
            found = True
    if not found:
        print(f"WARNING: Q{q} not found!")

# Let's inspect Part 4 (Q71 - Q100)
print("\n=== PART 4 CUTS ===")
p4_starts = [71, 74, 77, 80, 83, 86, 89, 92, 95, 98]
for q in p4_starts:
    pat = rf"questions? {q}"
    found = False
    for i, s in enumerate(segments):
        if re.search(pat, s["text"], re.IGNORECASE):
            print(f"P4 Set (Q{q}): seg {i} [{s['start']:.2f}s - {s['end']:.2f}s] {s['text']}")
            found = True
    if not found:
        print(f"WARNING: Q{q} not found!")
