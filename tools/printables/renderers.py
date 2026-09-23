"""
Shared renderers for the Field Kit.

Every sheet in the kit comes out of one of these two functions, so the kit
cannot drift apart into eleven separately designed things. A card_page is cut
up and carried (glovebox, wallet, nightstand). A work_sheet is written on and
left somewhere flat (desk, fridge, table).
"""
from kit import *
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch


def card_page(path, title, kicker, headline, steps, aside_label, aside_body,
              foot, sheet_no, doc_title):
    """Four identical cards to a letter page, cut apart on the dashed rule."""
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle(doc_title)
    cw, ch = (W - 2 * 0.4 * inch) / 2, (H - 2 * 0.4 * inch) / 2
    ox, oy = 0.4 * inch, 0.4 * inch

    # Four identical copies confuse people until you say so. This sits in the
    # page margin, outside every card, so it never prints on the card itself.
    tracked(c, ox, H - 19, "FOUR IDENTICAL CARDS \u00b7 CUT ALONG THE DASHED LINES",
            "Plex-Semi", 6.4, QUIET, 1.3)
    c.setFont("Plex", 6.4); c.setFillColor(QUIET)
    c.drawRightString(W - ox, H - 19, "CARDSTOCK IF YOU HAVE IT")

    for r in range(2):
        for col in range(2):
            x, y = ox + col * cw, oy + r * ch
            c.setStrokeColor(RULE); c.setLineWidth(0.4)
            c.setDash(2, 3); c.rect(x, y, cw, ch, stroke=1, fill=0); c.setDash()

            px = x + 22
            py = y + ch - 30
            tracked(c, px, py, kicker, "Plex-Semi", 7, TEAL, 1.6)
            c.setFont("Archivo-Bold", 17); c.setFillColor(INK)
            hy = py - 24
            for ln in headline:
                c.drawString(px, hy, ln); hy -= 17
            c.setStrokeColor(INK); c.setLineWidth(1)
            c.line(px, hy + 5, x + cw - 22, hy + 5)

            sy = hy - 13
            for i, (t, b) in enumerate(steps, 1):
                c.setFont("Plex-Semi", 7); c.setFillColor(BRASS)
                c.drawString(px, sy, "0%d" % i)
                c.setFont("Archivo-Semi", 9.6); c.setFillColor(INK)
                c.drawString(px + 18, sy, t)
                sy = para(c, px + 18, sy - 11, b, "Archivo", 7.8, QUIET, cw - 62, 9.4) - 6

            ay = max(sy - 12, y + 104)
            c.setStrokeColor(RULE); c.setLineWidth(0.5)
            c.line(px, ay, x + cw - 22, ay)
            tracked(c, px, ay - 12, aside_label, "Plex-Semi", 6.2, TEAL, 1.1)
            para(c, px, ay - 24, aside_body, "Archivo", 7.6, QUIET, cw - 44, 9.4)

            c.setStrokeColor(RULE); c.setLineWidth(0.5)
            c.line(px, y + 42, x + cw - 22, y + 42)
            c.setFont("Archivo", 7.8); c.setFillColor(IRON)
            c.drawString(px, y + 31, foot)
            tracked(c, px, y + 17, "HERE SUPPLY CO.", "Archivo-Bold", 6.4, INK, 1.7)
            c.setFont("Plex", 5.8); c.setFillColor(QUIET)
            c.drawRightString(x + cw - 22, y + 17, "SHEET " + sheet_no)
    c.save()


def work_sheet(path, kicker, sheet_no, headline, standfirst, blocks, foot, doc_title):
    """
    A letter sheet with room to write.

    `blocks` is a list of (label, hint, kind, payload) laid out two to a row.
    kind is "lines" (payload = number of ruled lines), "labelled" (payload =
    list of row labels with a rule after each), or "prompts" (payload = list of
    (prompt, hint) each followed by two ruled lines).
    """
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle(doc_title)
    masthead(c, kicker, "SHEET " + sheet_no)

    y = H - M - 62
    c.setFont("Archivo-Bold", 27); c.setFillColor(INK)
    c.drawString(M, y, headline)
    y -= 20
    y = para(c, M, y, standfirst, "Archivo", 10.5, QUIET, W - 2 * M, 14) + 14

    colw = (W - 2 * M - 16) / 2
    y -= 26
    ROW = 268

    for i, (label, hint, kind, payload) in enumerate(blocks):
        col, row = i % 2, i // 2
        bx = M + col * (colw + 16)
        by = y - row * (ROW + 16)
        box(c, bx, by, colw, ROW, label)
        hint_end = para(c, bx + 11, by - 31, hint, "Archivo", 8.6, QUIET, colw - 22, 11)
        top = min(by - 56, hint_end - 8)

        if kind == "lines":
            rule_lines(c, bx + 11, top, colw - 22, payload, 21)
        elif kind == "labelled":
            ly = top
            step = min(33, (by - top + ROW - 66) / max(len(payload), 1))
            for row_label in payload:
                tracked(c, bx + 11, ly, row_label, "Plex", 6.2, INK, 1.0)
                c.setStrokeColor(RULE); c.setLineWidth(0.5)
                c.line(bx + 11, ly - 11, bx + colw - 11, ly - 11)
                ly -= step
        elif kind == "prompts":
            py = top - 2
            step = min(62, (ROW - 66) / max(len(payload), 1))
            for prompt, phint in payload:
                tracked(c, bx + 11, py, prompt, "Plex-Semi", 6.4, TEAL, 1.1)
                c.setFont("Archivo", 7.4); c.setFillColor(QUIET)
                c.drawString(bx + 11, py - 11, phint)
                c.setStrokeColor(RULE); c.setLineWidth(0.5)
                c.line(bx + 11, py - 25, bx + colw - 11, py - 25)
                if step > 44:
                    c.line(bx + 11, py - 41, bx + colw - 11, py - 41)
                py -= step

    footline(c, foot)
    c.save()
