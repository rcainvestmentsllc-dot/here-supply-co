from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "sunday-board-meeting.pdf"


def color(hex_value: str):
    value = hex_value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))


INK = color("#092f3c")
PAPER = color("#fff8ec")
LIGHT = color("#fffdf8")
SAND = color("#d9eeef")
TOBACCO = color("#df5c3f")
OCEAN = color("#21859d")
OCHRE = color("#f4c550")
OLIVE = color("#103f4c")
MUTED = color("#526b72")
RULE = color("#b8d3d5")


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
    c.setFont("FuturaBold", 9.5)
    c.drawString(x, y + 1, number)
    set_fill(c, INK)
    c.setFont("FuturaBold", 14)
    c.drawString(x + 25, y, title.upper())


def prompt(c: canvas.Canvas, label: str, x: float, y: float, width: float, lines: int = 1):
    set_fill(c, MUTED)
    c.setFont("AvenirDemi", 10.2)
    c.drawString(x, y, label)
    set_stroke(c, RULE)
    c.setLineWidth(0.55)
    line_y = y - 15
    for _ in range(lines):
        c.line(x, line_y, x + width, line_y)
        line_y -= 21
    return line_y


def weekly_board(c: canvas.Canvas, x: float, y: float, width: float, height: float):
    """A practical surfboard-shaped writing space: the board for this week."""
    path = c.beginPath()
    path.moveTo(x + width / 2, y + height)
    path.curveTo(x + width * .82, y + height, x + width, y + height * .70, x + width, y + height / 2)
    path.curveTo(x + width, y + height * .30, x + width * .82, y, x + width / 2, y)
    path.curveTo(x + width * .18, y, x, y + height * .30, x, y + height / 2)
    path.curveTo(x, y + height * .70, x + width * .18, y + height, x + width / 2, y + height)
    c.saveState()
    set_fill(c, LIGHT)
    set_stroke(c, OCEAN)
    c.setLineWidth(1.1)
    c.drawPath(path, stroke=1, fill=1)
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 7.5)
    c.drawCentredString(x + width / 2, y + height - 14, "THIS WEEK'S BOARD")
    set_stroke(c, RULE)
    c.setLineWidth(.5)
    c.line(x + 19, y + 18, x + width - 19, y + 18)
    c.restoreState()


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("The Sunday Board Meeting - A Free 15-Minute Weekly Guide")
    c.setAuthor("Chris Avera, Here Supply Co.")
    c.setSubject("A printable weekly conversation guide for two people sharing a life or household")
    c.setKeywords("weekly conversation, relationships, household, planning, Sunday Board")

    width, height = letter
    set_fill(c, color("#ffffff"))
    c.rect(0, 0, width, height, stroke=0, fill=1)

    c.drawImage(str(ROOT / "public/assets/brand/here-supply-co-logo-v2.png"), 34, 733, width=112, height=32.7, mask="auto")
    set_fill(c, MUTED)
    c.setFont("AvenirDemi", 9)
    c.drawString(162, 746, "TOOLS FOR SHOWING UP IN REAL LIFE")
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 9)
    c.drawRightString(578, 756, "FREE PRACTICE  /  PRINT ONE COPY")
    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.line(34, 724, 578, 724)

    # Title and mid-century accent.
    set_fill(c, INK)
    c.setFont("FuturaBold", 28)
    c.drawString(34, 682, "THE SUNDAY")
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 34)
    c.drawString(34, 643, "BOARD MEETING.")
    set_fill(c, MUTED)
    c.setFont("AvenirDemi", 11.5)
    c.drawString(35, 619, "A free 15-minute way for two people sharing a life to lead the week together")
    c.setFont("Avenir", 9.5)
    c.drawString(35, 605, "Start with something good. Make the week visible. Protect one thing together.")

    # The board is a useful writing space, with a quiet surfboard shape that earns its place.
    weekly_board(c, 448, 623, 130, 76)

    # Connection band.
    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.rect(34, 464, 544, 116, stroke=1, fill=0)
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

    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.rect(left_x, bottom_y, left_w, top_y - bottom_y, stroke=1, fill=0)
    c.rect(right_x, bottom_y, right_w, top_y - bottom_y, stroke=1, fill=0)

    section_heading(c, "02", "The Week Ahead", 49, 420)
    set_fill(c, MUTED)
    c.setFont("Avenir", 9)
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
        c.setFont("FuturaBold", 8.8)
        c.drawString(49, y, day)
        set_stroke(c, RULE)
        c.setLineWidth(0.55)
        c.line(98, y - 1, 345, y - 1)

    set_fill(c, INK)
    c.setFont("FuturaBold", 9.8)
    c.drawString(49, 150, "THE PRESSURE POINT")
    set_fill(c, MUTED)
    c.setFont("Avenir", 8.8)
    c.drawString(49, 137, "Where will the week feel tight, and what can we decide now?")
    set_stroke(c, RULE)
    c.line(49, 118, 345, 118)

    section_heading(c, "03", "Home + Money", 394, 420)
    y = prompt(c, "Meals and groceries", 394, 393, 169, 1) - 5
    y = prompt(c, "Family, care, or household needs", 394, y, 169, 1) - 5
    y = prompt(c, "Who owns what this week?", 394, y, 169, 1) - 5
    prompt(c, "Money: bills, spending, savings", 394, y, 169, 1)

    set_stroke(c, RULE)
    c.setLineWidth(0.7)
    c.line(394, 252, 563, 252)

    section_heading(c, "04", "Protect", 394, 229)
    prompt(c, "Time for us", 394, 202, 169, 1)
    prompt(c, "One shared moment", 394, 160, 169, 1)
    prompt(c, "Our shared win for the week", 394, 118, 169, 1)

    # Footer.
    set_stroke(c, OCEAN)
    c.setLineWidth(2)
    c.line(34, 68, 578, 68)
    set_fill(c, INK)
    c.setFont("CharterBold", 12)
    c.drawString(34, 40, "Nothing has to be solved all at once.")
    c.setFont("Avenir", 8.8)
    c.drawString(34, 25, "Make the week visible, decide who owns what, and choose what deserves attention together.")
    set_fill(c, TOBACCO)
    c.setFont("FuturaBold", 8.5)
    c.drawRightString(578, 39, "HERE SUPPLY CO.  /  FREE PRACTICE")
    c.setFont("AvenirDemi", 8)
    c.drawRightString(578, 25, "USE WHAT HELPS. LEAVE THE REST.")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build()
