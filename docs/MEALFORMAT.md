# MEALFORMAT — camp kitchen intake

> **Colin: answer inline and paste the whole thing back.** Most of it is me
> stating what I already inferred from your two 2026 trip files so you can
> correct rather than compose. `✔` means "that's right, move on" — you do not
> have to justify anything you agree with.
>
> The original `MEALS-*.md` files are gone, so this replaces them. Section 1
> is the part I genuinely cannot guess and everything downstream depends on;
> the rest degrades gracefully if you run out of patience.

---

## 1. The things I have no evidence for at all

**These are blocking. Nothing else in this file matters if section 1 is wrong.**

1. **Allergies or intolerances?** Nothing anywhere in the repo mentions any.
   I have been writing recipes with dairy, gluten, shellfish, eggs and nuts,
   often in the same meal. If any of that is wrong, say so now.

2. **What food do you actively dislike?** There is a `DECLINED` list for
   activities and nothing equivalent for food. Right now nothing stops a
   future session putting mushrooms or olives in your dinner. Give me the
   list — even three items is enough to be worth enforcing.

3. **Spice tolerance, 1–5?** Chorizo, salsa, taco seasoning and hot sauce all
   appear. I don't know if that's your ceiling or your floor.

4. **Do you actually eat the calorie loads on the page?** The October plan
   runs 700–1,250 kcal per meal, ~2,800–3,000 a day. Is that measured,
   aspirational, or somebody's formula? If you routinely leave a third of
   dinner, every portion in the library is wrong.

---

## 2. Assumptions to confirm or correct

Mark each `✔`, or correct it.

| # | What I think is true | Where I got it |
|---|---|---|
| 1 | You'd rather eat well once than adequately three times — one deliberately good dinner per trip, rest are fuel | ribeye night, shrimp night, kielbasa night are each flagged ⭐ |
| 2 | Cleanup is the thing you actually hate, more than cooking time | 45-min ribeye is fine; MED-cleanup quesadillas get flagged as a problem |
| 3 | Breakfast is either 6 minutes or 30, nothing between | oats vs. the sausage hash — no middle case exists in either trip |
| 4 | Lunch is almost never cooked | 9 of 11 October lunches are assembled or packed |
| 5 | You will eat the same breakfast five times without complaint | oats+ appears 5× across two trips |
| 6 | You will *not* eat the same dinner twice on one trip | no dinner repeats anywhere |
| 7 | Vegetables are structural, not a goal — peppers, onion, spinach, green beans, always cooked, never a salad | no raw vegetable appears in either trip |
| 8 | "Fresh dessert" means bought, in town, not made at camp | The Brick ice cream; no camp dessert exists |
| 9 | You'd rather carry a hot thermos than cook at the destination | oats on the ridge, couscous at the overlook |
| 10 | A restaurant is for one named dish you decided in advance, and you'd skip a mediocre one entirely | "Order the gourmet hot dogs", "Order strawberry cheesecake" |

---

## 3. Fill in

**A. Three dinners you'd genuinely look forward to at a picnic table.**
Not camp-specific — I'll work out how to make them on one burner. Naming a
restaurant dish is a valid answer.

1.
2.
3.

**B. What's your actual grocery spend per trip?** Kentucky's budget says
`TBD` and October has no food line at all. A rough number is fine — it's
mostly to catch a plan that's quietly twice what you'd spend.

**C. On a fly-in trip with no cooler, what do you want to eat?**
Maui has 18 meal slots that just say "made" or "bought". Most of this library
needs a car. Options as I see them: (i) buy a cheap foam cooler on arrival and
run a compressed version, (ii) go Zone-3-only — pouches, cured meat, tortillas,
starch, (iii) eat out more and stop pretending. Which?

**D. Dessert at camp — worth it or not?** There is currently exactly one
sweet thing in the library (hot chocolate). If you want camp dessert, say
what kind; if the answer is "no, dessert is a town thing", I'll stop
considering it.

**E. The thermos question.** A second wide-mouth thermos is on the gear list
as an open item. It's the difference between hot oats *and* hot chocolate on a
pre-dawn start, versus choosing. Buying it or not?

**F. Anything from the lost `MEALS-*.md` files you remember mattering** that
hasn't shown up here. Even a fragment.

---

## 4. If you want to do research (optional, genuinely useful)

Only if you're up for it. In rough order of payoff:

1. **Weigh a portion once.** Cook one of the pasta dinners at home, weigh the
   dry pasta you actually finish. Every portion in the library is currently
   inferred from someone's calorie math, and one real measurement fixes all
   of them.

2. **The 48qt cooler's real ice window.** Load it as you would on day one,
   leave it in the car in the sun, note when the frozen bags give up. The
   plans assume ~2.5 days at 75°F and *that number decides resupply timing on
   every trip.* Kentucky in three weeks is a free test — just write down what
   happens.

3. **Local dishes for the 2027 trips.** Sky Islands, Mojave, Northern Rockies.
   You know the "named dish" standard better than a search does. Sonoran hot
   dogs, green chile, Basque family-style in Nevada are the obvious leads —
   worth confirming which you'd actually detour for.

4. **Fuel canister availability** at the fly-in destinations. Can't fly with
   them; the trip fails quietly if the one outfitter is closed Sundays.

---

## What I do with this

Fill `data/meals.js`: new recipes for anything named, corrected portions,
a `DISLIKES` list the validator enforces the way it already enforces
`DECLINED`, and the 138 empty meal slots across six trips get filled from the
library instead of invented. Section 1 alone unblocks most of that.
