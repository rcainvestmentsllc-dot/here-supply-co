from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "all-the-way-here-workbook.pdf"
PAGE_W, PAGE_H = letter

INK = HexColor("#092F3C")
OCEAN = HexColor("#21859D")
SEA_GLASS = HexColor("#D9EEEF")
CORAL = HexColor("#DF5C3F")
SUN = HexColor("#F4C550")
COPY = HexColor("#526B72")
PALE = HexColor("#FFF8EC")
RULE = HexColor("#B8D3D5")
WHITE = HexColor("#FFFFFF")


def register_fonts():
    pdfmetrics.registerFont(TTFont("Futura", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=0))
    pdfmetrics.registerFont(TTFont("FuturaBold", "/System/Library/Fonts/Supplemental/Futura.ttc", subfontIndex=2))
    pdfmetrics.registerFont(TTFont("Avenir", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7))
    pdfmetrics.registerFont(TTFont("AvenirDemi", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=2))

LESSONS = [
    ("1.1", "RETURN", "The Sanctuary", "Get the open loops out of your head.", "Which unfinished things keep following me into the room?", "Use paper for one honest mind sweep. Circle no more than three items for this week."),
    ("1.2", "RETURN", "Focus Mode", "Protect the work that changes something.", "Which maintenance tasks help me feel busy while avoiding the work that matters?", "Choose one focused block and close the obvious gates before it begins."),
    ("1.3", "RETURN", "The Driveway Pause", "Use the trip home as a deliberate transition.", "What usually follows me through the door?", "After you are safely parked, name what belongs to tomorrow and choose how you want to enter."),
    ("2.1", "LEAD", "The Emotional Thermostat", "Pause before pressure chooses your response.", "What signal tells me that pressure is about to choose my response?", "Write one clean pause sentence and a specific time when you will return."),
    ("2.2", "LEAD", "The Date Night Algorithm", "Create a little curiosity together.", "What kind of shared activity makes conversation easier for us?", "Choose one real time. Silence both phones and agree where they will stay out of sight."),
    ("2.3", "LEAD", "The Floor General", "Join your child's world without taking it over.", "How quickly do I start directing when I enter my child's world?", "When they call your name or say, Watch this, put the phone down and give them your eyes first."),
    ("3.1", "KEEP", "The Third Place", "Keep one part of life from becoming only duty.", "What place or activity helps me return more alive and available?", "Choose the smallest real version and coordinate the first two times this month."),
    ("3.2", "KEEP", "The Friendship Script", "Invite first and make the invitation easy to answer.", "Who am I hoping will invite me, and what stops me from inviting them?", "Send one specific, low-pressure invitation with an activity, day, and time."),
    ("3.3", "KEEP", "Mission Debrief", "Keep the practices that actually helped.", "Which two practices would make the biggest difference in the life I already have?", "Choose one Return practice and one Lead or Keep practice for the next thirty days."),
]


def set_font(pdf, name, size, color=INK):
    pdf.setFont(name, size)
    pdf.setFillColor(color)


def wrap_lines(text, font, size, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and stringWidth(candidate, font, size) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_wrapped(pdf, text, x, y, width, font="Avenir", size=10, leading=14, color=COPY, max_lines=None):
    lines = wrap_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    set_font(pdf, font, size, color)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_brand(pdf, page_number, accent=OCEAN):
    pdf.setFillColor(accent)
    pdf.rect(0, PAGE_H - 46, PAGE_W, 46, fill=1, stroke=0)
    pdf.setFillColor(SUN)
    pdf.rect(PAGE_W - 54, PAGE_H - 46, 54, 46, fill=1, stroke=0)
    pdf.drawImage(str(ROOT / "public/assets/brand/here-supply-co-logo-inverse-v2.png"), 42, PAGE_H - 36, width=100, height=29.2, mask="auto")
    set_font(pdf, "AvenirDemi", 6.5, WHITE)
    pdf.drawString(158, PAGE_H - 29, "RETURN · LEAD · KEEP")
    set_font(pdf, "FuturaBold", 10, INK)
    pdf.drawCentredString(PAGE_W - 27, PAGE_H - 30, str(page_number))
    pdf.setFillColor(accent)
    pdf.rect(0, 0, PAGE_W, 5, fill=1, stroke=0)
    set_font(pdf, "AvenirDemi", 6.5, COPY)
    pdf.drawString(42, 24, "ALL THE WAY HERE")
    pdf.drawRightString(PAGE_W - 42, 24, "SHOW UP FOR REAL LIFE")


def draw_section_title(pdf, label, title, subtitle, page_number):
    if "RETURN" in label:
        accent = OCEAN
    elif "LEAD" in label or "THIRTY-DAY" in label:
        accent = CORAL
    elif "KEEP" in label:
        accent = INK
    elif "BEFORE LESSON" in label:
        accent = INK
    else:
        accent = OCEAN
    draw_brand(pdf, page_number, accent)
    set_font(pdf, "AvenirDemi", 7.5, CORAL)
    pdf.drawString(42, PAGE_H - 76, label)
    set_font(pdf, "FuturaBold", 27, INK)
    pdf.drawString(42, PAGE_H - 111, title)
    return draw_wrapped(pdf, subtitle, 42, PAGE_H - 132, PAGE_W - 84, size=10.5, leading=14.5)


def draw_prompt(pdf, y, label, prompt, line_count=4):
    set_font(pdf, "AvenirDemi", 7.5, OCEAN)
    pdf.drawString(42, y, label)
    y -= 21
    y = draw_wrapped(pdf, prompt, 42, y, PAGE_W - 84, font="AvenirDemi", size=12, leading=16, color=INK)
    y -= 7
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.65)
    for _ in range(line_count):
        pdf.line(42, y, PAGE_W - 42, y)
        y -= 25
    return y


def draw_three_fields(pdf, y, labels):
    gap = 12
    width = (PAGE_W - 84 - gap * 2) / 3
    for i, label in enumerate(labels):
        x = 42 + i * (width + gap)
        set_font(pdf, "AvenirDemi", 6.8, CORAL)
        pdf.drawString(x, y, label)
        pdf.setStrokeColor(RULE)
        pdf.line(x, y - 18, x + width, y - 18)


def cover(pdf):
    pdf.setFillColor(PALE)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(SEA_GLASS)
    pdf.rect(PAGE_W * 0.69, 0, PAGE_W * 0.31, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(SUN)
    pdf.circle(PAGE_W - 95, PAGE_H - 120, 47, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.rect(0, PAGE_H - 55, PAGE_W, 55, fill=1, stroke=0)
    pdf.drawImage(str(ROOT / "public/assets/brand/here-supply-co-logo-inverse-v2.png"), 48, PAGE_H - 44, width=119, height=34.7, mask="auto")
    set_font(pdf, "AvenirDemi", 7, SUN)
    pdf.drawRightString(PAGE_W - 48, PAGE_H - 35, "RETURN · LEAD · KEEP")
    set_font(pdf, "AvenirDemi", 9, CORAL)
    pdf.drawString(48, PAGE_H - 89, "ALL THE WAY HERE")
    set_font(pdf, "FuturaBold", 38, INK)
    pdf.drawString(48, PAGE_H - 157, "The Practice")
    pdf.drawString(48, PAGE_H - 201, "Workbook")
    draw_wrapped(pdf, "Attention Reset, nine lesson pages, three family tools, and one thirty-day plan.", 48, PAGE_H - 239, 390, size=13, leading=18, color=COPY)
    pdf.setFillColor(OCEAN)
    pdf.rect(48, 105, 340, 104, fill=1, stroke=0)
    set_font(pdf, "FuturaBold", 19, WHITE)
    pdf.drawString(67, 169, "PRINT IT. WRITE IN IT.")
    set_font(pdf, "Avenir", 10, WHITE)
    pdf.drawString(67, 144, "Try the practice before you fill out the page.")
    pdf.drawString(67, 127, "Keep what helps. Release what does not.")
    set_font(pdf, "AvenirDemi", 7, INK)
    pdf.drawString(48, 54, "SHOW UP FOR REAL LIFE")
    pdf.showPage()


def orientation(pdf, page_number):
    y = draw_section_title(pdf, "START HERE", "Use the workbook beside the course.", "This is a companion, not a second course and not a scorecard.", page_number)
    y -= 18
    steps = [
        ("01", "Print or save it now", "Use the complete PDF or print only the page for the lesson you are taking."),
        ("02", "Try the practice first", "Read one lesson, use its practice in ordinary life, then return to the page."),
        ("03", "Write what actually happened", "Record a real response, not the answer you think a course wants."),
        ("04", "Keep only what helps", "At the end, choose two practices for thirty days. Let the rest wait."),
    ]
    for number, title, body in steps:
        pdf.setFillColor(SEA_GLASS if int(number) % 2 else PALE)
        pdf.rect(42, y - 73, PAGE_W - 84, 66, fill=1, stroke=0)
        set_font(pdf, "AvenirDemi", 8, CORAL)
        pdf.drawString(57, y - 30, number)
        set_font(pdf, "FuturaBold", 13, INK)
        pdf.drawString(92, y - 29, title)
        draw_wrapped(pdf, body, 92, y - 47, PAGE_W - 150, size=8.5, leading=11.5)
        y -= 79
    set_font(pdf, "AvenirDemi", 7.5, OCEAN)
    pdf.drawString(42, 158, "WHAT SUCCESS LOOKS LIKE")
    draw_wrapped(pdf, "You notice one moment earlier, make one useful choice, return when you said you would, or protect one relationship with more attention. That is enough to work with.", 42, 136, PAGE_W - 84, size=11, leading=16, color=INK)
    pdf.showPage()


def attention_reset(pdf, page_number):
    y = draw_section_title(pdf, "BEFORE LESSON ONE · THREE DAYS", "The Attention Reset", "Four small moves to notice the reflex and put a little choice back between you and the screen.", page_number)
    y -= 12
    moves = [
        ("01", "Remove the color", "Try grayscale if color is part of the pull. Keep accessibility needs in charge."),
        ("02", "Control the feeds", "Remove or sign out of the apps that most often take you somewhere you did not choose."),
        ("03", "Silence the machine", "Turn off nonessential alerts. Keep health, safety, caregiving, and priority contacts."),
        ("04", "Give the phone a home", "When you arrive, try one drawer, bag, or charging station instead of carrying it room to room."),
    ]
    for number, title, body in moves:
        set_font(pdf, "AvenirDemi", 8, CORAL)
        pdf.drawString(42, y, number)
        set_font(pdf, "FuturaBold", 12.5, INK)
        pdf.drawString(75, y, title)
        y = draw_wrapped(pdf, body, 75, y - 17, PAGE_W - 117, size=8.5, leading=11.5)
        pdf.setStrokeColor(RULE)
        pdf.line(42, y - 4, PAGE_W - 42, y - 4)
        y -= 23
    y -= 2
    set_font(pdf, "AvenirDemi", 7.5, OCEAN)
    pdf.drawString(42, y, "OPTIONAL WATCH RELAY")
    y = draw_wrapped(pdf, "If you already wear a smart watch, allow only priority people and turn off mirrored feeds. Let it keep you reachable while the phone stays in its home.", 42, y - 16, PAGE_W - 84, size=8.5, leading=11.5, color=COPY)
    y -= 8
    y = draw_prompt(pdf, y, "THE MOMENT I WANT BACK", "Name one repeated moment that deserves more of your attention.", 2)
    draw_three_fields(pdf, y - 4, ["START DATE", "PHONE-AWAY WINDOW", "ESSENTIAL EXCEPTION"])
    pdf.showPage()


def lesson_page(pdf, lesson, page_number):
    number, movement, title, subtitle, question, action = lesson
    y = draw_section_title(pdf, f"{number} · {movement}", title, subtitle, page_number)
    y -= 16
    y = draw_prompt(pdf, y, "THE QUESTION", question, 4)
    set_font(pdf, "AvenirDemi", 7.5, CORAL)
    pdf.drawString(42, y, "THE PRACTICE I WILL TRY")
    y = draw_wrapped(pdf, action, 42, y - 21, PAGE_W - 84, font="AvenirDemi", size=11.5, leading=16, color=INK)
    y -= 11
    draw_three_fields(pdf, y, ["WHEN", "WHERE", "MINIMUM VERSION"])
    y -= 55
    draw_prompt(pdf, y, "AFTER I TRY IT", "What happened? What helped? What needs to bend for real life?", 4)
    pdf.showPage()


def family_screen_reset(pdf, page_number):
    y = draw_section_title(pdf, "FAMILY TOOL 01", "The Family Screen Reset", "Recover one repeated moment together. Start with adult modeling and a three-day experiment, not punishment.", page_number)
    y -= 12
    y = draw_prompt(pdf, y, "THE MOMENT WE WANT BACK", "Dinner, the ride to school, bedtime, a game, Saturday morning, or another repeated moment.", 3)
    y = draw_prompt(pdf, y, "WHAT IS PULLING OUR ATTENTION NOW?", "Name the pattern without blaming one person.", 3)
    y = draw_prompt(pdf, y, "OUR THREE-DAY EXPERIMENT", "Where will devices live? When does the boundary begin and end? What exceptions do we need?", 3)
    draw_three_fields(pdf, y, ["ADULTS WILL MODEL", "KIDS HELP CHOOSE", "START DATE"])
    pdf.showPage()


def tradition_builder(pdf, page_number):
    y = draw_section_title(pdf, "FAMILY TOOL 02", "The Weekly Tradition Builder", "Make one small thing worth returning to. Meaning comes from repetition, not size or expense.", page_number)
    y -= 12
    y = draw_prompt(pdf, y, "WHAT DO WE WANT THIS TIME TO PROTECT?", "Connection, play, faith, rest, food, movement, service, creativity, or something else.", 3)
    y = draw_prompt(pdf, y, "THE SMALLEST REPEATABLE VERSION", "Name the activity, day, time, place, and the version that still works during a hard week.", 4)
    y = draw_prompt(pdf, y, "HOW WILL EVERYONE HAVE A VOICE?", "What will adults organize? What can children or other family members choose?", 3)
    draw_three_fields(pdf, y, ["PHONE PLAN", "FIRST DATE", "TRY IT FOR"])
    pdf.showPage()


def teen_check_in(pdf, page_number):
    y = draw_section_title(pdf, "FAMILY TOOL 03", "The Side-by-Side Teen Check-In", "Make room for a real conversation without cornering, interrogating, or turning the first answer into a lecture.", page_number)
    y -= 10
    set_font(pdf, "AvenirDemi", 7.5, OCEAN)
    pdf.drawString(42, y, "BEGIN BESIDE THEM")
    y = draw_wrapped(pdf, "Drive, walk, make food, fix something, or sit somewhere neutral. The adult puts the phone away first.", 42, y - 17, PAGE_W - 84, size=8.8, leading=12, color=COPY)
    y -= 7
    y = draw_prompt(pdf, y, "ONE EASY INVITATION", "Want to ride with me? Want to get something to eat? Can you help me with this?", 2)
    y = draw_prompt(pdf, y, "FOUR QUESTIONS WORTH KEEPING", "What is taking up most of your headspace? What are adults missing about your world? Do you want me to listen, help you think, or help you act? What would make this week easier?", 3)
    y = draw_prompt(pdf, y, "ONE NEXT STEP WE AGREED ON", "Write only what was actually agreed. Do not add a hidden assignment afterward.", 2)
    draw_three_fields(pdf, y, ["PHONE PLAN", "CHECK BACK", "ADULT WILL FOLLOW THROUGH"])
    pdf.showPage()


def integration(pdf, page_number):
    y = draw_section_title(pdf, "THIRTY-DAY INTEGRATION", "Choose two. Keep them small.", "The point is return, not completion. Pick the practices that met a real problem and let the rest wait.", page_number)
    y -= 18
    y = draw_prompt(pdf, y, "ONE RETURN PRACTICE", "What will help you bring your attention back?", 3)
    y = draw_prompt(pdf, y, "ONE LEAD OR KEEP PRACTICE", "What will help you show up more steadily or protect what work cannot replace?", 3)
    draw_three_fields(pdf, y, ["WHEN", "WHERE", "MINIMUM VERSION"])
    y -= 58
    y = draw_prompt(pdf, y, "AFTER THIRTY DAYS", "What changed? What did not fit? What will you continue, redesign, or release?", 4)
    set_font(pdf, "AvenirDemi", 7.5, CORAL)
    pdf.drawString(42, 82, "A NOTE TO MYSELF")
    pdf.setStrokeColor(RULE)
    pdf.line(42, 60, PAGE_W - 42, 60)
    pdf.showPage()


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("All the Way Here Practice Workbook")
    pdf.setAuthor("Here Supply Co.")
    pdf.setSubject("Printable companion workbook for the All the Way Here course")
    cover(pdf)
    page = 2
    orientation(pdf, page)
    page += 1
    attention_reset(pdf, page)
    page += 1
    for lesson in LESSONS:
        lesson_page(pdf, lesson, page)
        page += 1
    family_screen_reset(pdf, page)
    page += 1
    tradition_builder(pdf, page)
    page += 1
    teen_check_in(pdf, page)
    page += 1
    integration(pdf, page)
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
