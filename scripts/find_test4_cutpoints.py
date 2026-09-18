import json

with open("/private/tmp/ets4_extract/test4.json", "r") as f:
    data = json.load(f)

segments = data.get("segments", [])
print(f"Total segments: {len(segments)}")

for s in segments:
    t = s["text"].lower()
    text = s["text"].strip()
    start = s["start"]
    end = s["end"]
    if any(k in t for k in [
        "number 1.", "number 2.", "number 3.", "number 4.", "number 5.", "number 6.",
        "number 7.", "number 8.", "number 9.", "number 10.",
        "number 30.", "number 31.",
        "questions 32", "questions 35", "questions 38", "questions 41", "questions 44",
        "questions 47", "questions 50", "questions 53", "questions 56", "questions 59",
        "questions 62", "questions 65", "questions 68",
        "questions 71", "questions 74", "questions 77", "questions 80", "questions 83",
        "questions 86", "questions 89", "questions 92", "questions 95", "questions 98",
        "part 1", "part 2", "part 3", "part 4", "end of recording"
    ]):
        print(f"[{start:6.1f}s - {end:6.1f}s] {text}")
