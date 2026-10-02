"""Build the All the Way Here course book (the printed edition) from canonical course content.

The lesson text comes from app/course-content.ts, exported to DATA as JSON.
Fonts come from scripts/fonts so the book builds the same on any machine.
"""
from pathlib import Path
import json
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable
)

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "tmp/pdfs/course-content.json"
OUT = ROOT / "public/downloads/all-the-way-here-print-edition.pdf"
FONTS = ROOT / "scripts" / "fonts"

NAVY = colors.HexColor("#092f3c")
TEAL = colors.HexColor("#21859d")
CORAL = colors.HexColor("#df5c3f")
GOLD = colors.HexColor("#d8a93a")
MUTED = colors.HexColor("#526b72")
RULE = colors.HexColor("#b8d3d5")
PAPER = colors.HexColor("#fffdf8")
PALE = colors.HexColor("#edf5f4")


def fonts():
    """Jost stands in for Futura, Figtree for Avenir Next, DM Serif Display for Charter."""
    for name, file in [
        ("Futura", "Jost-Medium.ttf"),
        ("FuturaBold", "Jost-Bold.ttf"),
        ("Avenir", "Figtree-Regular.ttf"),
        ("AvenirDemi", "Figtree-SemiBold.ttf"),
        ("Charter", "DMSerifDisplay-Regular.ttf"),
        ("CharterBold", "DMSerifDisplay-Regular.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))


def styles():
    base = getSampleStyleSheet()
    return {
        "cover_kicker": ParagraphStyle("cover_kicker", parent=base["Normal"], fontName="AvenirDemi", fontSize=10, leading=13, textColor=CORAL, alignment=TA_CENTER, spaceAfter=16, tracking=1.5),
        "cover_title": ParagraphStyle("cover_title", parent=base["Title"], fontName="FuturaBold", fontSize=42, leading=40, textColor=NAVY, alignment=TA_CENTER, spaceAfter=12),
        "cover_sub": ParagraphStyle("cover_sub", parent=base["Normal"], fontName="Charter", fontSize=19, leading=25, textColor=NAVY, alignment=TA_CENTER, spaceAfter=22),
        "cover_small": ParagraphStyle("cover_small", parent=base["Normal"], fontName="Avenir", fontSize=10, leading=15, textColor=MUTED, alignment=TA_CENTER),
        "kicker": ParagraphStyle("kicker", parent=base["Normal"], fontName="AvenirDemi", fontSize=9, leading=12, textColor=CORAL, spaceAfter=9, tracking=1.2),
        "h1": ParagraphStyle("h1", parent=base["Heading1"], fontName="FuturaBold", fontSize=28, leading=30, textColor=NAVY, spaceAfter=10),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="FuturaBold", fontSize=16, leading=19, textColor=NAVY, spaceBefore=10, spaceAfter=5),
        "h3": ParagraphStyle("h3", parent=base["Heading3"], fontName="AvenirDemi", fontSize=10, leading=12, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="Avenir", fontSize=10, leading=13.5, textColor=MUTED, spaceAfter=6),
        "body_dark": ParagraphStyle("body_dark", parent=base["BodyText"], fontName="Avenir", fontSize=10, leading=13.5, textColor=NAVY, spaceAfter=6),
        "quote": ParagraphStyle("quote", parent=base["BodyText"], fontName="Charter", fontSize=14, leading=18, textColor=NAVY),
        "step": ParagraphStyle("step", parent=base["BodyText"], fontName="Avenir", fontSize=9.4, leading=12.5, textColor=NAVY, spaceAfter=4),
        "label": ParagraphStyle("label", parent=base["Normal"], fontName="AvenirDemi", fontSize=8.5, leading=11, textColor=TEAL, spaceAfter=3, tracking=0.8),
        "footer": ParagraphStyle("footer", parent=base["Normal"], fontName="Avenir", fontSize=8, leading=10, textColor=MUTED, alignment=TA_CENTER),
    }


def quote_box(text, s, width=7.05 * inch):
    """A boxed principle with real separation from the heading above it."""
    box = Table([[Paragraph(text, s["quote"])]], colWidths=[width])
    box.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 1.2, GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    box.spaceBefore = 8
    box.spaceAfter = 12
    return box


def line_table(width, rows=3):
    data = [[" "] for _ in range(rows)]
    t = Table(data, colWidths=[width], rowHeights=[24] * rows)
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.55, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = letter
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(.6)
    canvas.line(doc.leftMargin, h - 38, w - doc.rightMargin, h - 38)
    logo = ROOT / "public/assets/brand/here-supply-co-logo-v2.png"
    canvas.drawImage(str(logo), doc.leftMargin, h - 31, width=96, height=28, mask="auto")
    canvas.setFillColor(MUTED)
    canvas.setFont("AvenirDemi", 7.5)
    canvas.drawRightString(w - doc.rightMargin, h - 24, "ALL THE WAY HERE · COURSE BOOK")
    canvas.setStrokeColor(RULE)
    canvas.line(doc.leftMargin, 38, w - doc.rightMargin, 38)
    canvas.setFillColor(MUTED)
    canvas.setFont("Avenir", 7.5)
    canvas.drawString(doc.leftMargin, 24, "HERE SUPPLY CO. · KEEP WHAT HELPS. LEAVE WHAT DOESN'T.")
    canvas.drawRightString(w - doc.rightMargin, 24, str(doc.page))
    canvas.restoreState()


def section_divider(story, s, number, title, line):
    story.append(Spacer(1, 1.6 * inch))
    story.append(Paragraph(number, s["kicker"]))
    story.append(Paragraph(title, s["cover_title"]))
    story.append(Paragraph(line, s["cover_sub"]))
    story.append(Spacer(1, 2.2 * inch))
    story.append(Paragraph("The next pages are meant to be written on, marked up, and returned to. Start with the part of life that is asking for you now.", s["cover_small"]))
    story.append(PageBreak())


def lesson_pages(story, s, lesson):
    """Each lesson is a deliberate two-page spread: idea first, practice second."""
    story.append(Paragraph(f"{lesson['movement']} · LESSON {lesson['number']}", s["kicker"]))
    story.append(Paragraph(lesson['title'], s["h1"]))
    story.append(quote_box(lesson['subtitle'], s))
    story.append(Paragraph("A familiar scene", s["h3"]))
    story.append(Paragraph(lesson['scene'], s["body"]))
    story.append(Paragraph("What is happening", s["h2"]))
    story.append(Paragraph(lesson['problem'], s["body"]))
    story.append(Paragraph("The principle", s["h2"]))
    story.append(quote_box(lesson['principle'], s))
    story.append(PageBreak())

    story.append(Paragraph(f"{lesson['movement']} · PUT IT TO WORK", s["kicker"]))
    story.append(Paragraph(lesson['title'], s["h1"]))
    story.append(Paragraph(lesson['practice'], s["h2"]))
    story.append(Paragraph(lesson['practiceIntro'], s["body"]))
    steps = []
    for ix, step in enumerate(lesson['steps'], start=1):
        steps.append([Paragraph(f"{ix:02d}", s["label"]), Paragraph(f"<b>{step['title']}</b><br/>{step['body']}", s["step"])])
    practice_table = Table(steps, colWidths=[.45 * inch, 6.25 * inch], splitByRow=0)
    practice_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), .45, RULE),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(KeepTogether(practice_table))
    story.append(HRFlowable(width="100%", thickness=.6, color=RULE, spaceBefore=11, spaceAfter=9))
    story.append(Paragraph("Make it fit", s["h3"]))
    story.append(Paragraph(lesson['adaptation'], s["body"]))
    story.append(Paragraph("Do it together", s["h3"]))
    story.append(Paragraph(lesson['together'], s["body"]))
    story.append(Paragraph(f"RESOURCE PACK · SHEET {lesson['kit']['sheet']} · {lesson['kit']['sheetName']}", s["label"]))
    story.append(Paragraph(f"Where it lives: <b>{lesson['kit']['livesAt']}</b>", s["body_dark"]))
    story.append(Paragraph("Try this week", s["h3"]))
    story.append(Paragraph(lesson['action'], s["body"]))
    story.append(Paragraph("What will I try?", s["label"]))
    story.append(line_table(7.0 * inch, 2))
    story.append(Paragraph("Question to sit with", s["label"]))
    story.append(Paragraph(lesson['reflection'], s["body_dark"]))
    story.append(line_table(7.0 * inch, 2))
    story.append(PageBreak())


def build():
    fonts()
    s = styles()
    content = json.loads(DATA.read_text())
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUT), pagesize=letter, leftMargin=.72*inch, rightMargin=.72*inch, topMargin=.72*inch, bottomMargin=.65*inch, title="All the Way Here: Course Book", author="Chris Avera, Here Supply Co.")
    story = []
    logo = ROOT / "public/assets/brand/here-supply-co-logo-v2.png"
    story += [Spacer(1, .9*inch), Table([[" "]], colWidths=[7.05*inch], rowHeights=[.02*inch], style=[("BACKGROUND",(0,0),(-1,-1),TEAL)]), Spacer(1, .4*inch)]
    story.append(Paragraph("HERE SUPPLY CO.", s["cover_kicker"]))
    story.append(Paragraph("ALL THE WAY<br/>HERE.", s["cover_title"]))
    story.append(Paragraph("A course on paper for bringing your attention back to the people and life already in front of you.", s["cover_sub"]))
    story.append(Spacer(1, .25*inch))
    story.append(Paragraph("Focus Protocol · Return · Lead · Keep", s["cover_small"]))
    story.append(Spacer(1, 3.4*inch))
    story.append(Paragraph("Use the online course for a quick reminder. Use this book for the work: mark it up, write in it, and come back when life gets noisy.", s["cover_small"]))
    story.append(PageBreak())
    story.append(Paragraph("HOW TO USE THIS BOOK", s["kicker"]))
    story.append(Paragraph("Less screen. More life.", s["h1"]))
    story.append(Paragraph("You get both versions. The online course is handy for a quick reminder or when you would rather read on a screen. This course book is the way we recommend working through it: write, notice, try something in a normal week, and come back when you miss. Paper slows the loop down. It gives your brain one place to think without another tab, feed, or notification asking for you.", s["body"]))
    steps = [
        ("01", "Start with the Focus Protocol", "Try the four moves for 72 hours. Do not make every boundary permanent on day one."),
        ("02", "Pick the pressure point", "Move to the lesson that meets the part of life that is asking for you right now."),
        ("03", "Use the matching sheet", "Every lesson points to a tool. Print it and place it where it can help."),
        ("04", "Keep only what works", "Choose two practices for thirty days. Let the others wait without guilt."),
    ]
    rows = [[Paragraph(n, s["label"]), Paragraph(f"<b>{t}</b><br/>{b}", s["step"])] for n,t,b in steps]
    t=Table(rows,colWidths=[.5*inch,6.5*inch]); t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LINEBELOW",(0,0),(-1,-1),.55,RULE),("TOPPADDING",(0,0),(-1,-1),11),("BOTTOMPADDING",(0,0),(-1,-1),11),("LEFTPADDING",(0,0),(-1,-1),0)])); story.append(t)
    story.append(Spacer(1, .35*inch))
    story.append(Paragraph("The promise you are making", s["h2"]))
    story.append(quote_box(content['RESET_DECLARATION'], s))
    story.append(PageBreak())
    story.append(Paragraph("THE 72 HOUR FOCUS PROTOCOL", s["kicker"]))
    story.append(Paragraph("Control the inputs. Choose the attention.", s["h1"]))
    story.append(Paragraph("Treat this as a short experiment in changing your surroundings. Reduce what pulls at you, add enough friction to notice the reflex, and make a different choice in everyday life. Nobody is testing your discipline.", s["body"]))
    for move in content['FOCUS_MOVES']:
        story.append(KeepTogether([Paragraph(f"{move['number']} · {move['title'].upper()}", s["h2"]), Paragraph(move['promise'], s["body_dark"]), Paragraph(move['body'], s["body"]), Paragraph(f"<b>Make it fit:</b> {move['exception']}", s["step"])]))
    story.append(PageBreak())
    story.append(Paragraph("FOCUS PROTOCOL · FIELD NOTES", s["kicker"]))
    story.append(Paragraph("What did you notice when the phone stopped leading?", s["h1"]))
    story.append(Paragraph("Do not grade yourself. Write down what changed, where the reflex was strongest, and one boundary worth keeping after the three days are over.", s["body"]))
    for prompt in ["The moment I most often reached without deciding", "What was easier when I gave the phone a home", "The part of life I want to protect first", "The one arrangement I will keep for the next fourteen days"]:
        story.append(Spacer(1, 10)); story.append(Paragraph(prompt, s["h3"])); story.append(line_table(7.0*inch, 3))
    story.append(PageBreak())
    story.append(Paragraph("WHAT THE 72 HOURS CAN FEEL LIKE", s["kicker"]))
    story.append(Paragraph("Know the hard part before you reach it.", s["h1"]))
    for phase in content['RESET_TIMELINE']:
        story.append(Paragraph(f"{phase['window']} · {phase['title']}", s["h2"]))
        story.append(Paragraph(phase['body'], s["body"]))
    story.append(Paragraph("When the old habit starts negotiating", s["h2"]))
    story.append(Paragraph(content['RESET_RELAPSE']['intro'], s["body"]))
    for line in content['RESET_RELAPSE']['lines']:
        story.append(Paragraph(f"• {line}", s["body_dark"]))
    story.append(quote_box(content['RESET_RELAPSE']['counter'], s))
    story.append(PageBreak())
    for lesson in content['CORE_LESSONS']:
        lesson_pages(story, s, lesson)
    story.append(Paragraph("THE RESOURCE PACK", s["kicker"]))
    story.append(Paragraph("Tools that live where life happens.", s["h1"]))
    story.append(Paragraph("This course book is the place to learn and write. The individual sheets stay separate on purpose: print the one you need and place it where the practice needs to happen.", s["body"]))
    rows=[]
    for sheet in content['FIELD_KIT']:
        rows.append([Paragraph(sheet['sheet'],s['label']), Paragraph(f"<b>{sheet['name']}</b><br/>{sheet['note']}",s['step']), Paragraph(sheet['livesAt'],s['step'])])
    t=Table(rows,colWidths=[.5*inch,4.3*inch,2.2*inch]); t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LINEBELOW",(0,0),(-1,-1),.45,RULE),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),("LEFTPADDING",(0,0),(-1,-1),0)]));story.append(t)
    story.append(PageBreak())
    story.append(Paragraph("YOUR THIRTY DAY PAGE", s["kicker"]))
    story.append(Paragraph("Keep the parts that held up.", s["h1"]))
    story.append(Paragraph("Do not keep every practice just because you bought the course. Look back at the Focus Protocol and the eight practices, choose two that meet a problem you have, and give each a situation, a response, and a smallest version for the hard week.", s["body"]))
    for prompt in ["The two practices I am keeping", "The moment each practice is for", "The smallest version I will still do on a hard week", "What I noticed about the people I share life with", "What we want to revisit in thirty days"]:
        story.append(Spacer(1, 10)); story.append(Paragraph(prompt, s["h3"])); story.append(line_table(7.0*inch, 3))
    story.append(Spacer(1, 12))
    story.append(quote_box("There is no perfect finish. Notice sooner, repair faster, and keep coming back to the life in front of you.", s))
    story.append(Paragraph("Notes to take back to the table", s["h2"]))
    story.append(Paragraph("Use this last page for what you want to remember, talk about, or carry into the next Sunday Board Meeting.", s["body"]))
    story.append(Paragraph("What I want to try this week", s["h3"]))
    story.append(line_table(7.0 * inch, 4))
    story.append(Paragraph("Who will know I am trying it?", s["h3"]))
    story.append(line_table(7.0 * inch, 3))
    story.append(Paragraph("What I want to come back to", s["h3"]))
    story.append(line_table(7.0 * inch, 3))
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)

if __name__ == "__main__":
    build()
