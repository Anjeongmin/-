// Home.jsx — Tomato app home screen
const { Icon, Mascot } = window;

const TODAY = [
  { k: "오늘 통화", v: "12", icon: "phone" },
  { k: "통화 시간", v: "4.2h", icon: "clock" },
];

const RECENT = [
  { title: "고객 응대 — 환불 문의", meta: "분석 완료 · 12분", time: "10:30", mood: "happy", icon: "phone-incoming" },
  { title: "규정 안내 통화", meta: "감정 리포트 준비됨 · 8분", time: "어제", mood: "worried", icon: "phone" },
  { title: "신규 가입 상담", meta: "분석 완료 · 15분", time: "5월 30일", mood: "happy", icon: "phone-outgoing" },
];

function StatCell({ k, v, icon }) {
  return (
    <div style={{ flex: 1, background: "rgba(255,255,255,0.16)", borderRadius: 18, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        <Icon name={icon} size={15} color="#fff" stroke={2.2} /> {k}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "#fff", marginTop: 6, letterSpacing: "-0.02em" }}>{v}</div>
    </div>
  );
}

function CallRow({ c, onOpen }) {
  return (
    <button onClick={onOpen} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--gray-100)", width: "100%" }}>
      <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        <Icon name={c.icon} size={20} color="var(--gray-700)" stroke={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-kr)", fontWeight: 700, fontSize: 15.5, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
        <div style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 3 }}>{c.meta}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--gray-400)" }}>{c.time}</span>
        <Icon name="chevron-right" size={18} color="var(--gray-300)" stroke={2.2} />
      </div>
    </button>
  );
}

function Home({ onOpenReport }) {
  return (
    <div style={{ padding: "4px 24px 120px" }}>
      {/* greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", color: "var(--gray-400)" }}>WELCOME BACK</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--ink)", marginTop: 2 }}>안정민 <span style={{ fontSize: 16, fontWeight: 600, color: "var(--gray-500)" }}>상담원</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={20} color="var(--gray-700)" stroke={2} />
            <span style={{ position: "absolute", top: 9, right: 11, width: 7, height: 7, borderRadius: "50%", background: "var(--tomato-500)", border: "1.5px solid #fff" }} />
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--tomato-50)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Mascot mood="happy" size={40} />
          </div>
        </div>
      </div>

      {/* today summary card */}
      <div style={{ marginTop: 22, background: "var(--tomato-500)", borderRadius: 24, padding: "20px 20px 22px", color: "#fff", boxShadow: "0 14px 24px -10px rgba(255,54,57,0.55)", position: "relative", overflow: "hidden" }}>
        <img src="../../assets/character.png" alt="" style={{ position: "absolute", right: -24, top: -20, width: 130, height: 130, opacity: 0.2, transform: "rotate(8deg)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20 }}>오늘의 요약</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", background: "rgba(255,255,255,0.22)", padding: "5px 11px", borderRadius: 999 }}>ACTIVE</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>2026년 6월 2일 월요일</div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {TODAY.map((s) => <StatCell key={s.k} {...s} />)}
          </div>
        </div>
      </div>

      {/* recent calls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 2 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--ink)", whiteSpace: "nowrap" }}>최근 통화</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.04em", color: "var(--tomato-500)", whiteSpace: "nowrap", flex: "none" }}>전체 보기</span>
      </div>
      <div>
        {RECENT.map((c, i) => <CallRow key={i} c={c} onOpen={onOpenReport} />)}
      </div>
    </div>
  );
}

window.Home = Home;
