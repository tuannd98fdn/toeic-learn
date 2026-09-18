import fitz
import re

doc = fitz.open("/private/tmp/ets4_extract/test4_key.pdf")

# Extract all text from pages 7, 8, 9, 10
# For each page, extract words and sort by reading order
p3_text = []
for p_idx in [6, 7, 8, 9]:
    page = doc[p_idx]
    page.set_rotation(0)
    # Col 1: rect(0, 0, width, 270)
    # Col 2: rect(0, 270, width, height)
    r = page.rect
    c1 = page.get_text("text", clip=fitz.Rect(0, 0, r.width, 270))
    c2 = page.get_text("text", clip=fitz.Rect(0, 270, r.width, r.height))
    p3_text.append(f"=== PAGE {p_idx+1} COL 1 ===\n" + c1)
    p3_text.append(f"=== PAGE {p_idx+1} COL 2 ===\n" + c2)

with open("/private/tmp/ets4_extract/p3_raw_columns.txt", "w") as f:
    f.write("\n".join(p3_text))

print("Wrote p3_raw_columns.txt")
