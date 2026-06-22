import React, { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

// ─── Coca-Cola Brand Tokens ───────────────────────────────────────────────────
const CC = {
  red:       "#F40009",   // Coca-Cola signature red
  redDark:   "#C2000B",   // darker press/hover red
  redDeep:   "#8B0000",   // deep crimson for text on light bg
  redLight:  "#FFF0F0",   // tinted red surface
  redMid:    "#FFD6D6",   // mid red tint
  black:     "#1A1A1A",   // near-black
  charcoal:  "#2D2D2D",   // secondary dark
  gray:      "#6B6B6B",   // muted text
  grayLight: "#F2F2F2",   // surface gray
  white:     "#FFFFFF",
  cream:     "#FAFAFA",
};

// ─── Inline Style Helpers ─────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: CC.cream,
    padding: "2.5rem 2rem",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  inner: { maxWidth: 1200, margin: "0 auto" },

  // Header
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" },
  headerLeft: {},
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: CC.black,
    letterSpacing: "-0.5px",
    fontFamily: "'Georgia', serif",
    lineHeight: 1.1,
  },
  pageSub: { fontSize: 13, color: CC.gray, marginTop: 4 },
  liveBadge: {
    display: "flex", alignItems: "center", gap: 8,
    background: CC.white, border: `1px solid #E0E0E0`,
    padding: "6px 14px", borderRadius: 20,
    fontSize: 12, color: CC.gray,
  },
  liveDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: CC.red,
    boxShadow: `0 0 0 0 ${CC.red}`,
    animation: "pulse 2s infinite",
  },

  // Zone tabs
  tabRow: { display: "flex", gap: 8, marginBottom: "2rem" },
  tabBtn: (active) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 600,
    padding: "9px 24px", borderRadius: 24,
    border: active ? "none" : `1px solid #E0E0E0`,
    background: active ? CC.red : CC.white,
    color: active ? CC.white : CC.gray,
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: active ? `0 4px 14px ${CC.red}50` : "none",
    transition: "all 0.18s ease",
  }),

  // Summary KPI strip
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: "2rem" },
  kpiCard: (accent) => ({
    background: CC.white,
    border: `1px solid #EBEBEB`,
    borderRadius: 14,
    padding: "1.1rem 1.25rem",
    borderTop: `3px solid ${accent}`,
  }),
  kpiLabel: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.9px", color: CC.gray, marginBottom: 6 },
  kpiValue: (color) => ({ fontSize: 28, fontWeight: 700, color: color || CC.black, lineHeight: 1 }),
  kpiSub: { fontSize: 11, color: CC.gray, marginTop: 4 },

  // Section label
  sectionLabel: {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.9px", color: CC.gray, marginBottom: 14,
  },

  // City grid
  cityGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 },
  cityCard: {
    background: CC.white,
    border: `1px solid #EBEBEB`,
    borderRadius: 16,
    padding: "1.4rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  cityCardAccent: {
    position: "absolute", top: 0, left: 0, right: 0, height: 4,
    background: `linear-gradient(90deg, ${CC.red}, ${CC.redDark})`,
  },
  cityName: {
    fontSize: 20, fontWeight: 800,
    color: CC.black,
    fontFamily: "'Georgia', serif",
    marginBottom: "1rem",
    marginTop: 6,
  },
  cityMetrics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  metricBox: (variant) => {
    const map = {
      default: { bg: CC.grayLight, val: CC.black },
      good:    { bg: "#E8F9F2", val: "#0A7A47" },
      bad:     { bg: CC.redLight, val: CC.redDeep },
      info:    { bg: "#EEF4FF", val: "#1A56DB" },
    };
    const t = map[variant] || map.default;
    return {
      background: t.bg, borderRadius: 10, padding: "10px 12px",
      "--val-color": t.val,
    };
  },
  metricVal: { fontSize: 20, fontWeight: 700, color: "var(--val-color)" },
  metricLbl: { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.5px", color: CC.gray, marginTop: 2 },
  cityArrow: { position: "absolute", bottom: "1.2rem", right: "1.2rem", color: "#C0C0C0", fontSize: 18 },

  // Table panel
  tablePanel: { background: CC.white, border: `1px solid #EBEBEB`, borderRadius: 16, overflow: "hidden" },
  tableHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1rem 1.4rem",
    background: CC.red,
  },
  tableTitle: { fontSize: 15, fontWeight: 700, color: CC.white, fontFamily: "'Georgia', serif" },
  backBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12, fontWeight: 600,
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: CC.white, padding: "6px 16px",
    borderRadius: 20, cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed" },
  th: {
    padding: "10px 16px", textAlign: "left",
    fontSize: 10, fontWeight: 700, letterSpacing: "0.7px",
    textTransform: "uppercase", color: CC.gray,
    background: CC.grayLight,
    borderBottom: "1px solid #EBEBEB",
  },
  td: {
    padding: "12px 16px", color: CC.black,
    borderBottom: "1px solid #F5F5F5",
    verticalAlign: "middle",
  },
  badge: (variant) => {
    const map = {
      working: { bg: "#E8F9F2", color: "#0A7A47" },
      faulty:  { bg: CC.redLight, color: CC.redDeep },
      on:      { bg: "#EEF4FF", color: "#1A56DB" },
      off:     { bg: CC.grayLight, color: CC.gray },
    };
    const t = map[variant] || map.off;
    return {
      display: "inline-block", fontSize: 11, fontWeight: 600,
      padding: "3px 10px", borderRadius: 20,
      background: t.bg, color: t.color,
    };
  },

  // Modal overlay — uses a normal-flow faux-viewport so height contributes to layout
 modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
},
  modal: {
    background: CC.white,
    borderRadius: 18,
    width: 380,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
  },
  modalTop: {
    background: CC.red,
    padding: "1.5rem 1.75rem",
    position: "relative",
  },
  modalTopDeco: {
    position: "absolute", top: -20, right: -20,
    width: 100, height: 100, borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
  },
  modalId: { fontSize: 22, fontWeight: 800, color: CC.white, fontFamily: "'Georgia', serif" },
  modalLoc: { fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 },
  modalBody: { padding: "1.25rem 1.75rem" },
  modalRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "9px 0", borderBottom: "1px solid #F5F5F5",
  },
  modalKey: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: CC.gray },
  modalVal: { fontSize: 13, fontWeight: 600, color: CC.black },
  closeBtn: {
    display: "block", width: "calc(100% - 3.5rem)",
    margin: "0 1.75rem 1.5rem",
    background: CC.red, color: CC.white,
    border: "none", padding: "11px",
    borderRadius: 10, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 700,
    letterSpacing: "0.3px",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
const Zones = () => {
  const [selectedZone, setSelectedZone] = useState("Central");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [hoverCity, setHoverCity] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);

  const zonesData = {
    North:   { cities: ["Islamabad", "Rawalpindi", "Peshawar"] },
    Central: { cities: ["Lahore", "Faisalabad", "Multan"] },
    South:   { cities: ["Karachi", "Hyderabad", "Quetta"] },
  };

  const allFridges = useMemo(() => {
    const data = [];
    Object.entries(zonesData).forEach(([zone, zd]) => {
      zd.cities.forEach((city) => {
        for (let i = 1; i <= 10; i++) {
          data.push({
            id: `FR-${city.slice(0, 3).toUpperCase()}-${String(i).padStart(2, "0")}`,
            zone, city,
            location: `Shop ${i}, ${city}`,
            temp: 3 + (i % 7),
            energy: 100 + i * 5,
            power: i % 3 === 0 ? "OFF" : "ON",
            status: i % 3 === 0 ? "Faulty" : "Working",
            startDate: "2024-01-10",
            owner: `Owner ${i}`,
            cnic: `35202-12345${i}-1`,
          });
        }
      });
    });
    return data;
  }, []);

  const zoneFridges = allFridges.filter((f) => f.zone === selectedZone);
  const totalAll    = zoneFridges.length;
  const workingAll  = zoneFridges.filter((f) => f.status === "Working").length;
  const faultyAll   = zoneFridges.filter((f) => f.status === "Faulty").length;
  const energyAll   = zoneFridges.reduce((s, f) => s + f.energy, 0);

  const cityStats = zonesData[selectedZone].cities.map((city) => {
    const cf = zoneFridges.filter((f) => f.city === city);
    return {
      city,
      total:   cf.length,
      working: cf.filter((f) => f.status === "Working").length,
      faulty:  cf.filter((f) => f.status === "Faulty").length,
      energy:  cf.reduce((s, f) => s + f.energy, 0),
    };
  });

  const tableData = allFridges.filter(
    (f) => f.zone === selectedZone && f.city === selectedCity
  );

  const kpis = [
    { label: "Total fridges",  value: totalAll,          sub: `${selectedZone} zone`,       color: CC.black,    accent: CC.black   },
    { label: "Working",        value: workingAll,         sub: `${Math.round(workingAll / totalAll * 100)}% uptime`, color: "#0A7A47", accent: "#0A7A47" },
    { label: "Faulty",         value: faultyAll,          sub: "Needs attention",            color: CC.red,      accent: CC.red     },
    { label: "Daily energy",   value: `${(energyAll / 1000).toFixed(1)}k`, sub: "kWh/day total", color: "#1A56DB", accent: "#1A56DB" },
  ];

  return (
    <DashboardLayout>
      {/* Inject keyframe for live dot + row hover */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(244,0,9,0.7); }
          70%  { box-shadow: 0 0 0 8px rgba(244,0,9,0); }
          100% { box-shadow: 0 0 0 0 rgba(244,0,9,0); }
        }
        .fridge-row:hover { background: ${CC.redLight} !important; }
        .zone-tab:hover   { background: ${CC.redLight} !important; color: ${CC.red} !important; }
        .city-card-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(244,0,9,0.12) !important; }
        .back-btn-inner:hover { background: rgba(255,255,255,0.28) !important; }
        .close-btn-inner:hover { background: ${CC.redDark} !important; }
      `}</style>

      <div style={styles.page}>
        <div style={styles.inner}>

          {/* ── Header ── */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <h1 style={styles.pageTitle}>Pakistan CocaCola Zone Monitoring</h1>
              <p style={styles.pageSub}>Cold-chain refrigerator network overview</p>
            </div>
            <div style={styles.liveBadge}>
              <span style={styles.liveDot} />
              Live
            </div>
          </div>

          {/* ── Zone Tabs ── */}
          <div style={styles.tabRow}>
            {Object.keys(zonesData).map((zone) => (
              <button
                key={zone}
                className="zone-tab"
                style={styles.tabBtn(zone === selectedZone)}
                onClick={() => { setSelectedZone(zone); setSelectedCity(null); setSelectedFridge(null); }}
              >
                {zone} Zone
              </button>
            ))}
          </div>

          {/* ── KPI Strip ── */}
          <div style={styles.kpiRow}>
            {kpis.map((k, i) => (
              <div key={i} style={styles.kpiCard(k.accent)}>
                <div style={styles.kpiLabel}>{k.label}</div>
                <div style={styles.kpiValue(k.color)}>{k.value}</div>
                <div style={styles.kpiSub}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* ── City Cards ── */}
          {true && (
            <>
              <div style={styles.sectionLabel}>Cities in {selectedZone} zone</div>
              <div style={styles.cityGrid}>
                {cityStats.map((c) => (
                  <div
                    key={c.city}
                    className="city-card-wrap"
                    style={{
                      ...styles.cityCard,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                    onClick={() => { setSelectedCity(c.city); setSelectedFridge(null); }}
                  >
                    <div style={styles.cityCardAccent} />
                    <div style={styles.cityName}>{c.city}</div>
                    <div style={styles.cityMetrics}>
                      {[
                        { label: "Total",    val: c.total,   variant: "default" },
                        { label: "Working",  val: c.working, variant: "good"    },
                        { label: "Faulty",   val: c.faulty,  variant: "bad"     },
                        { label: "kWh/day",  val: c.energy,  variant: "info"    },
                      ].map((m) => (
                        <div key={m.label} style={styles.metricBox(m.variant)}>
                          <div style={styles.metricVal}>{m.val}</div>
                          <div style={styles.metricLbl}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* <span style={styles.cityArrow}>→</span> */}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Table View ── */}
         {selectedCity && !selectedFridge && (
  <div style={{ marginTop: "2rem" }}>
            <div style={styles.tablePanel}>
              <div style={styles.tableHeader}>
                <span style={styles.tableTitle}>{selectedCity} — Refrigerators</span>
                <button
                  className="back-btn-inner"
                  style={styles.backBtn}
                  onClick={() => setSelectedCity(null)}
                >
                  ← All cities
                </button>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Unit ID", "Temp", "Status", "Power", "Weekly Energy", "Owner"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((f, i) => (
                    <tr
                      key={i}
                      className="fridge-row"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFridge(f)}
                    >
                      <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>
                        {f.id}
                      </td>
                      <td style={styles.td}>{f.temp}°C</td>
                      <td style={styles.td}>
                        <span style={styles.badge(f.status.toLowerCase())}>{f.status}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.badge(f.power.toLowerCase())}>{f.power}</span>
                      </td>
                      <td style={styles.td}>{f.energy * 7} kWh</td>
                      <td style={styles.td}>{f.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* ── Fridge Detail Modal (normal-flow faux viewport) ── */}
          {selectedFridge && (
            <>
              {/* back to table */}
              <div style={{ marginBottom: 12 }}>
                <button
                  style={{ ...styles.backBtn, background: CC.grayLight, color: CC.gray, border: "1px solid #E0E0E0" }}
                  onClick={() => setSelectedFridge(null)}
                >
                  ← Back to table
                </button>
              </div>

              <div style={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) setSelectedFridge(null); }}>
                <div style={styles.modal}>
                  <div style={styles.modalTop}>
                    <div style={styles.modalTopDeco} />
                    <div style={styles.modalId}>{selectedFridge.id}</div>
                    <div style={styles.modalLoc}>{selectedFridge.location}</div>
                  </div>

                  <div style={styles.modalBody}>
                    {[
                      { key: "Owner",       val: selectedFridge.owner },
                      { key: "CNIC",        val: selectedFridge.cnic, mono: true },
                      { key: "Temperature", val: `${selectedFridge.temp}°C` },
                      { key: "Daily energy",val: `${selectedFridge.energy} kWh` },
                      { key: "Start date",  val: selectedFridge.startDate },
                    ].map((r) => (
                      <div key={r.key} style={styles.modalRow}>
                        <span style={styles.modalKey}>{r.key}</span>
                        <span style={{ ...styles.modalVal, fontFamily: r.mono ? "monospace" : "inherit", fontSize: r.mono ? 12 : 13 }}>
                          {r.val}
                        </span>
                      </div>
                    ))}

                    <div style={{ ...styles.modalRow, borderBottom: "none" }}>
                      <span style={styles.modalKey}>Status</span>
                      <span style={styles.badge(selectedFridge.status.toLowerCase())}>{selectedFridge.status}</span>
                    </div>
                    <div style={styles.modalRow}>
                      <span style={styles.modalKey}>Power</span>
                      <span style={styles.badge(selectedFridge.power.toLowerCase())}>{selectedFridge.power}</span>
                    </div>
                  </div>

                  <button
                    className="close-btn-inner"
                    style={styles.closeBtn}
                    onClick={() => setSelectedFridge(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Zones;