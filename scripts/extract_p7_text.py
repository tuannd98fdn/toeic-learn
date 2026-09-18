import fitz

doc = fitz.open("/private/tmp/ets4_extract/test4_key.pdf")

with open("/private/tmp/ets4_extract/p7_raw_columns.txt", "w") as out:
    for page_idx in range(23, len(doc)): # pages 24 to 44
        page = doc[page_idx]
        page.set_rotation(0)
        r = page.rect
        c1 = page.get_text("text", clip=fitz.Rect(0, 0, r.width, 275))
        c2 = page.get_text("text", clip=fitz.Rect(0, 275, r.width, r.height))
        out.write(f"\n\n==================== PAGE {page_idx+1} COL 1 ====================\n\n")
        out.write(c1)
        out.write(f"\n\n==================== PAGE {page_idx+1} COL 2 ====================\n\n")
        out.write(c2)

print(f"Extracted pages 24 to {len(doc)} to /private/tmp/ets4_extract/p7_raw_columns.txt")
