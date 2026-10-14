"""Build the men's course book from the text the men's course pages use.

    node --experimental-strip-types scripts/export-course-content.mjs
    node --experimental-strip-types scripts/export-mens-content.mjs
    python3 scripts/build-mens-edition-print.py

Uses the same print system and helpers as the couples course book, so the two
books read as one family. Every lesson carries its home and work examples and
the question Chris asks about it on a coaching call. Output sits under
/downloads/men/, which only the men's course password opens.
"""
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools" / "print"))

# Borrow the couples builder's styles and flowables without running it.
spec = importlib.util.spec_from_file_location("couples_book", ROOT / "scripts" / "build-all-the-way-here-print-edition.py")
cb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cb)

from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak, KeepTogether, NextPageTemplate,
)
from hsc import *

S, K, Box, Lines, FillLines, principle, numbered = cb.S, cb.K, cb.Box, cb.Lines, cb.FillLines, cb.principle, cb.numbered

M = json.loads((ROOT / "tmp/pdfs/mens-content.json").read_text())
KIT = {k["sheet"]: k for k in M["FIELD_KIT"]}
MOVES = {m["key"]: m["name"] for m in M["MEN_MOVEMENTS"]}
OUTFILE = ROOT / "public/downloads/men/all-the-way-here-mens-edition.pdf"


def page(canvas, doc):
    canvas.saveState()
    masthead(canvas, "All the Way Here · Men's Edition")
    footer(canvas, None, right=str(doc.page))
    canvas.setFont("Body", 7.6)
    canvas.setFillColor(COPY)
    canvas.drawString(SIDE, FOOT_TEXT, "HERE SUPPLY CO.  ·  ONE MAN. ONE SYSTEM. EVERY ROOM.")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.drawImage(str(LOGO), (W - 150) / 2, H - 1.35 * inch, width=150, height=150 * 32.7 / 112, mask="auto")
    canvas.setFillColor(DEEP)
    canvas.rect(SIDE, H - 1.75 * inch, CONTENT_W, 2.2, stroke=0, fill=1)
    canvas.setFillColor(SEA)
    canvas.rect(SIDE, 0.6 * inch, CONTENT_W, 1.3 * inch, stroke=0, fill=1)
    caps(canvas, W / 2, 0.6 * inch + 1.3 * inch - 30, "What is inside", size=7.4, color=CORAL, align="center")
    for k, line in enumerate(["The 72 hour Focus Protocol and nine lessons in three movements,",
                              "each one at home and at work, with room to write on every page.",
                              "Use the online course for a quick read. Use this book for the work."]):
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
    story.append(Paragraph("At home", S["h3"]))
    story.append(Paragraph(l["atHome"], S["body"]))
    story.append(Paragraph("At work", S["h3"]))
    story.append(Paragraph(l["atWork"], S["body"]))
    if l.get("ifNot"):
        story.append(Paragraph(l["ifNot"]["label"].capitalize(), S["h3"]))
        story.append(Paragraph(l["ifNot"]["body"], S["body"]))
    story.append(Spacer(1, 6))
    story.append(Box(Paragraph(
        f"<font name='BodySemi' size='7.2' color='#21859d'>YOUR SHEET · {l['number']}</font><br/>"
        f"<font name='Display' size='12' color='#092f3c'>{kit['name']}</font>"
        f"<font name='Body' size='9.4' color='#526b72'>  ·  Where it lives: {l['kit']['livesAt']}. "
        f"Print it from the Resource Pack and put it where the moment happens.</font>", S["small"]),
        border=None, fill=SEA, pad=12, left_bar=OCEAN))
    story.append(Paragraph("Try this week", S["h3"]))
    story.append(Paragraph(l["guide"]["fieldAssignment"], S["dark"]))
    story.append(Paragraph("FROM CHRIS", S["label"]))
    story.append(Paragraph(l["fieldNote"], S["note"]))
    story.append(Paragraph("THE QUESTION I WOULD ASK YOU ON A CALL", S["label"]))
    story.append(Paragraph(l["coachQuestion"], ParagraphStyle("r", parent=S["dark"], keepWithNext=0)))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())


def build():
    OUTFILE.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(OUTFILE), pagesize=letter, title="All the Way Here, Men's Edition: Course Book",
                          author="Chris Avera, Here Supply Co.", leftMargin=SIDE, rightMargin=SIDE)
    body = Frame(SIDE, BODY_BOTTOM, CONTENT_W, HEAD_RULE - 20 - BODY_BOTTOM, id="body", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    cover_frame = Frame(SIDE, 2.4 * inch, CONTENT_W, H - 2.2 * inch - 2.4 * inch, id="cover", leftPadding=0, rightPadding=0)
    doc.addPageTemplates([PageTemplate("cover", [cover_frame], onPage=cover), PageTemplate("page", [body], onPage=page)])

    story = [Spacer(1, 0.9 * inch)]
    story.append(Paragraph("MEN'S EDITION · A COURSE ON PAPER", S["cover_kicker"]))
    story.append(Spacer(1, 16))
    story.append(Paragraph("All the Way<br/>Here.", S["cover_title"]))
    story.append(Spacer(1, 18))
    story.append(Paragraph("Get your attention back. Then lead with it, at home and at work.", S["cover_sub"]))
    story.append(Spacer(1, 22))
    story.append(Paragraph("The Focus Protocol · Return · Lead · Keep", S["cover_small"]))
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph("Write in it. Mark it up. Come back to it when life gets loud.", S["cover_small"]))
    story.append(NextPageTemplate("page"))
    story.append(PageBreak())

    story.append(K("Start here"))
    story.append(Paragraph("How it fits together.", S["h1"]))
    story.append(Paragraph("One man, one system, every room. The same three things decide how you show up at home, at work, and with yourself: where your attention goes, how you carry pressure, and whether you have a life outside your roles. You do not need to finish everything. You need to try a practice in a normal week and keep the ones that help.", S["body"]))
    story.append(Spacer(1, 4))
    story.append(numbered([
        ("01", "The Focus Protocol", "Three days, four small moves, before you ask anyone else to change anything."),
        ("02", "The nine lessons", "Return, Lead, Keep. One idea and one practice each, shown at home and at work."),
        ("03", "The Resource Pack", "One sheet per lesson, numbered to match. Each one lives where the moment happens: the glovebox, the desk, the nightstand."),
        ("04", "The weekly board", "Fifteen minutes on Sunday to plan the week, with whoever shares your life or on your own."),
    ], pad=9))
    story.append(Paragraph("The order", S["h2"]))
    story.append(numbered([
        ("1", "Start the Focus Protocol today", "Do not make every boundary permanent on day one."),
        ("2", "On day four, open Return", "One lesson a week. Try it at home and at work. Print that lesson's sheet."),
        ("3", "Write here what actually happened", "Not what should have happened."),
        ("4", "End with the Thirty Day Page", "Keep two practices. Let the rest wait without guilt."),
    ], pad=7))
    story.append(Paragraph("The promise you are making", S["h2"]))
    story.append(principle(M["MEN_RESET_DECLARATION"]))
    story.append(PageBreak())

    story.append(K("Start here · The 72 hour Focus Protocol"))
    story.append(Paragraph("Control the inputs. Choose the attention.", S["h1"]))
    story.append(Paragraph("A short experiment in changing your surroundings. Cut down what pulls at you, add enough friction to notice the reflex, and make a different choice. Willpower has very little to do with it.", S["body"]))
    for m in M["MEN_FOCUS_MOVES"]:
        story.append(KeepTogether([
            Paragraph(f"<font color='#df5c3f'>{m['number']}</font>  {m['title']}", S["h2"]),
            Paragraph(m["promise"], S["dark"]),
            Paragraph(m["body"], S["body"]),
            Paragraph(f"<font name='BodySemi' color='#092f3c'>Make it fit:</font> {m['exception']}", S["step"]),
        ]))
    story.append(PageBreak())

    story.append(K("Start here · What the 72 hours can feel like"))
    story.append(Paragraph("Know the hard part before you reach it.", S["h1"]))
    story.append(numbered([(p["window"].replace("Hours ", ""), p["title"], p["body"]) for p in M["MEN_RESET_TIMELINE"]], widths=(0.7 * inch, None), pad=8))
    rel = M["MEN_RESET_RELAPSE"]
    story.append(Paragraph("When the old habit starts negotiating", S["h2"]))
    story.append(Paragraph(rel["intro"], S["body"]))
    for ln in rel["lines"]:
        story.append(Paragraph("“" + ln + "”", S["note"]))
    story.append(Spacer(1, 8))
    story.append(principle(rel["counter"]))
    story.append(Paragraph("Tell one person", S["h3"]))
    story.append(Paragraph(rel["tellSomeone"], S["body"]))
    story.append(PageBreak())

    story.append(K("Start here · Field notes"))
    story.append(Paragraph("What did you notice when the phone stopped leading?", S["h1"]))
    story.append(Paragraph("Do not grade yourself. Write what changed, where the reflex was strongest, and one boundary worth keeping.", S["body"]))
    for prompt in ["The moment I most often reached without deciding", "What was different at work", "What was different at home"]:
        story.append(Paragraph(prompt.upper(), S["label"]))
        story.append(Lines(2))
    story.append(Paragraph("THE ONE ARRANGEMENT I WILL KEEP FOR THE NEXT FOURTEEN DAYS", S["label_last"]))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())

    for l in M["MEN_LESSONS"]:
        lesson(story, l)

    story.append(K("Keep · The last page"))
    story.append(Paragraph("Keep the parts that held up.", S["h1"]))
    story.append(Paragraph("Do not keep every practice because you paid for the course. Choose two that meet a problem you actually have, and give each a moment, a response, and a smallest version for a bad week. Make at least one of them show up at work.", S["body"]))
    story.append(Spacer(1, 4))
    story.append(principle("There is no perfect finish. Notice sooner, repair faster, and keep coming back to the life in front of you."))
    for prompt in ["The two practices I am keeping", "The moment each one is for, at home and at work", "The smallest version I will still do on a bad week", "Who will ask me about this at day fifteen"]:
        story.append(Paragraph(prompt.upper(), S["label"]))
        story.append(Lines(2))
    story.append(Paragraph("WHAT I WANT TO LOOK AT AGAIN IN THIRTY DAYS", S["label_last"]))
    story.append(FillLines(minimum=2))

    doc.build(story)
    print(OUTFILE)


if __name__ == "__main__":
    build()
