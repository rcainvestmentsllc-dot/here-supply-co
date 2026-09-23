from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "the-here-week.pdf"


def color(value: str):
    value = value.lstrip("#")
    return tuple(int(value[index:index + 2], 16) / 255 for index in (0, 2, 4))


INK = color("#092f3c")
PAPER = color("#fffdf8")
OCEAN = color("#21859d")
CORAL = color("#df5c3f")
GOLD = color("#f4c550")
MUTED = color("#526b72")
RULE = color("#b8d3d5")


def fonts():
    pdfmetrics.registerFont(TTFont("FuturaBold", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=2))
    pdfmetrics.registerFont(TTFont("Avenir", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7))
    pdfmetrics.registerFont(TTFont("AvenirDemi", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=2))
    pdfmetrics.registerFont(TTFont("Charter", "/System/Library/Fonts/Supplemental/Charter.ttc", subfontIndex=0))


def fill(c, value): c.setFillColorRGB(*value)
def stroke(c, value): c.setStrokeColorRGB(*value)


def ruled_box(c, x, y, width, height, label, prompt, lines=3):
    stroke(c, RULE); c.setLineWidth(.7); c.rect(x, y, width, height, stroke=1, fill=0)
    fill(c, CORAL); c.setFont("FuturaBold", 8); c.drawString(x + 14, y + height - 18, label)
    fill(c, MUTED); c.setFont("Avenir", 8.3)
    for index, line in enumerate(prompt.split("\n")):
        c.drawString(x + 14, y + height - 33 - (index * 11), line)
    stroke(c, RULE); c.setLineWidth(.55)
    top = y + height - 50 - ((len(prompt.split("\n")) - 1) * 11)
    spacing = (top - y - 12) / max(lines, 1)
    for index in range(lines): c.line(x + 14, top - (index * spacing), x + width - 14, top - (index * spacing))


def build():
    fonts(); OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("The Here Week - A Simple Weekly Planning Page")
    c.setAuthor("Chris Avera, Here Supply Co.")
    c.setSubject("A simple weekly planning page for work, home, and the life in between")
    width, height = letter
    fill(c, PAPER); c.rect(0, 0, width, height, stroke=0, fill=1)
    c.drawImage(str(ROOT / "public/assets/brand/here-supply-co-logo-v2.png"), 34, 733, width=112, height=32.7, mask="auto")
    fill(c, MUTED); c.setFont("AvenirDemi", 9); c.drawString(163, 746, "A SIMPLE WEEKLY PLANNING PAGE")
    fill(c, CORAL); c.setFont("FuturaBold", 8.8); c.drawRightString(578, 756, "RESOURCE PACK / PRINT ONE COPY")
    stroke(c, RULE); c.line(34, 724, 578, 724)
    fill(c, INK); c.setFont("FuturaBold", 31); c.drawString(34, 678, "THE HERE WEEK")
    fill(c, MUTED); c.setFont("AvenirDemi", 11); c.drawString(35, 654, "One page to decide what matters before the week starts deciding for you.")
    fill(c, INK); c.setFont("Charter", 10.5); c.drawString(35, 631, "Start with the shared Sunday Board. Then use this page for the work, home, and personal choices")
    c.drawString(35, 616, "that are yours to carry.")
    fill(c, MUTED); c.setFont("AvenirDemi", 8.5); c.drawString(35, 594, "WEEK OF:")
    stroke(c, RULE); c.line(94, 592, 238, 592)
    ruled_box(c, 34, 478, 544, 95, "01 · THE THREE THAT MATTER", "If these happen, the week counts.", 3)
    ruled_box(c, 34, 353, 264, 102, "02 · WORK", "One meaningful target, one block to protect,\none loose end to close.", 3)
    ruled_box(c, 314, 353, 264, 102, "03 · HOME + PEOPLE", "What the house needs, who needs your attention,\nand one thing to protect.", 3)
    fill(c, INK); c.setFont("FuturaBold", 12); c.drawString(34, 326, "04 · SEE THE WEEK")
    fill(c, MUTED); c.setFont("Avenir", 9); c.drawString(34, 311, "Write only the appointments, handoffs, and pressure points that change how you use your time.")
    days = ["MON", "TUE", "WED", "THU", "FRI", "WEEKEND"]
    y = 284
    for day in days:
        fill(c, CORAL); c.setFont("FuturaBold", 8.5); c.drawString(35, y, day)
        stroke(c, RULE); c.setLineWidth(.55); c.line(89, y - 1, 578, y - 1)
        y -= 22
    ruled_box(c, 34, 76, 264, 72, "05 · WHEN THE WEEK GETS TIGHT", "The pressure point I can prepare for now.", 2)
    ruled_box(c, 314, 76, 264, 72, "06 · FRIDAY CHECK-IN", "What held up? What should change next week?", 2)
    stroke(c, OCEAN); c.setLineWidth(2); c.line(34, 55, 578, 55)
    fill(c, INK); c.setFont("Charter", 12); c.drawString(34, 29, "A planner only works if it gets used. Keep this one visible.")
    fill(c, CORAL); c.setFont("FuturaBold", 8.5); c.drawRightString(578, 29, "HERE SUPPLY CO. / THE HERE WEEK")
    c.save()


if __name__ == "__main__":
    build()
