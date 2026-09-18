import fitz

doc = fitz.open("/private/tmp/ets4_extract/test4_key.pdf")

for p_num in range(7, 14):
    page = doc[p_num - 1]
    blocks = page.get_text("blocks")
    # For rotation=270:
    # visual_x = y0 = b[1]
    # visual_y = 799.2 - b[2] (or 799.2 - b[0])
    # Let's map each block:
    vblocks = []
    for b in blocks:
        vx = b[1]
        vy = 799.2 - b[0]
        txt = b[4].strip()
        if txt and not "GO ON TO THE NEXT PAGE" in txt and not "TEST 4" in txt:
            vblocks.append((vx, vy, txt))
    
    # In upright orientation, standard reading column split is at vx ~ 280-300:
    # Column 0: vx < 290
    # Column 1: vx >= 290
    vblocks.sort(key=lambda item: (0 if item[0] < 290 else 1, item[1]))
    
    print(f"\n================ PAGE {p_num} ================")
    for vx, vy, txt in vblocks:
        print(f"[col {0 if vx < 290 else 1} | y={vy:.1f}] {txt}\n")
