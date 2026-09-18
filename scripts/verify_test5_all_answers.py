import json
import re

with open("scratch/test5_official_answers.json", "r") as f:
    official = json.load(f)

# Load 7 parts
with open("public/data/ets2022/test5/part1.json") as f:
    p1 = json.load(f)
with open("public/data/ets2022/test5/part2.json") as f:
    p2 = json.load(f)
with open("public/data/ets2022/test5/part3.json") as f:
    p3 = json.load(f)
with open("public/data/ets2022/test5/part4.json") as f:
    p4 = json.load(f)
with open("public/data/ets2022/test5/part5.json") as f:
    p5 = json.load(f)
with open("public/data/ets2022/test5/part6.json") as f:
    p6 = json.load(f)
with open("public/data/ets2022/test5/part7.json") as f:
    p7 = json.load(f)

extracted = {}

for q in p1:
    extracted[int(q["number"])] = q["correctAnswer"]

for q in p2:
    extracted[int(q["number"])] = q["correctAnswer"]

for s in p3:
    for q in s["questions"]:
        extracted[int(q["number"])] = q["correctAnswer"]

for s in p4:
    for q in s["questions"]:
        extracted[int(q["number"])] = q["correctAnswer"]

for q in p5:
    extracted[int(q["number"])] = q["correctAnswer"]

for s in p6:
    for q in s["questions"]:
        qid = int(q["id"].split("_")[-1])
        extracted[qid] = q["correctAnswer"]

for s in p7:
    for q in s["questions"]:
        extracted[int(q["number"])] = q["correctAnswer"]

print(f"Total extracted questions: {len(extracted)} (Expected: 200)")
assert len(extracted) == 200, f"Expected 200, got {len(extracted)}"

mismatches = []
for num in range(1, 201):
    if num not in extracted:
        mismatches.append(f"Q{num} is missing!")
    else:
        got = extracted[num]
        exp = official[str(num)]
        if got != exp:
            mismatches.append(f"Q{num}: got {got}, expected {exp}")

if mismatches:
    print(f"FAIL: {len(mismatches)} mismatches:")
    for m in mismatches:
        print(" ", m)
    exit(1)
else:
    print("SUCCESS: 200/200 questions matched official ETS answer key 100%!")

# EMOJI CHECK
emoji_pattern = re.compile(
    "["
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F680-\U0001F6FF"  # transport & map
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U00002702-\U000027B0"
    "\U000024C2-\U0001F251"
    "]+",
    flags=re.UNICODE,
)

files = [
    "public/data/ets2022/test5/part1.json",
    "public/data/ets2022/test5/part2.json",
    "public/data/ets2022/test5/part3.json",
    "public/data/ets2022/test5/part4.json",
    "public/data/ets2022/test5/part5.json",
    "public/data/ets2022/test5/part6.json",
    "public/data/ets2022/test5/part7.json",
]

total_emojis = 0
for fn in files:
    with open(fn) as f:
        content = f.read()
    found = emoji_pattern.findall(content)
    if found:
        print(f"WARNING: {fn} contains emojis: {found}")
        total_emojis += len(found)

if total_emojis == 0:
    print("SUCCESS: ZERO UI EMOJIS found across all 7 JSON files!")
else:
    print(f"FAIL: Found {total_emojis} emojis!")
    exit(1)
