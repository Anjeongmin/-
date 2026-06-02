// admin-app.jsx — layout & interactions for the form-kit demo
const { Icon, Btn, Field, Dropdown, Tag, Radio, Checkbox, Pagination, ROWS } = window.TomatoAdminParts;
const { useState: uS } = React;

function TopBar() {
  const tabs = ["대시보드", "통화 기록", "상담원 관리", "설정"];
  const [active, setActive] = uS("통화 기록");
  return (
    <div style={{ height: 60, background: "#fff", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", padding: "0 28px", gap: 28, position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <img src="../../assets/character.png" alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--tomato-500)", whiteSpace: "nowrap" }}>토마토<span style={{ color: "var(--gray-400)", fontWeight: 600, fontSize: 14, marginLeft: 6 }}>관리자</span></span>
      </div>
      <div style={{ display: "flex", gap: 4, marginLeft: 12 }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: active === t ? 700 : 400, color: active === t ? "var(--tomato-500)" : "var(--gray-500)" }}>{t}</button>
        ))}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <Icon name="bell" size={20} color="var(--gray-500)" />
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--gray-600)" }}>AJ</div>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, onSave }) {
  const [type, setType] = uS("인바운드");
  const [agree, setAgree] = uS(true);
  const [agent, setAgent] = uS("");
  return (
    <React.Fragment>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(17,24,39,0.35)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .25s", zIndex: 40 }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 440, background: "#fff", boxShadow: "var(--shadow-card)", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform .28s cubic-bezier(.4,0,.2,1)", zIndex: 41, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "22px 28px", borderBottom: "1px solid var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>새 통화 기록 등록</span>
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer" }}><Icon name="x" size={22} color="var(--gray-400)" /></button>
        </div>
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22, overflowY: "auto" }}>
          <div><Label>상담원</Label><Field value={agent} onChange={setAgent} placeholder="상담원 이름을 입력해주세요" /></div>
          <div><Label>통화 일시</Label><Field icon="calendar" placeholder="날짜를 선택해주세요" /></div>
          <div><Label>통화 유형</Label>
            <div style={{ display: "flex", gap: 22, marginTop: 4 }}>
              <Radio checked={type === "인바운드"} onChange={() => setType("인바운드")} label="인바운드" />
              <Radio checked={type === "아웃바운드"} onChange={() => setType("아웃바운드")} label="아웃바운드" />
            </div>
          </div>
          <div><Label>분석 우선순위</Label><Dropdown options={["일반", "우선 분석", "보류"]} placeholder="선택해주세요" value="" onChange={() => {}} /></div>
          <div><Label>메모</Label><Field placeholder="특이사항을 입력해주세요" /></div>
          <Checkbox checked={agree} onChange={() => setAgree(!agree)} label="녹취 분석 및 데이터 활용에 동의합니다." />
        </div>
        <div style={{ marginTop: "auto", padding: "18px 28px", borderTop: "1px solid var(--gray-100)", display: "flex", gap: 10 }}>
          <Btn variant="line-black" onClick={onClose}>취소</Btn>
          <div style={{ flex: 1 }}><Btn variant="fill-black" onClick={onSave}>저장하기</Btn></div>
        </div>
      </div>
    </React.Fragment>
  );
}
function Label({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>{children}</div>;
}

function Toast({ show }) {
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${show ? 0 : 20}px)`, opacity: show ? 1 : 0, pointerEvents: "none", transition: "all .3s", zIndex: 60, minWidth: 420, height: 56, borderRadius: 4, background: "var(--mint-500)", boxShadow: "var(--shadow-toast)", display: "flex", alignItems: "center", gap: 12, padding: "0 20px", color: "#fff", fontWeight: 500, fontSize: 16 }}>
      <span style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={14} color="#fff" stroke={3} /></span>
      저장 처리 되었습니다.
    </div>
  );
}

function ScoreBar({ v }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 64, height: 6, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" }}>
        <div style={{ width: v + "%", height: "100%", background: v >= 75 ? "var(--mint-500)" : "var(--tomato-500)", borderRadius: 999 }} />
      </div>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--ink)", width: 22 }}>{v}</span>
    </div>
  );
}

function App() {
  const [agent, setAgent] = uS("");
  const [period, setPeriod] = uS("");
  const [q, setQ] = uS("");
  const [page, setPage] = uS(1);
  const [drawer, setDrawer] = uS(false);
  const [toast, setToast] = uS(false);
  const [checked, setChecked] = uS({});
  const allOn = ROWS.every((_, i) => checked[i]);

  const save = () => { setDrawer(false); setToast(true); setTimeout(() => setToast(false), 2600); };
  const th = { textAlign: "left", fontSize: 12.5, fontWeight: 700, color: "var(--gray-500)", padding: "0 16px", height: 44, whiteSpace: "nowrap" };
  const td = { fontSize: 14.5, color: "var(--gray-700)", padding: "0 16px", height: 58, borderTop: "1px solid var(--gray-100)", whiteSpace: "nowrap" };

  return (
    <React.Fragment>
      <TopBar />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "30px 28px 60px" }}>
        {/* title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, margin: 0, color: "var(--ink)" }}>통화 기록 관리</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--gray-500)" }}>상담원별 통화 분석 기록을 조회하고 관리합니다.</p>
          </div>
          <Btn variant="fill-black" icon="plus" onClick={() => setDrawer(true)}>새 기록 등록</Btn>
        </div>

        {/* filter bar */}
        <div style={{ background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12, padding: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Dropdown width={180} options={["전체 상담원", "안정민", "김서윤", "이도현", "박지우"]} placeholder="상담원 선택" value={agent} onChange={setAgent} />
          <Dropdown width={160} options={["오늘", "최근 7일", "최근 30일", "직접 입력"]} placeholder="기간" value={period} onChange={setPeriod} />
          <div style={{ flex: 1, minWidth: 200 }}><Field icon="search" value={q} onChange={setQ} placeholder="통화 내용·키워드 검색" /></div>
          <Btn variant="fill-black" onClick={() => {}}>검색</Btn>
          <Btn variant="line-gray" onClick={() => { setAgent(""); setPeriod(""); setQ(""); }}>초기화</Btn>
        </div>

        {/* table */}
        <div style={{ background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12, marginTop: 18, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--gray-50)" }}>
              <tr>
                <th style={{ ...th, width: 44, paddingRight: 0 }}><Checkbox checked={allOn} onChange={() => { const n = {}; ROWS.forEach((_, i) => (n[i] = !allOn)); setChecked(n); }} label="" /></th>
                <th style={th}>상담원</th><th style={th}>통화 일시</th><th style={th}>유형</th>
                <th style={th}>감정 점수</th><th style={th}>상태</th><th style={{ ...th, textAlign: "right" }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} style={{ background: checked[i] ? "var(--tomato-50)" : "#fff" }}>
                  <td style={{ ...td, paddingRight: 0 }}><Checkbox checked={!!checked[i]} onChange={() => setChecked({ ...checked, [i]: !checked[i] })} label="" /></td>
                  <td style={{ ...td, fontWeight: 700, color: "var(--ink)" }}>{r.agent}</td>
                  <td style={{ ...td, fontFamily: "var(--font-display)", color: "var(--gray-500)" }}>{r.date}</td>
                  <td style={td}><Tag tone={r.typeTone}>{r.type}</Tag></td>
                  <td style={td}><ScoreBar v={r.score} /></td>
                  <td style={td}><Tag tone={r.statusTone}>{r.status}</Tag></td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <span style={{ display: "inline-flex", gap: 8 }}>
                      <Btn size="sm" variant="line-black">보기</Btn>
                      <Btn size="sm" variant="line-red">삭제</Btn>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={5} onPage={setPage} />
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} onSave={save} />
      <Toast show={toast} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
