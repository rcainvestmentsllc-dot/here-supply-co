"""Build the All the Way Here course book from the course text the website uses.

    node --experimental-strip-types scripts/export-course-content.mjs
    python3 scripts/build-all-the-way-here-print-edition.py

Drawn with the shared print system in tools/print/hsc.py, so the book and the
Resource Pack sheets share one header, footer, palette, and set of margins.

Every lesson is a two page spread that ends on writing space. The writing
lines grow to fill whatever is left of the second page, so no page in the book
ends in a blank band.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools" / "print"))

from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak, Table,
    TableStyle, KeepTogether, Flowable, NextPageTemplate, CondPageBreak,
)

from hsc import *

fonts()
DATA = ROOT / "tmp/pdfs/course-content.json"
OUTFILE = ROOT / "public/downloads/all-the-way-here-print-edition.pdf"
C = json.loads(DATA.read_text())
KIT = {k["sheet"]: k for k in C["FIELD_KIT"]}
MOVES = {m["key"]: m["name"] for m in C["CORE_MOVEMENTS"]}

S = {
    "kicker": ParagraphStyle("kicker", fontName="BodySemi", fontSize=7.6, leading=10, textColor=CORAL, spaceAfter=8, tracking=1.2),
    "h1": ParagraphStyle("h1", fontName="Display", fontSize=28, leading=31, textColor=INK, spaceAfter=10),
    "h2": ParagraphStyle("h2", fontName="Display", fontSize=14.5, leading=18, textColor=INK, spaceBefore=12, spaceAfter=5, keepWithNext=1),
    "h3": ParagraphStyle("h3", fontName="BodySemi", fontSize=10, leading=13, textColor=INK, spaceBefore=8, spaceAfter=3, keepWithNext=1),
    "body": ParagraphStyle("body", fontName="Body", fontSize=10, leading=14.2, textColor=COPY, spaceAfter=6),
    "dark": ParagraphStyle("dark", fontName="Body", fontSize=10, leading=14.2, textColor=INK, spaceAfter=6),
    "quote": ParagraphStyle("quote", fontName="Serif", fontSize=14.5, leading=19, textColor=INK),
    "note": ParagraphStyle("note", fontName="Serif", fontSize=11.5, leading=16, textColor=INK),
    "step": ParagraphStyle("step", fontName="Body", fontSize=9.6, leading=13, textColor=COPY),
    "num": ParagraphStyle("num", fontName="Display", fontSize=9, leading=13, textColor=CORAL),
    "label": ParagraphStyle("label", fontName="BodySemi", fontSize=7.2, leading=10, textColor=OCEAN, spaceBefore=10, spaceAfter=4, keepWithNext=1),
    "label_last": ParagraphStyle("label_last", fontName="BodySemi", fontSize=7.2, leading=10, textColor=OCEAN, spaceBefore=10, spaceAfter=4),
    "small": ParagraphStyle("small", fontName="Body", fontSize=8.8, leading=12, textColor=COPY),
    "cover_kicker": ParagraphStyle("ck", fontName="BodySemi", fontSize=9, leading=12, textColor=CORAL, alignment=TA_CENTER),
    "cover_title": ParagraphStyle("ct", fontName="Display", fontSize=48, leading=48, textColor=INK, alignment=TA_CENTER),
    "cover_sub": ParagraphStyle("cs", fontName="Serif", fontSize=19, leading=25, textColor=INK, alignment=TA_CENTER),
    "cover_small": ParagraphStyle("cm", fontName="Body", fontSize=10, leading=15, textColor=COPY, alignment=TA_CENTER),
}


def K(text):
    """Kicker text: caps, letterspaced via the style's tracking (approximated with thin spaces)."""
    return Paragraph(text.upper(), S["kicker"])


class Box(Flowable):
    """A ruled box around a paragraph. Gold for principles, sea glass for notes."""

    def __init__(self, para, border=SUN, fill=None, pad=14, left_bar=None):
        super().__init__()
        self.p, self.border, self.fill, self.pad, self.bar = para, border, fill, pad, left_bar

    def wrap(self, aw, ah):
        self.aw = aw
        _, h = self.p.wrap(aw - 2 * self.pad - (6 if self.bar else 0), ah)
        self.h = h + 2 * self.pad - 4
        return aw, self.h

    def draw(self):
        c = self.canv
        if self.fill is not None:
            c.setFillColor(self.fill)
            c.rect(0, 0, self.aw, self.h, stroke=0, fill=1)
        if self.border is not None:
            c.setStrokeColor(self.border)
            c.setLineWidth(1.3)
            c.rect(0, 0, self.aw, self.h, stroke=1, fill=0)
        if self.bar is not None:
            c.setFillColor(self.bar)
            c.rect(0, 0, 4, self.h, stroke=0, fill=1)
        self.p.drawOn(c, self.pad + (6 if self.bar else 0), self.pad - 4)


class Lines(Flowable):
    """A fixed number of writing lines."""

    def __init__(self, n, gap=23):
        super().__init__()
        self.n, self.gap = n, gap

    def wrap(self, aw, ah):
        self.aw = aw
        return aw, self.n * self.gap

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(0.6)
        for i in range(self.n):
            y = (self.n - 1 - i) * self.gap + 1
            self.canv.line(0, y, self.aw, y)


class FillLines(Flowable):
    """Writing lines that take up whatever height is left on the page."""

    def __init__(self, gap=23, minimum=2):
        super().__init__()
        self.gap, self.minimum = gap, minimum

    def wrap(self, aw, ah):
        self.aw = aw
        self.n = max(self.minimum, int(ah // self.gap))
        return aw, self.n * self.gap

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(0.6)
        for i in range(self.n):
            y = (self.n - 1 - i) * self.gap + 1
            self.canv.line(0, y, self.aw, y)


def principle(text):
    return Box(Paragraph(text, S["quote"]), border=SUN)


def numbered(rows, widths=(0.42 * inch, None), pad=6):
    data = [[Paragraph(n, S["num"]), Paragraph(f"<font name='BodySemi' color='#092f3c'>{t}</font><br/>{b}", S["step"])] for n, t, b in rows]
    t = Table(data, colWidths=[widths[0], CONTENT_W - widths[0]])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
        ("TOPPADDING", (0, 0), (-1, -1), pad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad + 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def page(canvas, doc):
    canvas.saveState()
    masthead(canvas, "All the Way Here · Course book")
    footer(canvas, None, right=str(doc.page))
    canvas.setFont("Body", 7.6)
    canvas.setFillColor(COPY)
    canvas.drawString(SIDE, FOOT_TEXT, "HERE SUPPLY CO.  \u00b7  KEEP WHAT HELPS. LEAVE WHAT DOESN'T.")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.drawImage(str(LOGO), (W - 150) / 2, H - 1.35 * inch, width=150, height=150 * 32.7 / 112, mask="auto")
    canvas.setFillColor(OCEAN)
    canvas.rect(SIDE, H - 1.75 * inch, CONTENT_W, 2.2, stroke=0, fill=1)
    canvas.setFillColor(SEA)
    canvas.rect(SIDE, 0.6 * inch, CONTENT_W, 1.3 * inch, stroke=0, fill=1)
    caps(canvas, W / 2, 0.6 * inch + 1.3 * inch - 30, "What is inside", size=7.4, color=CORAL, align="center")
    for k, line in enumerate(["The 72 hour Focus Protocol, nine lessons in three movements,",
                              "and room to write on every page. Use the online course for a quick read.",
                              "Use this book for the work."]):
        canvas.setFont("Body", 10.4)
        canvas.setFillColor(INK)
        canvas.drawCentredString(W / 2, 0.6 * inch + 1.3 * inch - 50 - k * 15, line)
    canvas.restoreState()


def lesson(story, l):
    mv = MOVES[l["movement"]]
    kit = KIT[l["kit"]["sheet"]]
    story.append(K(f"{mv} · Lesson {l['number']}"))
    story.append(Paragraph(l["title"], S["h1"]))
    story.append(principle(l["subtitle"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph("A familiar scene", S["h3"]))
    story.append(Paragraph(l["scene"], S["body"]))
    story.append(Paragraph("What is happening", S["h2"]))
    story.append(Paragraph(l["problem"], S["body"]))
    story.append(Paragraph("The principle", S["h2"]))
    story.append(principle(l["principle"]))
    story.append(Paragraph("The practice: " + l["practice"], S["h2"]))
    story.append(Paragraph(l["practiceIntro"], S["body"]))
    story.append(numbered([("%02d" % i, s["title"], s["body"]) for i, s in enumerate(l["steps"], 1)]))
    story.append(Paragraph("Make it fit", S["h3"]))
    story.append(Paragraph(l["adaptation"], S["body"]))
    if l.get("withoutKids"):
        story.append(Paragraph("If there are no kids in the house", S["h3"]))
        story.append(Paragraph(l["withoutKids"]["body"], S["body"]))
    story.append(Paragraph("Do it together", S["h3"]))
    story.append(Paragraph(l["together"], S["body"]))
    story.append(Spacer(1, 6))
    story.append(Box(Paragraph(
        f"<font name='BodySemi' size='7.2' color='#21859d'>YOUR SHEET · {l['number']}</font><br/>"
        f"<font name='Display' size='12' color='#092f3c'>{kit['name']}</font>"
        f"<font name='Body' size='9.4' color='#526b72'>  ·  Where it lives: {l['kit']['livesAt']}. "
        f"Print it from the Resource Pack and put it where the moment happens.</font>", S["small"]),
        border=None, fill=SEA, pad=12, left_bar=OCEAN))
    story.append(Paragraph("Try this week", S["h3"]))
    story.append(Paragraph(l["action"], S["dark"]))
    story.append(Paragraph("FROM CHRIS", S["label"]))
    story.append(Paragraph(l["fieldNote"], S["note"]))
    story.append(Paragraph("QUESTION TO SIT WITH", S["label"]))
    story.append(Paragraph(l["reflection"], ParagraphStyle("r", parent=S["dark"], keepWithNext=0)))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())


def build():
    OUTFILE.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(OUTFILE), pagesize=letter, title="All the Way Here: Course Book",
                          author="Chris Avera, Here Supply Co.", leftMargin=SIDE, rightMargin=SIDE)
    body = Frame(SIDE, BODY_BOTTOM, CONTENT_W, HEAD_RULE - 20 - BODY_BOTTOM, id="body", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    cover_frame = Frame(SIDE, 2.4 * inch, CONTENT_W, H - 2.2 * inch - 2.4 * inch, id="cover", leftPadding=0, rightPadding=0)
    doc.addPageTemplates([PageTemplate("cover", [cover_frame], onPage=cover), PageTemplate("page", [body], onPage=page)])

    story = [Spacer(1, 0.9 * inch)]
    story.append(Paragraph("A COURSE ON PAPER", S["cover_kicker"]))
    story.append(Spacer(1, 16))
    story.append(Paragraph("All the Way<br/>Here.", S["cover_title"]))
    story.append(Spacer(1, 18))
    story.append(Paragraph("Bringing your attention back to the people and life already in front of you.", S["cover_sub"]))
    story.append(Spacer(1, 22))
    story.append(Paragraph("The Focus Protocol · Return · Lead · Keep", S["cover_small"]))
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph("Write in it. Mark it up. Come back to it when life gets noisy.", S["cover_small"]))
    story.append(NextPageTemplate("page"))
    story.append(PageBreak())

    # How it fits together.
    story.append(K("Start here"))
    story.append(Paragraph("How it fits together.", S["h1"]))
    story.append(Paragraph("There are four pieces, and each has one job. You do not need to finish any of them. You need to try a practice in a normal week and keep the ones that help.", S["body"]))
    story.append(Spacer(1, 4))
    story.append(numbered([
        ("01", "The Focus Protocol", "Three days, four small moves, before either of you asks the other to change anything. It is the start of this book and one sheet for the fridge."),
        ("02", "The nine lessons", "Three movements: Return, Lead, Keep. Each lesson is one idea and one practice. They are online for a quick read and in this book for the real work."),
        ("03", "The Resource Pack", "One sheet for each lesson, numbered to match it, plus the Sunday Board and a field card. Every sheet has a place it lives: the fridge, the glovebox, the nightstand."),
        ("04", "The Sunday Board Meeting", "Fifteen minutes a week at the table. It runs underneath everything else and is where the two of you decide what to keep."),
    ], pad=9))
    story.append(Paragraph("The order", S["h2"]))
    story.append(numbered([
        ("1", "Start the Focus Protocol today", "Do not make every boundary permanent on day one."),
        ("2", "On day four, open Return", "One lesson, one practice, tried during a normal week. Print that lesson's sheet."),
        ("3", "Write here what actually happened", "Not what should have happened."),
        ("4", "End with the Thirty Day Page", "Choose two practices to keep. Let the rest wait without guilt."),
    ], pad=7))
    story.append(Paragraph("The promise you are making", S["h2"]))
    story.append(principle(C["RESET_DECLARATION"]))
    story.append(PageBreak())

    # Focus Protocol: the moves.
    story.append(K("Start here · The 72 hour Focus Protocol"))
    story.append(Paragraph("Control the inputs. Choose the attention.", S["h1"]))
    story.append(Paragraph("Treat this as a short experiment in changing your surroundings. Reduce what pulls at you, add enough friction to notice the reflex, and make a different choice in everyday life. Nobody is testing your discipline.", S["body"]))
    for m in C["FOCUS_MOVES"]:
        story.append(KeepTogether([
            Paragraph(f"<font color='#df5c3f'>{m['number']}</font>  {m['title']}", S["h2"]),
            Paragraph(m["promise"], S["dark"]),
            Paragraph(m["body"], S["body"]),
            Paragraph(f"<font name='BodySemi' color='#092f3c'>Make it fit:</font> {m['exception']}", S["step"]),
        ]))
    story.append(PageBreak())

    # What the 72 hours feel like.
    story.append(K("Start here · What the 72 hours can feel like"))
    story.append(Paragraph("Know the hard part before you reach it.", S["h1"]))
    story.append(numbered([(p["window"].replace("Hours ", ""), p["title"], p["body"]) for p in C["RESET_TIMELINE"]], widths=(0.7 * inch, None), pad=8))
    rel = C["RESET_RELAPSE"]
    story.append(Paragraph("When the old habit starts negotiating", S["h2"]))
    story.append(Paragraph(rel["intro"], S["body"]))
    for ln in rel["lines"]:
        story.append(Paragraph("“" + ln + "”", S["note"]))
    story.append(Spacer(1, 8))
    story.append(principle(rel["counter"]))
    story.append(Paragraph("If you are doing this together", S["h3"]))
    story.append(Paragraph(rel["together"], S["body"]))
    story.append(PageBreak())

    # Field notes.
    story.append(K("Start here · Field notes"))
    story.append(Paragraph("What did you notice when the phone stopped leading?", S["h1"]))
    story.append(Paragraph("Do not grade yourself. Write down what changed, where the reflex was strongest, and one boundary worth keeping after the three days are over.", S["body"]))
    for prompt in ["The moment I most often reached without deciding", "What was easier when the phone had a home", "The part of life I want to protect first"]:
        story.append(Paragraph(prompt.upper(), S["label"]))
        story.append(Lines(2))
    story.append(Paragraph("THE ONE ARRANGEMENT I WILL KEEP FOR THE NEXT FOURTEEN DAYS", S["label_last"]))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())

    for l in C["CORE_LESSONS"]:
        lesson(story, l)

    # Resource Pack contents.
    story.append(K("The Resource Pack"))
    story.append(Paragraph("Tools that live where life happens.", S["h1"]))
    story.append(Paragraph("This book is the place to learn and write. The sheets stay separate on purpose: print the one you need and put it where the practice happens. They all come in one file, the Resource Pack, so you can print the whole kit at once. Card sheets print four to a page: cut on the dashed lines.", S["body"]))
    rows = []
    for k in C["FIELD_KIT"]:
        rows.append([Paragraph(k["sheet"].upper() if len(k["sheet"]) > 3 else k["sheet"], S["num"]),
                     Paragraph(f"<font name='BodySemi' color='#092f3c'>{k['name']}</font><br/>{k['note']}", S["step"]),
                     Paragraph(k["livesAt"], S["step"])])
    rows.append([Paragraph("FAMILY", S["num"]), Paragraph("<font name='BodySemi' color='#092f3c'>Family tools</font><br/>Three optional pages for using the practices with kids.", S["step"]), Paragraph("Wherever the family is", S["step"])])
    t = Table(rows, colWidths=[0.75 * inch, CONTENT_W - 0.75 * inch - 1.9 * inch, 1.9 * inch])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 7), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t)
    story.append(PageBreak())

    # The Thirty Day Page.
    story.append(K("Keep · The last page"))
    story.append(Paragraph("Keep the parts that held up.", S["h1"]))
    story.append(Paragraph("Do not keep every practice just because you bought the course. Look back at the Focus Protocol and the nine practices, choose two that meet a problem you actually have, and give each a moment, a response, and a smallest version for the hard week. The Thirty Day Page in the Resource Pack is the same thing for the table.", S["body"]))
    story.append(Spacer(1, 4))
    story.append(principle("There is no perfect finish. Notice sooner, repair faster, and keep coming back to the life in front of you."))
    for prompt in ["The two practices I am keeping", "The moment each practice is for", "The smallest version I will still do on a hard week", "What I noticed about the people I share life with"]:
        story.append(Paragraph(prompt.upper(), S["label"]))
        story.append(Lines(2))
    story.append(Paragraph("WHAT WE WANT TO REVISIT IN THIRTY DAYS", S["label_last"]))
    story.append(FillLines(minimum=2))

    doc.build(story)
    print(OUTFILE)


if __name__ == "__main__":
    build()
