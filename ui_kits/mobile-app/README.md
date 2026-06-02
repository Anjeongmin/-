# Mobile App UI Kit — 토마토 (Tomato)

An interactive recreation of the **Tomato** mobile app: a call-emotion coaching app for call-center agents and people with call anxiety. This is the flagship surface and the basis for the brand.

## Run
Open `index.html`. The app renders inside a 393×852 device frame.

## Flow
- **Home** — greeting, mascot avatar, red "오늘의 요약" summary card (today's calls / duration), recent-call list. Tap any call row → **Report**.
- **Mic FAB** (center of bottom nav) → **AI 분석 중** loading screen. Steps complete sequentially with an overall progress bar and a pulsing tomato mascot; at 100% the "결과 확인하기" button activates → **Report**.
- **Report (분석 결과)** — segmented tabs `종합 · 감정 · 표현 · 흐름`. The **감정** tab is fully built: call-emotion line chart (상담원 solid / 고객 dashed over a red area fill), emotion-distribution bars, positive/negative highlight cards, and a "맞춤형 연습 제안" CTA. **종합** shows a score summary; **표현/흐름** are summarized placeholders.
- **Bottom nav** — 홈 · 감정 기록 · (mic FAB) · 자막 · 돌아보기. Non-home tabs show friendly empty states with the mascot.

## Files
| File | Role |
|---|---|
| `index.html` | Device frame, status bar chrome, script load order. |
| `icons.jsx` | `Icon` (Lucide wrapper), `StatusBar`, `Header`, `Mascot`. |
| `Home.jsx` | Home screen — summary card, stat cells, call rows. |
| `Analyzing.jsx` | AI-analysis loading screen with animated steps + progress. |
| `Report.jsx` | Analysis result — chart, distribution, highlights, CTA, tabs. |
| `app.jsx` | Shell: screen state, bottom nav, mic-FAB flow. |

## Notes
- Icons are **Lucide via CDN** (documented substitution). The mascot uses `assets/character.png` (happy) / `assets/illustration.png` (worried).
- Components share scope via `window` (see each file's `window.X = …` / `Object.assign(window, …)`).
- Brand red `#FF3639`, white surfaces, 4–24px radii, soft neutral shadows — all from `colors_and_type.css`.
