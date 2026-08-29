from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "sunday-board-meeting.pdf"
WAVE_MARK = ROOT / "public" / "assets" / "iron-compass-wave-mark-transparent.png"


def color(hex_value: str):
    value = hex_value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))


INK = color("#18231f")
PAPER = color("#f0e6d2")
LIGHT = color("#f7f0e3")
SAND = color("#d8c49f")
TOBACCO = color("#8d4a31")
OCEAN = color("#214f50")
OCHRE = color("#c28b2c")
OLIVE = color("#626846")
MUTED = color("#586159")
RULE = color("#b8ae99")


def register_fonts():
    pdfmetrics.registerFont(
        TTFont("Futura", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=0)
    )
    pdfmetrics.registerFont(
        TTFont("FuturaBold", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=2)
    )
    pdfmetrics.registerFont(
        TTFont("Avenir", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7)
    )
    pdfmetrics.registerFont(
        TTFont("AvenirDemi", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=2)
    )
    pdfmetrics.registerFont(
        TTFont("CharterBold", "/System/Library/Fonts/Supplemental/Charter.ttc", subfontIndex=3)
    )


def set_fill(c: canvas.Canvas, value):
    c.setFillColorRGB(*value)


def set_stroke(c: canvas.Canvas, value):
    c.setStrokeColorRGB(*value)


def section_heading(c: canvas.Canvas, number: str, title: str, x: float, y: float):
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 7)
    c.drawString(x, y + 1, number)
    set_fill(c, INK)
    c.setFont("FuturaBold", 11.5)
    c.drawString(x + 25, y, title.upper())


def prompt(c: canvas.Canvas, label: str, x: float, y: float, width: float, lines: int = 1):
    set_fill(c, MUTED)
    c.setFont("AvenirDemi", 7.6)
    c.drawString(x, y, label)
    set_stroke(c, RULE)
    c.setLineWidth(0.55)
    line_y = y - 14
    for _ in range(lines):
        c.line(x, line_y, x + width, line_y)
        line_y -= 21
    return line_y


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("See the Same Week - A 15-Minute Weekly Guide")
    c.setAuthor("Chris Avera, Iron Compass")
    c.setSubject("A printable weekly conversation guide for husbands and wives")
    c.setKeywords("weekly meeting, marriage, family, planning, Iron Compass")

    width, height = letter
    set_fill(c, PAPER)
    c.rect(0, 0, width, height, stroke=0, fill=1)

    # Maker's-mark header.
    c.drawImage(ImageReader(str(WAVE_MARK)), 34, 735, width=33, height=33, mask="auto")
    set_fill(c, INK)
    c.setFont("FuturaBold", 9.2)
    c.drawString(76, 756, "IRON COMPASS")
    set_fill(c, MUTED)
    c.setFont("Avenir", 6.5)
    c.drawString(76, 744, "PRACTICAL WORK FOR REAL LIFE")
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 6.5)
    c.drawRightString(578, 756, "FREE PRACTICE  /  PRINT ONE COPY")
    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.line(34, 724, 578, 724)

    # Title and mid-century accent.
    set_fill(c, INK)
    c.setFont("FuturaBold", 31)
    c.drawString(34, 682, "SEE THE")
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 38)
    c.drawString(34, 643, "SAME WEEK.")
    set_fill(c, MUTED)
    c.setFont("AvenirDemi", 8.8)
    c.drawString(35, 619, "A 15-minute weekly guide for you and your wife")
    c.setFont("Avenir", 7.1)
    c.drawString(35, 605, "Start with something good. Make the week visible. Protect one thing together.")

    set_fill(c, SAND)
    c.rect(435, 605, 143, 91, stroke=0, fill=1)
    set_fill(c, OCEAN)
    c.rect(455, 672, 123, 6, stroke=0, fill=1)
    set_fill(c, OLIVE)
    c.rect(455, 658, 123, 6, stroke=0, fill=1)
    set_fill(c, OCHRE)
    c.rect(455, 644, 123, 6, stroke=0, fill=1)
    set_fill(c, TOBACCO)
    c.rect(455, 630, 123, 6, stroke=0, fill=1)
    set_fill(c, INK)
    c.setFont("FuturaBold", 6.4)
    c.drawString(455, 616, "ONE WEEK  /  ONE SHARED PAGE")

    # Connection band.
    set_fill(c, LIGHT)
    c.rect(34, 464, 544, 116, stroke=0, fill=1)
    section_heading(c, "01", "Connection", 49, 558)
    prompt(c, "One thing I appreciated about you this week", 49, 535, 243, 1)
    prompt(c, "How are we doing, honestly?", 316, 535, 247, 1)
    prompt(c, "One thing I can do this week to support you", 49, 493, 514, 1)

    # Lower grid.
    left_x = 34
    left_w = 327
    right_x = 379
    right_w = 199
    top_y = 442
    bottom_y = 93

    set_fill(c, SAND)
    c.rect(left_x, bottom_y, left_w, top_y - bottom_y, stroke=0, fill=1)
    set_fill(c, LIGHT)
    c.rect(right_x, bottom_y, right_w, top_y - bottom_y, stroke=0, fill=1)

    section_heading(c, "02", "The Week Ahead", 49, 420)
    set_fill(c, MUTED)
    c.setFont("Avenir", 6.8)
    c.drawString(49, 405, "Put the commitments, handoffs, and pressure points on the same page.")

    day_rows = [
        ("MON", 382),
        ("TUE", 344),
        ("WED", 306),
        ("THU", 268),
        ("FRI", 230),
        ("WEEKEND", 192),
    ]
    for day, y in day_rows:
        set_fill(c, TOBACCO)
        c.setFont("FuturaBold", 6.5)
        c.drawString(49, y, day)
        set_stroke(c, RULE)
        c.setLineWidth(0.55)
        c.line(98, y - 1, 345, y - 1)

    set_fill(c, INK)
    c.setFont("FuturaBold", 7.2)
    c.drawString(49, 150, "THE PRESSURE POINT")
    set_fill(c, MUTED)
    c.setFont("Avenir", 6.8)
    c.drawString(49, 137, "Where will the week feel tight, and what can we decide now?")
    set_stroke(c, RULE)
    c.line(49, 118, 345, 118)

    section_heading(c, "03", "House + Money", 394, 420)
    y = prompt(c, "Meals and groceries", 394, 393, 169, 1) - 5
    y = prompt(c, "Kids and family needs", 394, y, 169, 1) - 5
    y = prompt(c, "Home projects or handoffs", 394, y, 169, 1) - 5
    prompt(c, "Upcoming expenses or decisions", 394, y, 169, 1)

    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.line(394, 252, 563, 252)

    section_heading(c, "04", "Protect", 394, 229)
    prompt(c, "Time for us", 394, 202, 169, 1)
    prompt(c, "One family moment", 394, 160, 169, 1)
    prompt(c, "Our shared win for the week", 394, 118, 169, 1)

    # Footer.
    set_fill(c, OCEAN)
    c.rect(0, 0, width, 68, stroke=0, fill=1)
    set_fill(c, PAPER)
    c.setFont("CharterBold", 10.5)
    c.drawString(34, 40, "Nothing has to be solved all at once.")
    c.setFont("Avenir", 6.8)
    c.drawString(34, 25, "The point is to see the same week and choose what deserves your attention together.")
    set_fill(c, OCHRE)
    c.setFont("FuturaBold", 6.5)
    c.drawRightString(578, 39, "IRONCOMPASSINSTITUTE.COM")
    c.setFont("AvenirDemi", 6.2)
    c.drawRightString(578, 25, "USE WHAT HELPS. LEAVE THE REST.")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build()
