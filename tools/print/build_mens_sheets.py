"""
The men's course sheets: The Solo, one sheet for each of the nine lessons, and
the field card. Same print system as the couples Resource Pack (fonts, palette,
margins), different material.

    python3 tools/print/build_mens_sheets.py

Writes public/downloads/men/sheets/*.pdf, gated to men's buyers like the rest
of /downloads/men/, plus all-sheets.pdf with every sheet in course order.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from pypdf import PdfReader, PdfWriter

from hsc import *
from layouts import work_sheet, card_page, _fill_lines, _slots, _hint

fonts()
DEST = OUT / "men" / "sheets"


def new(path, title):
    c = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    c.setTitle(title)
    c.setAuthor("Chris Avera, Here Supply Co.")
    return c


def label(n, title):
    return f"Lesson {n} · {title}" if n else f"Before you start · {title}"


def circle_row(c, x, y, count=10, r=7.2, gap=4.6, start=1):
    """Numbered circles to mark a score."""
    for i in range(count):
        cx = x + r + i * (2 * r + gap)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.circle(cx, y, r, stroke=1, fill=0)
        c.setFont("Body", 6.6)
        c.setFillColor(COPY)
        c.drawCentredString(cx, y - 2.3, str(start + i))
    return count * (2 * r + gap) - gap


def check_box(c, x, y, s=10):
    c.setStrokeColor(RULE)
    c.setLineWidth(0.8)
    c.rect(x, y, s, s, stroke=1, fill=0)


def boxed(c, x, top, w, h, title, number=None, hint=None, kind="lines", payload=None):
    box(c, x, top, w, h, title, number)
    ix, iw = x + 12, w - 24
    hy = _hint(c, ix, top - 34, hint, iw) if hint else top - 34
    ct, bottom = hy - 8, top - h + 14
    if kind == "lines":
        _fill_lines(c, ix, ct, bottom, iw)
    elif kind == "slots":
        _slots(c, ix, ct, bottom, iw, payload)
    return ct


# ---------------------------------------------------------------- The Solo

def the_solo(c):
    work_sheet(
        c, label=label(None, "The Solo"), sub="Lives in the front of your notebook",
        kicker="Half a day alone · phone in the truck · pen on paper",
        headline="Hear yourself before you change anything.",
        standfirst="Walk or sit for the first hour and let your head run. When it quiets down, answer these three. Write until you have said the true thing, even if it is one sentence.",
        blocks=[
            ("01", "What am I tired of pretending is fine?", None, "lines", None),
            ("02", "Who gets my best, and who gets the rest?", None, "lines", None),
            ("03", "If nothing changes, what does my life look like in five years?", None, "lines", None),
        ],
        weights=[1, 1],
        foot="If you cannot get away at all, that is your first answer.")

    masthead(c, label(None, "The Solo"), "Page two · the last hour")
    y = title_block(c, "The last hour", "The next ninety days.",
                    "One page to yourself about what you want the next ninety days to look like. Read it again tonight. Tell one person one thing you wrote, if you are willing.")
    gap = 14
    colw = (CONTENT_W - gap) / 2
    h1 = (y - BODY_BOTTOM) * 0.68
    boxed(c, SIDE, y, CONTENT_W, h1, "In ninety days, I want", "04",
          "Home, work, your body, the people who count on you. Plain words.")
    y2 = y - h1 - gap
    h2 = y2 - BODY_BOTTOM
    box(c, SIDE, y2, colw, h2, "What to bring", "05")
    items = ["A notebook you will keep for the course", "Two pens", "Water and food", "A layer for the weather",
             "A watch, if you want to keep time", "Told one person where and when"]
    yy = y2 - 40
    step = (h2 - 52) / len(items)
    for it in items:
        check_box(c, SIDE + 12, yy - 2)
        para(c, SIDE + 30, yy, it, colw - 44, size=9, color=INK)
        yy -= step
    boxed(c, SIDE + colw + gap, y2, colw, h2, "Where and when", "06", kind="slots",
          payload=[("The place", None), ("The date", None), ("Back by", None), ("Who knows", None)])
    footer(c, "Bring this notebook to Lesson 1.")
    c.showPage()


# ---------------------------------------------------------------- See it

def honest_map(c):
    masthead(c, label(1, "The Honest Map"), "Lives in the notebook from your Solo")
    y = title_block(c, "Thirty minutes · score it like nobody will ever see the page",
                    "Put a number on each part of your life.",
                    "Score fast. Your first number is usually the true one. Then write one sentence on why it is that number and not one higher. Specific beats fair.")
    areas = ["Work", "Money", "Body", "Marriage or closest relationship", "Kids", "Faith or meaning", "Friends"]
    bottom_h = 150
    row_h = (y - BODY_BOTTOM - bottom_h - 14) / len(areas)
    for i, area in enumerate(areas):
        top = y - i * row_h
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.rect(SIDE, top - row_h, CONTENT_W, row_h, stroke=1, fill=0)
        c.setFont("Display", 8.6)
        c.setFillColor(CORAL)
        c.drawString(SIDE + 12, top - 19, "%02d" % (i + 1))
        caps(c, SIDE + 30, top - 19, area, size=7.6, color=INK, font="Display", space=1.0)
        w = circle_row(c, 0, 0, count=0)
        cw = 10 * (2 * 7.2 + 4.6) - 4.6
        circle_row(c, SIDE + CONTENT_W - 12 - cw, top - 17)
        c.setFont("Body", 7.6)
        c.setFillColor(COPY)
        c.drawString(SIDE + 30, top - 36, "Why this number and not one higher:")
        c.setStrokeColor(RULE)
        c.setLineWidth(0.55)
        c.line(SIDE + 30, top - row_h + 12, SIDE + CONTENT_W - 12, top - row_h + 12)
        c.line(SIDE + 160, top - 36, SIDE + CONTENT_W - 12, top - 36)
    y2 = y - len(areas) * row_h - 14
    gap = 14
    colw = (CONTENT_W - gap) / 2
    boxed(c, SIDE, y2, colw, bottom_h, "The one I avoided", "08",
          "Circle it above, even if it is not the lowest. Why that one?")
    boxed(c, SIDE + colw + gap, y2, colw, bottom_h, "One move this week", "09", kind="slots",
          payload=[("The move", None), ("Day and time", None), ("Who I told", None)])
    footer(c, "A low number tells you where the work is, and nothing more.")
    c.showPage()


def reach_log(c):
    masthead(c, label(2, "The Reach Log"), "Lives on the kitchen counter")
    y = title_block(c, "Seven nights · change nothing yet",
                    "What do you reach for at 9 PM?",
                    "Each night, write what you reached for, roughly how long, and what you felt right before. On night eight, circle the feeling that shows up most and build the plan at the bottom.")
    cols = [("Night", 0.09), ("What I reached for", 0.33), ("How long", 0.14), ("What I felt right before", 0.44)]
    plan_h = 190
    header_h = 22
    rows = 7
    row_h = (y - BODY_BOTTOM - plan_h - 14 - header_h) / rows
    x = SIDE
    c.setFillColor(SEA)
    c.rect(SIDE, y - header_h, CONTENT_W, header_h, stroke=0, fill=1)
    for name, frac in cols:
        caps(c, x + 8, y - 14, name, size=6.8, color=INK, font="Display", space=1.0)
        x += CONTENT_W * frac
    for r in range(rows):
        top = y - header_h - r * row_h
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.rect(SIDE, top - row_h, CONTENT_W, row_h, stroke=1, fill=0)
        x = SIDE
        for i, (name, frac) in enumerate(cols):
            if i:
                c.line(x, top, x, top - row_h)
            x += CONTENT_W * frac
        c.setFont("Display", 11)
        c.setFillColor(CORAL)
        c.drawString(SIDE + 10, top - row_h / 2 - 4, str(r + 1))
        c.setFont("Body", 6.6)
        c.setFillColor(COPY)
        fx = SIDE + CONTENT_W * 0.56 + 8
        c.drawString(fx, top - row_h + 7, "tired · bored · angry · lonely · wired · other")
    y2 = y - header_h - rows * row_h - 14
    gap = 14
    colw = (CONTENT_W - gap) / 2
    boxed(c, SIDE, y2, colw, plan_h, "Night eight: the pattern", "08", kind="slots",
          payload=[("The feeling that showed up most", None), ("What I was really fixing", None)])
    boxed(c, SIDE + colw + gap, y2, colw, plan_h, "My 9 PM plan", "09", kind="slots",
          payload=[("The replacement", None), ("Set up before dinner by", None), ("Where the fix goes", None), ("Who will give me a look", None)])
    footer(c, "You cannot quit a reach you do not understand.")
    c.showPage()


def short_fuse(c):
    card_page(
        c, label=label(3, "Short Fuse"), kicker="The Short Fuse Card",
        headline=["About a second", "between surge and words."],
        steps=[
            ("Catch", "Jaw, face, voice, fists, the quiet. Know your three signs."),
            ("Reset", "Sixty seconds. Step out. Three slow breaths, longer out than in."),
            ("Return", "Back when you said, with one calm sentence."),
            ("Repair", "Within the hour. What you did, that it was wrong, sorry. No but."),
        ],
        aside_label="Say this",
        aside_body="I am too wound up to answer well. Give me ten minutes. I will come back. And later: I snapped at you. That was wrong. I am sorry.",
        foot="Kids learn more from a father who repairs.")
    work_sheet(
        c, label=label(3, "Short Fuse"), sub="Page two · fill in before you cut the cards",
        kicker="Write yours, then copy it onto the back of a card",
        headline="Know your signs before you need them.",
        standfirst="Most men have three: some mix of a tight jaw, a hot face, a clipped voice, a clenched fist, or a quiet everyone in the house knows. Ask the people you live with. They already know yours.",
        blocks=[
            ("01", "My three warning signs", None, "slots", [("One", None), ("Two", None), ("Three", None)]),
            ("02", "Where my reset happens", "At home, at work, in the truck.", "slots", [("At home", None), ("At work", None), ("Anywhere else", None)]),
            ("03", "My pause sentence", "Say when you will be back.", "lines", None),
            ("04", "My repair sentence", "What you did, that it was wrong, sorry. Then stop.", "lines", None),
            ("05", "What I was carrying in the hour before", "Write it down after each time you snap. The pattern is the lesson.", "lines", None),
        ],
        weights=[1.1, 0.8, 1.0],
        foot="When you miss, go back within the hour.")


# ---------------------------------------------------------------- Carry it

def three_columns(c):
    masthead(c, label(4, "Three Columns"), "Lives on your desk")
    y = title_block(c, "Unload it · sort it · move it",
                    "Choose your battles on purpose.",
                    "Write everything you are carrying, then put each item in one column. For each hand off, write who takes it and when you will ask.")
    conv_h = 170
    gap = 12
    colw = (CONTENT_W - 2 * gap) / 3
    h = y - BODY_BOTTOM - conv_h - 14
    cols = [("Mine to fight", "Yours. Carry it well."), ("Mine to hand off", "Who takes it, and when you ask."), ("Not mine at all", "What you will say, or stop picking up.")]
    for i, (t, hint) in enumerate(cols):
        boxed(c, SIDE + i * (colw + gap), y, colw, h, t, "%02d" % (i + 1), hint)
    y2 = y - h - 14
    boxed(c, SIDE, y2, CONTENT_W, conv_h, "The one hard conversation", "04", kind="slots",
          payload=[("With whom", None), ("When and where", None), ("The true thing, in one sentence", None)])
    footer(c, "Carry what is yours. Put down what never was.")
    c.showPage()


def enough(c):
    masthead(c, label(5, "Enough"), "Lives on the fridge")
    y = title_block(c, "Three numbers · one edge · thirty days",
                    "Enough is a number you choose.",
                    "Write the numbers once. Then keep one hard edge every day for thirty days, and tell the people it affects so you are not keeping it secretly.")
    gap = 14
    colw = (CONTENT_W - 2 * gap) / 3
    h1 = 200
    boxed(c, SIDE, y, colw, h1, "Enough money", "01", "A month, honestly.", "slots",
          [("Household needs", None), ("Saving", None), ("Last year, monthly", None)])
    boxed(c, SIDE + colw + gap, y, colw, h1, "Enough hours", "02", "Count the evenings too.", "slots",
          [("Most in a normal week", None), ("This week, real", None), ("The gap", None)])
    boxed(c, SIDE + 2 * (colw + gap), y, colw, h1, "Enough yes", "03", "This month.", "slots",
          [("New commitments, max", None), ("What I will turn down", None)])
    y2 = y - h1 - gap
    h2 = 120
    boxed(c, SIDE, y2, CONTENT_W, h2, "My hard edge for thirty days", "04",
          "No work after 7 PM, no phone at dinner, Saturday mornings belong to the family, or your own.", "slots",
          [("The edge", None), ("The honest emergency exception", None), ("Who I told", None)])
    y3 = y2 - h2 - gap
    h3 = y3 - BODY_BOTTOM
    box(c, SIDE, y3, CONTENT_W, h3, "Thirty days · tick each day you keep it", "05")
    per = 10
    s = min((CONTENT_W - 24 - (per - 1) * 8) / per, (h3 - 50) / 3 - 10)
    for i in range(30):
        r, col = divmod(i, per)
        bx = SIDE + 12 + col * (s + 8)
        by = y3 - 36 - (r + 1) * (s + 10) + 10
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.rect(bx, by, s, s, stroke=1, fill=0)
        c.setFont("Body", 6.4)
        c.setFillColor(COPY)
        c.drawString(bx + 4, by + s - 9, str(i + 1))
    footer(c, "Protect the edge like a client.")
    c.showPage()


def fuel(c):
    masthead(c, label(6, "The Fuel Card"), "Lives on the bathroom mirror")
    y = title_block(c, "Sleep · move · get outside · one hard thing",
                    "Fuel the man before you ask more of him.",
                    "Seven hours of sleep, thirty minutes that raise your heart rate five days a week, strength twice, and at least one session outside without the phone.")
    gap = 14
    colw = (CONTENT_W - gap) / 2
    h1 = 92
    boxed(c, SIDE, y, colw, h1, "Lights out", "01", None, "slots", [("Time", None), ("Phone sleeps in", None)])
    boxed(c, SIDE + colw + gap, y, colw, h1, "Smallest version", "02", None, "slots",
          [("On a bad week, I will", None)])
    y2 = y - h1 - gap
    weeks = 2
    rows = ["Seven hours", "Moved 30 min", "Strength", "Outside, no phone"]
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    hg = 128
    for wk in range(weeks):
        top = y2 - wk * (hg + gap)
        box(c, SIDE, top, CONTENT_W, hg, f"Week {wk + 1}", "%02d" % (3 + wk))
        lab_w = 120
        cw = (CONTENT_W - 24 - lab_w) / 7
        for d, day in enumerate(days):
            caps(c, SIDE + 12 + lab_w + d * cw + cw / 2, top - 34, day, size=6.4, color=COPY, font="Body", align="center", space=0.8)
        rh = (hg - 50) / len(rows)
        for r, name in enumerate(rows):
            ry = top - 46 - r * rh
            c.setFont("Body", 8.6)
            c.setFillColor(INK)
            c.drawString(SIDE + 12, ry - rh / 2 - 1, name)
            for d in range(7):
                check_box(c, SIDE + 12 + lab_w + d * cw + cw / 2 - 5.5, ry - rh / 2 - 4, 11)
    y3 = y2 - weeks * (hg + gap)
    boxed(c, SIDE, y3, CONTENT_W, y3 - BODY_BOTTOM, "My one hard thing", "05",
          "A long ride, a summit you have never climbed, a race you have to train for. Tell someone.", "slots",
          [("What", None), ("Date", None), ("Who I told", None), ("Who is coming", None)])
    footer(c, "Steadiness gets built in the body first.")
    c.showPage()


# ---------------------------------------------------------------- Build it

def council_card(c):
    card_page(
        c, label=label(7, "Your Council"), kicker="The Council Card",
        headline=["Two or three men", "who know the real story."],
        steps=[
            ("Name them", "Men who would tell you the truth, and you would trust with yours."),
            ("Invite one", "A day, a time, an easy out. Something side by side."),
            ("Repeat it", "Book the next one before the first one happens."),
            ("Tell one true thing", "Around the third time. Then ask him the same."),
        ],
        aside_label="The text",
        aside_body="I'm riding Saturday at 7, want to come? No worries if not.",
        foot="The council has to exist before the 2 AM call.")
    work_sheet(
        c, label=label(7, "Your Council"), sub="Page two · write the names before you cut the cards",
        kicker="Name · invite · repeat · tell",
        headline="Who knows what is actually going on with you?",
        standfirst="Write down every man you respect. Circle two or three. Then send one invitation this week and put the second one on the calendar before the first one happens.",
        blocks=[
            ("01", "Every man I respect", "Clients, neighbors, dads from practice, men at church, old friends.", "lines", None),
            ("02", "My two or three", None, "slots", [("One", None), ("Two", None), ("Three", None)]),
            ("03", "The invitation", "Specific, side by side, with an easy out.", "slots", [("To", None), ("What", None), ("Day and time", None)]),
            ("04", "The next date", "Before the first one happens.", "slots", [("When", None), ("What", None)]),
        ],
        weights=[1.1, 0.9],
        foot="Invite first. The worst answer is a no you will survive.")


def keep_change_stop(c):
    masthead(c, label(8, "Keep, Change, Stop"), "Lives in the back of your Solo notebook")
    y = title_block(c, "The playbook you inherited",
                    "Choose what you keep and what stops with you.",
                    "Write what your father taught you about being a man, in his words if you remember them. Mark each line Keep, Change or Stop. For each Change or Stop, write the version you want your kids to inherit.")
    topics = ["Work", "Money", "Anger", "Love", "Asking for help", "How a man treats his wife", "How a man treats his kids", ""]
    bottom_h = 110
    header_h = 22
    row_h = (y - BODY_BOTTOM - bottom_h - 14 - header_h) / len(topics)
    cols = [("What he taught me", 0.42), ("K · C · S", 0.14), ("The version I want to pass on", 0.44)]
    c.setFillColor(SEA)
    c.rect(SIDE, y - header_h, CONTENT_W, header_h, stroke=0, fill=1)
    x = SIDE
    for name, frac in cols:
        caps(c, x + 8, y - 14, name, size=6.8, color=INK, font="Display", space=1.0)
        x += CONTENT_W * frac
    for r, topic in enumerate(topics):
        top = y - header_h - r * row_h
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.rect(SIDE, top - row_h, CONTENT_W, row_h, stroke=1, fill=0)
        x1 = SIDE + CONTENT_W * 0.42
        x2 = x1 + CONTENT_W * 0.14
        c.line(x1, top, x1, top - row_h)
        c.line(x2, top, x2, top - row_h)
        caps(c, SIDE + 8, top - 13, topic or "Your own", size=6.4, color=OCEAN, space=0.9)
        for k, letter in enumerate("KCS"):
            bx = x1 + 10 + k * 24
            c.setStrokeColor(RULE)
            c.circle(bx + 7, top - row_h / 2, 8, stroke=1, fill=0)
            c.setFont("BodySemi", 7.4)
            c.setFillColor(COPY)
            c.drawCentredString(bx + 7, top - row_h / 2 - 2.6, letter)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.55)
        c.line(SIDE + 8, top - row_h + 10, x1 - 8, top - row_h + 10)
        c.line(x2 + 8, top - row_h + 10, SIDE + CONTENT_W - 8, top - row_h + 10)
    y2 = y - header_h - len(topics) * row_h - 14
    boxed(c, SIDE, y2, CONTENT_W, bottom_h, "The one I practice out loud this week", "09", kind="slots",
          payload=[("The line", None), ("What I will say instead", None)])
    footer(c, "What you inherited is a starting point.")
    c.showPage()


def my_creed(c):
    work_sheet(
        c, label=label(9, "My Creed"), sub="Lives where you will see it on Sunday nights",
        kicker="The creed and the challenge",
        headline="Decide what you pass on.",
        standfirst="One page in plain words: who you are, what you are building, how you treat people, and how you want your kids to remember you. Read it once a week. Then take each kid into something a little hard.",
        blocks=[
            ("01", "My creed", "Who I am, what I am building, how I treat people, how I want to be remembered.", "lines", None),
            ("02", "A challenge with each kid", "Let them pick it, and let them carry part of the load.", "slots", [("Kid", None), ("Challenge", None), ("Kid", None), ("Challenge", None), ("Kid", None), ("Challenge", None)]),
            ("03", "One real skill this month", "A handshake, money, fixing something, how to apologize.", "slots", [("The skill", None), ("For", None), ("By", None)]),
            ("04", "What I see in each of them", "Say it plainly this week. No advice attached.", "lines", None),
        ],
        weights=[1.25, 1.0],
        foot="Your kids inherit how you live far more than what you say.")


# ---------------------------------------------------------------- Field card

PRACTICES = [
    ("Before you start", [("0", "The Solo", "Half a day alone. Phone in the truck. Three questions on paper.")]),
    ("See it", [
        ("1", "The Honest Map", "Score seven areas 1 to 10. Circle the one you avoid. One move, with a day and time."),
        ("2", "The Drift", "Log the reach for seven nights. Name the feeling. Set up a better 9 PM plan."),
        ("3", "Short Fuse", "Catch the signs. Sixty second reset. Return when you said. Repair within the hour."),
    ]),
    ("Carry it", [
        ("4", "Choose Your Battles", "Mine to fight, mine to hand off, not mine at all. One hard conversation."),
        ("5", "Enough", "Enough money, hours and yes. One hard edge for thirty days, told out loud."),
        ("6", "Fuel", "Seven hours. Move five days, strength two. Outside. One hard thing on the calendar."),
    ]),
    ("Build it", [
        ("7", "Your Council", "Two or three men. A specific invitation. Repeat it. Tell one true thing."),
        ("8", "The Inheritance", "Write his playbook. Keep, change or stop. Practice one new line out loud."),
        ("9", "What You Pass On", "Write your creed. One challenge with each kid. Tell them who they are."),
    ]),
]


def field_card(c):
    masthead(c, "The field card", "The whole men's course on one page")
    y = title_block(c, "All the Way Here · Men's Edition · lives on the fridge, the desk, or in the truck",
                    "See it. Carry it. Build it.",
                    "The Solo and nine practices on one page. Use the move that meets the week in front of you.")
    gap = 10
    blocks = sum(len(p) for _, p in PRACTICES)
    heads = len(PRACTICES)
    avail = y - BODY_BOTTOM - heads * 26
    bh = (avail - (blocks - 1) * gap * 0.5) / blocks
    for part, items in PRACTICES:
        caps(c, SIDE, y - 4, part, size=7.4, color=CORAL, space=1.2)
        y -= 20
        for n, t, body in items:
            c.setStrokeColor(RULE)
            c.setLineWidth(0.8)
            c.rect(SIDE, y - bh, CONTENT_W, bh, stroke=1, fill=0)
            c.setFont("Display", 18)
            c.setFillColor(CORAL)
            c.drawString(SIDE + 14, y - bh / 2 - 6, n)
            c.setFont("Display", 13)
            c.setFillColor(INK)
            c.drawString(SIDE + 46, y - bh / 2 + 3, t)
            para(c, SIDE + 210, y - bh / 2 + 7, body, CONTENT_W - 224, size=9, leading=12, color=COPY)
            y -= bh + gap * 0.5
        y -= 6
    footer(c, "Two practices you keep beat nine you admired.")
    c.showPage()


SHEETS = [
    ("the-solo.pdf", "The Solo", the_solo),
    ("honest-map.pdf", "Lesson 1 · The Honest Map", honest_map),
    ("reach-log.pdf", "Lesson 2 · The Reach Log", reach_log),
    ("short-fuse.pdf", "Lesson 3 · The Short Fuse Card", short_fuse),
    ("three-columns.pdf", "Lesson 4 · Three Columns", three_columns),
    ("enough.pdf", "Lesson 5 · Enough", enough),
    ("fuel.pdf", "Lesson 6 · The Fuel Card", fuel),
    ("council-card.pdf", "Lesson 7 · The Council Card", council_card),
    ("keep-change-stop.pdf", "Lesson 8 · Keep, Change, Stop", keep_change_stop),
    ("my-creed.pdf", "Lesson 9 · My Creed", my_creed),
    ("field-card.pdf", "The field card", field_card),
]


def build():
    DEST.mkdir(parents=True, exist_ok=True)
    w = PdfWriter()
    pages = 0
    for file, title, fn in SHEETS:
        c = new(DEST / file, f"{title} | All the Way Here, Men's Edition")
        fn(c)
        c.save()
        w.append(str(DEST / file))
        pages += len(PdfReader(str(DEST / file)).pages)
    w.add_metadata({"/Title": "All the Way Here, Men's Edition: Every Sheet", "/Author": "Chris Avera, Here Supply Co."})
    with open(DEST / "all-sheets.pdf", "wb") as fh:
        w.write(fh)
    print("built", len(SHEETS), "sheets,", pages, "pages")


if __name__ == "__main__":
    build()
