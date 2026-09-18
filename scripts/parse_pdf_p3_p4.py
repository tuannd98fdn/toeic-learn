import fitz

doc = fitz.open("/private/tmp/ets4_extract/test4_key.pdf")

for p_num in range(7, 14):
    page = doc[p_num - 1]
    # blocks: (x0, y0, x1, y1, text, block_no, block_type)
    blocks = page.get_text("blocks")
    # sort by column: col 0 if x0 < 300 else col 1, then y0
    blocks.sort(key=lambda b: (0 if b[0] < 300 else 1, b[1]))
    print(f"\n================ PAGE {p_num} ================")
    for b in blocks:
        txt = b[4].strip()
        if txt and not "GO ON TO THE NEXT PAGE" in txt and not "TEST 4" in txt:
            print(f"[{b[0]:.1f}, {b[1]:.1f}]")
            print(txt)
