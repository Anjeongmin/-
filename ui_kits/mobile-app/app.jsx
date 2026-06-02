// app.jsx — Tomato app shell: nav, mic-FAB flow, screen state
const { Icon, StatusBar, Home, Analyzing, Report } = window;

const NAV = [
  { key: "home", label: "홈", icon: "home" },
  { key: "log", label: "감정 기록", icon: "list" },
  { key: "caption", label: "자막", icon: "captions" },
  { key: "review", label: "돌아보기", icon: "rotate-ccw" },
];

function BottomNav({ active, onNav, onRecord }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 86, background: "#fff", borderTop: "1px solid var(--gray-100)", display: "flex", alignItems: "flex-start", justifyContent: "space-around", padding: "10px 8px 0", zIndex: 50 }}>
      {NAV.slice(0, 2).map((n) => <NavItem key={n.key} n={n} active={active === n.key} onClick={() => onNav(n.key)} />)}
      <button onClick={onRecord} style={{ all: "unset", cursor: "pointer", width: 60, height: 60, borderRadius: "50%", background: "var(--tomato-500)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: -24, boxShadow: "0 10px 18px -6px rgba(255,54,57,0.6)", flex: "none" }}>
        <Icon name="mic" size={26} color="#fff" stroke={2.2} />
      </button>
      {NAV.slice(2).map((n) => <NavItem key={n.key} n={n} active={active === n.key} onClick={() => onNav(n.key)} />)}
    </div>
  );
}

function NavItem({ n, active, onClick }) {
  const c = active ? "var(--tomato-500)" : "var(--gray-400)";
  return (
    <button onClick={onClick} style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 60 }}>
      <Icon name={n.icon} size={22} color={c} stroke={active ? 2.4 : 2} />
      <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: active ? 700 : 500, color: c, letterSpacing: "0.02em" }}>{n.label}</span>
    </button>
  );
}

function EmptyTab({ label, text }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40, textAlign: "center" }}>
      <img src="../../assets/character.png" alt="" style={{ width: 96, height: 96, objectFit: "contain", opacity: 0.9 }} />
      <div style={{ fontFamily: "var(--font-kr)", fontWeight: 800, fontSize: 18, color: "var(--ink)" }}>{label}</div>
      <div style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.6, maxWidth: 250 }}>{text}</div>
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState("home");
  const [view, setView] = React.useState("home"); // home | report
  const [analyzing, setAnalyzing] = React.useState(false);

  const openReport = () => { setView("report"); };
  const goNav = (k) => { setTab(k); setView(k === "home" ? "home" : "tab"); };

  if (analyzing) {
    return (
      <React.Fragment>
        <StatusBar />
        <Analyzing onDone={() => { setAnalyzing(false); setTab("home"); setView("report"); }} onClose={() => setAnalyzing(false)} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {view === "report"
        ? <React.Fragment><StatusBar /><Report onBack={() => { setView("home"); setTab("home"); }} /></React.Fragment>
        : (
          <React.Fragment>
            <StatusBar />
            <div className="scroll">
              {tab === "home" && <Home onOpenReport={openReport} />}
              {tab === "log" && <EmptyTab label="감정 기록" text="지난 통화의 감정 점수 변화를 캘린더와 그래프로 모아 봅니다." />}
              {tab === "caption" && <EmptyTab label="실시간 자막" text="통화 중 음성을 텍스트로 변환해 보여줍니다." />}
              {tab === "review" && <EmptyTab label="돌아보기" text="저장된 녹음을 다시 듣고 표현을 복습할 수 있어요." />}
            </div>
          </React.Fragment>
        )}
      <BottomNav active={tab} onNav={goNav} onRecord={() => setAnalyzing(true)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
