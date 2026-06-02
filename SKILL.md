---
name: tomato-design
description: Use this skill to generate well-branded interfaces and assets for 토마토 (Tomato) — a call-emotion coaching mobile app (and its admin back-office), either for production or throwaway prototypes/mocks. Contains design guidelines, color & type tokens, the tomato mascot, and ready-to-use UI kit components.
user-invocable: true
---

# 토마토 (Tomato) Design System

Read `README.md` first — it covers brand context, content/voice, visual foundations, and iconography. Then explore:

- **`colors_and_type.css`** — all tokens (colors, type families/scale, spacing, radii, shadows) as CSS custom properties. Import it and use the variables; do not hard-code hexes.
- **`assets/`** — the tomato mascot (`character.png` happy, `illustration.png` worried). Use for empty states, onboarding, splash, emotional feedback. Never redraw it.
- **`preview/`** — spec cards for every token group and component.
- **`ui_kits/mobile-app/`** — interactive recreation of the Tomato app (home, AI analysis, emotion report). Copy components/patterns from here for app work.
- **`ui_kits/form-kit/`** — grayscale web form components (buttons, fields, dropdown, table, tags, radio/checkbox, pagination, toast) in an admin context.

## How to use
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the mascot + any needed assets out, link `colors_and_type.css`, and produce standalone HTML for the user to view.
- **Production code**: copy assets and treat the rules here as the source of truth to design on-brand.

## Non-negotiables
- Brand red is **`#FF3639`** — one hot accent on white, neutrals everywhere else. Use red meaningfully.
- Type: **Inter** for numbers/EN/headings, **Pretendard / Noto Sans KR** for Korean.
- Radii ladder 4 → 12 → 16 → 20 → 24 → full; two soft neutral shadow levels.
- Korean-first, warm coach-like voice; polite formal endings; emoji only as rare heading accents.
- Icons: **Lucide** (documented substitute for the file's reconstructed vectors).

If invoked without guidance, ask what to build, ask a few focused questions, then act as an expert designer outputting HTML artifacts or production code.
