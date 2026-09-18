import json
import subprocess
import os

with open("/private/tmp/ets6_extract/test6.json", "r") as f:
    whisper_data = json.load(f)

segments = whisper_data.get("segments", [])

cuts = []

# 1. Part 1 (Q1 - Q6)
# seg 22 (96.0s), seg 27 (124.0s), seg 33 (152.0s), seg 38 (179.0s), seg 44 (205.0s), seg 49 (232.0s), Part 2 Directions at 266.0s
p1_bounds = [
    (1, segments[22]["start"], segments[27]["start"], "t6_p1_01.mp3"),
    (2, segments[27]["start"], segments[33]["start"], "t6_p1_02.mp3"),
    (3, segments[33]["start"], segments[38]["start"], "t6_p1_03.mp3"),
    (4, segments[38]["start"], segments[44]["start"], "t6_p1_04.mp3"),
    (5, segments[44]["start"], segments[49]["start"], "t6_p1_05.mp3"),
    (6, segments[49]["start"], 265.0, "t6_p1_06.mp3"),
]
for num, s, e, fname in p1_bounds:
    cuts.append({"type": "p1", "num": num, "start": s, "end": e, "filename": fname})

# 2. Part 2 (Q7 - Q31)
p2_starts = [
    (7, 60), (8, 65), (9, 69), (10, 74), (11, 79), (12, 84), (13, 89), (14, 94),
    (15, 99), (16, 104), (17, 109), (18, 114), (19, 119), (20, 125), (21, 130),
    (22, 136), (23, 141), (24, 146), (25, 152), (26, 157), (27, 162), (28, 167),
    (29, 172), (30, 177), (31, 182)
]

for idx in range(len(p2_starts)):
    q_num, s_idx = p2_starts[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p2_starts):
        e_time = segments[p2_starts[idx+1][1]]["start"]
    else:
        e_time = 794.0 # before Part 3 Directions at 795s
    fname = f"t6_p2_{q_num:02d}.mp3"
    cuts.append({"type": "p2", "num": q_num, "start": s_time, "end": e_time, "filename": fname})

# 3. Part 3 (s01 - s13)
p3_sets = [
    (1, 32, 195),
    (2, 35, 216),
    (3, 38, 236),
    (4, 41, 252),
    (5, 44, 274),
    (6, 47, 285),
    (7, 50, 295),
    (8, 53, 307),
    (9, 56, 319),
    (10, 59, 330),
    (11, 62, 341),
    (12, 65, 355),
    (13, 68, 366),
]

for idx in range(len(p3_sets)):
    s_id, q_start, s_idx = p3_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p3_sets):
        e_time = segments[p3_sets[idx+1][2]]["start"]
    else:
        e_time = 1888.0 # before Part 4 Directions at 1890s
    fname = f"t6_p3_s{s_id:02d}.mp3"
    cuts.append({"type": "p3", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

# 4. Part 4 (s01 - s10)
p4_sets = [
    (1, 71, 381),
    (2, 74, 391),
    (3, 77, 401),
    (4, 80, 413),
    (5, 83, 424),
    (6, 86, 436),
    (7, 89, 448),
    (8, 92, 460),
    (9, 95, 472),
    (10, 98, 481),
]

for idx in range(len(p4_sets)):
    s_id, q_start, s_idx = p4_sets[idx]
    s_time = segments[s_idx]["start"]
    if idx + 1 < len(p4_sets):
        e_time = segments[p4_sets[idx+1][2]]["start"]
    else:
        e_time = 2755.0 # end of recording
    fname = f"t6_p4_s{s_id:02d}.mp3"
    cuts.append({"type": "p4", "set": s_id, "q_start": q_start, "start": s_time, "end": e_time, "filename": fname})

print(f"Total audio clips to slice: {len(cuts)}")
assert len(cuts) == 54, f"Expected 54 cuts, got {len(cuts)}"

src_audio = "/private/tmp/ets6_extract/test6.mp3"
out_dir = "/private/tmp/ets6_media"
os.makedirs(out_dir, exist_ok=True)

for c in cuts:
    out_file = os.path.join(out_dir, c["filename"])
    dur = c["end"] - c["start"]
    cmd = [
        "ffmpeg", "-y",
        "-ss", f"{c['start']:.3f}",
        "-to", f"{c['end']:.3f}",
        "-i", src_audio,
        "-vn",
        "-c:a", "copy",
        out_file
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    size = os.path.getsize(out_file)
    print(f"  Sliced {c['filename']:15s} [{c['start']:6.1f}s -> {c['end']:6.1f}s] ({dur:5.1f}s, {size} bytes)")

print("\nALL 54 AUDIO CLIPS SLICED WITH 100% LOSSLESS STREAM COPY!")

with open("scratch/test6_audio_cuts.json", "w") as f:
    json.dump(cuts, f, indent=2)
