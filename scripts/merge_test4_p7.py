import json

with open("scratch/test4_p7_part1.json", "r", encoding="utf-8") as f:
    p1 = json.load(f)

with open("scratch/test4_p7_part2.json", "r", encoding="utf-8") as f:
    p2 = json.load(f)

with open("scratch/test4_p7_part3.json", "r", encoding="utf-8") as f:
    p3 = json.load(f)

all_sets = p1 + p2 + p3

with open("public/data/ets2022/test4/part7.json", "w", encoding="utf-8") as f:
    json.dump(all_sets, f, ensure_ascii=False, indent=2)

total_q = sum(len(s["questions"]) for s in all_sets)
print(f"Successfully merged {len(all_sets)} sets and {total_q} questions into public/data/ets2022/test4/part7.json")
