"""Build the men's course book from the text the men's course pages use.

    node --experimental-strip-types scripts/export-mens-content.mjs
    python3 scripts/build-mens-edition-print.py

Uses the same print system and helpers as the couples course book, so the two
books read as one family. The Solo, then every lesson in full with its photo,
followed by two pages to write on, then the last page and the Focus Protocol
as the Lesson 2 tool. Output sits under
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
MOVES = {m["key"]: m["name"] for m in M["MEN_MOVEMENTS"]}
OUTFILE = ROOT / "public/downloads/men/all-the-way-here-mens-edition.pdf"


def photo(src, height=2.3 * inch):
    """The lesson photo, cropped to the column width, when the file exists."""
    from reportlab.platypus import Image
    from PIL import Image as PILImage
    path = ROOT / "public" / src.lstrip("/")
    if not path.exists():
        return Spacer(1, 1)
    with PILImage.open(path) as im:
        w, h = im.size
    target = CONTENT_W / height
    # Crop to the frame's shape so the photo fills the width without distortion.
    crop_dir = ROOT / "tmp/pdfs/crops"
    crop_dir.mkdir(parents=True, exist_ok=True)
    out = crop_dir / path.name
    with PILImage.open(path) as im:
        if w / h > target:
            nw = int(h * target)
            box_ = ((w - nw) // 2, 0, (w - nw) // 2 + nw, h)
        else:
            nh = int(w / target)
            box_ = (0, (h - nh) // 2, w, (h - nh) // 2 + nh)
        im.crop(box_).convert("RGB").resize((int(CONTENT_W * 2.4), int(height * 2.4))).save(out, quality=84)
    return Image(str(out), width=CONTENT_W, height=height)


def page(canvas, doc):
    canvas.saveState()
    masthead(canvas, "All the Way Here · Men's Edition")
    footer(canvas, None, right=str(doc.page))
    canvas.setFont("Body", 7.6)
    canvas.setFillColor(COPY)
    canvas.drawString(SIDE, FOOT_TEXT, "HERE SUPPLY CO.  ·  ALL THE WAY HERE, MEN'S EDITION")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.drawImage(str(LOGO), (W - 150) / 2, H - 1.35 * inch, width=150, height=150 * 32.7 / 112, mask="auto")
    canvas.setFillColor(DEEP)
    canvas.rect(SIDE, H - 1.75 * inch, CONTENT_W, 2.2, stroke=0, fill=1)
    canvas.setFillColor(SEA)
    canvas.rect(SIDE, 0.6 * inch, CONTENT_W, 1.3 * inch, stroke=0, fill=1)
    caps(canvas, W / 2, 0.6 * inch + 1.3 * inch - 30, "What is inside", size=7.4, color=CORAL, align="center")
    for k, line in enumerate(["The Solo and nine lessons in three parts, each one at home and at work,",
                              "with two pages to write on after every lesson.",
                              "Use the online course for a quick read. Use this book for the work."]):
        canvas.setFont("Body", 10.4)
        canvas.setFillColor(INK)
        canvas.drawCentredString(W / 2, 0.6 * inch + 1.3 * inch - 50 - k * 15, line)
    canvas.restoreState()


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def write_here(story, prompt, minimum=3, last=False):
    story.append(Paragraph(prompt.upper(), S["label_last" if last else "label"]))
    story.append(FillLines(minimum=minimum) if last else Lines(minimum))


def lesson(story, l):
    mv = MOVES[l["movement"]]
    story.append(K(f"{mv} · Lesson {l['number']} of 9"))
    story.append(Paragraph(esc(l["title"]), S["h1"]))
    story.append(Paragraph("\u201c" + esc(l["says"]) + "\u201d", S["note"]))
    story.append(principle(esc(l["subtitle"])))
    story.append(Spacer(1, 8))
    story.append(photo(l["photo"]["src"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph("The moment", S["h3"]))
    story.append(Paragraph(esc(l["moment"]), S["body"]))
    story.append(Paragraph("What is really going on", S["h2"]))
    story.append(Paragraph(esc(l["really"]), S["body"]))
    story.append(Paragraph("The principle", S["h2"]))
    story.append(principle(esc(l["principle"])))
    story.append(Paragraph("The practice: " + esc(l["practice"]["name"]), S["h2"]))
    story.append(Paragraph(esc(l["practice"]["intro"]), S["body"]))
    story.append(numbered([("%02d" % i, esc(st["title"]), esc(st["body"])) for i, st in enumerate(l["practice"]["steps"], 1)]))
    story.append(Paragraph("If this week is hard", S["h3"]))
    story.append(Paragraph(esc(l["hardWeek"]), S["dark"]))
    story.append(Paragraph("At home", S["h3"]))
    story.append(Paragraph(esc(l["atHome"]), S["body"]))
    story.append(Paragraph("At work", S["h3"]))
    story.append(Paragraph(esc(l["atWork"]), S["body"]))
    story.append(Paragraph("If this does not fit your life", S["h3"]))
    story.append(Paragraph(esc(l["ifNot"]), S["body"]))
    story.append(Paragraph("Why it helps", S["h3"]))
    story.append(Paragraph(esc(l["whyItHelps"]), S["body"]))
    story.append(Paragraph("Research: " + "; ".join(esc(e["label"]) for e in l["evidence"]) + ". Links are on the lesson page.", S["small"]))
    story.append(Paragraph("Words to use", S["h3"]))
    for line in l["words"]:
        story.append(Paragraph("\u201c" + esc(line) + "\u201d", S["note"]))
    story.append(Paragraph("Watch for", S["h3"]))
    story.append(Paragraph(esc(l["watchFor"]), S["body"]))
    if l.get("straightWord"):
        story.append(Spacer(1, 4))
        story.append(Box(Paragraph(
            "<font name='BodySemi' size='7.2' color='#df5c3f'>A STRAIGHT WORD</font><br/>"
            f"<font name='Body' size='9.6' color='#092f3c'>{esc(l['straightWord'])}</font>", S["small"]),
            border=None, fill=PAPER, pad=12, left_bar=CORAL))
    story.append(Spacer(1, 6))
    story.append(Box(Paragraph(
        f"<font name='BodySemi' size='7.2' color='#21859d'>YOUR SHEET · LESSON {l['number']}</font><br/>"
        f"<font name='Display' size='12' color='#092f3c'>{esc(l['sheet']['name'])}</font>"
        f"<font name='Body' size='9.4' color='#526b72'>  ·  {esc(l['sheet']['holds'])} Lives at: {esc(l['sheet']['livesAt'])}.</font>", S["small"]),
        border=None, fill=SEA, pad=12, left_bar=OCEAN))
    story.append(Paragraph("This week", S["h3"]))
    story.append(Paragraph(esc(l["thisWeek"]), S["dark"]))
    story.append(Paragraph("FROM CHRIS", S["label"]))
    story.append(Paragraph(esc(l["fromChris"]), S["note"]))
    story.append(Paragraph("NOTES", S["label_last"]))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())
    story.append(K(f"Lesson {l['number']} · Your pages"))
    story.append(Paragraph("What actually happened.", S["h1"]))
    story.append(Paragraph("Write what happened, not what should have. Nobody is grading this.", S["body"]))
    write_here(story, "Reflect: " + l["reflect"], 5)
    write_here(story, "The question I would ask you on a call: " + l["coachQuestion"], 5)
    write_here(story, "What I tried this week, at home and at work", 4)
    write_here(story, "What I am carrying into next week", 2, last=True)
    story.append(PageBreak())


def solo(story, so):
    story.append(K("Before you start · Half a day"))
    story.append(Paragraph(esc(so["title"]), S["h1"]))
    story.append(principle(esc(so["subtitle"])))
    story.append(Spacer(1, 8))
    story.append(photo(so["photo"]["src"]))
    story.append(Spacer(1, 6))
    for t in so["intro"]:
        story.append(Paragraph(esc(t), S["body"]))
    story.append(Paragraph("How the half day goes", S["h2"]))
    story.append(numbered([("%02d" % i, esc(h["title"]), esc(h["body"])) for i, h in enumerate(so["hours"], 1)]))
    story.append(Paragraph("Smallest version", S["h3"]))
    story.append(Paragraph(esc(so["smallest"]) + " " + esc(so["cannotGetAway"]), S["dark"]))
    story.append(Paragraph("What to bring", S["h3"]))
    story.append(Paragraph(esc(", ".join(so["bring"])) + ". " + esc(so["bringNote"]), S["body"]))
    story.append(Paragraph("After", S["h3"]))
    story.append(Paragraph(esc(so["after"]), S["body"]))
    story.append(Paragraph("Words to use", S["h3"]))
    story.append(Paragraph("\u201c" + esc(so["words"]) + "\u201d", S["note"]))
    story.append(Paragraph("FROM CHRIS", S["label"]))
    story.append(Paragraph(esc(so["fromChris"]), S["note"]))
    story.append(PageBreak())
    story.append(K("The Solo · Your pages"))
    story.append(Paragraph("Three questions.", S["h1"]))
    story.append(Paragraph(esc(so["questionsIntro"]) + " " + esc(so["questionsAfter"]), S["body"]))
    for i, q in enumerate(so["questions"]):
        write_here(story, q, 7, last=(i == 2))
    story.append(PageBreak())
    story.append(K("The Solo · The last hour"))
    story.append(Paragraph("The next ninety days.", S["h1"]))
    story.append(Paragraph("One page to yourself about what you want the next ninety days to look like. Home, work, your body, the people who count on you. Plain words.", S["body"]))
    story.append(FillLines(minimum=10))
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
    story.append(Paragraph("Nine problems men actually say out loud, and what to do about each one.", S["cover_sub"]))
    story.append(Spacer(1, 22))
    story.append(Paragraph("The Solo · See it · Carry it · Build it", S["cover_small"]))
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph("Write in it. Mark it up. Come back to it when life gets loud.", S["cover_small"]))
    story.append(NextPageTemplate("page"))
    story.append(PageBreak())

    story.append(K("Start here"))
    story.append(Paragraph("How the course works.", S["h1"]))
    story.append(Paragraph("One lesson a week for nine weeks, in three parts. See it (lessons 1 to 3) is about being honest about where you are. Carry it (4 to 6) is about the load you carry. Build it (7 to 9) is about what lasts after you. Before the first lesson, you take half a day alone with a notebook.", S["body"]))
    story.append(Paragraph("Every lesson starts with something men actually say out loud, then gives you the moment you will recognize, what is really going on, the principle, a practice in four steps, a version for hard weeks, how it plays out at home and at work, an honest alternative if it does not fit your life, why it helps, words to use, what to watch for, and this week's assignment. After each lesson there are two pages for you.", S["body"]))
    story.append(Paragraph("The order", S["h2"]))
    story.append(numbered([
        ("0", "The Solo, this week", "Half a day outside, phone in the truck, three questions on paper."),
        ("1", "One lesson a week", "Read it on Sunday. Try the practice all week, at home and at work."),
        ("2", "Print the sheet", "Each lesson has one, printed from its lesson page. Put it where the moment happens."),
        ("3", "Write here what actually happened", "Not what should have happened. Answer the question I would ask you on a call."),
        ("4", "Keep the two that helped", "The last page. Let the rest wait without guilt."),
    ], pad=7))
    story.append(Paragraph("Nine lessons", S["h2"]))
    story.append(numbered([(l["number"], esc(l["title"]), "\u201c" + esc(l["says"]) + "\u201d") for l in M["MEN_LESSONS"]], pad=5))
    story.append(PageBreak())

    solo(story, M["MEN_SOLO"])

    for l in M["MEN_LESSONS"]:
        if l["number"] in ("1", "4", "7"):
            mv = next(m for m in M["MEN_MOVEMENTS"] if m["key"] == l["movement"])
            story.append(K(f"Part {mv['number']}"))
            story.append(Paragraph(esc(mv["name"]) + ".", S["h1"]))
            story.append(principle(esc(mv["line"])))
            story.append(Spacer(1, 10))
            story.append(photo(mv["still"], height=4.2 * inch))
            story.append(PageBreak())
        lesson(story, l)

    story.append(K("After the nine · The last page"))
    story.append(Paragraph("Keep the two that helped.", S["h1"]))
    story.append(Paragraph("Do not keep every practice because you paid for the course. Choose two that meet a problem you actually have, and give each a moment, a response, and a smallest version for a bad week. Make at least one of them show up at work.", S["body"]))
    story.append(Spacer(1, 4))
    story.append(principle("Two practices you keep beat nine you admired."))
    for prompt in ["The two practices I am keeping", "The moment each one is for, at home and at work", "The smallest version I will still do on a bad week", "Who will ask me about this at day fifteen"]:
        story.append(Paragraph(prompt.upper(), S["label"]))
        story.append(Lines(2))
    story.append(Paragraph("WHAT I WANT TO LOOK AT AGAIN IN THIRTY DAYS", S["label_last"]))
    story.append(FillLines(minimum=2))
    story.append(PageBreak())

    story.append(K("A tool for Lesson 2 · The Focus Protocol"))
    story.append(Paragraph("If the phone is your reach.", S["h1"]))
    story.append(Paragraph("Four moves for seventy two hours. A short experiment in changing your surroundings: cut down what pulls at you, add enough friction to notice the reflex, and make a different choice. Willpower has very little to do with it.", S["body"]))
    for m in M["MEN_FOCUS_MOVES"]:
        story.append(KeepTogether([
            Paragraph(f"<font color='#df5c3f'>{m['number']}</font>  {esc(m['title'])}", S["h2"]),
            Paragraph(esc(m["promise"]), S["dark"]),
            Paragraph(esc(m["body"]), S["body"]),
            Paragraph(f"<font name='BodySemi' color='#092f3c'>Make it fit:</font> {esc(m['exception'])}", S["step"]),
        ]))
    story.append(PageBreak())
    story.append(K("The Focus Protocol · What the 72 hours can feel like"))
    story.append(Paragraph("Know the hard part before you reach it.", S["h1"]))
    story.append(numbered([(p["window"].replace("Hours ", ""), esc(p["title"]), esc(p["body"])) for p in M["MEN_RESET_TIMELINE"]], widths=(0.7 * inch, None), pad=8))
    rel = M["MEN_RESET_RELAPSE"]
    story.append(Paragraph("When the old habit starts negotiating", S["h2"]))
    story.append(Paragraph(esc(rel["intro"]), S["body"]))
    for ln in rel["lines"]:
        story.append(Paragraph("\u201c" + esc(ln) + "\u201d", S["note"]))
    story.append(Spacer(1, 8))
    story.append(principle(esc(rel["counter"])))
    story.append(Paragraph("The declaration", S["h3"]))
    story.append(principle(esc(M["MEN_RESET_DECLARATION"])))

    doc.build(story)
    print(OUTFILE)


if __name__ == "__main__":
    build()
