# Form Component Kit — 토마토 (Tomato)

The grayscale **web form-component library** from the source file, shown in a realistic admin context: a **통화 기록 관리 (Call-record management)** screen for the Tomato back-office.

## Run
Open `index.html`.

## What it demonstrates
A typical admin view that exercises every form-kit component:
- **Top bar** with logo lockup + tab nav.
- **Filter bar** — two **dropdowns** (custom popover), a **text input** with leading search icon, primary **검색** button, and a **초기화** outline button.
- **Data table** — header + row **checkboxes** (with select-all), **tags** (type / status, line · gray · mint · red tones), inline **score bars**, and per-row **small buttons** (line-black / line-red).
- **Pagination** — numbered, with active page in tomato red.
- **새 기록 등록** opens a right **drawer form**: text inputs, a date input, a **radio group** (통화 유형), a dropdown, and a **checkbox** consent line, with 취소 / 저장하기 actions.
- **Save** fires the **green success toast** (`저장 처리 되었습니다.`).

## Files
| File | Role |
|---|---|
| `index.html` | Page shell + script load order. |
| `admin.jsx` | Primitives: `Btn`, `Field`, `Dropdown`, `Tag`, `Radio`, `Checkbox`, `Pagination`, `Icon` + sample data (exported on `window.TomatoAdminParts`). |
| `admin-app.jsx` | Layout & interactions: top bar, filter bar, table, drawer form, toast. |

## Notes
- Form kit uses **Noto Sans KR 15px**, near-black `#333` fill buttons, gray field borders (`#EBEBEB`) on `#FCFCFC` fields, **4px** radius — the legacy foundation captured from the source components (`btn/*`, `input/*`, `dropdown/*`, `tag/*`, `radiobox/*`, `checkbox/*`, `pagination/*`, `toast/*`).
- Icons are **Lucide via CDN**.
