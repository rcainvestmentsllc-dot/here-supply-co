"""
The Here Supply Co. Field Kit.

These are not worksheets. They are objects meant to live at the point of
failure: the reset sheet on the fridge, the driveway card in the glovebox,
the board sheet on the table. Paper is the one surface the phone cannot
follow you onto, which is the whole argument of the brand.

Every sheet carries one quiet line at the foot. Encouragement, not a slogan.
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONT_DIR = os.environ.get("HSC_FONT_DIR", "")
OUT = os.environ.get("HSC_OUT", ".")

INK    = HexColor("#0b2530")
PAPER  = HexColor("#f2ece1")
TEAL   = HexColor("#2f7180")
IRON   = HexColor("#a8503a")
BRASS  = HexColor("#b8974e")
RULE   = HexColor("#c6bca9")
QUIET  = HexColor("#6b7b80")

for name, f in [
    ("Archivo",      "archivo-latin-400-normal.ttf"),
    ("Archivo-Semi", "archivo-latin-600-normal.ttf"),
    ("Archivo-Bold", "archivo-latin-700-normal.ttf"),
    ("Plex",         "ibm-plex-mono-latin-400-normal.ttf"),
    ("Plex-Semi",    "ibm-plex-mono-latin-600-normal.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, os.path.join(FONT_DIR, f)))

W, H = letter
M = 0.62 * inch


def tracked(c, x, y, text, font, size, color, track=1.6):
    """Letterspaced caps. reportlab has no tracking, so draw glyph by glyph."""
    c.setFont(font, size)
    c.setFillColor(color)
    for ch in text:
        c.drawString(x, y, ch)
        x += c.stringWidth(ch, font, size) + track
    return x


def wrap(c, text, font, size, max_w):
    c.setFont(font, size)
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if c.stringWidth(t, font, size) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines


def para(c, x, y, text, font, size, color, max_w, leading):
    c.setFillColor(color)
    for line in wrap(c, text, font, size, max_w):
        c.setFont(font, size)
        c.drawString(x, y, line)
        y -= leading
    return y


def masthead(c, kicker, sheet_no):
    tracked(c, M, H - M - 8, "HERE SUPPLY CO.", "Archivo-Bold", 11, INK, 2.9)
    c.setFont("Plex", 7.5)
    c.setFillColor(QUIET)
    c.drawRightString(W - M, H - M - 8, sheet_no)
    c.setStrokeColor(INK)
    c.setLineWidth(1.1)
    c.line(M, H - M - 20, W - M, H - M - 20)
    tracked(c, M, H - M - 36, kicker, "Plex-Semi", 7.5, TEAL, 1.5)


def footline(c, line):
    """The quiet encouragement. Small, at the foot, never a slogan."""
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(M, M + 26, W - M, M + 26)
    c.setFont("Archivo", 9.5)
    c.setFillColor(IRON)
    c.drawString(M, M + 13, line)
    c.setFont("Plex", 6.8)
    c.setFillColor(QUIET)
    c.drawRightString(W - M, M + 13, "heresupplyco.com")


def rule_lines(c, x, y, width, count, gap=17):
    c.setStrokeColor(RULE)
    c.setLineWidth(0.55)
    for i in range(count):
        c.line(x, y - i * gap, x + width, y - i * gap)
    return y - (count - 1) * gap


def box(c, x, y, w, h, label, color=INK):
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.rect(x, y - h, w, h, stroke=1, fill=0)
    tracked(c, x + 9, y - 15, label, "Plex-Semi", 6.8, color, 1.3)
