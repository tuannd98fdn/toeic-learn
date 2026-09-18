import re

with open("/private/tmp/ets4_extract/p3_p4_clipped.txt", "r") as f:
    text = f.read()

# Let's inspect each question block
for q in range(32, 101):
    # Find question number
    m = re.search(rf"\b{q}\.\s*([^\n]+)", text)
    if m:
        print(f"Q{q}: {m.group(1).strip()[:60]}")
    else:
        # Check if number appears on its own line
        m2 = re.search(rf"\n{q}\.\s*\n([^\n]+)", text)
        if m2:
            print(f"Q{q} (newline): {m2.group(1).strip()[:60]}")
        else:
            print(f"Q{q} NOT FOUND")
