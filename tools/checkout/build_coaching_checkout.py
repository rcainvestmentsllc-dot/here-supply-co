"""Square checkout images for the Thirty Days With Chris products, matching all-the-way-here-checkout.jpg."""
import pathlib
from playwright.sync_api import sync_playwright

R = pathlib.Path(__file__).resolve().parents[2]
F, A = R / "scripts/fonts", R / "public/assets"
OUT = A / "brand"
PHOTO = A / "real/chris-rhea-couch.jpg"
LOGO = A / "brand/here-supply-co-logo-inverse-v2.png"

def page(tag):
    badge = f'<div class=tag>{tag}</div>' if tag else ""
    return f"""<html><head><style>
@font-face{{font-family:Fig;src:url(file://{F}/Figtree-Regular.ttf)}}
@font-face{{font-family:Jost;src:url(file://{F}/Jost-Bold.ttf);font-weight:700}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1200px;height:1200px;background:#0b2530;position:relative;overflow:hidden}}
.ph{{position:absolute;inset:0 0 auto 0;height:610px;background:url('file://{PHOTO}') 62% 30%/cover}}
.tag{{position:absolute;top:40px;right:40px;background:#c9a85f;color:#0b2530;font:700 26px Jost;letter-spacing:.14em;padding:16px 26px;border-radius:4px}}
.p{{position:absolute;left:74px;right:74px;top:648px}}
img{{height:58px}}
h1{{font:700 92px/1.04 Jost;color:#f2ece1;margin-top:34px;letter-spacing:.01em}}
.s{{font:400 31px Fig;color:#cfe0e2;margin-top:26px}}
.ln{{display:flex;gap:10px;margin-top:36px}}.ln i{{height:8px;display:block}}
.b{{font:700 25px Jost;color:#f2ece1;letter-spacing:.1em;margin-top:44px}}
</style></head><body><div class=ph></div>{badge}<div class=p>
<img src="file://{LOGO}">
<h1>THIRTY DAYS<br>WITH CHRIS</h1>
<p class=s>Someone in your corner for a month.</p>
<div class=ln><i style="width:648px;background:#2a6573"></i><i style="width:222px;background:#9a4632"></i></div>
<p class=b>30 MINUTE CALL &bull; 4 WEEKLY CHECK INS &bull; REPLIES IN 48 HOURS</p>
</div></body></html>"""

with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1200, "height": 1200})
    for name, tag in [("thirty-days-with-chris-checkout", ""), ("thirty-days-with-chris-founding-checkout", "FOUNDING")]:
        f = OUT / f"{name}.html"; f.write_text(page(tag)); pg.goto(f"file://{f}"); pg.wait_for_timeout(500)
        over = pg.evaluate("() => [...document.querySelectorAll('.p *')].some(e => e.getBoundingClientRect().bottom > 1160 || e.getBoundingClientRect().right > 1160)")
        assert not over, name + ": text overflows"
        pg.screenshot(path=str(OUT / f"{name}.jpg"), type="jpeg", quality=90); f.unlink(); print("rendered", name)
    b.close()
