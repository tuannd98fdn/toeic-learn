import json

with open("scratch/test4_official_answers.json", "r") as f:
    official = json.load(f)

actual = {}

# Part 1
with open("public/data/ets2022/test4/part1.json") as f:
    for q in json.load(f):
        actual[str(q["number"])] = q["correctAnswer"]

# Part 2
with open("public/data/ets2022/test4/part2.json") as f:
    for q in json.load(f):
        actual[str(q["number"])] = q["correctAnswer"]

# Part 3
with open("public/data/ets2022/test4/part3.json") as f:
    for s in json.load(f):
        for q in s["questions"]:
            actual[str(q["number"])] = q["correctAnswer"]

# Part 4
with open("public/data/ets2022/test4/part4.json") as f:
    for s in json.load(f):
        for q in s["questions"]:
            actual[str(q["number"])] = q["correctAnswer"]

# Part 5
with open("public/data/ets2022/test4/part5.json") as f:
    for q in json.load(f):
        actual[str(q["number"])] = q["correctAnswer"]

# Part 6
with open("public/data/ets2022/test4/part6.json") as f:
    for s in json.load(f):
        for q in s["questions"]:
            actual[str(q["number"])] = q["correctAnswer"]

# Part 7
with open("public/data/ets2022/test4/part7.json") as f:
    for s in json.load(f):
        for q in s["questions"]:
            actual[str(q["number"])] = q["correctAnswer"]

print(f"Total questions collected: {len(actual)} / 200")

mismatches = []
for i in range(1, 201):
    k = str(i)
    off = official.get(k)
    act = actual.get(k)
    if off != act:
        mismatches.append((i, off, act))

if not mismatches:
    print("ALL 200/200 ANSWERS MATCH THE OFFICIAL ETS ANSWER KEY 100% PERFECTLY!")
else:
    print(f"Found {len(mismatches)} mismatches:")
    for m in mismatches:
        print(f"  Q{m[0]}: official={m[1]}, actual={m[2]}")
