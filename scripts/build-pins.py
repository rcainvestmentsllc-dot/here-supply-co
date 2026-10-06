"""Render every Pinterest pin in content/pins.json to public/pins/<slug>.jpg.

    python3 scripts/build-pins.py          # renders pins whose image is missing
    python3 scripts/build-pins.py --all    # re-renders everything

Three styles, one shared bottom band so every pin reads as Here Supply Co.:
  statement  ink, cream, or teal background with a serif headline
  photo      a real photo of Chris and Rhea from public/assets/real
  printable  the Sunday Board guide itself on teal soft
Wrap the accent words of a headline in *asterisks*.
"""
import html
import json
import pathlib
import re
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

R = pathlib.Path(__file__).resolve().parent.parent
F = R / "scripts/fonts"
A = R / "public/assets"
OUT = R / "public/pins"
INV = f"file://{A}/brand/here-supply-co-logo-inverse-v2.png"

INK, CREAM, TEAL, SOFT, IRON, BRASS = "#0b2530", "#f2ece1", "#2a6573", "#cfe0e2", "#9a4632", "#c9a85f"

CSS = f"""
@font-face{{font-family:Fig;src:url(file://{F}/Figtree-Regular.ttf);font-weight:400}}
@font-face{{font-family:Fig;src:url(file://{F}/Figtree-SemiBold.ttf);font-weight:600}}
@font-face{{font-family:Jost;src:url(file://{F}/Jost-Bold.ttf);font-weight:700}}
@font-face{{font-family:DMS;src:url(file://{F}/DMSerifDisplay-Regular.ttf)}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1000px;height:1500px;overflow:hidden;position:relative;font-family:Fig}}
h1 em{{font-style:normal}}
.k{{font:700 25px Jost;letter-spacing:.18em;text-transform:uppercase}}
.band{{position:absolute;left:0;right:0;bottom:0;height:150px;background:{INK};display:flex;align-items:center;justify-content:space-between;padding:0 64px;border-top:6px solid {BRASS}}}
.band img{{height:66px}}
.band span{{font:700 24px Jost;letter-spacing:.14em;color:{BRASS}}}
"""
BAND = f'<div class=band><img src="{INV}"><span>HERESUPPLYCO.COM</span></div>'

# background, headline, accent, kicker, sub
STATEMENT = {
    "ink": (INK, CREAM, BRASS, BRASS, SOFT),
    "cream": (CREAM, INK, IRON, IRON, "#36515a"),
    "teal": (TEAL, CREAM, "#f0d9a0", "#f0d9a0", SOFT),
}


def rich(text):
    return re.sub(r"\*(.+?)\*", r"<em>\1</em>", html.escape(text))


def statement(p):
    bg, fg, acc, kick, sub = STATEMENT[p.get("color", "ink")]
    return f"""<body style="background:{bg};color:{fg}">
<style>h1 em{{color:{acc}}}</style>
<div style="padding:120px 80px 0">
<p class=k style="color:{kick}">{html.escape(p['kicker'])}</p>
<div style="width:120px;height:5px;background:{IRON if bg != TEAL else BRASS};margin:34px 0 46px"></div>
<h1 style="font:400 100px/1.05 DMS">{rich(p['head'])}</h1>
<p style="font:400 38px/1.4 Fig;color:{sub};margin-top:44px;max-width:800px">{html.escape(p.get('sub', ''))}</p>
</div>{BAND}</body>"""


def photo(p):
    img = R / p["photo"]
    return f"""<body style="background:{CREAM}">
<style>h1 em{{color:{IRON}}}</style>
<div style="position:absolute;left:44px;right:44px;top:44px;height:880px;background:url('file://{img}') {p.get('position', '50% 40%')}/cover;border-radius:6px"></div>
<div style="position:absolute;left:80px;right:80px;top:968px">
<p class=k style="color:{IRON}">{html.escape(p['kicker'])}</p>
<h1 style="font:400 78px/1.05 DMS;color:{INK};margin-top:16px">{rich(p['head'])}</h1>
</div>{BAND}</body>"""


def printable(p, board_png):
    return f"""<body style="background:{SOFT}">
<style>h1 em{{color:{IRON}}}</style>
<div style="padding:80px 72px 0">
<p class=k style="color:{IRON}">{html.escape(p['kicker'])}</p>
<h1 style="font:400 86px/1.05 DMS;color:{INK};margin-top:20px">{rich(p['head'])}</h1>
<p style="font:400 34px/1.4 Fig;color:#2a4a54;margin-top:22px">{html.escape(p.get('sub', ''))}</p>
</div>
<img src="file://{board_png}" style="position:absolute;left:130px;top:650px;width:740px;box-shadow:0 30px 60px rgba(11,37,48,.3);background:#fff">
{BAND}</body>"""


def check(pg, slug):
    # Headline and sub must sit fully above the band and inside the page.
    over = pg.evaluate("""() => {
      const band = document.querySelector('.band').getBoundingClientRect().top;
      return [...document.querySelectorAll('h1,p')].filter(e => {
        const r = e.getBoundingClientRect();
        return r.bottom > band - 20 || r.right > 1000;
      }).map(e => e.textContent.slice(0, 40));
    }""")
    if over:
        raise SystemExit(f"{slug}: text runs into the band: {over}")


def main():
    data = json.loads((R / "content/pins.json").read_text())
    every = "--all" in sys.argv
    todo = [p for p in data["pins"] if every or not (OUT / f"{p['slug']}.jpg").exists()]
    for p in data["pins"]:
        assert p["board"] in data["boards"], f"{p['slug']}: unknown board {p['board']}"
        if p["style"] == "photo":
            assert (R / p["photo"]).exists(), f"{p['slug']}: missing photo {p['photo']}"
    if not todo:
        print("nothing to render")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    tmp = pathlib.Path(tempfile.mkdtemp())
    board_png = tmp / "board.png"
    subprocess.run(["pdftoppm", "-r", "130", "-png", "-singlefile",
                    str(R / "public/downloads/sunday-board-meeting.pdf"), str(tmp / "board")], check=True)
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={"width": 1000, "height": 1500})
        for p in todo:
            body = {"statement": statement, "photo": photo}.get(p["style"])
            body = body(p) if body else printable(p, board_png)
            f = tmp / f"{p['slug']}.html"
            f.write_text(f"<html><head><style>{CSS}</style></head>{body}</html>")
            pg.goto(f"file://{f}")
            pg.wait_for_timeout(400)
            check(pg, p["slug"])
            pg.screenshot(path=str(OUT / f"{p['slug']}.jpg"), type="jpeg", quality=86)
            print("rendered", p["slug"])
        b.close()


if __name__ == "__main__":
    main()
