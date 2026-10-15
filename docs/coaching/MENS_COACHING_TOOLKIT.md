# Men's Coaching Toolkit

Everything Chris needs to run the men's coaching program, in one place. The
public pages live under `/men`. Prices and the twelve weeks are set once in
`app/men/program.ts`. Drafted October 13, 2026.

## The pages

| Page | What it is | In search |
| --- | --- | --- |
| `/men` | The men's front door: who it is for, the four ways to work together | Yes |
| `/men/coaching` | The 90 Day Intensive week by week, ongoing coaching, the Weekly Table, fit and limits | Yes |
| `/men/course` | Sales page for All the Way Here, Men's Edition | Yes |
| `/men/apply` | Free call request | Yes |
| `/men/intake` | Intake for a new Intensive client, sent after he pays | No |
| `/men/check-in` | The Friday check in for every coaching client | No |
| `/access/men-r7k2v9` | The men's course itself, behind its own password | No |

Every form lands in the coaching inbox (same link as Thirty Days With Chris),
tagged "Men · Call request", "Men · Intake", or "Men · Check in". A scheduled
task, "Here Supply Co coaching inbox alert", checks it at 7:41 and 3:41 Eastern
on weekdays and messages Chris (phone and email) with each new form, the
answers that matter, and a suggested reply. It stays quiet when nothing came
in. The private inbox link is in that task and in the project copy of this
toolkit.

## What a buyer receives

1. The MailerLite receipt, "Your Here Supply Co. order is ready", with a Get
   started button that opens whatever they bought. It is shared by every
   product, so it never names a course or a password.
2. A minute later, the welcome from Chris for their course with its one tap
   link and password. Couples: automation "All the Way Here Welcome
   (password)". Men: the first email of "Men's Edition Buyer Track".
3. One short email a week after that, one lesson at a time.

## The men's course password

Password: `everyroom`. One tap link for the receipt email:
`https://heresupplyco.com/access/men-r7k2v9?key=everyroom`

It opens only the men's course and the men's course book. The shared sheets
open for buyers of either course. The couples password does not open the men's
course, and the men's password does not open the couples course. To change it,
see `lib/course-pass.ts`.

## Before the first client

- [x] Men's course product in MailerLite, checkout
      https://checkout.mailerlite.com/checkout/36730, buyers into "Here Supply
      Co. | Men's Edition Buyers". Wired into `MEN_CHECKOUT`.
- [ ] At launch, turn on the automation "Here Supply Co. | Men's Edition Buyer
      Track" in MailerLite. It is off on purpose until the men's pages are live.
- [ ] Create payment links for the Intensive ($2,500, or three payments of
      $900, and the $1,500 founding price), ongoing coaching ($500 a month),
      and the Weekly Table ($149 a month). Stripe payment links handle
      recurring billing.
- [ ] Have an attorney read the coaching agreement below once.
- [ ] Make a free Google Calendar booking page for the twenty minute call
      (Google Calendar, Create, Appointment schedule; a free Gmail account
      gets one booking page). Paste its link into `BOOKING_URL` in
      `app/men/program.ts`, or set `NEXT_PUBLIC_MEN_BOOKING_URL`. The apply
      page then offers "Pick a time for the call" right after a man sends
      the form. Free accounts do not send booking reminders.
- [ ] Build a short list of local therapists and couples counselors to refer to.
- [ ] Liability insurance for coaches, and decide which company the coaching runs under.

## The discovery call (20 minutes, free)

1. "What made you reach out?" Then listen. (5 min)
2. Where he is drifting and what it is costing him, at home, at work, in himself. (8 min)
3. "What do you want it to look like in ninety days?" (4 min)
4. If it fits, describe the Intensive in two sentences and the price. If it
   does not, say so and point him to the course or the Weekly Table. (3 min)

No countdown, no pressure. A man who is not ready gets the course and an open door.

## Call agendas

**Intake, 60 minutes, week one.** Read his intake form first.
1. His story in his words: work, home, health, the people who matter. (15)
2. Where he is drifting. Ask, do not diagnose. (15)
3. "If nothing changes in the next year, what does that cost you?" (10)
4. Three ninety day goals: home, work, himself. (15)
5. Walk through the Focus Protocol and set his start day. (5)

**Intensive weekly call, 45 minutes.** Read his Friday check in first.
1. Win and miss from last week. (5)
2. How the practice went, including where it fell apart. (10)
3. Coach the real situation he brings. (20)
4. Next week's lesson and practice. (5)
5. He says his one commitment out loud. (5)

**Ongoing call, 30 minutes.** What is live (5), the one thing that matters most (20), his commitment until next time (5).

**Weekly Table, 45 minutes.** Check in, one line each (5). Two hot seats (25). The practice of the week, home and work (10). Commitments typed in the chat (5).

Questions to keep close:
- What are you actually going to do about it?
- What did you say yes to that cost you something at home?
- Who got the best of you this week, and who got what was left?
- What would the man you want to be do here?

Listen more than you talk.

## When to refer out

Coaching is not counseling. Refer out, and say so plainly, when a man shows signs of:
- Depression, anxiety, or panic affecting daily life
- Any mention of suicide or self harm. Give him 988 (call or text) and stay with him until he is connected.
- Drinking, drugs, or another addiction driving the problems
- Abuse at home, by him or toward him
- A marriage that needs a couples counselor more than a coach

## Coaching agreement (draft for attorney review)

> **Coaching Agreement between Chris Avera (Here Supply Co.) and ____________**
>
> **What this is.** Coaching is a partnership focused on your goals for how you
> lead, work, and show up in your relationships going forward. It is not
> therapy, counseling, medical care, legal or financial advice, or crisis
> support. If something comes up that needs one of those, I will tell you and
> help you find the right person.
>
> **The program.** ____ (90 Day Intensive: twelve weekly 45 minute calls, a
> 60 minute intake, Friday check ins, and weekday messages answered within one
> business day / Ongoing coaching: two 30 minute calls a month, Friday check
> ins, weekday messages, a quarterly 60 minute planning call).
>
> **Fees.** ____ paid ____. Ongoing coaching starts with a six month agreement,
> then continues month to month with thirty days written notice to stop.
>
> **Scheduling.** Calls missed or moved with less than 24 hours notice are not
> made up. I will give you the same notice if I need to move one.
>
> **Confidentiality.** What you share stays between us. The exceptions: if you
> tell me you intend to seriously harm yourself or someone else, or about the
> abuse of a child or a vulnerable adult, or if the law requires disclosure. I
> never share your name or story publicly without your written permission.
>
> **Your responsibility.** You make your own decisions and own the results.
> Coaching works when you do the work between calls.
>
> **Ending early.** Either of us can end coaching with written notice. ____
> (refund terms).
>
> Signed ____________ Date ______ · Chris Avera ____________ Date ______

## Emails

**After the discovery call, if it fits** (subject: Next steps)
> Good talking with you today. Here is what we talked about: [one line on what
> is costing him]. The 90 Day Intensive is twelve weekly calls, one lesson and
> one practice a week, starting with a sixty minute intake. Attached is the
> agreement. When you are ready, the payment link is here: [link]. Once that
> is in, fill out the intake (heresupplyco.com/men/intake) at least a day
> before our first call, and I will send times.

**Welcome, after payment** (subject: You're in)
> Three things before our first call. Fill out the intake:
> heresupplyco.com/men/intake. Open the course with this link and bookmark it:
> [course key link]. Print the course book while you are there. See you on
> [day] at [time].

**Every Friday, to every coaching client** (subject: Friday check in)
> Three questions, five minutes: heresupplyco.com/men/check-in. Did you do the
> practice, who got the best of you this week, and what do you want to bring
> to our next call.

**Week twelve** (subject: What comes next)
> We are at the end of the twelve weeks. Bring your two practices to our last
> call. If you want to keep going, ongoing coaching is two calls a month for
> $500, and the Weekly Table is $149 a month. No pressure either way. Also, if
> someone you know should be doing this, I would be glad to talk with him.
