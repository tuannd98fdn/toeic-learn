import json

with open("/private/tmp/ets4_extract/test4.json", "r") as f:
    whisper_data = json.load(f)

segments = whisper_data["segments"]

p3_sets = [
    (1, 32, 191, 211),
    (2, 35, 211, 232),
    (3, 38, 232, 252),
    (4, 41, 252, 270),
    (5, 44, 270, 283),
    (6, 47, 283, 294),
    (7, 50, 294, 309),
    (8, 53, 309, 321),
    (9, 56, 321, 331),
    (10, 59, 331, 344),
    (11, 62, 344, 356),
    (12, 65, 356, 367),
    (13, 68, 367, 378),
]

print("=== PART 3 SETS TRANSCRIPTS ===")
for s_id, q_start, s_idx, e_idx in p3_sets:
    print(f"\n--- SET {s_id} (Q{q_start}-Q{q_start+2}) ---")
    texts = []
    for j in range(s_idx, e_idx):
        t = segments[j]["text"].strip()
        # stop before questions read out if we only want conversation transcript
        texts.append(t)
    print(" ".join(texts))

p4_sets = [
    (1, 71, 384, 393),
    (2, 74, 393, 403),
    (3, 77, 403, 414),
    (4, 80, 414, 426),
    (5, 83, 426, 437),
    (6, 86, 437, 446),
    (7, 89, 446, 459),
    (8, 92, 459, 470),
    (9, 95, 470, 479),
    (10, 98, 479, 491),
]

print("\n=== PART 4 SETS TRANSCRIPTS ===")
for s_id, q_start, s_idx, e_idx in p4_sets:
    print(f"\n--- SET {s_id} (Q{q_start}-Q{q_start+2}) ---")
    texts = []
    for j in range(s_idx, e_idx):
        t = segments[j]["text"].strip()
        texts.append(t)
    print(" ".join(texts))
