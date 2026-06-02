# 토마토 (Tomato) — 통화 감정 코칭 디자인 시스템

> A design system for **Tomato**, a mobile app that records phone calls, runs **AI emotion + expression analysis**, and coaches users (call-center agents and people with call anxiety / 콜포비아) toward warmer, calmer, more confident conversations.

The brand is anchored by a cheerful **3D tomato mascot wearing a call-center headset** — the source of the system's signature tomato-red. The mascot appears in two emotional states (happy / worried), mirroring the app's core job of reading and improving emotional tone.

---

## Sources

This system was reconstructed from a single Figma working file:

- **`uxui-안정민 개인.fig`** — a personal UX/UI project file by **안정민 (2022082010)**. It contains many iterations: the polished red mobile app, onboarding/permission flows, an AI-analysis loading flow, wireframes, and a separate grayscale **web form-component kit** (buttons, inputs, dropdowns, calendar, pagination, tags, menu, toast).

The flagship surface — and the basis for this system's brand — is the **"분석 결과 / AI 종합 리포트"** (Analysis Result) mobile screen and its call-emotion-coaching siblings.

> Note: the reader is not assumed to have access to the source `.fig`. Everything needed is captured here.

---

## What's in this system

| File / folder | What it holds |
|---|---|
| `colors_and_type.css` | All design tokens — colors, type families/scale, spacing, radii, shadows — as CSS custom properties. |
| `assets/` | Brand mascot images (happy + worried tomato). |
| `preview/` | Design-system spec cards (rendered in the Design System tab). |
| `ui_kits/mobile-app/` | Interactive recreation of the Tomato mobile app (home, recording, AI analysis, emotion report). |
| `ui_kits/form-kit/` | The grayscale web form-component kit (buttons, fields, controls, tags, toast, pagination). |
| `SKILL.md` | Agent-skill manifest so this system can be used inside Claude Code. |

---

## CONTENT FUNDAMENTALS

**Language.** Korean-first. UI labels and body copy are Korean; English appears only as parenthetical glosses for emotion labels (`친절함 (Friendly)`, `차분함 (Calm)`) and in section/feature names that read well in English (`AI`, `VIEW ALL`).

**Voice.** Warm, encouraging, coach-like — never clinical or scolding. The app is talking to someone who may be nervous on the phone, so copy reassures and nudges.

- Reassuring prompts: *"잠시만 기다려 주세요"* (please wait a moment), *"방금 통화 녹음을 들어보시겠어요?"* (would you like to hear your call recording?).
- Coaching feedback is specific and gentle, framed as observation → suggestion: *"규정 안내 시 고객의 목소리 톤이 높아지며 불만이 감지되었습니다. 이 시점에서 공감 표현이 더 필요했습니다."*
- Positive reinforcement is celebrated: *"대안 제시 이후 고객의 호흡이 안정되고 어조가 부드러워졌습니다."*

**Casing.** Korean has no case. English accents use **UPPERCASE for micro-labels** (`WELCOME BACK`, `ACTIVE`, `VIEW ALL`, `TOTAL CALLS`) and Title Case for feature names. Numbers/percentages are bold and prominent (`70%`, `4.2h`, `12`).

**Tone words to favor:** 감정(emotion), 흐름(flow), 표현(expression), 연습(practice), 공감(empathy), 안정(calm), 리포트(report).

**Emoji.** Used sparingly as playful accents in headings only (e.g. ✨ before "감정 변화 하이라이트"). Never inside body copy or buttons. The mascot carries most of the personality, so emoji stay minimal.

**Honorifics.** Polite formal endings (`-습니다 / -세요`). Respectful, professional — appropriate for a coaching/work context.

---

## VISUAL FOUNDATIONS

**Overall feel.** Clean, bright, friendly clinical-lite. Lots of white space, a single hot accent (tomato red), neutral grays for structure, and soft rounded cards. Think "wellness app meets analytics dashboard."

**Color.** One dominant accent — **tomato red `#FF3639`** — used for active states, primary actions, data emphasis, and the brand mascot. Everything else is a **Tailwind-style neutral gray ramp** (`#111827` → `#F9FAFB`) on white. Red has a soft tint family (`#FFB4B4`, `#FFE3E3`, `#FFF1F1`) for fills and chart areas. Secondary semantics: **mint green `#5DBFA8`** for success/toast, **blue `#4D90F8`** for info. Use color *meaningfully* — a screen is mostly black-on-white with red reserved for what matters.

**Type.** Dual-family:
- **Inter** — numbers, English, big headings, nav labels. Weights 500–800. Tight tracking on display sizes.
- **Pretendard** (Korean; **Noto Sans KR** as the legacy form-kit face) — Korean UI and body, weights 400–700.
- Scale: 28 / 20 / 18 / 16 / 15 / 14 / 12 / 10. The form-kit standardizes on **15px Noto Sans KR**.

**Backgrounds.** Predominantly flat **white** (`#FFFFFF`) with `#F9FAFB` / `#FAFAFA` surfaces to separate cards. No gradients, no photographic backdrops, no textures. Depth comes from soft shadows and tint fills, not from color washes.

**Cards & surfaces.** Rounded rectangles are everywhere. Radii ladder: **4px** (buttons/inputs/tags — the workhorse), **12px** (highlight blocks), **16px** (feature cards), **20–24px** (hero/large surfaces), **full** (pills, FAB, avatars). Highlight cards use a faint `#FAFAFA` fill with a subtle colored border; feature/CTA cards use solid tomato-red fill with white text.

**Borders.** Hairline `1px` in `#E5E7EB` (structure) or `#EBEBEB` (form fields). Emphasis borders use red (`1px #FF6363`, or `1.5–3px #FF3639` for active selection rings). Dashed red (`2px dashed #FF3639`) marks editable/placeholder zones.

**Shadows / elevation.** Two levels only:
- **Toast / subtle:** `0 2px 4px rgba(0,0,0,.10)`.
- **Card / popover:** `0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -4px rgba(0,0,0,.10)`.
Shadows are soft, low-opacity, neutral — never colored.

**Data viz.** Line charts use a solid red stroke + dotted red stroke for two series, over a faint red area fill. Distribution bars are rounded-full tracks (`#F3F4F6`) with solid red fills. Percentages sit right-aligned and bold.

**Buttons.** 4px radius. Primary = solid fill (tomato red in-app, or near-black `#333` in the form kit) with white text; secondary = white with a 1px outline (black, white, or red). Heights: **48px** (regular), **34px** (small). Center-aligned labels, optional leading icon with ~10px gap.

**Iconography style.** Simple, minimal line/fill icons at 20–24px (see ICONOGRAPHY).

**Animation.** Restrained and functional. Expect short fades and progress-bar fills (the AI-analysis screen animates step completion and an overall % bar). A pulsing mascot/brain during processing. Easing: gentle ease-out; no bounce, no flashy motion. Respect reduced-motion.

**Hover / press.** (Web form kit) hover = subtle border/ής fill shift; press = slightly darker fill. (Mobile) tap = light opacity dim or a soft tint background. Active nav item flips from gray `#9CA3AF` to tomato red with a filled icon.

**Layout.** Mobile frames are **375–393px** wide. Generous 24px side gutters. Sticky header (back · centered title · action) at top; sticky bottom tab bar with a **center mic FAB** that floats above the bar. Content scrolls between. Vertical rhythm in multiples of 4/8.

**Transparency / blur.** Minimal. Occasional translucent white scrims over the mascot; otherwise solid surfaces.

---

## ICONOGRAPHY

The source file draws icons as small filled/line vectors (back chevron, share, mic, home, list, captions bubble, refresh, play, brain, bell, phone, video, gear, search). They are a **standard minimal mobile icon set** — 20–24px, ~1.75px effective stroke, mixing line and solid-fill variants, square-ish corners.

- **In this system we use [Lucide](https://lucide.dev) via CDN** as the icon set — it matches the source's clean, minimal, slightly-rounded line style almost 1:1 (`chevron-left`, `share-2`, `mic`, `home`, `list`, `captions`, `rotate-ccw`, `play`, `brain`, `bell`, `phone`, `gear`). **This is a documented substitution** for the per-frame reconstructed vectors. *If you have the original SVG exports, drop them in `assets/icons/` and swap the `<i data-lucide>` usages.*
- **Active-state icons** are shown filled in tomato red; inactive icons are `#9CA3AF` line.
- **Emoji** appear only as occasional heading accents (✨). Not used as functional icons.
- **The tomato mascot** (`assets/character.png` happy, `assets/illustration.png` worried) is the hero illustration — use it for empty states, onboarding, splash, and emotional feedback. **Never redraw it**; use the provided PNGs.

---

## Index / manifest

- **Tokens:** `colors_and_type.css`
- **Brand assets:** `assets/character.png`, `assets/illustration.png`
- **Spec cards:** `preview/*.html`
- **UI kits:**
  - `ui_kits/mobile-app/` — the Tomato app (flagship)
  - `ui_kits/form-kit/` — grayscale web form components
- **Agent skill:** `SKILL.md`

---

## Caveats & substitutions

- **Fonts** (Inter, Pretendard, Noto Sans KR) are loaded from CDN, not bundled. Inter & Noto Sans KR via Google Fonts; Pretendard via jsDelivr. Swap for self-hosted files in production.
- **Icons** use **Lucide (CDN)** as a documented stand-in for the file's hand-reconstructed vectors.
- **Product name** "토마토 (Tomato)" is inferred from the mascot and the opening frame; the file has no formal logotype. Rename freely.
- The file mixes fidelities (polished red app vs. grayscale wireframes vs. a separate form kit). This system standardizes on the **polished red mobile direction** as the brand, and preserves the **form kit** as a documented secondary surface.
