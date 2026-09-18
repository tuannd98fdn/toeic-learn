with open("/private/tmp/ets4_extract/p7_full_unbroken.txt") as f:
    text = f.read()

for p in range(35, 45):
    print(f"\n==================== PAGE {p} ====================")
    sub = text.split(f"==================== PAGE {p} ====================")[1]
    if f"==================== PAGE {p+1} ====================" in sub:
        sub = sub.split(f"==================== PAGE {p+1} ====================")[0]
    print(sub.strip())
