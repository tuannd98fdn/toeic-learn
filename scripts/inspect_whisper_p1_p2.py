import json

with open("/private/tmp/ets4_extract/test4.json", "r") as f:
    whisper_data = json.load(f)

segments = whisper_data["segments"]

# Part 1: segments 21 to 52
print("=== PART 1 TRANSCRIPTS ===")
p1_segs = [
    (1, 21, 26),
    (2, 26, 32),
    (3, 32, 37),
    (4, 37, 42),
    (5, 42, 47),
    (6, 47, 52),
]
for q, s_i, e_i in p1_segs:
    print(f"--- Q{q} ---")
    for idx in range(s_i, e_i):
        print(f"  [{segments[idx]['start']:.1f}s - {segments[idx]['end']:.1f}s]: {segments[idx]['text'].strip()}")

print("\n=== PART 2 TRANSCRIPTS ===")
p2_starts = [
    (7, 58), (8, 63), (9, 68), (10, 73), (11, 78), (12, 83), (13, 88), (14, 93),
    (15, 98), (16, 103), (17, 108), (18, 113), (19, 118), (20, 123), (21, 128),
    (22, 133), (23, 138), (24, 143), (25, 148), (26, 153), (27, 158), (28, 163),
    (29, 168), (30, 173), (31, 178)
]
for idx, (q, s_i) in enumerate(p2_starts):
    e_i = p2_starts[idx+1][1] if idx+1 < len(p2_starts) else 183
    texts = [segments[j]["text"].strip() for j in range(s_i, e_i)]
    print(f"Q{q}: {' '.join(texts)}")
