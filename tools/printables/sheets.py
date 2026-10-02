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
        "Once it is on paper, your head can let go of it.",
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
            ("THEN THE MAINTENANCE", "The upkeep you choose, after the one thing is done.", "lines", 6),
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
            ("Return calm", "Open with what is true and useful. Skip the defense and the list of their faults."),
            ("Repair", "If you were sharp, name it without an excuse and ask what would help."),
        ],
        "AGREE ON THIS BEFORE YOU NEED IT",
        "A break called mid argument sounds like walking out. A break you both agreed on last Tuesday sounds like the plan working.",
        "Take the pause, then come back when you said you would.",
        "06", "Pause, Return, Repair",
    )

    card_page(
        j("date-night-card.pdf"),
        "The Date Night Card", "CHOOSE · PROTECT · NOTICE",
        ["Two ideas each.", "Pick one."],
        [
            ("Choose together", "Two ideas each, pick one that is possible rather than impressive."),
            ("Protect it", "Phones in the glovebox before you sit down. Face down on the table does not count."),
            ("Do something", "Side by side beats across a table. New beats familiar. Cheap is fine."),
            ("Notice", "Ask what was interesting. Skip whether it worked."),
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
            ("Name it", "Trail, water, workshop, gym, church, a table. Pick what gives you something back, even if it does not sound healthy."),
            ("Smallest version", "Thirty minutes that repeats beats a day you keep postponing."),
            ("Both of you", "Put both on the calendar in one conversation. Count childcare honestly."),
            ("Check it", "Do you come back more available, or just number? Answer that one honestly."),
        ],
        "THE TEST",
        "A third place should never become an escape hatch from family work. If it only ever runs one direction, someone else is picking up the tab.",
        "You are allowed to be a person outside of who needs you.",
        "09", "The Third Place",
    )

    card_page(
        j("friendship-script.pdf"),
        "The Friendship Script", "INVITE FIRST",
        ["Specific beats", "we should hang out."],
        [
            ("Pick one person", "Someone you already like being around. You are not choosing a best friend."),
            ("Be specific", "I am riding Saturday at eight, want to come? Skip the we should do something sometime."),
            ("Ask again", "Schedules are real. One no is a calendar. Three is an answer, and that is fine."),
            ("Go deeper later", "Start shoulder to shoulder. Ask a real question once there is something to hold it."),
        ],
        "WHY THIS MATTERS AT HOME",
        "A relationship asked to be the only close one either of you has will buckle under a job nobody gave it. Protect each other's friendships like your own.",
        "Invite first. The worst answer is a no you survive.",
        "10", "The Friendship Script",
    )

    work_sheet(
        j("thirty-day-page.pdf"),
        "THE THIRTY DAY PAGE  ·  CHOOSE TWO PRACTICES",
        "11",
        "Keep the two that helped.",
        "You do not have to keep everything you tried. Choose two between you, give each a situation and a response, and leave the rest alone.",
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
            ("THIRTY DAYS FROM NOW", "What happened. Nobody is grading either of you.", "lines", 6),
        ],
        "Two practices you keep beat nine you admired.",
        "The Thirty Day Page",
    )
    # The three family tools, built as one page each and joined into
    # family-tools.pdf by build.py.
    work_sheet(
        j("family-screen-reset.pdf"),
        "FAMILY TOOL 01  ·  THE FAMILY SCREEN RESET  ·  THREE DAYS",
        "F1",
        "Get one moment back together.",
        "Pick one moment that repeats, like dinner, the ride to school, or bedtime. The adults go first, the kids help choose the rules, and you try it for three days. It is an experiment, so nobody gets punished.",
        [
            ("THE MOMENT WE WANT BACK", "Dinner, the ride to school, bedtime, a game, Saturday morning, or another moment that repeats.", "lines", 7),
            ("WHAT IS PULLING US AWAY NOW", "Name the pattern without blaming one person.", "lines", 7),
            ("OUR THREE DAY EXPERIMENT", "Where will devices live? When does it start and end? What exceptions do we need?", "lines", 7),
            ("WHO DOES WHAT", "The adults model it first. The kids help choose.", "labelled",
             ["ADULTS WILL", "KIDS HELP CHOOSE", "START DATE", "HOW WE WILL CHECK IN"]),
        ],
        "Kids copy what they see more than what they hear.",
        "The Family Screen Reset",
    )

    work_sheet(
        j("weekly-tradition-builder.pdf"),
        "FAMILY TOOL 02  ·  THE WEEKLY TRADITION BUILDER",
        "F2",
        "One small thing worth coming back to.",
        "A tradition gets its meaning from repeating. It can be small and cheap. What matters is that it still happens on a hard week.",
        [
            ("WHAT IT PROTECTS", "Connection, play, faith, rest, food, movement, service, making things, or something else.", "lines", 7),
            ("THE SMALLEST VERSION", "The activity, day, time, and place, plus the version that still works on a hard week.", "lines", 7),
            ("EVERYONE GETS A SAY", "What will the adults organize? What can the kids or anyone else choose?", "lines", 7),
            ("THE PLAN", "Write it down so it survives the week.", "labelled",
             ["WHERE THE PHONES GO", "FIRST DATE", "TRY IT FOR", "WHO REMINDS US"]),
        ],
        "Small and repeated beats big and once.",
        "The Weekly Tradition Builder",
    )

    work_sheet(
        j("side-by-side-teen-check-in.pdf"),
        "FAMILY TOOL 03  ·  THE SIDE BY SIDE TEEN CHECK IN",
        "F3",
        "Talk side by side.",
        "Make room for a real conversation without cornering them, interrogating them, or turning the first answer into a lecture. The adult puts the phone away first.",
        [
            ("BEGIN BESIDE THEM", "Drive, walk, make food, fix something, or sit somewhere neutral.", "lines", 6),
            ("ONE EASY INVITATION", "Want to ride with me? Want to get something to eat? Can you help me with this?", "lines", 6),
            ("FOUR QUESTIONS WORTH KEEPING", "Ask one. Let the silence sit.", "prompts",
             [("WHAT IS TAKING UP YOUR HEADSPACE?", "Listen more than you answer."),
              ("WHAT ARE ADULTS MISSING?", "About your world, right now."),
              ("LISTEN, THINK, OR ACT?", "Do you want me to listen, help you think, or help?"),
              ("WHAT WOULD HELP THIS WEEK?", "One thing that would make it easier.")]),
            ("WHAT WE AGREED ON", "Write only what you both agreed to. Do not add a hidden assignment afterward.", "labelled",
             ["THE NEXT STEP", "CHECK BACK ON", "WHAT THE ADULT WILL DO"]),
        ],
        "The car is the best room in the house for this.",
        "The Side by Side Teen Check In",
    )
    return 11
