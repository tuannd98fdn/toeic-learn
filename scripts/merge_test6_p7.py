import json
import os
from build_test6_p7_part1 import part1_sets
from build_test6_p7_part2 import part2_sets
from build_test6_p7_part3 import part3_sets

all_sets = part1_sets + part2_sets + part3_sets

total_questions = sum(len(s['questions']) for s in all_sets)
print(f"Total Part 7 sets: {len(all_sets)}, Total questions: {total_questions}")

out_dir = "public/data/ets2022/test6"
os.makedirs(out_dir, exist_ok=True)

with open(f"{out_dir}/part7.json", "w", encoding="utf-8") as f:
    json.dump(all_sets, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {out_dir}/part7.json!")
