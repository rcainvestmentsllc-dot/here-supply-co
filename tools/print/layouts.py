"""
The two sheet shapes in the Resource Pack.

A work sheet is written on and left somewhere flat: the desk, the fridge, the
table. A card page is four identical cards to cut apart and carry: the
glovebox, the wallet, the nightstand.

Rule for both: every box is filled to its bottom edge with something useful.
No dead space at the foot of a box.
"""
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics

from hsc import *


def _hint(c, x, y, text, width):
    return para(c, x, y, text, width, size=8.6, leading=11.2, color=COPY)


def _fill_lines(c, x, top, bottom, width, gap=21):
    """Writing lines from top to bottom, spaced so the last line sits near the bottom."""
    span = top - bottom
    if span < 4:
        return
    n = max(1, int(span // gap) + 1)
    step = span / (n - 1) if n > 1 else 0
    c.setStrokeColor(RULE)
    c.setLineWidth(0.55)
    for i in range(n):
        c.line(x, top - i * step, x + width, top - i * step)


def _slots(c, x, top, bottom, width, items, label_color=OCEAN):
    """
    Labelled prompts sharing the space evenly. items: list of (label, hint or None).
    Each slot gets its label, its hint, and as many writing lines as fit.
    """
    n = len(items)
    slot = (top - bottom) / n
    y = top
    for label, hint in items:
        if slot < 34 and not hint:
            # Too tight for a line under the label: write on a line beside it.
            lw = caps(c, x, y, label, size=6.8, color=label_color, space=1.0)
            c.setStrokeColor(RULE)
            c.setLineWidth(0.55)
            c.line(x + lw + 8, y - 2, x + width, y - 2)
            y -= slot
            continue
        caps(c, x, y, label, size=6.8, color=label_color, space=1.0)
        yy = y - 12
        if hint:
            c.setFont("Body", 7.8)
            c.setFillColor(COPY)
            c.drawString(x, yy, hint)
            yy -= 6
        first = yy - 14
        last = max(y - slot + 8, first - 400)
        if first - last < 4:
            c.setStrokeColor(RULE)
            c.setLineWidth(0.55)
            c.line(x, first, x + width, first)
        else:
            _fill_lines(c, x, first, last, width)
        y -= slot


def work_sheet(c, *, label, sub, kicker, headline, standfirst, blocks, foot, weights=None):
    """
    blocks: list of (number, title, hint, kind, payload), two to a row.
      kind "lines"   payload ignored, lines fill the box
      kind "slots"   payload = list of (label, hint or None)
    weights: relative row heights, one per row.
    """
    masthead(c, label, sub)
    y = title_block(c, kicker, headline, standfirst)
    gap = 14
    colw = (CONTENT_W - gap) / 2
    rows = [blocks[i:i + 2] for i in range(0, len(blocks), 2)]
    weights = weights or [1] * len(rows)
    total = y - BODY_BOTTOM - gap * (len(rows) - 1)
    for r, row in enumerate(rows):
        h = total * weights[r] / sum(weights)
        span = len(row) == 1
        for i, (number, title, hint, kind, payload) in enumerate(row):
            bx = SIDE + i * (colw + gap)
            bw = CONTENT_W if span else colw
            box(c, bx, y, bw, h, title, number)
            inner_x, inner_w = bx + 12, bw - 24
            hy = _hint(c, inner_x, y - 34, hint, inner_w) if hint else y - 34
            content_top = hy - 8
            bottom = y - h + 14
            if kind == "lines":
                _fill_lines(c, inner_x, content_top, bottom, inner_w)
            elif kind == "slots":
                _slots(c, inner_x, content_top, bottom, inner_w, payload)
        y -= h + gap
    footer(c, foot)
    c.showPage()


CARD_X, CARD_Y = 0.4 * inch, 0.4 * inch
CARD_W = (W - 2 * CARD_X) / 2
CARD_H = (H - CARD_Y - 0.62 * inch) / 2


def card_page(c, *, label, kicker, headline, steps, aside_label, aside_body, foot):
    """Four identical cards on one page, cut apart on the dashed lines."""
    # The cutting note sits in the page margin, outside every card.
    caps(c, CARD_X, H - 0.42 * inch, "Four identical cards · cut along the dashed lines", size=6.6, color=COPY, font="Body", space=1.0)
    caps(c, W - CARD_X, H - 0.42 * inch, label, size=6.6, color=INK, align="right", space=1.0)
    for r in range(2):
        for col in range(2):
            x, y = CARD_X + col * CARD_W, CARD_Y + r * CARD_H
            c.setStrokeColor(RULE)
            c.setLineWidth(0.5)
            c.setDash(2, 3)
            c.rect(x, y, CARD_W, CARD_H, stroke=1, fill=0)
            c.setDash()
            _card(c, x, y, label, kicker, headline, steps, aside_label, aside_body, foot)
    c.showPage()


def _card(c, x, y, label, kicker, headline, steps, aside_label, aside_body, foot):
    pad = 22
    px, right = x + pad, x + CARD_W - pad
    width = right - px
    top = y + CARD_H - 30
    caps(c, px, top, kicker, size=6.8, color=OCEAN, space=1.3)
    c.setFillColor(INK)
    hy = top - 24
    for ln in headline:
        c.setFont("Display", 17.5)
        c.drawString(px, hy, ln)
        hy -= 18
    c.setStrokeColor(INK)
    c.setLineWidth(1)
    c.line(px, hy + 6, right, hy + 6)

    # Measure first, then spread any spare height between the steps so the card
    # has no empty band between the steps and the note at the bottom.
    size, lead = 8.3, 10.4
    bodies = [lines_of(b, "Body", size, width - 19) for _, b in steps]
    steps_h = sum(11 + len(bl) * lead + 6 for bl in bodies)
    aside_lines = lines_of(aside_body, "Body", 7.9, width)
    aside_h = 30 + len(aside_lines) * 9.8
    room = (hy - 12) - (y + 46 + aside_h)
    extra = max(0, (room - steps_h) / len(steps))
    sy = hy - 12 - min(extra, 8)
    for i, ((t, _), bl) in enumerate(zip(steps, bodies), 1):
        c.setFont("Display", 8.4)
        c.setFillColor(CORAL)
        c.drawString(px, sy, "%02d" % i)
        c.setFont("BodySemi", 10)
        c.setFillColor(INK)
        c.drawString(px + 19, sy, t)
        yy = sy - 11.5
        c.setFont("Body", size)
        c.setFillColor(COPY)
        for ln in bl:
            c.drawString(px + 19, yy, ln)
            yy -= lead
        sy = yy - 6 - extra

    # Footer of the card, pinned to the bottom.
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(px, y + 40, right, y + 40)
    c.setFont("Serif", 8.6)
    c.setFillColor(INK)
    c.drawString(px, y + 27, foot)
    caps(c, px, y + 14, "Here Supply Co.", size=6.2, color=INK, font="Display", space=1.4)
    caps(c, right, y + 14, label.split(" · ")[0], size=6, color=COPY, font="Body", align="right", space=0.9)

    # The note sits just above the card footer.
    aside_top = y + 46 + aside_h - 6
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(px, aside_top + 6, right, aside_top + 6)
    caps(c, px, aside_top - 7, aside_label, size=6.4, color=OCEAN, space=1.0)
    para(c, px, aside_top - 20, aside_body, width, size=7.9, leading=9.8, color=COPY)
