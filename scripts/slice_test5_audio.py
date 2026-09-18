import json
import subprocess
import os

with open("/private/tmp/ets5_extract/test5.json", "r") as f:
    whisper_data = json.load(f)

segments = whisper_data.get("segments", [])

cuts = []

# 1. Part 1 (Q1 - Q6)
# seg 21 (97.0s), seg 26 (122.0s), seg 32 (156.0s), seg 37 (182.0s), seg 42 (209.0s), seg 47 (233.0s), seg 53 is Part 2 Directions (268.0s)
p1_bounds = [
    (1, segments[21]["start"], segments[26]["start"], "t5_p1_01.mp3"),
    (2, segments[26]["start"], segments[32]["start"], "t5_p1_02.mp3"),
    (3, segments[32]["start"], segments[37]["start"], "t5_p1_03.mp3"),
    (4, segments[37]["start"], segments[42]["start"], "t5_p1_04.mp3"),
    (5, segments[42]["start"], segments[47]["start"], "t5_p1_05.mp3"),
    (6, segments[47]["start"], 265.0, "t5_p1_06.mp3"), # end before Part 2 directions at 268s
]
for num, s, e, fname in p1_bounds:
    cuts.append({"type": "p1", "num": num, "start": s, "end": e, "filename": fname})

# 2. Part 2 (Q7 - Q31)
p2_starts = [
    (7, 58), (8, 62), (9, 67), (10, 72), (11, 77), (12, 82), (13, 87), (14, 92),
    (15, 97), (16, 102), (17, 107), (18, 112), (19, 117), (20, 122), (21, 127),
    (22, 132), (23, 138), (24, 143), (25, 148), (26, 153), (27, 158), (28, 163),
    (29, 168), (30, 173), (31, 178)
]

for idx in range(len(p2_starts)):
    q_num, s_idx = p2_starts[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p2_starts):
        e_time = segments[p2_starts[idx+1][1]]["start"]
    else:
        e_time = 790.0 # before Part 3 Directions at 792s
    fname = f"t5_p2_{q_num:02d}.mp3"
    cuts.append({"type": "p2", "num": q_num, "start": s_time, "end": e_time, "filename": fname})

# 3. Part 3 (s01 - s13)
# Sets starting at Q32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68
p3_sets = [
    (1, 32, 190),
    (2, 35, 208),
    (3, 38, 224),
    (4, 41, 239),
    (5, 44, 253),
    (6, 47, 265),
    (7, 50, 276),
    (8, 53, 287),
    (9, 56, 299),
    (10, 59, 309),
    (11, 62, 320),
    (12, 65, 331),
    (13, 68, 343),
]

for idx in range(len(p3_sets)):
    s_id, q_start, s_idx = p3_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p3_sets):
        e_time = segments[p3_sets[idx+1][2]]["start"]
    else:
        e_time = 1916.0 # before Part 4 Directions at 1918s
    fname = f"t5_p3_s{s_id:02d}.mp3"
    cuts.append({"type": "p3", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

# 4. Part 4 (s01 - s10)
p4_sets = [
    (1, 71, 357),
    (2, 74, 365),
    (3, 77, 374),
    (4, 80, 384),
    (5, 83, 395),
    (6, 86, 406),
    (7, 89, 418),
    (8, 92, 427),
    (9, 95, 438),
    (10, 98, 447),
]

for idx in range(len(p4_sets)):
    s_id, q_start, s_idx = p4_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p4_sets):
        e_time = segments[p4_sets[idx+1][2]]["start"]
    else:
        e_time = 2760.0 # before "This is the end of the listening test"
    fname = f"t5_p4_s{s_id:02d}.mp3"
    cuts.append({"type": "p4", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

print(f"Total audio cuts: {len(cuts)} (Expected: 6 + 25 + 13 + 10 = 54)")

os.makedirs("/private/tmp/ets5_media", exist_ok=True)
input_mp3 = "/private/tmp/ets5_extract/test5.mp3"

for c in cuts:
    out_path = os.path.join("/private/tmp/ets5_media", c["filename"])
    cmd = [
        "ffmpeg", "-y", "-ss", f"{c['start']:.2f}", "-to", f"{c['end']:.2f}",
        "-i", input_mp3, "-vn", "-c:a", "copy", out_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    size = os.path.getsize(out_path)
    print(f"Sliced {c['filename']}: {c['start']:.1f}s -> {c['end']:.1f}s ({c['end']-c['start']:.1f}s, {size} bytes)")

with open("scratch/test5_audio_cuts.json", "w") as f:
    json.dump(cuts, f, indent=2)

print("\nAll 54 audio files sliced successfully!")
