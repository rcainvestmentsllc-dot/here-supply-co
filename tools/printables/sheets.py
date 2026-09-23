"""Sheets 04 to 11. Content only. The look lives in renderers.py."""
import os
from renderers import card_page, work_sheet


def build(out):
    j = lambda n: os.path.join(out, n)

    work_sheet(
        j("brain-dump.pdf"),
        "THE BRAIN DUMP  ·  FIFTEEN MINUTES, ONCE A WEEK  ·  PEN ON PAPER",
        "04",
        "Put it somewhere other than your head.",
        "Do not organize while you write. Empty it first. When the list slows down, wait a minute and ask what you are still trying not to forget.",
        [
            ("WORK", "Anything unfinished, promised, or avoided.", "lines", 9),
            ("HOME", "Repairs, errands, the thing on the counter.", "lines", 9),
            ("MONEY AND ADMIN", "Bills, forms, renewals, the call you keep not making.", "lines", 9),
            ("ME", "Health, friendships, the thing you used to do.", "lines", 9),
        ],
        "Your brain is a processor, not a storage unit. Give it somewhere to put things down.",
        "The Brain Dump",
    )

    work_sheet(
        j("tomorrow-matters-if.pdf"),
        "TOMORROW MATTERS IF  ·  WRITTEN THE NIGHT BEFORE",
        "05",
        "Decide it before the day decides for you.",
        "One target, chosen while today is still fresh. Maintenance is real work and it comes second, on purpose rather than by default.",
        [
            ("THE ONE THING", "Concrete enough that you will know when it is done.", "lines", 4),
            ("THE BLOCK", "Twenty five, fifty, or ninety minutes. A real one beats a perfect one.", "labelled",
             ["WHEN IT STARTS", "HOW LONG", "WHERE", "WHAT IS OFF"]),
            ("THEN THE FARMING", "Maintenance you choose, after the hunt, not instead of it.", "lines", 6),
            ("WHAT I WILL NOT DO TOMORROW", "A day has edges or it has none.", "lines", 6),
        ],
        "One protected hour beats a perfect morning you never get.",
        "Tomorrow Matters If",
    )

    card_page(
        j("pause-return-repair.pdf"),
        "Pause, Return, Repair", "PAUSE · RETURN · REPAIR",
        ["Before pressure", "picks your answer."],
        [
            ("Pause", "One slow breath. If you can answer respectfully, answer. If not, say you need a minute."),
            ("Name the time", "A pause is only a pause if you say when you are coming back. Ten minutes counts."),
            ("Return calm", "Open with what is true and useful. Not a defence and not a list of their faults."),
            ("Repair", "If you were sharp, name it without an excuse and ask what would help."),
        ],
        "AGREE ON THIS BEFORE YOU NEED IT",
        "A break called mid argument sounds like walking out. A break you both agreed on last Tuesday sounds like the plan working.",
        "A pause is not distance. It is the shortest route back.",
        "06", "Pause, Return, Repair",
    )

    card_page(
        j("date-night-card.pdf"),
        "The Date Night Card", "CHOOSE · PROTECT · NOTICE",
        ["Two ideas each.", "Pick one."],
        [
            ("Choose together", "Two ideas each, pick one that is possible rather than impressive."),
            ("Protect it", "Phones in the glovebox before you sit down, not face down on the table."),
            ("Do something", "Side by side beats across a table. New beats familiar. Cheap is fine."),
            ("Notice", "Ask what was interesting, not whether it worked."),
        ],
        "IF IT FALLS APART",
        "Book the next one before you get home. A rhythm survives a bad night. Waiting for the right week does not.",
        "Curiosity is the part that wore off. It comes back with use.",
        "07", "The Date Night Card",
    )

    card_page(
        j("floor-time.pdf"),
        "Floor Time", "EYES FIRST, THEN FOLLOW",
        ["Fifteen minutes.", "They lead."],
        [
            ("Eyes first", "Put the phone down and answer the bid. If you cannot yet, say when, then keep it."),
            ("Get level", "Floor, passenger seat, side of the bed. Whatever works for both bodies."),
            ("Let them pick", "Do not improve the game, teach the lesson, or steer it somewhere useful."),
            ("End clean", "A warning before time is up. Say what you enjoyed and when you are back."),
        ],
        "IF THERE ARE NO KIDS IN THE HOUSE",
        "Point it at each other. A partner bids for attention too, just once and quietly. Let them pick the subject and do not turn it into logistics.",
        "Eye level is the whole technique. The rest is staying there.",
        "08", "Floor Time",
    )

    card_page(
        j("third-place.pdf"),
        "The Third Place", "NOT WORK · NOT HOME",
        ["A place where you", "are just a person."],
        [
            ("Name it", "Trail, water, workshop, gym, church, a table. What returns you, not what sounds healthy."),
            ("Smallest version", "Thirty minutes that repeats beats a day you keep postponing."),
            ("Both of you", "Put both on the calendar in one conversation. Count childcare honestly."),
            ("Check it", "Do you come back more available, or just number? Answer that one honestly."),
        ],
        "THE TEST",
        "A third place is not an escape hatch from family work. If it only ever runs one direction, it is not a third place, it is a tab someone else is picking up.",
        "You are allowed to be a person outside of who needs you.",
        "09", "The Third Place",
    )

    card_page(
        j("friendship-script.pdf"),
        "The Friendship Script", "INVITE FIRST",
        ["Specific beats", "we should hang out."],
        [
            ("Pick one person", "Someone you already like being around. You are not choosing a best friend."),
            ("Be specific", "I am riding Saturday at eight, want to come. Not we should do something sometime."),
            ("Ask again", "Schedules are real. One no is a calendar. Three is an answer, and that is fine."),
            ("Go deeper later", "Start shoulder to shoulder. Ask a real question once there is something to hold it."),
        ],
        "WHY THIS MATTERS AT HOME",
        "A marriage asked to be the only close relationship either of you has will buckle under a job nobody gave it. Protect each other's friendships like your own.",
        "Invite first. The worst answer is a no you survive.",
        "10", "The Friendship Script",
    )

    work_sheet(
        j("thirty-day-page.pdf"),
        "THE THIRTY DAY PAGE  ·  TWO PRACTICES, NOT NINE",
        "11",
        "Keep the two that actually helped.",
        "Do not keep nine practices because you paid for nine lessons. Choose two between you, give each a situation and a response, and leave the rest alone.",
        [
            ("PRACTICE ONE", "When ____ happens, we will ____.", "prompts",
             [("THE PRACTICE", "Which sheet, and who is doing it."),
              ("THE CUE", "The moment that sets it off."),
              ("THE SMALLEST VERSION", "What it looks like on a bad week.")]),
            ("PRACTICE TWO", "Same shape. Two is the limit, on purpose.", "prompts",
             [("THE PRACTICE", "Which sheet, and who is doing it."),
              ("THE CUE", "The moment that sets it off."),
              ("THE SMALLEST VERSION", "What it looks like on a bad week.")]),
            ("WHAT WE ARE LETTING GO", "The ones that did not fit this season. Write them down so they stop nagging.", "lines", 6),
            ("THIRTY DAYS FROM NOW", "What happened. Not whether either of you was good.", "lines", 6),
        ],
        "Two practices you keep beat nine you admired.",
        "The Thirty Day Page",
    )
    return 8
