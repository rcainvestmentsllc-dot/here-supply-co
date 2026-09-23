import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch


def sunday_board(path):
    """The one people write on, so it is mostly room to write."""
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle("The Sunday Board Meeting")
    masthead(c, "THE SUNDAY BOARD MEETING  ·  FIFTEEN MINUTES, ONCE A WEEK", "SHEET 01")

    y = H - M - 62
    c.setFont("Archivo-Bold", 27); c.setFillColor(INK)
    c.drawString(M, y, "See the same week.")
    tracked(c, W - M - 140, y + 3, "WEEK OF", "Plex", 7.0, QUIET, 1.2)
    c.setStrokeColor(RULE); c.setLineWidth(0.6)
    c.line(W - M - 88, y - 2, W - M, y - 2)
    y -= 20
    c.setFont("Archivo", 10.5); c.setFillColor(QUIET)
    c.drawString(M, y, "Phones in another room. One sheet between you. Start with how you are, not with the calendar.")

    colw = (W - 2 * M - 16) / 2
    y -= 26
    ROW = 268

    # 01 connection
    box(c, M, y, colw, ROW, "01 \u00b7 HOW ARE WE DOING?")
    c.setFont("Archivo", 8.6); c.setFillColor(QUIET)
    c.drawString(M + 11, y - 31, "Mark where each of you honestly is. Two marks per line.")
    ry = y - 56
    for label in ["CONNECTED", "RESTED", "HEARD", "STEADY"]:
        tracked(c, M + 11, ry, label, "Plex", 6.4, INK, 1.1)
        c.setStrokeColor(RULE); c.setLineWidth(0.5)
        for i in range(10):
            c.circle(M + 78 + i * 15.5, ry + 2.5, 3.6, stroke=1, fill=0)
        c.setFont("Plex", 5.6); c.setFillColor(QUIET)
        c.drawString(M + 72, ry - 11, "1")
        c.drawString(M + 72 + 9 * 15.5, ry - 11, "10")
        ry -= 30
    c.setFont("Archivo-Semi", 9); c.setFillColor(INK)
    c.drawString(M + 11, ry - 6, "One thing that would help me this week")
    rule_lines(c, M + 11, ry - 24, colw - 22, 4, 19)

    # 02 the week
    box(c, M + colw + 16, y, colw, ROW, "02 \u00b7 WHAT DOES THE WEEK NEED?")
    c.setFont("Archivo", 8.6); c.setFillColor(QUIET)
    c.drawString(M + colw + 27, y - 31, "Everything that is already on the calendar, out of both heads.")
    dx = M + colw + 27
    dy = y - 56
    for day in ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]:
        c.setFillColor(TEAL); c.setFont("Plex-Semi", 6.6)
        c.drawString(dx, dy, day)
        c.setStrokeColor(RULE); c.setLineWidth(0.5)
        c.line(dx + 30, dy - 3, M + colw + 16 + colw - 11, dy - 3)
        c.line(dx + 30, dy - 18, M + colw + 16 + colw - 11, dy - 18)
        dy -= 29

    y -= (ROW + 16)

    # 03 the house
    box(c, M, y, colw, ROW, "03 \u00b7 WHAT DOES THE HOUSE NEED?")
    c.setFont("Archivo", 8.6); c.setFillColor(QUIET)
    c.drawString(M + 11, y - 31, "Name it, then say out loud who is carrying it.")
    c.setFont("Plex", 5.8); c.setFillColor(QUIET)
    c.drawRightString(M + colw - 11, y - 44, "WHO")
    hy = y - 56
    for label in ["MEALS", "MONEY", "KIDS / FAMILY", "PROJECTS", "APPOINTMENTS", "THE THING WE KEEP PUTTING OFF"]:
        tracked(c, M + 11, hy, label, "Plex", 6.2, INK, 1.0)
        c.setStrokeColor(RULE); c.setLineWidth(0.5)
        c.line(M + 11, hy - 11, M + colw - 58, hy - 11)
        c.line(M + colw - 52, hy - 11, M + colw - 11, hy - 11)
        hy -= 33

    # 04 protect
    box(c, M + colw + 16, y, colw, ROW, "04 \u00b7 WHAT ARE WE PROTECTING?")
    c.setFont("Archivo", 8.6); c.setFillColor(QUIET)
    c.drawString(M + colw + 27, y - 31, "Decide this before the week fills itself in.")
    py = y - 54
    for label, hint in [
        ("TIME FOR US", "One thing together, on the calendar."),
        ("TIME FOR EACH OF US", "Both of you. Not just whoever asks."),
        ("ONE SHARED WIN", "What makes this a good week."),
        ("WHAT WE ARE SAYING NO TO", "A week has edges or it has none."),
    ]:
        tracked(c, M + colw + 27, py, label, "Plex-Semi", 6.4, TEAL, 1.1)
        c.setFont("Archivo", 7.4); c.setFillColor(QUIET)
        c.drawString(M + colw + 27, py - 11, hint)
        c.setStrokeColor(RULE); c.setLineWidth(0.5)
        c.line(M + colw + 27, py - 24, M + colw + 16 + colw - 11, py - 24)
        c.line(M + colw + 27, py - 40, M + colw + 16 + colw - 11, py - 40)
        py -= 56

    footline(c, "Fifteen minutes a week is enough to stop guessing about each other.")
    c.save()


def reset_sheet(path):
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle("The Attention Reset")
    masthead(c, "THE ATTENTION RESET  ·  SEVENTY TWO HOURS  ·  PUT THIS ON THE FRIDGE", "SHEET 02")

    y = H - M - 62
    c.setFont("Archivo-Bold", 27); c.setFillColor(INK)
    c.drawString(M, y, "Four moves. Three days.")
    y -= 20
    c.setFont("Archivo", 10.5); c.setFillColor(QUIET)
    c.drawString(M, y, "Not a detox and not a test of willpower. You are changing what reaches you, then watching what changes.")

    y -= 30
    tracked(c, M, y, "THE FOUR MOVES", "Plex-Semi", 7.4, IRON, 1.5)
    y -= 16
    moves = [
        ("01", "Remove the color", "Switch the display to grayscale. Turn it back on when work, maps, photos or accessibility genuinely need it."),
        ("02", "Control the feeds", "Sign out of the few apps you open without deciding. Keep the tools you actually need."),
        ("03", "Silence the machine", "Nonessential notifications off. Keep priority calls, medical alerts and anyone doing caregiving."),
        ("04", "Give the phone a home", "One drawer or shelf when you walk in. If all evening is unrealistic, protect dinner or bedtime."),
    ]
    cw = (W - 2 * M - 3 * 9) / 4
    for i, (n, t, b) in enumerate(moves):
        x = M + i * (cw + 9)
        c.setFillColor(PAPER); c.rect(x, y - 96, cw, 96, stroke=0, fill=1)
        c.setStrokeColor(RULE); c.setLineWidth(0.6); c.rect(x, y - 96, cw, 96, stroke=1, fill=0)
        c.setFont("Plex-Semi", 8); c.setFillColor(BRASS); c.drawString(x + 8, y - 17, n)
        c.setFont("Archivo-Semi", 10.2); c.setFillColor(INK)
        yy = y - 32
        for ln in wrap(c, t, "Archivo-Semi", 10.2, cw - 16):
            c.setFont("Archivo-Semi", 10.2); c.drawString(x + 8, yy, ln); yy -= 12
        para(c, x + 8, yy - 3, b, "Archivo", 7.6, QUIET, cw - 16, 9.4)
        c.setStrokeColor(INK); c.setLineWidth(0.8)
        c.rect(x + cw - 21, y - 90, 11, 11, stroke=1, fill=0)

    y -= 118
    tracked(c, M, y, "WHAT THE SEVENTY TWO HOURS FEEL LIKE", "Plex-Semi", 7.4, IRON, 1.5)
    c.setFont("Archivo", 8); c.setFillColor(QUIET)
    c.drawRightString(W - M, y, "Commonly reported. Yours will not match exactly.")
    y -= 15
    phases = [
        ("HOURS 0 TO 6", "The phantom reach", "Your hand goes to the pocket with nothing behind it."),
        ("HOURS 6 TO 18", "The boredom", "The hard part. Small empty gaps feel worse than they should. It passes."),
        ("HOURS 18 TO 36", "The settle", "Reaching less. Tasks hold longer. Sleep gets easier."),
        ("HOURS 36 TO 72", "The room gets bigger", "You hear the second half of what someone says."),
    ]
    for i, (w_, t, b) in enumerate(phases):
        x = M + i * (cw + 9)
        c.setStrokeColor(TEAL); c.setLineWidth(2)
        c.line(x, y - 3, x + cw - 10, y - 3)
        tracked(c, x, y - 16, w_, "Plex-Semi", 6.4, TEAL, 1.1)
        c.setFont("Archivo-Semi", 9.4); c.setFillColor(INK); c.drawString(x, y - 30, t)
        para(c, x, y - 42, b, "Archivo", 7.6, QUIET, cw - 10, 9.4)

    y -= 96
    tracked(c, M, y, "DAYS 4 TO 7  ·  WHAT YOUR HEAD WILL SAY", "Plex-Semi", 7.4, IRON, 1.5)
    y -= 16
    c.setFillColor(INK); c.rect(M, y - 74, W - 2 * M, 74, stroke=0, fill=1)
    lines = ["I have proven I can handle it now.", "Just one app. Not the bad ones.",
             "Ten minutes is not the same thing.", "It was a busy week. This is not a normal test."]
    ly = y - 18
    for ln in lines[:2]:
        c.setFont("Archivo", 10); c.setFillColor(PAPER); c.drawString(M + 14, ly, chr(8220) + ln + chr(8221)); ly -= 17
    ly = y - 18
    for ln in lines[2:]:
        c.setFont("Archivo", 10); c.setFillColor(PAPER); c.drawString(M + (W - 2 * M) / 2 + 6, ly, chr(8220) + ln + chr(8221)); ly -= 17
    c.setFont("Archivo-Semi", 8.4); c.setFillColor(BRASS)
    c.drawString(M + 14, y - 62, "None of those are decisions. Hold the arrangement fourteen days before you change anything.")

    y -= 96
    tracked(c, M, y, "THE DAILY CHECK  ·  NOTICE, DO NOT GRADE", "Plex-Semi", 7.4, IRON, 1.5)
    c.setFont("Archivo", 8); c.setFillColor(QUIET)
    c.drawRightString(W - M, y, "One pass at the end of each day. No scoring.")
    y -= 18

    questions = [
        "When did I reach without deciding?",
        "Where was it easier to stay present?",
        "Which boundary is worth keeping tomorrow?",
    ]
    colx = W - M - 3 * 52
    c.setFont("Plex-Semi", 6.4); c.setFillColor(TEAL)
    for i in range(3):
        c.drawCentredString(colx + i * 52 + 26, y, "DAY %d" % (i + 1))
    y -= 8
    c.setStrokeColor(RULE); c.setLineWidth(0.5)
    c.line(M, y, W - M, y)
    for q in questions:
        y -= 26
        c.setFont("Archivo", 9.6); c.setFillColor(INK)
        c.drawString(M, y + 6, q)
        for i in range(3):
            c.setStrokeColor(RULE); c.setLineWidth(0.6)
            c.rect(colx + i * 52 + 17, y + 1, 16, 16, stroke=1, fill=0)
        c.setStrokeColor(RULE); c.setLineWidth(0.4)
        c.line(M, y - 9, W - M, y - 9)

    y -= 34
    c.setFillColor(BRASS); c.rect(M, y - 58, W - 2 * M, 58, stroke=0, fill=1)
    tracked(c, M + 16, y - 18, "READ IT OUT LOUD ONCE", "Plex-Semi", 6.2, IRON, 1.2)
    c.setFont("Archivo-Semi", 13.2); c.setFillColor(INK)
    c.drawString(M + 16, y - 38, "I do not trade presence for distraction.")
    c.drawString(M + 16, y - 52, "My phone is a tool. I am not.")

    footline(c, "The part that feels pointless is the part that is working.")
    c.save()


def driveway_cards(path):
    """Four to a page, cut apart. This one lives in the glovebox."""
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle("The Driveway Card")
    cw, ch = (W - 2 * 0.4 * inch) / 2, (H - 2 * 0.4 * inch) / 2
    ox, oy = 0.4 * inch, 0.4 * inch

    for r in range(2):
        for col in range(2):
            x = ox + col * cw
            y = oy + r * ch
            c.setStrokeColor(RULE); c.setLineWidth(0.4)
            c.setDash(2, 3); c.rect(x, y, cw, ch, stroke=1, fill=0); c.setDash()

            px, py = x + 22, y + ch - 30
            tracked(c, px, py, "THE DRIVEWAY CARD", "Plex-Semi", 7, TEAL, 1.6)
            c.setFont("Archivo-Bold", 17); c.setFillColor(INK)
            c.drawString(px, py - 24, "Two minutes")
            c.drawString(px, py - 41, "before you go in.")
            c.setStrokeColor(INK); c.setLineWidth(1); c.line(px, py - 52, x + cw - 22, py - 52)

            steps = [
                ("Stop", "Engine off. Phone silent and out of your hand."),
                ("Name it", "Say what followed you home. Decide what belongs to tomorrow."),
                ("Breathe", "Three slow breaths, longer on the way out."),
                ("Choose", "Who do I want to be for the first ten seconds?"),
            ]
            sy = py - 70
            for i, (t, b) in enumerate(steps, 1):
                c.setFont("Plex-Semi", 7); c.setFillColor(BRASS)
                c.drawString(px, sy, "0%d" % i)
                c.setFont("Archivo-Semi", 9.6); c.setFillColor(INK)
                c.drawString(px + 18, sy, t)
                sy = para(c, px + 18, sy - 11, b, "Archivo", 7.8, QUIET, cw - 62, 9.6) - 7

            # The practice needs a boundary, not a vehicle.
            c.setStrokeColor(RULE); c.setLineWidth(0.5)
            c.line(px, y + 104, x + cw - 22, y + 104)
            tracked(c, px, y + 92, "IF YOU DO NOT DRIVE HOME", "Plex-Semi", 6.2, TEAL, 1.1)
            para(c, px, y + 80, "Close the laptop, write the next work thing down, walk to the end of the street and come back in. The doorway matters more than the car.",
                 "Archivo", 7.6, QUIET, cw - 44, 9.4)

            c.setStrokeColor(RULE); c.setLineWidth(0.5)
            c.line(px, y + 42, x + cw - 22, y + 42)
            c.setFont("Archivo", 7.8); c.setFillColor(IRON)
            c.drawString(px, y + 31, "You are not erasing the day. You are deciding how to carry it in.")
            tracked(c, px, y + 17, "HERE SUPPLY CO.", "Archivo-Bold", 6.4, INK, 1.7)
            c.setFont("Plex", 5.8); c.setFillColor(QUIET)
            c.drawRightString(x + cw - 22, y + 17, "SHEET 03")
    c.save()


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    sunday_board(os.path.join(OUT, "sunday-board-meeting.pdf"))
    reset_sheet(os.path.join(OUT, "attention-reset.pdf"))
    driveway_cards(os.path.join(OUT, "driveway-card.pdf"))
    print("built 3")
