from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "all-the-way-here-field-card.pdf"
PAGE_W, PAGE_H = letter

INK = HexColor("#092F3C")
OCEAN = HexColor("#21859D")
SEA_GLASS = HexColor("#D9EEEF")
CORAL = HexColor("#DF5C3F")
SUN = HexColor("#F4C550")
COPY = HexColor("#526B72")
PAPER = HexColor("#FFF8EC")
WHITE = HexColor("#FFFFFF")


def register_fonts():
    pdfmetrics.registerFont(TTFont("FuturaBold", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=2))
    pdfmetrics.registerFont(TTFont("Avenir", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7))
    pdfmetrics.registerFont(TTFont("AvenirDemi", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=2))


def draw_wrapped(pdf, text, x, y, width, font="Avenir", size=8.2, leading=11, color=COPY):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and pdfmetrics.stringWidth(candidate, font, size) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def movement_column(pdf, x, y, width, number, title, line, color, practices):
    pdf.setFillColor(color)
    pdf.rect(x, y - 42, width, 42, fill=1, stroke=0)
    pdf.setFillColor(WHITE)
    pdf.setFont("AvenirDemi", 7)
    pdf.drawString(x + 14, y - 16, number)
    pdf.setFont("FuturaBold", 17)
    pdf.drawString(x + 14, y - 34, title.upper())
    cursor = y - 60
    cursor = draw_wrapped(pdf, line, x + 14, cursor, width - 28, font="AvenirDemi", size=8.1, leading=10.5, color=INK)
    cursor -= 9
    for practice_number, practice, action in practices:
        pdf.setFillColor(SEA_GLASS)
        pdf.rect(x + 14, cursor - 45, width - 28, 45, fill=1, stroke=0)
        pdf.setFillColor(CORAL)
        pdf.setFont("AvenirDemi", 6.5)
        pdf.drawString(x + 23, cursor - 14, practice_number)
        pdf.setFillColor(INK)
        pdf.setFont("FuturaBold", 9.5)
        pdf.drawString(x + 45, cursor - 14, practice)
        draw_wrapped(pdf, action, x + 23, cursor - 29, width - 46, size=7.1, leading=8.8, color=COPY)
        cursor -= 53


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("All the Way Here Field Card")
    pdf.setAuthor("Here Supply Co.")
    pdf.setSubject("One-page reminder for the All the Way Here practice system")

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(SUN)
    pdf.rect(0, PAGE_H - 14, PAGE_W, 14, fill=1, stroke=0)

    pdf.setFillColor(CORAL)
    pdf.setFont("AvenirDemi", 7.5)
    pdf.drawString(38, PAGE_H - 43, "ALL THE WAY HERE FIELD CARD")
    pdf.drawImage(str(ROOT / "public/assets/brand/here-supply-co-logo-v2.png"), PAGE_W - 135, PAGE_H - 50, width=97, height=28.3, mask="auto")
    pdf.setFillColor(INK)
    pdf.setFont("FuturaBold", 28)
    pdf.drawString(38, PAGE_H - 78, "RETURN. LEAD. KEEP.")
    draw_wrapped(pdf, "Nine practices. One reminder sheet. Use the move that meets the moment in front of you.", 38, PAGE_H - 98, PAGE_W - 76, font="AvenirDemi", size=9.2, leading=12, color=COPY)

    gap = 11
    column_w = (PAGE_W - 76 - gap * 2) / 3
    top = PAGE_H - 128
    movement_column(pdf, 38, top, column_w, "01", "Return", "Bring your attention back.", OCEAN, [
        ("1.1", "The Sanctuary", "Put open loops on paper."),
        ("1.2", "Focus Mode", "One target before maintenance."),
        ("1.3", "Driveway Pause", "Park. Name it. Breathe. Enter."),
    ])
    movement_column(pdf, 38 + column_w + gap, top, column_w, "02", "Lead", "Meet pressure more steadily.", CORAL, [
        ("2.1", "Thermostat", "Pause. Return. Repair."),
        ("2.2", "Date Night", "Choose. Phones away. Notice."),
        ("2.3", "Floor General", "Eyes first. Let them lead."),
    ])
    movement_column(pdf, 38 + (column_w + gap) * 2, top, column_w, "03", "Keep", "Protect what work cannot replace.", INK, [
        ("3.1", "Third Place", "Return to one restoring place."),
        ("3.2", "Friendship Script", "Make one specific invitation."),
        ("3.3", "Mission Debrief", "Keep two for thirty days."),
    ])

    prompt_y = 330
    pdf.setFillColor(INK)
    pdf.rect(38, 190, PAGE_W - 76, 116, fill=1, stroke=0)
    pdf.setFillColor(SUN)
    pdf.setFont("AvenirDemi", 7)
    pdf.drawString(55, prompt_y - 43, "WHEN YOU NOTICE THE DRIFT")
    pdf.setFillColor(WHITE)
    pdf.setFont("FuturaBold", 15)
    pdf.drawString(55, prompt_y - 69, "1. WHAT HAS MY ATTENTION?")
    pdf.drawString(55, prompt_y - 91, "2. WHO OR WHAT IS IN FRONT OF ME?")
    pdf.drawString(55, prompt_y - 113, "3. WHAT IS ONE USEFUL MOVE NOW?")

    pdf.setFillColor(SEA_GLASS)
    pdf.rect(38, 76, PAGE_W - 76, 92, fill=1, stroke=0)
    pdf.setFillColor(CORAL)
    pdf.setFont("AvenirDemi", 7)
    pdf.drawString(55, 147, "THE THREE PHONE BOUNDARIES")
    pdf.setFillColor(INK)
    pdf.setFont("FuturaBold", 11)
    pdf.drawString(55, 124, "EYES FIRST")
    pdf.drawString(227, 124, "GIVE IT A HOME")
    pdf.drawString(417, 124, "STOP BEFORE SCREEN")
    draw_wrapped(pdf, "Answer the person before the phone.", 55, 108, 135, size=7.4, leading=9, color=COPY)
    draw_wrapped(pdf, "Use one drawer, bag, or charging place.", 227, 108, 150, size=7.4, leading=9, color=COPY)
    draw_wrapped(pdf, "Set up the drive. Look up at the curb.", 417, 108, 135, size=7.4, leading=9, color=COPY)

    pdf.setFillColor(COPY)
    pdf.setFont("AvenirDemi", 6.5)
    pdf.drawString(38, 48, "ALL THE WAY HERE · PRACTICE BEFORE COMPLETION · HERE SUPPLY CO.")
    pdf.drawRightString(PAGE_W - 38, 48, "SHOW UP FOR REAL LIFE")
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
