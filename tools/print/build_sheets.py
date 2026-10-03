"""
Build the Resource Pack: every sheet as its own PDF, plus one PDF with all of
them in course order so the whole kit prints in one go.

    python3 tools/print/build_sheets.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from pypdf import PdfReader, PdfWriter

from hsc import *
from layouts import work_sheet, card_page, _fill_lines, _slots

fonts()
CONTENT = json.loads((ROOT / "tmp/pdfs/course-content.json").read_text())
LESSONS = {l["number"]: l for l in CONTENT["CORE_LESSONS"]}


def lesson_label(number):
    return f"Lesson {number} · {LESSONS[number]['title']}"


def new(path, title):
    c = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    c.setTitle(title)
    c.setAuthor("Chris Avera, Here Supply Co.")
    return c


# ---------------------------------------------------------------- Start

def focus_protocol(c):
    masthead(c, "Start here · The Focus Protocol", "Lives on the fridge")
    y = title_block(c, "Seventy two hours · before lesson one", "Four moves. Three days.",
                    "You are changing what reaches you for three days, then watching what changes. Willpower has little to do with it.")
    gap = 9
    cw = (CONTENT_W - 3 * gap) / 4
    caps(c, SIDE, y, "The four moves", color=INK, font="Display", size=7.8)
    y -= 12
    for i, m in enumerate(CONTENT["FOCUS_MOVES"]):
        x = SIDE + i * (cw + gap)
        c.setFillColor(SEA)
        c.rect(x, y - 104, cw, 104, stroke=0, fill=1)
        c.setFont("Display", 8.6)
        c.setFillColor(CORAL)
        c.drawString(x + 10, y - 18, m["number"])
        ty = y - 33
        for ln in lines_of(m["title"], "Display", 11, cw - 20):
            c.setFont("Display", 11)
            c.setFillColor(INK)
            c.drawString(x + 10, ty, ln)
            ty -= 12.5
        para(c, x + 10, ty - 2, m["promise"], cw - 20, size=7.8, leading=9.8, color=DEEP)
        c.setStrokeColor(INK)
        c.setLineWidth(0.8)
        c.rect(x + cw - 22, y - 98, 12, 12, stroke=1, fill=0)
    y -= 128

    caps(c, SIDE, y, "What the seventy two hours feel like", color=INK, font="Display", size=7.8)
    c.setFont("Body", 7.8)
    c.setFillColor(COPY)
    c.drawRightString(W - SIDE, y, "Commonly reported. Yours will not match exactly.")
    y -= 14
    for i, p in enumerate(CONTENT["RESET_TIMELINE"]):
        x = SIDE + i * (cw + gap)
        c.setStrokeColor(OCEAN)
        c.setLineWidth(2)
        c.line(x, y, x + cw - 6, y)
        caps(c, x, y - 14, p["window"], size=6.6, color=OCEAN, space=0.9)
        c.setFont("BodySemi", 9.4)
        c.setFillColor(INK)
        c.drawString(x, y - 28, p["title"])
        short = ". ".join(p["body"].split(". ")[:2]).rstrip(".") + "."
        para(c, x, y - 40, short, cw - 8, size=7.8, leading=9.8)
    y -= 112

    caps(c, SIDE, y, "Days four to seven · what the habit will say", color=INK, font="Display", size=7.8)
    y -= 12
    band = 72
    c.setFillColor(INK)
    c.rect(SIDE, y - band, CONTENT_W, band, stroke=0, fill=1)
    said = CONTENT["RESET_RELAPSE"]["lines"]
    half = CONTENT_W / 2
    for i, ln in enumerate(said[:4]):
        cx = SIDE + 16 + (i // 2) * half
        cy = y - 20 - (i % 2) * 16
        c.setFont("Body", 9.6)
        c.setFillColor(WHITE)
        c.drawString(cx, cy, "“" + ln.strip("“”\"") + "”")
    c.setFont("BodySemi", 8.4)
    c.setFillColor(SUN)
    c.drawString(SIDE + 16, y - band + 14, "Each one is the habit talking. Hold the arrangement fourteen days before you change anything.")
    y -= band + 24

    caps(c, SIDE, y, "The daily check · notice, do not grade", color=INK, font="Display", size=7.8)
    colx = W - SIDE - 3 * 50
    for i in range(3):
        caps(c, colx + i * 50 + 25, y, "Day %d" % (i + 1), size=6.6, color=OCEAN, align="center")
    y -= 8
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(SIDE, y, W - SIDE, y)
    for q in ["When did I reach without deciding?", "Where was it easier to stay present?", "Which boundary is worth keeping tomorrow?"]:
        y -= 25
        c.setFont("Body", 9.6)
        c.setFillColor(INK)
        c.drawString(SIDE, y + 6, q)
        for i in range(3):
            c.setStrokeColor(RULE)
            c.setLineWidth(0.7)
            c.rect(colx + i * 50 + 17, y + 1, 16, 16, stroke=1, fill=0)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.45)
        c.line(SIDE, y - 8, W - SIDE, y - 8)

    # The declaration fills what is left, so the page ends on it.
    y -= 24
    band = y - BODY_BOTTOM
    c.setFillColor(SUN)
    c.rect(SIDE, BODY_BOTTOM, CONTENT_W, band, stroke=0, fill=1)
    mid = BODY_BOTTOM + band / 2
    caps(c, SIDE + 20, mid + 22, "Read it out loud once", size=6.6, color=DEEP, space=1.2)
    c.setFont("Display", 14)
    c.setFillColor(INK)
    c.drawString(SIDE + 20, mid + 2, "I do not trade presence for distraction.")
    c.drawString(SIDE + 20, mid - 16, "My phone is a tool. I am not.")
    footer(c, "The part that feels pointless is the part that is working.")
    c.showPage()


# ---------------------------------------------------------------- Weekly

def sunday_board(c):
    """Front: the meeting the two of you have. Back: the week each of you carries."""
    masthead(c, "Every week · The Sunday Board Meeting", "Free practice · lives on the table")
    y = BODY_TOP
    caps(c, SIDE, y, "Fifteen minutes · once a week · one sheet between you", size=7.4, color=CORAL)
    c.setFont("Display", 30)
    c.setFillColor(INK)
    c.drawString(SIDE, y - 32, "The Sunday")
    c.setFillColor(CORAL)
    c.drawString(SIDE, y - 64, "Board Meeting.")
    para(c, SIDE, y - 86, "Phones in another room. Start with how you are, not the calendar. Make the week visible, then protect one thing together.",
         300, size=10, leading=13.6)
    # Opening question, top right.
    qx, qw, qh = SIDE + 330, CONTENT_W - 330, 96
    c.setFillColor(SEA)
    c.rect(qx, y - qh + 8, qw, qh, stroke=0, fill=1)
    c.setFillColor(OCEAN)
    c.rect(qx, y - qh + 8, 4, qh, stroke=0, fill=1)
    caps(c, qx + 14, y - 10, "One question to start", size=6.8, color=CORAL)
    qy = para(c, qx + 14, y - 26, "At the end of this week, what would make us say we were on the same team?", qw - 28,
              font="BodySemi", size=9.4, leading=12, color=INK)
    _fill_lines(c, qx + 14, qy - 6, y - qh + 18, qw - 28, gap=16)

    y -= 120
    h1 = 140
    box(c, SIDE, y, CONTENT_W, h1, "Connection", "01")
    half = (CONTENT_W - 24 - 20) / 2
    for i, (lab, top) in enumerate([("One thing I appreciated about you this week", 0), ("How are we doing, honestly?", 0)]):
        x = SIDE + 12 + i * (half + 20)
        c.setFont("BodySemi", 9)
        c.setFillColor(COPY)
        c.drawString(x, y - 38, lab)
        _fill_lines(c, x, y - 56, y - 78, half)
    c.setFont("BodySemi", 9)
    c.setFillColor(COPY)
    c.drawString(SIDE + 12, y - 100, "One thing I can do this week to support you")
    _fill_lines(c, SIDE + 12, y - 118, y - h1 + 12, CONTENT_W - 24, gap=18)

    y -= h1 + 14
    lw = 330
    rw = CONTENT_W - lw - 14
    h2 = y - BODY_BOTTOM
    box(c, SIDE, y, lw, h2, "The week ahead", "02")
    c.setFont("Body", 8.4)
    c.setFillColor(COPY)
    c.drawString(SIDE + 12, y - 34, "Commitments, handoffs, and the parts most likely to create pressure.")
    dy = y - 56
    days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    pressure_h = 64
    step = (dy - (y - h2 + pressure_h + 18)) / len(days)
    for d in days:
        caps(c, SIDE + 12, dy, d, size=7, color=CORAL, font="Display", space=0.8)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.55)
        c.line(SIDE + 48, dy - 2, SIDE + lw - 12, dy - 2)
        dy -= step
    py = y - h2 + pressure_h
    caps(c, SIDE + 12, py, "The pressure point", size=6.8, color=OCEAN)
    c.setFont("Body", 7.8)
    c.setFillColor(COPY)
    c.drawString(SIDE + 12, py - 12, "Where will the week feel tight, and what can we decide now?")
    _fill_lines(c, SIDE + 12, py - 30, y - h2 + 14, lw - 24)

    rx = SIDE + lw + 14
    hh = h2 * 0.56
    box(c, rx, y, rw, hh, "Home and money", "03")
    _slots(c, rx + 12, y - 38, y - hh + 12, rw - 24,
           [("Meals and groceries", None), ("Family and household needs", None), ("Who owns what this week", None), ("Bills, spending, saving", None)])
    y2 = y - hh - 14
    box(c, rx, y2, rw, y2 - BODY_BOTTOM, "Protect", "04")
    _slots(c, rx + 12, y2 - 38, BODY_BOTTOM + 12, rw - 24,
           [("Time for us", None), ("Time for each of us", None), ("Our shared win", None)])
    footer(c, "Nothing has to be solved all at once.", "Over · your own week")
    c.showPage()

    # Back: the personal week (formerly The Here Week).
    masthead(c, "Every week · Your own week", "Print one for each of you")
    y = title_block(c, "After the meeting · on your own", "Your side of the week.",
                    "The front is the week you share. This side is the work, home, and personal things that are yours to carry. Five minutes, after the meeting.")
    blocks = [
        ("01", "The three that matter", "If these happen, the week counts.", "slots", [("One", None), ("Two", None), ("Three", None)]),
        ("02", "Work", "One meaningful target, one block to protect, one loose end to close.", "lines", None),
        ("03", "Home and people", "What the house needs, who needs your attention, one thing to protect.", "lines", None),
        ("04", "When the week gets tight", "The pressure point you can prepare for now.", "lines", None),
        ("05", "Friday check in", "What held up? What should change next week?", "lines", None),
    ]
    _week_back(c, y, blocks)
    footer(c, "A plan only works if it stays where you can see it.")
    c.showPage()


def _week_back(c, y, blocks):
    gap = 14
    colw = (CONTENT_W - gap) / 2
    total = y - BODY_BOTTOM - 2 * gap
    hs = [total * 0.26, total * 0.42, total * 0.32]
    # Row 1: one wide box. Rows 2 and 3: two boxes each.
    layout = [[blocks[0]], [blocks[1], blocks[2]], [blocks[3], blocks[4]]]
    for row, h in zip(layout, hs):
        for i, (n, t, hint, kind, payload) in enumerate(row):
            bw = CONTENT_W if len(row) == 1 else colw
            bx = SIDE + i * (colw + gap)
            box(c, bx, y, bw, h, t, n)
            hy = para(c, bx + 12, y - 34, hint, bw - 24, size=8.6, leading=11.2)
            if kind == "slots":
                # Three numbered lines across the full width.
                step = (hy - 8 - (y - h + 14)) / 3
                for k in range(3):
                    ly = hy - 14 - k * step
                    c.setFont("Display", 9)
                    c.setFillColor(CORAL)
                    c.drawString(bx + 12, ly + 3, str(k + 1))
                    c.setStrokeColor(RULE)
                    c.setLineWidth(0.55)
                    c.line(bx + 28, ly, bx + bw - 12, ly)
            else:
                _fill_lines(c, bx + 12, hy - 8, y - h + 14, bw - 24)
        y -= h + gap


# ---------------------------------------------------------------- Lesson sheets

def brain_dump(c):
    work_sheet(
        c, label=lesson_label("1.1"), sub="Lives on the desk",
        kicker="Fifteen minutes · once a week · pen on paper",
        headline="Put it somewhere other than your head.",
        standfirst="Do not organize while you write. Empty it first. When the list slows down, wait a minute and ask what you are still trying not to forget. Then mark each item D for do, C for choose, T for talk, or R for release.",
        blocks=[
            ("01", "Work", "Anything unfinished, promised, or avoided.", "lines", None),
            ("02", "Home", "Repairs, errands, the thing on the counter.", "lines", None),
            ("03", "Money and admin", "Bills, forms, renewals, the call you keep not making.", "lines", None),
            ("04", "Me", "Health, friendships, the thing you used to do.", "lines", None),
        ],
        foot="Once it is on paper, your head can let go of it.")


def tomorrow(c):
    work_sheet(
        c, label=lesson_label("1.2"), sub="Lives on the desk · written the night before",
        kicker="Tomorrow matters if",
        headline="Decide it before the day decides for you.",
        standfirst="One target, chosen while today is still fresh. Maintenance is real work and it comes second, on purpose rather than by default.",
        blocks=[
            ("01", "The one thing", "Concrete enough that you will know when it is done.", "lines", None),
            ("02", "The block", "Twenty five, fifty, or ninety minutes. A real one beats a perfect one.", "slots",
             [("When it starts", None), ("How long", None), ("Where", None), ("What is off", None)]),
            ("03", "Then the maintenance", "The upkeep you choose, after the one thing is done.", "lines", None),
            ("04", "What I will not do tomorrow", "A day has edges or it has none.", "lines", None),
        ],
        weights=[0.9, 1.1],
        foot="One protected hour beats a perfect morning you never get.")


def driveway(c):
    card_page(
        c, label=lesson_label("1.3"), kicker="The Driveway Card",
        headline=["Two minutes", "before you go in."],
        steps=[
            ("Stop", "Engine off. Phone silent and out of your hand."),
            ("Name it", "Say what followed you home. Decide what belongs to tomorrow."),
            ("Breathe", "Three slow breaths, longer on the way out."),
            ("Choose", "Who do I want to be for the first ten seconds?"),
        ],
        aside_label="If you do not drive home",
        aside_body="Close the laptop, write the next work thing down, walk to the end of the street and come back in. The doorway matters more than the car.",
        foot="You get to decide how you carry the day in.")


def pause_return(c):
    card_page(
        c, label=lesson_label("2.1"), kicker="Pause · Return · Repair",
        headline=["Before pressure", "picks your answer."],
        steps=[
            ("Pause", "One slow breath. If you can answer respectfully, answer. If not, say you need a minute."),
            ("Name the time", "A pause is only a pause if you say when you are coming back. Ten minutes counts."),
            ("Return calm", "Open with what is true and useful. Skip the defense and the list of their faults."),
            ("Repair", "If you were sharp, name it without an excuse and ask what would help."),
        ],
        aside_label="Agree on this before you need it",
        aside_body="A break called mid argument sounds like walking out. A break you both agreed on last Tuesday sounds like the plan working.",
        foot="Take the pause, then come back when you said.")


def date_night(c):
    card_page(
        c, label=lesson_label("2.2"), kicker="Choose · Protect · Notice",
        headline=["Two ideas each.", "Pick one."],
        steps=[
            ("Choose together", "Two ideas each, pick one that is possible rather than impressive."),
            ("Protect it", "Phones in the glovebox before you sit down. Face down on the table does not count."),
            ("Do something", "Side by side beats across a table. New beats familiar. Cheap is fine."),
            ("Notice", "Ask what was interesting. Skip whether it worked."),
        ],
        aside_label="If it falls apart",
        aside_body="Book the next one before you get home. A rhythm survives a bad night. Waiting for the right week does not.",
        foot="Curiosity comes back with use.")


def floor_time(c):
    card_page(
        c, label=lesson_label("2.3"), kicker="Eyes first, then follow",
        headline=["Fifteen minutes.", "They lead."],
        steps=[
            ("Eyes first", "Put the phone down and answer the bid. If you cannot yet, say when, then keep it."),
            ("Get level", "Floor, passenger seat, side of the bed. Whatever works for both bodies."),
            ("Let them pick", "Do not improve the game, teach the lesson, or steer it somewhere useful."),
            ("End clean", "A warning before time is up. Say what you enjoyed and when you are back."),
        ],
        aside_label="If there are no kids in the house",
        aside_body="Point it at each other. A partner bids for attention too, just once and quietly. Let them pick the subject and do not turn it into logistics.",
        foot="Eye level is the whole technique.")


def third_place(c):
    card_page(
        c, label=lesson_label("3.1"), kicker="Not work · not home",
        headline=["A place where you", "are just a person."],
        steps=[
            ("Name it", "Trail, water, workshop, gym, church, a table. Pick what gives you something back."),
            ("Smallest version", "Thirty minutes that repeats beats a day you keep postponing."),
            ("Both of you", "Put both on the calendar in one conversation. Count childcare honestly."),
            ("Check it", "Do you come back more available, or just number? Answer that one honestly."),
        ],
        aside_label="The test",
        aside_body="A third place should never become an escape hatch from family work. If it only ever runs one direction, someone else is picking up the tab.",
        foot="You are allowed to be a person, too.")


def friendship(c):
    card_page(
        c, label=lesson_label("3.2"), kicker="Invite first",
        headline=["Specific beats", "we should hang out."],
        steps=[
            ("Pick one person", "Someone you already like being around. You are not choosing a best friend."),
            ("Be specific", "I am riding Saturday at eight, want to come? Skip the we should do something sometime."),
            ("Ask again", "Schedules are real. One no is a calendar. Three is an answer, and that is fine."),
            ("Go deeper later", "Start shoulder to shoulder. Ask a real question once there is something to hold it."),
        ],
        aside_label="Why this matters at home",
        aside_body="A relationship asked to be the only close one either of you has will buckle under a job nobody gave it. Protect each other's friendships like your own.",
        foot="The worst answer is a no you survive.")


def thirty_day(c):
    practice = [("The practice", "Which sheet, and who is doing it."), ("The cue", "The moment that sets it off."),
                ("The smallest version", "What it looks like on a bad week.")]
    work_sheet(
        c, label=lesson_label("3.3"), sub="Lives on the table, next to the Sunday Board",
        kicker="The Thirty Day Page · the last thing you do in the course",
        headline="Keep the two that helped.",
        standfirst="You do not have to keep everything you tried. Choose two between you, give each a moment and a response, and leave the rest alone.",
        blocks=[
            ("01", "Practice one", "When this happens, we will do this.", "slots", practice),
            ("02", "Practice two", "Same shape. Two is the limit, on purpose.", "slots", practice),
            ("03", "What we are letting go", "The ones that did not fit this season. Write them down so they stop nagging.", "lines", None),
            ("04", "Thirty days from now", "What happened. Nobody is grading either of you.", "lines", None),
        ],
        weights=[1.15, 0.85],
        foot="Two practices you keep beat nine you admired.")


# ---------------------------------------------------------------- Field card

def field_card(c):
    masthead(c, "The field card", "The whole course on one page")
    y = title_block(c, "All the Way Here · lives on the fridge or in the car", "Return. Lead. Keep.",
                    "Nine practices on one page. Use the move that meets the moment in front of you.")
    gap = 12
    cw = (CONTENT_W - 2 * gap) / 3
    colors_ = {"RETURN": OCEAN, "LEAD": CORAL, "KEEP": INK}
    short = {
        "1.1": "Put open loops on paper.", "1.2": "One target before maintenance.", "1.3": "Park. Name it. Breathe. Enter.",
        "2.1": "Pause. Return. Repair.", "2.2": "Choose. Phones away. Notice.", "2.3": "Eyes first. Let them lead.",
        "3.1": "Return to one restoring place.", "3.2": "Make one specific invitation.", "3.3": "Keep two for thirty days.",
    }
    for i, mv in enumerate(CONTENT["CORE_MOVEMENTS"]):
        x = SIDE + i * (cw + gap)
        col = colors_.get(mv["key"], INK)
        c.setFillColor(col)
        c.rect(x, y - 44, cw, 44, stroke=0, fill=1)
        caps(c, x + 12, y - 16, "%02d" % (i + 1), size=7, color=WHITE, space=1)
        c.setFont("Display", 18)
        c.setFillColor(WHITE)
        c.drawString(x + 12, y - 36, mv["key"].title())
        ly = y - 62
        for l in [l for l in CONTENT["CORE_LESSONS"] if l["movement"] == mv["key"]]:
            c.setFillColor(SEA)
            c.rect(x, ly - 36, cw, 42, stroke=0, fill=1)
            c.setFont("Display", 8)
            c.setFillColor(CORAL)
            c.drawString(x + 10, ly - 8, l["number"])
            c.setFont("Display", 11)
            c.setFillColor(INK)
            c.drawString(x + 32, ly - 8, l["title"].replace("The ", "") if len(l["title"]) > 22 else l["title"])
            para(c, x + 10, ly - 24, short[l["number"]], cw - 20, size=8.4, leading=10.4)
            ly -= 50
    y -= 62 + 3 * 50 + 16

    bh = 104
    c.setFillColor(INK)
    c.rect(SIDE, y - bh, CONTENT_W, bh, stroke=0, fill=1)
    caps(c, SIDE + 18, y - 20, "When you notice the drift", size=7, color=SUN)
    for k, q in enumerate(["What has my attention?", "Who or what is in front of me?", "What is one useful move now?"]):
        c.setFont("Display", 16)
        c.setFillColor(WHITE)
        c.drawString(SIDE + 18, y - 44 - k * 22, f"{k + 1}.  {q}")
    y -= bh + 12

    sh = 74
    c.setFillColor(SEA)
    c.rect(SIDE, y - sh, CONTENT_W, sh, stroke=0, fill=1)
    caps(c, SIDE + 18, y - 18, "The three phone boundaries", size=7, color=CORAL)
    cols = [("Eyes first", "Answer the person before the phone."), ("Give it a home", "One drawer, bag, or charging place."),
            ("Stop before screen", "Set up the drive. Look up at the curb.")]
    bw = (CONTENT_W - 36) / 3
    for k, (t, b) in enumerate(cols):
        x = SIDE + 18 + k * bw
        c.setFont("Display", 12)
        c.setFillColor(INK)
        c.drawString(x, y - 38, t)
        para(c, x, y - 54, b, bw - 14, size=8.6, leading=10.8)
    y -= sh + 22

    caps(c, SIDE, y, "My next useful move this week", color=CORAL)
    _fill_lines(c, SIDE, y - 20, BODY_BOTTOM + 4, CONTENT_W, gap=22)
    footer(c, "Practice before completion.")
    c.showPage()


# ---------------------------------------------------------------- Family tools

def family_tools(c):
    work_sheet(
        c, label="For families with kids · 1 of 3", sub="The Family Screen Reset",
        kicker="Three days · the adults go first",
        headline="Get one moment back together.",
        standfirst="Pick one moment that repeats, like dinner, the ride to school, or bedtime. The kids help choose the rules, and you try it for three days. It is an experiment, so nobody gets punished.",
        blocks=[
            ("01", "The moment we want back", "Dinner, the ride to school, bedtime, a game, Saturday morning.", "lines", None),
            ("02", "What is pulling us away now", "Name the pattern without blaming one person.", "lines", None),
            ("03", "Our three day experiment", "Where will devices live? When does it start and end? What exceptions do we need?", "lines", None),
            ("04", "Who does what", "The adults model it first. The kids help choose.", "slots",
             [("Adults will", None), ("Kids help choose", None), ("Start date", None), ("How we will check in", None)]),
        ],
        foot="Kids copy what they see more than what they hear.")
    work_sheet(
        c, label="For families with kids · 2 of 3", sub="The Weekly Tradition Builder",
        kicker="Small and repeated",
        headline="One small thing worth coming back to.",
        standfirst="A tradition gets its meaning from repeating. It can be small and cheap. What matters is that it still happens on a hard week.",
        blocks=[
            ("01", "What it protects", "Connection, play, faith, rest, food, movement, service, making things.", "lines", None),
            ("02", "The smallest version", "The activity, day, time, and place, plus the version that works on a hard week.", "lines", None),
            ("03", "Everyone gets a say", "What will the adults organize? What can the kids choose?", "lines", None),
            ("04", "The plan", "Write it down so it survives the week.", "slots",
             [("Where the phones go", None), ("First date", None), ("Try it for", None), ("Who reminds us", None)]),
        ],
        foot="Small and repeated beats big and once.")
    work_sheet(
        c, label="For families with kids · 3 of 3", sub="The Side by Side Teen Check In",
        kicker="The adult puts the phone away first",
        headline="Talk side by side.",
        standfirst="Make room for a real conversation without cornering them, interrogating them, or turning the first answer into a lecture.",
        blocks=[
            ("01", "Begin beside them", "Drive, walk, make food, fix something, or sit somewhere neutral.", "lines", None),
            ("02", "One easy invitation", "Want to ride with me? Want to get something to eat? Can you help me with this?", "lines", None),
            ("03", "Four questions worth keeping", "Ask one. Let the silence sit.", "slots",
             [("What is taking up your headspace?", "Listen more than you answer."),
              ("What are adults missing?", "About your world, right now."),
              ("Listen, think, or act?", "Do you want me to listen, help you think, or help?"),
              ("What would help this week?", "One thing that would make it easier.")]),
            ("04", "What we agreed on", "Write only what you both agreed to. No hidden assignment afterward.", "slots",
             [("The next step", None), ("Check back on", None), ("What the adult will do", None)]),
        ],
        weights=[0.7, 1.3],
        foot="The car is the best room in the house for this.")


# ---------------------------------------------------------------- Resource Pack

SHEETS = [
    # (file, title, builder, label for contents)
    ("focus-protocol.pdf", "The Focus Protocol", focus_protocol),
    ("sunday-board-meeting.pdf", "The Sunday Board Meeting", sunday_board),
    ("brain-dump.pdf", "The Brain Dump", brain_dump),
    ("tomorrow-matters-if.pdf", "Tomorrow Matters If", tomorrow),
    ("driveway-card.pdf", "The Driveway Card", driveway),
    ("pause-return-repair.pdf", "Pause, Return, Repair", pause_return),
    ("date-night-card.pdf", "The Date Night Card", date_night),
    ("floor-time.pdf", "Floor Time", floor_time),
    ("third-place.pdf", "The Third Place", third_place),
    ("friendship-script.pdf", "The Friendship Script", friendship),
    ("thirty-day-page.pdf", "The Thirty Day Page", thirty_day),
    ("all-the-way-here-field-card.pdf", "All the Way Here Field Card", field_card),
    ("family-tools.pdf", "Family Tools", family_tools),
]


def contents_page(c, page_of):
    masthead(c, "All the Way Here · Resource Pack", "Every sheet, in course order")
    y = title_block(c, "Print this once", "The Resource Pack.",
                    "Every sheet in the course, in the order you will use them. Each one has a place it lives, because a practice sitting on the fridge or in the glovebox does not have to compete with the phone.")
    caps(c, SIDE, y, "Sheet", size=6.8, color=COPY, font="Body")
    caps(c, SIDE + 62, y, "What it is", size=6.8, color=COPY, font="Body")
    caps(c, SIDE + 352, y, "Where it lives", size=6.8, color=COPY, font="Body")
    caps(c, W - SIDE, y, "Page", size=6.8, color=COPY, font="Body", align="right")
    y -= 8
    c.setStrokeColor(INK)
    c.setLineWidth(0.9)
    c.line(SIDE, y, W - SIDE, y)
    rows = [(k["sheet"], k["name"], k["note"], k["livesAt"], k["file"].split("/")[-1]) for k in CONTENT["FIELD_KIT"]]
    rows.append(("Family", "Family tools", "Three optional pages for using the practices with kids.", "Wherever the family is", "family-tools.pdf"))
    row_h = (y - BODY_BOTTOM - 70) / len(rows)
    for sheet, name, note, lives, file in rows:
        y -= row_h
        cy = y + row_h / 2
        c.setFont("Display", 10 if len(sheet) <= 3 else 7.6)
        c.setFillColor(CORAL)
        c.drawString(SIDE, cy - 3, sheet.upper() if len(sheet) > 3 else sheet)
        c.setFont("BodySemi", 9.8)
        c.setFillColor(INK)
        c.drawString(SIDE + 62, cy + 3, name)
        c.setFont("Body", 8)
        c.setFillColor(COPY)
        c.drawString(SIDE + 62, cy - 8, note)
        c.setFont("Body", 8.6)
        c.drawString(SIDE + 352, cy - 3, lives)
        c.setFont("BodySemi", 9)
        c.setFillColor(INK)
        c.drawRightString(W - SIDE, cy - 3, str(page_of[file]))
        c.setStrokeColor(RULE)
        c.setLineWidth(0.5)
        c.line(SIDE, y, W - SIDE, y)
    y -= 22
    caps(c, SIDE, y, "Printing", size=6.8, color=OCEAN)
    para(c, SIDE, y - 13, "Card sheets print four identical cards to a page: cut on the dashed lines, on cardstock if you have it. The Sunday Board prints on both sides, or as two pages. Reprint the ones you write on.",
         CONTENT_W, size=8.6, leading=11.4)
    footer(c, "Keep what helps. Leave what doesn't.")
    c.showPage()


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    counts = {}
    for file, title, fn in SHEETS:
        c = new(OUT / file, title)
        fn(c)
        c.save()
        counts[file] = len(PdfReader(str(OUT / file)).pages)
    # Page numbers in the combined pack: page 1 is the contents.
    page_of, p = {}, 2
    for file, _, _ in SHEETS:
        page_of[file] = p
        p += counts[file]
    cpath = ROOT / "tmp/pdfs/pack-contents.pdf"
    c = new(cpath, "Contents")
    contents_page(c, page_of)
    c.save()
    w = PdfWriter()
    w.append(str(cpath))
    for file, _, _ in SHEETS:
        w.append(str(OUT / file))
    w.add_metadata({"/Title": "All the Way Here: The Resource Pack", "/Author": "Chris Avera, Here Supply Co."})
    with open(OUT / "here-supply-resource-pack.pdf", "wb") as fh:
        w.write(fh)
    print("built", len(SHEETS), "sheets,", p - 1, "pages in the Resource Pack")


if __name__ == "__main__":
    build()
