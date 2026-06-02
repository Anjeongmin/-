// Analyzing.jsx — AI analysis loading screen (brand red)
const { Icon: Icon2, Mascot: Mascot2 } = window;

const STEPS = [
  { label: "음성 분석", at: 25 },
  { label: "감정 분석", at: 55 },
  { label: "표현 분석", at: 85 },
  { label: "흐름 분석", at: 100 },
];

function Analyzing({ onDone, onClose }) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + 2);
      setPct(p);
      if (p >= 100) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  const done = pct >= 100;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 36px", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ all: "unset", cursor: "pointer", padding: 8 }}>
          <Icon2 name="x" size={24} color="var(--gray-400)" stroke={2.2} />
        </button>
      </div>

      {/* hero */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--ink)" }}>AI 분석 중</div>
        <div style={{ position: "relative", width: 168, height: 168, marginTop: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="pulse-ring" />
          <span className="pulse-ring d2" />
          <div style={{ position: "relative", zIndex: 2, width: 104, height: 104, borderRadius: "50%", background: "var(--tomato-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Mascot2 mood={done ? "happy" : "worried"} size={92} />
          </div>
        </div>
        <div style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 22 }}>
          {done ? "분석이 완료되었어요!" : "통화 내용을 꼼꼼히 살펴보고 있어요"}
        </div>
      </div>

      {/* steps */}
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 18 }}>
        {STEPS.map((s, i) => {
          const sDone = pct >= s.at;
          const active = !sDone && pct >= (i === 0 ? 0 : STEPS[i - 1].at);
          const prev = i === 0 ? 0 : STEPS[i - 1].at;
          const local = Math.max(0, Math.min(1, (pct - prev) / (s.at - prev)));
          return (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 14, opacity: sDone || active ? 1 : 0.4 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: sDone ? "var(--tomato-500)" : "transparent", border: sDone ? "none" : "2px solid var(--gray-200)" }}>
                {sDone
                  ? <Icon2 name="check" size={15} color="#fff" stroke={3} />
                  : active ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--tomato-500)" }} /> : null}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 15, color: "var(--ink)", whiteSpace: "nowrap" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", color: sDone ? "var(--gray-400)" : active ? "var(--tomato-500)" : "var(--gray-300)" }}>
                    {sDone ? "완료" : active ? "진행 중…" : "대기"}
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: (sDone ? 1 : local) * 100 + "%", background: "var(--tomato-500)", borderRadius: 999, transition: "width .2s linear" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* overall */}
      <div style={{ marginTop: "auto", paddingTop: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--gray-400)" }}>전체 진행률</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--ink)" }}>{pct}%</div>
          </div>
          <div style={{ fontSize: 13, color: "var(--gray-400)" }}>{done ? "완료" : "잠시만 기다려 주세요"}</div>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: pct + "%", background: "var(--tomato-500)", borderRadius: 999, transition: "width .12s linear" }} />
        </div>
        <button
          onClick={done ? onDone : undefined}
          style={{ marginTop: 20, width: "100%", height: 52, borderRadius: 16, border: "none", cursor: done ? "pointer" : "default", fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 16, color: done ? "#fff" : "var(--gray-400)", background: done ? "var(--tomato-500)" : "var(--gray-100)", transition: "all .2s" }}>
          결과 확인하기
        </button>
      </div>

      <style>{`
        .pulse-ring { position:absolute; z-index:0; width:104px; height:104px; border-radius:50%; background:var(--tomato-300); opacity:.5; animation: tpulse 2s ease-out infinite; }
        .pulse-ring.d2 { animation-delay: 1s; }
        @keyframes tpulse { 0%{transform:scale(1);opacity:.45;} 100%{transform:scale(1.6);opacity:0;} }
        @media (prefers-reduced-motion: reduce) { .pulse-ring { animation: none; opacity:0; } }
      `}</style>
    </div>
  );
}

window.Analyzing = Analyzing;
