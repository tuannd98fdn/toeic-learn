import fitz

doc = fitz.open("/private/tmp/ets4_extract/test4_key.pdf")

p4_text = []
for p_idx in [10, 11, 12]:
    page = doc[p_idx]
    page.set_rotation(0)
    r = page.rect
    c1 = page.get_text("text", clip=fitz.Rect(0, 0, r.width, 270))
    c2 = page.get_text("text", clip=fitz.Rect(0, 270, r.width, r.height))
    p4_text.append(f"=== PAGE {p_idx+1} COL 1 ===\n" + c1)
    p4_text.append(f"=== PAGE {p_idx+1} COL 2 ===\n" + c2)

with open("/private/tmp/ets4_extract/p4_raw_columns.txt", "w") as f:
    f.write("\n".join(p4_text))

print("Wrote p4_raw_columns.txt")
