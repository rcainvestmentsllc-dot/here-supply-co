"""
Here Supply Co. print system.

Every PDF the course ships (the course book, the Resource Pack sheets, the
field card, the family tools) is drawn with these pieces, so they read as one
product. Same fonts as the website, same palette, same header and footer, and
the same margins.

Margins are set for home printers, which cannot print the outer quarter inch:
nothing but the cut lines on card sheets comes closer than 0.5 inch to an edge.
"""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / "scripts" / "fonts"
LOGO = ROOT / "public/assets/brand/here-supply-co-logo-v2.png"
OUT = ROOT / "public" / "downloads"

W, H = letter

# Brand palette (BRAND_SYSTEM.md).
INK = HexColor("#092f3c")
PAPER = HexColor("#fff8ec")
SEA = HexColor("#d9eeef")
OCEAN = HexColor("#21859d")
DEEP = HexColor("#103f4c")
CORAL = HexColor("#df5c3f")
SUN = HexColor("#f4c550")
COPY = HexColor("#526b72")
RULE = HexColor("#b8d3d5")
WHITE = HexColor("#ffffff")

# Page geometry, in points.
SIDE = 0.6 * inch          # left and right margin
TOP = 0.55 * inch          # top of the logo from the top edge
LOGO_H = 26
LOGO_W = LOGO_H * 112 / 32.7
HEAD_RULE = H - TOP - LOGO_H - 9   # the rule under the masthead
BODY_TOP = HEAD_RULE - 26          # where page content starts
FOOT_RULE = 0.78 * inch            # the rule above the footer
FOOT_TEXT = 0.55 * inch
BODY_BOTTOM = FOOT_RULE + 14       # where page content must stop
CONTENT_W = W - 2 * SIDE

_registered = False


def fonts():
    """Jost for display (the Futura role), Figtree for reading, DM Serif for quiet lines."""
    global _registered
    if _registered:
        return
    for name, file in [
        ("Display", "Jost-Bold.ttf"),
        ("DisplayMed", "Jost-Medium.ttf"),
        ("Body", "Figtree-Regular.ttf"),
        ("BodySemi", "Figtree-SemiBold.ttf"),
        ("Serif", "DMSerifDisplay-Regular.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))
    _registered = True


# ---------- text ----------

def caps(c, x, y, text, size=7.4, color=CORAL, font="BodySemi", space=1.1, align="left"):
    """Letterspaced small caps label."""
    text = text.upper()
    width = pdfmetrics.stringWidth(text, font, size) + space * (len(text) - 1)
    if align == "right":
        x -= width
    elif align == "center":
        x -= width / 2
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setCharSpace(space)
    t.setFillColor(color)
    t.textOut(text)
    # Character spacing is PDF text state and outlives this text object,
    # so reset it or every later line inherits the letterspacing.
    t.setCharSpace(0)
    c.drawText(t)
    return width


def lines_of(text, font, size, width):
    return simpleSplit(text, font, size, width)


def para(c, x, y, text, width, font="Body", size=9.5, leading=None, color=COPY):
    """Draw wrapped text downward from baseline y. Returns the baseline after the last line."""
    leading = leading or size * 1.36
    c.setFont(font, size)
    c.setFillColor(color)
    for ln in lines_of(text, font, size, width):
        c.drawString(x, y, ln)
        y -= leading
    return y


def fit_size(text, font, size, width, floor=7):
    while size > floor and pdfmetrics.stringWidth(text, font, size) > width:
        size -= 0.25
    return size


# ---------- page furniture ----------

def masthead(c, right_label, right_sub=None):
    """Logo left, what this page is on the right, one rule underneath."""
    c.drawImage(str(LOGO), SIDE, H - TOP - LOGO_H, width=LOGO_W, height=LOGO_H, mask="auto")
    caps(c, W - SIDE, H - TOP - 10, right_label, size=7.6, color=INK, align="right", space=1.2)
    if right_sub:
        caps(c, W - SIDE, H - TOP - 22, right_sub, size=6.6, color=COPY, font="Body", align="right", space=1.0)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(SIDE, HEAD_RULE, W - SIDE, HEAD_RULE)


def footer(c, line, right="heresupplyco.com"):
    """One quiet line of encouragement. Never a slogan."""
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(SIDE, FOOT_RULE, W - SIDE, FOOT_RULE)
    if line:
        c.setFont("Serif", 10.5)
        c.setFillColor(INK)
        c.drawString(SIDE, FOOT_TEXT, line)
    caps(c, W - SIDE, FOOT_TEXT + 1, right, size=6.6, color=COPY, font="Body", align="right", space=0.9)


def title_block(c, kicker, headline, standfirst=None, y=None, size=27):
    """Kicker, headline, standfirst. Returns the y below it."""
    y = BODY_TOP if y is None else y
    caps(c, SIDE, y, kicker, size=7.4, color=CORAL)
    y -= 30
    size = fit_size(headline, "Display", size, CONTENT_W, floor=18)
    c.setFont("Display", size)
    c.setFillColor(INK)
    c.drawString(SIDE, y, headline)
    y -= 18
    if standfirst:
        y = para(c, SIDE, y, standfirst, CONTENT_W, size=10.2, leading=14, color=COPY)
        y += 14 - 4
    return y - 14


def rules(c, x, y_top, y_bottom, width, gap=21):
    """Writing lines from y_top down to y_bottom, evenly at gap. Returns the count drawn."""
    c.setStrokeColor(RULE)
    c.setLineWidth(0.55)
    n = 0
    y = y_top
    while y >= y_bottom - 0.5:
        c.line(x, y, x + width, y)
        y -= gap
        n += 1
    return n


def box(c, x, y_top, w, h, label=None, number=None, fill=None):
    """A plain ruled box with an optional numbered label. Returns the y under the label."""
    if fill is not None:
        c.setFillColor(fill)
        c.rect(x, y_top - h, w, h, stroke=0, fill=1)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.8)
    c.rect(x, y_top - h, w, h, stroke=1, fill=0)
    if not label:
        return y_top - 12
    lx = x + 12
    if number:
        c.setFont("Display", 8.6)
        c.setFillColor(CORAL)
        c.drawString(lx, y_top - 19, number)
        lx += pdfmetrics.stringWidth(number, "Display", 8.6) + 7
    caps(c, lx, y_top - 19, label, size=7.6, color=INK, font="Display", space=1.0)
    return y_top - 19
