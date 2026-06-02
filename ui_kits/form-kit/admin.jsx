// admin.jsx — 토마토 관리자: 통화 기록 관리 (form-component kit in context)
const { useState, useEffect, useRef } = React;

/* ---------- Lucide icon (imperative, React-safe) ---------- */
function Icon({ name, size = 18, color = "currentColor", stroke = 2 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && window.lucide) {
      el.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      el.appendChild(i);
      window.lucide.createIcons({ nameAttr: "data-lucide", attrs: { width: size, height: size, "stroke-width": stroke, stroke: color, color } });
    }
  });
  return <span ref={ref} style={{ display: "inline-flex", width: size, height: size, color }} />;
}

/* ---------- Primitives ---------- */
function Btn({ variant = "fill-black", size = "reg", children, onClick, icon }) {
  const base = { borderRadius: 4, border: "none", cursor: "pointer", fontWeight: 500, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, whiteSpace: "nowrap" };
  const sizes = { reg: { height: 48, padding: "0 22px", fontSize: 15 }, sm: { height: 34, padding: "0 14px", fontSize: 14 } };
  const variants = {
    "fill-black": { background: "#333333", color: "#fff" },
    "fill-red": { background: "var(--tomato-500)", color: "#fff" },
    "fill-blue": { background: "var(--blue-500)", color: "#fff" },
    "line-black": { background: "#fff", color: "#000", border: "1px solid #000" },
    "line-red": { background: "#fff", color: "var(--tomato-700)", border: "1px solid var(--tomato-700)" },
    "line-gray": { background: "#fff", color: "var(--gray-600)", border: "1px solid var(--gray-200)" },
  };
  return <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant] }}>{icon && <Icon name={icon} size={size === "sm" ? 15 : 17} color={variants[variant].color} />}{children}</button>;
}

function Field({ value, onChange, placeholder, icon, width }) {
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ position: "relative", width: width || "100%" }}>
      {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}><Icon name={icon} size={18} color="var(--gray-400)" /></span>}
      <input value={value} onChange={(e) => onChange && onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{ width: "100%", height: 48, borderRadius: 4, background: "var(--field-bg)", border: `1px solid ${foc ? "var(--tomato-500)" : "var(--field-border)"}`, boxShadow: foc ? "0 0 0 3px var(--tomato-50)" : "none", outline: "none", padding: icon ? "0 14px 0 40px" : "0 14px", fontSize: 15, color: "var(--ink)", transition: "all .15s" }} />
    </div>
  );
}

function Dropdown({ options, value, onChange, placeholder, width }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", width: width || "100%" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", height: 48, borderRadius: 4, background: "var(--field-bg)", border: `1px solid ${open ? "var(--tomato-500)" : "var(--field-border)"}`, padding: "0 12px 0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontSize: 15, color: value ? "var(--ink)" : "var(--placeholder)" }}>
        {value || placeholder}<Icon name="chevron-down" size={20} color="var(--gray-400)" />
      </button>
      {open && (
        <div style={{ position: "absolute", top: 52, left: 0, right: 0, background: "#fff", border: "1px solid var(--field-border)", borderRadius: 8, boxShadow: "var(--shadow-pop)", zIndex: 30, overflow: "hidden", padding: 4 }}>
          {options.map((o) => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }} style={{ padding: "11px 14px", fontSize: 14.5, borderRadius: 6, cursor: "pointer", color: o === value ? "var(--tomato-500)" : "var(--gray-700)", fontWeight: o === value ? 700 : 400, background: o === value ? "var(--tomato-50)" : "transparent" }}
              onMouseEnter={(e) => { if (o !== value) e.currentTarget.style.background = "var(--gray-50)"; }}
              onMouseLeave={(e) => { if (o !== value) e.currentTarget.style.background = "transparent"; }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tag({ children, tone = "line" }) {
  const tones = {
    line: { background: "#fff", border: "1px solid var(--field-border)", color: "#000" },
    red: { background: "var(--surface-faint)", border: "1px solid var(--tomato-400)", color: "var(--tomato-500)" },
    mint: { background: "#E8F7F2", border: "1px solid #9CDBC9", color: "#2E9E85" },
    gray: { background: "var(--gray-100)", border: "1px solid var(--gray-200)", color: "var(--gray-500)" },
  };
  return <span style={{ ...tones[tone], borderRadius: 6, fontSize: 13, fontWeight: 600, padding: "4px 10px", display: "inline-block", whiteSpace: "nowrap" }}>{children}</span>;
}

function Radio({ checked, onChange, label }) {
  return (
    <label onClick={onChange} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14.5, color: "var(--gray-700)" }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: checked ? "#333" : "#fff", border: checked ? "none" : "1.5px solid var(--gray-300)" }}>
        {checked && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }} />}
      </span>{label}
    </label>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label onClick={onChange} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14.5, color: "var(--gray-700)" }}>
      <span style={{ width: 20, height: 20, borderRadius: 2, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: checked ? "#333" : "#fff", border: checked ? "none" : "1.5px solid #000" }}>
        {checked && <Icon name="check" size={14} color="#fff" stroke={3} />}
      </span>{label}
    </label>
  );
}

function Pagination({ page, pages, onPage }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24 }}>
      <button onClick={() => onPage(Math.max(1, page - 1))} style={pgNav}><Icon name="chevron-left" size={18} color="var(--gray-400)" /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => onPage(n)} style={{ width: 30, height: 30, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: n === page ? 700 : 400, background: n === page ? "var(--tomato-500)" : "transparent", color: n === page ? "#fff" : "var(--gray-500)" }}>{n}</button>
      ))}
      <button onClick={() => onPage(Math.min(pages, page + 1))} style={pgNav}><Icon name="chevron-right" size={18} color="#000" /></button>
    </div>
  );
}
const pgNav = { width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" };

/* ---------- Data ---------- */
const ROWS = [
  { agent: "안정민", date: "2026-06-02 10:30", type: "인바운드", typeTone: "line", score: 82, status: "분석 완료", statusTone: "mint" },
  { agent: "김서윤", date: "2026-06-02 09:48", type: "아웃바운드", typeTone: "gray", score: 74, status: "분석 완료", statusTone: "mint" },
  { agent: "이도현", date: "2026-06-01 17:12", type: "인바운드", typeTone: "line", score: 61, status: "검토 필요", statusTone: "red" },
  { agent: "박지우", date: "2026-06-01 14:05", type: "인바운드", typeTone: "line", score: 90, status: "분석 완료", statusTone: "mint" },
  { agent: "최민준", date: "2026-05-31 16:40", type: "아웃바운드", typeTone: "gray", score: 68, status: "검토 필요", statusTone: "red" },
  { agent: "정하은", date: "2026-05-31 11:22", type: "인바운드", typeTone: "line", score: 85, status: "분석 완료", statusTone: "mint" },
];

window.TomatoAdminParts = { Icon, Btn, Field, Dropdown, Tag, Radio, Checkbox, Pagination, ROWS };
