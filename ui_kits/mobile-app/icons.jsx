// icons.jsx — Lucide icon wrapper + shared chrome for the Tomato app
// Lucide is loaded via CDN (see README "Iconography"). The Icon component
// imperatively injects the SVG into a span React owns, so React reconciliation
// and Lucide DOM mutation never fight.

const Icon = ({ name, size = 24, color = "currentColor", stroke = 2, style = {} }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (el && window.lucide) {
      el.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      el.appendChild(i);
      window.lucide.createIcons({
        nameAttr: "data-lucide",
        attrs: { width: size, height: size, "stroke-width": stroke, stroke: color, color },
      });
    }
  });
  return (
    <span
      ref={ref}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, color, ...style }}
    />
  );
};

// iOS status bar
const StatusBar = ({ dark = false }) => {
  const c = dark ? "#fff" : "var(--ink)";
  return (
    <div className="statusbar" style={{ color: c }}>
      <span>9:41</span>
      <div className="right">
        <Icon name="signal" size={17} color={c} stroke={2.4} />
        <Icon name="wifi" size={17} color={c} stroke={2.4} />
        <Icon name="battery-full" size={22} color={c} stroke={2} />
      </div>
    </div>
  );
};

// App header: back · centered title · trailing action
const Header = ({ title, onBack, action }) => (
  <div style={{ height: 56, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid var(--gray-100)", background: "#fff" }}>
    <button onClick={onBack} style={{ all: "unset", cursor: "pointer", width: 40, height: 40, display: "flex", alignItems: "center" }}>
      {onBack ? <Icon name="chevron-left" size={26} color="var(--tomato-500)" stroke={2.4} /> : <span style={{ width: 26 }} />}
    </button>
    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink)" }}>{title}</span>
    <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{action || <span style={{ width: 26 }} />}</div>
  </div>
);

// Tomato mascot — happy or worried
const Mascot = ({ mood = "happy", size = 96 }) => (
  <img
    src={mood === "happy" ? "../../assets/character.png" : "../../assets/illustration.png"}
    alt="토마토"
    style={{ width: size, height: size, objectFit: "contain", flex: "none" }}
  />
);

Object.assign(window, { Icon, StatusBar, Header, Mascot });
