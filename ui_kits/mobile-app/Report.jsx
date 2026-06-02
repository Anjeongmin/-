// Report.jsx — AI 분석 결과 (flagship). Emotion tab fully built; others summarized.
const { Icon: Icon3, Header: Header3 } = window;

const TABS = ["종합", "감정", "표현", "흐름"];

function EmotionChart() {
  // two smooth series over a faint red area fill
  const W = 300, H = 150, pad = 8;
  const agent = [60, 66, 48, 33, 38, 60, 74, 80];
  const cust = [50, 52, 40, 26, 30, 48, 60, 66];
  const xs = (i, n) => pad + (i * (W - pad * 2)) / (n - 1);
  const ys = (v) => H - pad - (v / 100) * (H - pad * 2);
  const smooth = (arr) => {
    const pts = arr.map((v, i) => [xs(i, arr.length), ys(v)]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };
  const area = smooth(agent) + ` L ${xs(agent.length - 1, agent.length)} ${H - pad} L ${pad} ${H - pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 150, display: "block" }}>
      {[0, 50, 100].map((g) => (
        <g key={g}>
          <line x1={pad} x2={W - pad} y1={ys(g)} y2={ys(g)} stroke="var(--gray-100)" strokeWidth="1" />
          <text x={pad} y={ys(g) - 4} fontSize="9" fill="var(--gray-400)" fontFamily="Inter">{g}</text>
        </g>
      ))}
      <path d={area} fill="var(--tomato-50)" />
      <path d={smooth(cust)} fill="none" stroke="var(--tomato-300)" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
      <path d={smooth(agent)} fill="none" stroke="var(--tomato-500)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DistRow({ label, pct }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "var(--font-kr)", fontSize: 14.5, color: "var(--ink)", whiteSpace: "nowrap" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5 }}>{pct}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: "var(--tomato-500)", borderRadius: 999 }} />
      </div>
    </div>
  );
}

function Highlight({ kind, time, text }) {
  const pos = kind === "pos";
  return (
    <div style={{ background: "var(--surface-faint)", border: `1px solid ${pos ? "var(--tomato-400)" : "var(--tomato-300)"}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
        <span style={{ background: pos ? "var(--tomato-500)" : "var(--tomato-50)", color: pos ? "#fff" : "var(--tomato-500)", fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>
          {pos ? "긍정적 전환" : "부정적 기류"}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--tomato-500)" }}>{time}</span>
      </div>
      <p style={{ margin: 0, fontFamily: "var(--font-kr)", fontSize: 13.5, lineHeight: 1.6, color: "var(--gray-700)" }}>{text}</p>
    </div>
  );
}

function EmotionTab() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", whiteSpace: "nowrap" }}>통화 감정 흐름</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--gray-400)", whiteSpace: "nowrap" }}>00:00 – 02:45</span>
      </div>
      <div style={{ background: "var(--gray-50)", borderRadius: 20, padding: "18px 16px 12px", marginTop: 12 }}>
        <EmotionChart />
        <div style={{ display: "flex", justifyContent: "center", gap: 22, marginTop: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--gray-600)" }}><span style={{ width: 16, height: 3, borderRadius: 2, background: "var(--tomato-500)" }} /> 상담원</span>
          <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--gray-600)" }}><span style={{ width: 16, height: 0, borderTop: "2.5px dashed var(--tomato-300)" }} /> 고객</span>
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", marginTop: 26 }}>감정 분포 분석</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 14 }}>
        <DistRow label="친절함 (Friendly)" pct={70} />
        <DistRow label="차분함 (Calm)" pct={20} />
        <DistRow label="불안함 (Anxious)" pct={10} />
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", marginTop: 26, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
        <span>✨</span> 감정 변화 하이라이트
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
        <Highlight kind="neg" time="01:15" text="규정 안내 시 고객의 목소리 톤이 높아지며 불만이 감지되었습니다. 이 시점에서 공감 표현이 더 필요했습니다." />
        <Highlight kind="pos" time="02:05" text="대안 제시 이후 고객의 호흡이 안정되고 어조가 부드러워졌습니다. 해결책 제시가 유효하게 작용했습니다." />
      </div>

      {/* practice CTA */}
      <div style={{ marginTop: 22, background: "var(--tomato-500)", borderRadius: 24, padding: "18px 20px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>맞춤형 연습 제안</div>
          <div style={{ fontFamily: "var(--font-kr)", fontWeight: 800, fontSize: 18, marginTop: 4 }}>거절 상황 대응 연습</div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.9)", marginTop: 8 }}>외 124명이 연습 중</div>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <Icon3 name="play" size={20} color="#fff" stroke={2.4} />
        </div>
      </div>

      <button style={{ marginTop: 14, width: "100%", height: 52, borderRadius: 16, border: "none", cursor: "pointer", background: "var(--tomato-500)", color: "#fff", fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
        <Icon3 name="mic" size={19} color="#fff" stroke={2.2} /> 부족한 표현 연습하기
      </button>
    </React.Fragment>
  );
}

function SummaryTab() {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ background: "var(--gray-50)", borderRadius: 20, padding: 20, display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", boxShadow: "var(--shadow-toast)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--tomato-500)" }}>82</span>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-kr)", fontWeight: 800, fontSize: 17, color: "var(--ink)" }}>오늘 통화는 안정적이었어요</div>
          <div style={{ fontSize: 13.5, color: "var(--gray-600)", marginTop: 4, lineHeight: 1.5 }}>친절함이 높게 유지됐고, 후반부 공감 표현이 돋보였습니다.</div>
        </div>
      </div>
      {[
        ["감정 점수", "82 / 100", "친절·차분 우세"],
        ["표현 다양성", "보통", "반복 표현 3회 감지"],
        ["대화 흐름", "원활", "되묻기 1회"],
      ].map(([k, v, d]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--gray-100)" }}>
          <span style={{ fontFamily: "var(--font-kr)", fontSize: 15, color: "var(--ink)" }}>{k}</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{v}</div>
            <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2 }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaceholderTab({ label, text }) {
  return (
    <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", color: "var(--gray-400)" }}>
      <Icon3 name="bar-chart-3" size={40} color="var(--gray-300)" stroke={1.8} />
      <div style={{ fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 16, color: "var(--gray-500)" }}>{label} 리포트</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 240 }}>{text}</div>
    </div>
  );
}

function Report({ onBack }) {
  const [tab, setTab] = React.useState(1);
  return (
    <React.Fragment>
      <Header3 title="분석 결과" onBack={onBack} action={<Icon3 name="share-2" size={22} color="var(--tomato-500)" stroke={2} />} />
      <div style={{ display: "flex", padding: "0 20px", borderBottom: "1px solid var(--gray-100)", flex: "none" }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ all: "unset", cursor: "pointer", flex: 1, textAlign: "center", padding: "12px 0", position: "relative", fontFamily: "var(--font-kr)", fontSize: 15, fontWeight: tab === i ? 700 : 400, color: tab === i ? "var(--tomato-500)" : "var(--gray-400)" }}>
            {t}
            {tab === i && <span style={{ position: "absolute", left: "22%", right: "22%", bottom: -1, height: 2.5, background: "var(--tomato-500)", borderRadius: 2 }} />}
          </button>
        ))}
      </div>
      <div className="scroll" style={{ padding: "16px 24px 120px" }}>
        {tab === 0 && <SummaryTab />}
        {tab === 1 && <EmotionTab />}
        {tab === 2 && <PlaceholderTab label="표현" text="자주 쓴 표현과 보완하면 좋을 어휘를 분석해 보여줍니다." />}
        {tab === 3 && <PlaceholderTab label="흐름" text="대화의 주도권과 침묵·되묻기 구간을 타임라인으로 보여줍니다." />}
      </div>
    </React.Fragment>
  );
}

window.Report = Report;
