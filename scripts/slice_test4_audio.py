import json
import subprocess
import os

with open("/private/tmp/ets4_extract/test4.json", "r") as f:
    whisper_data = json.load(f)

segments = whisper_data.get("segments", [])

cuts = []

# 1. Part 1 (Q1 - Q6)
# seg 21 is Q1 start (97.0s), seg 26 is Q2 start (121.0s), seg 32 is Q3 (152.0s), seg 37 is Q4 (178.0s), seg 42 is Q5 (204.0s), seg 47 is Q6 (229.0s), seg 52 is Part 2 Directions (262.0s)
p1_bounds = [
    (1, segments[21]["start"], segments[26]["start"], "t4_p1_01.mp3"),
    (2, segments[26]["start"], segments[32]["start"], "t4_p1_02.mp3"),
    (3, segments[32]["start"], segments[37]["start"], "t4_p1_03.mp3"),
    (4, segments[37]["start"], segments[42]["start"], "t4_p1_04.mp3"),
    (5, segments[42]["start"], segments[47]["start"], "t4_p1_05.mp3"),
    (6, segments[47]["start"], 258.0, "t4_p1_06.mp3"), # end before Part 2 directions at 262s
]
for num, s, e, fname in p1_bounds:
    cuts.append({"type": "p1", "num": num, "start": s, "end": e, "filename": fname})

# 2. Part 2 (Q7 - Q31)
# Segments:
p2_starts = [
    (7, 58), (8, 63), (9, 68), (10, 73), (11, 78), (12, 83), (13, 88), (14, 93),
    (15, 98), (16, 103), (17, 108), (18, 113), (19, 118), (20, 123), (21, 128),
    (22, 133), (23, 138), (24, 143), (25, 148), (26, 153), (27, 158), (28, 163),
    (29, 168), (30, 173), (31, 178)
]
p3_dir_start = segments[183]["start"] # 797s

for idx in range(len(p2_starts)):
    q_num, s_idx = p2_starts[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p2_starts):
        e_time = segments[p2_starts[idx+1][1]]["start"]
    else:
        e_time = 794.0 # before Part 3 Directions
    fname = f"t4_p2_{q_num:02d}.mp3"
    cuts.append({"type": "p2", "num": q_num, "start": s_time, "end": e_time, "filename": fname})

# 3. Part 3 (s01 - s13)
# Sets starting at Q32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68
p3_sets = [
    (1, 32, 191),
    (2, 35, 211),
    (3, 38, 232),
    (4, 41, 252),
    (5, 44, 270),
    (6, 47, 283),
    (7, 50, 294),
    (8, 53, 309),
    (9, 56, 321),
    (10, 59, 331),
    (11, 62, 344),
    (12, 65, 356),
    (13, 68, 367),
]
p4_dir_start = segments[378]["start"] # 1911s

for idx in range(len(p3_sets)):
    s_id, q_start, s_idx = p3_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p3_sets):
        e_time = segments[p3_sets[idx+1][2]]["start"]
    else:
        e_time = 1908.0 # before Part 4 Directions
    fname = f"t4_p3_s{s_id:02d}.mp3"
    cuts.append({"type": "p3", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

# 4. Part 4 (s01 - s10)
p4_sets = [
    (1, 71, 384),
    (2, 74, 393),
    (3, 77, 403),
    (4, 80, 414),
    (5, 83, 426),
    (6, 86, 437),
    (7, 89, 446),
    (8, 92, 459),
    (9, 95, 470),
    (10, 98, 479),
]

for idx in range(len(p4_sets)):
    s_id, q_start, s_idx = p4_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p4_sets):
        e_time = segments[p4_sets[idx+1][2]]["start"]
    else:
        e_time = 2748.0 # before "This is the end of the listening test"
    fname = f"t4_p4_s{s_id:02d}.mp3"
    cuts.append({"type": "p4", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

print(f"Total audio cuts: {len(cuts)} (Expected: 6 + 25 + 13 + 10 = 54)")

os.makedirs("/private/tmp/ets4_media", exist_ok=True)
input_mp3 = "/private/tmp/ets4_extract/test4.mp3"

# Let's slice each cut
for c in cuts:
    out_path = os.path.join("/private/tmp/ets4_media", c["filename"])
    # ffmpeg -y -ss <start> -to <end> -i input.mp3 -c:a libmp3lame -b:a 64k out.mp3
    cmd = [
        "ffmpeg", "-y", "-ss", f"{c['start']:.2f}", "-to", f"{c['end']:.2f}",
        "-i", input_mp3, "-vn", "-c:a", "copy", out_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    size = os.path.getsize(out_path)
    print(f"Sliced {c['filename']}: {c['start']:.1f}s -> {c['end']:.1f}s ({c['end']-c['start']:.1f}s, {size} bytes)")

with open("scratch/test4_audio_cuts.json", "w") as f:
    json.dump(cuts, f, indent=2)

print("\nAll 54 audio files sliced successfully!")
