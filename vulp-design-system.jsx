import { useState } from "react";

// ============================================================
// VULP DESIGN SYSTEM — Roda da Venda 2.0
// Gerado a partir do Guia de Marca VULP (Fev 2026)
// Para o time de desenvolvimento — Next.js + Tailwind + Shadcn
// ============================================================

// ─── TOKENS EXPORTÁVEIS ─────────────────────────────────────
// Cole isso no seu tailwind.config.js → theme.extend
export const VULP_TOKENS = {
  colors: {
    // PALETA PRIMÁRIA — extraída do Guia de Marca
    "vulp-electric":   "#4500f9",   // Azul elétrico/violeta — cor principal da marca
    "vulp-lilac":      "#cd82ff",   // Lilás — cor de apoio clara
    "vulp-magenta":    "#8e1aa1",   // Magenta/roxo — cor de destaque escura
    "vulp-deep":       "#2a042d",   // Roxo profundo — fundos secundários
    "vulp-void":       "#14021c",   // Quase preto — fundo principal dark
    "vulp-white":      "#f1f1f1",   // Off-white — textos e fundos claros

    // GRADIENTES (stops)
    "grad-dark-start": "#cd82ff",   // Gradiente escuro: lilás top-left
    "grad-dark-mid":   "#43148b",   // Gradiente escuro: roxo meio
    "grad-dark-end":   "#2a042b",   // Gradiente escuro: deep purple bottom-right
    "grad-light-start":"#cd82ff",   // Gradiente claro: lilás
    "grad-light-mid":  "#944cfc",   // Gradiente claro: violeta médio
    "grad-light-end":  "#4500f9",   // Gradiente claro: elétrico

    // SEMÂNTICAS — aplicação na Roda da Venda
    "status-promote":  "#22c55e",   // Verde — Promover
    "status-train":    "#eab308",   // Amarelo — Treinar
    "status-critical": "#f97316",   // Laranja — Plano Crítico
    "status-dismiss":  "#ef4444",   // Vermelho — Revisão desligamento

    // NEUTROS UI
    "ui-surface":      "#1a0a1f",   // Cards e painéis sobre fundo void
    "ui-border":       "#3d1a4a",   // Bordas sutis
    "ui-muted":        "#7c5a8a",   // Texto secundário
    "ui-disabled":     "#4a2e55",   // Estados desabilitados
  },

  gradients: {
    // Uso: background de hero, navbar, splash screens
    "dark":  "linear-gradient(135deg, #cd82ff 0%, #43148b 45%, #2a042b 100%)",
    // Uso: botões primários, badges, CTAs
    "brand": "linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%)",
    // Uso: cards de destaque, áreas da roda
    "glow":  "radial-gradient(ellipse at 30% 20%, rgba(69,0,249,0.4) 0%, transparent 60%)",
  },

  fonts: {
    // TIPOGRAFIA PRIMÁRIA — uso no logotipo e títulos pontuais
    // Não disponível no Google Fonts — requer licença ou self-host
    display: "'Alone', sans-serif",

    // TIPOGRAFIA DE APOIO — uso geral na interface
    // Disponível no Google Fonts: https://fonts.google.com/specimen/Inter
    body: "'Inter', sans-serif",
  },

  fontWeights: {
    light:   300,
    regular: 400,
    medium:  500,
    bold:    700,
    black:   900,
  },

  radii: {
    sm:   "6px",
    md:   "12px",
    lg:   "16px",
    xl:   "24px",
    full: "9999px",
  },

  shadows: {
    // Glow roxo — uso em botões ativos, cards em foco
    "glow-electric": "0 0 24px rgba(69, 0, 249, 0.5)",
    "glow-lilac":    "0 0 16px rgba(205, 130, 255, 0.35)",
    "card":          "0 4px 24px rgba(20, 2, 28, 0.6)",
  },
};

// ─── CSS VARIABLES (cole no globals.css) ────────────────────
export const CSS_VARS = `
/* VULP Design System — cole em globals.css */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

/* Se Alone não estiver disponível, use Inter Black como fallback */
/* @font-face {
  font-family: 'Alone';
  src: url('/fonts/Alone-Regular.woff2') format('woff2');
  font-weight: 400;
}
@font-face {
  font-family: 'Alone';
  src: url('/fonts/Alone-Bold.woff2') format('woff2');
  font-weight: 700;
} */

:root {
  /* Cores principais */
  --vulp-electric:    #4500f9;
  --vulp-lilac:       #cd82ff;
  --vulp-magenta:     #8e1aa1;
  --vulp-deep:        #2a042d;
  --vulp-void:        #14021c;
  --vulp-white:       #f1f1f1;

  /* Gradientes */
  --grad-dark:  linear-gradient(135deg, #cd82ff 0%, #43148b 45%, #2a042b 100%);
  --grad-brand: linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%);
  --grad-glow:  radial-gradient(ellipse at 30% 20%, rgba(69,0,249,0.4) 0%, transparent 60%);

  /* Semânticas da Roda da Venda */
  --status-promote:   #22c55e;
  --status-train:     #eab308;
  --status-critical:  #f97316;
  --status-dismiss:   #ef4444;

  /* Superfícies UI */
  --ui-surface:       #1a0a1f;
  --ui-border:        #3d1a4a;
  --ui-muted:         #7c5a8a;
  --ui-disabled:      #4a2e55;

  /* Tipografia */
  --font-display:     'Alone', 'Inter', sans-serif;
  --font-body:        'Inter', sans-serif;

  /* Sombras */
  --shadow-glow-electric: 0 0 24px rgba(69, 0, 249, 0.5);
  --shadow-glow-lilac:    0 0 16px rgba(205, 130, 255, 0.35);
  --shadow-card:          0 4px 24px rgba(20, 2, 28, 0.6);

  /* Raios */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
}
`;

// ─── TAILWIND CONFIG SNIPPET ─────────────────────────────────
export const TAILWIND_CONFIG = `
// tailwind.config.js — cole dentro de theme.extend
module.exports = {
  theme: {
    extend: {
      colors: {
        vulp: {
          electric:  '#4500f9',
          lilac:     '#cd82ff',
          magenta:   '#8e1aa1',
          deep:      '#2a042d',
          void:      '#14021c',
          white:     '#f1f1f1',
          surface:   '#1a0a1f',
          border:    '#3d1a4a',
          muted:     '#7c5a8a',
        },
        status: {
          promote:   '#22c55e',
          train:     '#eab308',
          critical:  '#f97316',
          dismiss:   '#ef4444',
        },
      },
      fontFamily: {
        display: ["'Alone'", "'Inter'", 'sans-serif'],
        body:    ["'Inter'", 'sans-serif'],
      },
      backgroundImage: {
        'vulp-dark':  'linear-gradient(135deg, #cd82ff 0%, #43148b 45%, #2a042b 100%)',
        'vulp-brand': 'linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%)',
        'vulp-glow':  'radial-gradient(ellipse at 30% 20%, rgba(69,0,249,0.4) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-electric': '0 0 24px rgba(69, 0, 249, 0.5)',
        'glow-lilac':    '0 0 16px rgba(205, 130, 255, 0.35)',
        'card':          '0 4px 24px rgba(20, 2, 28, 0.6)',
      },
      borderRadius: {
        'xl2': '24px',
      },
    },
  },
};
`;

// ============================================================
// PREVIEW VISUAL — Design System em ação
// ============================================================

const C = {
  electric: "#4500f9",
  lilac:    "#cd82ff",
  magenta:  "#8e1aa1",
  deep:     "#2a042d",
  void_:    "#14021c",
  white:    "#f1f1f1",
  surface:  "#1a0a1f",
  border:   "#3d1a4a",
  muted:    "#7c5a8a",
  promote:  "#22c55e",
  train:    "#eab308",
  critical: "#f97316",
  dismiss:  "#ef4444",
};

const grad = {
  dark:  "linear-gradient(135deg, #cd82ff 0%, #43148b 45%, #2a042b 100%)",
  brand: "linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%)",
  light: "linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%)",
};

// ─── PRIMITIVE COMPONENTS ────────────────────────────────────
const Badge = ({ color, children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 10px", borderRadius: 999,
    background: color + "22", border: `1px solid ${color}55`,
    color, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em"
  }}>{children}</span>
);

const StatusBadge = ({ type }) => {
  const map = {
    promote:  { color: C.promote,  label: "Promover" },
    train:    { color: C.train,    label: "Treinar" },
    critical: { color: C.critical, label: "Plano Crítico" },
    dismiss:  { color: C.dismiss,  label: "Revisão" },
  };
  const { color, label } = map[type];
  return <Badge color={color}><span style={{width:6,height:6,borderRadius:"50%",background:color,display:"inline-block"}} />{label}</Badge>;
};

const ScoreBar = ({ score, color }) => (
  <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
    <div style={{ flex:1, height:6, background: C.border, borderRadius:999, overflow:"hidden" }}>
      <div style={{ width: `${score*10}%`, height:"100%", background: color, borderRadius:999, transition:"width 0.6s ease" }} />
    </div>
    <span style={{ color: C.white, fontSize:13, fontWeight:700, minWidth:24 }}>{score}</span>
  </div>
);

const VulpCard = ({ children, style={} }) => (
  <div style={{
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 20,
    boxShadow: `0 4px 24px rgba(20,2,28,0.6)`,
    ...style
  }}>{children}</div>
);

const SectionHeader = ({ title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display:"flex", alignItems:"center", gap: 10, marginBottom: 4 }}>
      <div style={{ width:3, height:20, background: grad.brand, borderRadius:2 }} />
      <h2 style={{ color: C.white, fontSize: 18, fontWeight: 700, margin:0 }}>{title}</h2>
    </div>
    {sub && <p style={{ color: C.muted, fontSize: 13, margin:"0 0 0 13px" }}>{sub}</p>}
  </div>
);

// ─── RADAR WHEEL VISUAL ──────────────────────────────────────
const RadarWheel = ({ scores, labels, size = 200 }) => {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = labels.length;

  const polar = (angle, radius) => {
    const rad = (angle - 90) * Math.PI / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const rings = [2,4,6,8,10].map(v => {
    const rr = r * v / 10;
    const pts = Array.from({length:n},(_,i) => polar(i*360/n, rr).join(",")).join(" ");
    return <polygon key={v} points={pts} fill="none" stroke={C.border} strokeWidth={v===6?1.5:1} />;
  });

  const spokes = Array.from({length:n},(_,i) => {
    const [x,y] = polar(i*360/n, r);
    return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.border} strokeWidth={1} />;
  });

  const scorePts = scores.map((s,i) => polar(i*360/n, r*s/10).join(",")).join(" ");
  const scoreDots = scores.map((s,i) => {
    const [x,y] = polar(i*360/n, r*s/10);
    return <circle key={i} cx={x} cy={y} r={3.5} fill={C.lilac} stroke={C.white} strokeWidth={1.2} />;
  });

  const labelEls = labels.map((label,i) => {
    const [x,y] = polar(i*360/n, r+28);
    const anchor = x < cx-5 ? "end" : x > cx+5 ? "start" : "middle";
    return (
      <text key={i} x={x} y={y+4} textAnchor={anchor}
        fill={C.muted} fontSize={8} fontFamily="Inter" fontWeight={600}>
        {label}
      </text>
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings}{spokes}
      <polygon points={scorePts} fill={C.electric} fillOpacity={0.25} stroke={C.lilac} strokeWidth={1.5} />
      {scoreDots}{labelEls}
      <circle cx={cx} cy={cy} r={3} fill={C.lilac} />
    </svg>
  );
};

// ─── MAIN DESIGN SYSTEM PREVIEW ─────────────────────────────
export default function VulpDesignSystem() {
  const [activeTab, setActiveTab] = useState("tokens");

  const tabs = [
    { id:"tokens",     label:"Tokens & Cores" },
    { id:"typography", label:"Tipografia" },
    { id:"components", label:"Componentes" },
    { id:"screens",    label:"Telas" },
  ];

  const sampleAreas = ["Conv.", "Ticket", "Abord.", "Volume", "Follow", "Prod.", "Comunic.", "Exec.", "Discip.", "Lider."];
  const sampleScores = [7, 5, 8, 4, 3, 6, 7, 5, 8, 4];
  const sampleScores2 = [8, 7, 9, 6, 5, 7, 8, 7, 9, 6];

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: C.void_,
      minHeight: "100vh",
      color: C.white,
    }}>
      {/* HEADER */}
      <div style={{ background: grad.dark, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin:"0 auto", padding:"20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap: 12 }}>
            {/* Fox icon simplified */}
            <svg width={36} height={36} viewBox="0 0 36 36">
              <defs>
                <linearGradient id="foxgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cd82ff" />
                  <stop offset="100%" stopColor="#4500f9" />
                </linearGradient>
              </defs>
              <path d="M18 4 C10 4 5 10 6 16 C7 20 10 22 14 24 C14 24 12 28 12 32 L18 28 L24 32 C24 28 22 24 22 24 C26 22 29 20 30 16 C31 10 26 4 18 4 Z" fill="url(#foxgrad)" />
              <circle cx="14" cy="14" r="2" fill="white" opacity="0.8" />
              <circle cx="22" cy="14" r="2" fill="white" opacity="0.8" />
            </svg>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing:"0.12em" }}>VULP</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing:"0.1em" }}>DESIGN SYSTEM</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
            <Badge color={C.lilac}>Roda da Venda 2.0</Badge>
            <Badge color={C.electric}>v1.0.0</Badge>
          </div>
        </div>

        {/* TABS */}
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:0, borderTop:`1px solid rgba(255,255,255,0.12)` }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:"12px 20px", background:"none", border:"none",
              color: activeTab===t.id ? C.white : "rgba(255,255,255,0.5)",
              fontWeight: activeTab===t.id ? 700 : 400,
              fontSize: 13, cursor:"pointer", position:"relative",
              borderBottom: activeTab===t.id ? `2px solid ${C.lilac}` : "2px solid transparent",
              transition:"all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin:"0 auto", padding:"32px" }}>

        {/* ═══ TAB: TOKENS ═════════════════════════════════════ */}
        {activeTab === "tokens" && (
          <div>
            <SectionHeader title="Paleta de Cores" sub="Extraída do Guia de Marca VULP (Fev 2026)" />

            {/* Primary colors */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12, marginBottom:32 }}>
              {[
                { name:"Electric", hex:"#4500f9", label:"Principal" },
                { name:"Lilac",    hex:"#cd82ff", label:"Apoio" },
                { name:"Magenta",  hex:"#8e1aa1", label:"Destaque" },
                { name:"Deep",     hex:"#2a042d", label:"Fundo 2°" },
                { name:"Void",     hex:"#14021c", label:"Fundo Base" },
                { name:"White",    hex:"#f1f1f1", label:"Texto/Claro" },
              ].map(c => (
                <div key={c.hex} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <div style={{ height:64, background:c.hex }} />
                  <div style={{ background:C.surface, padding:"8px 10px" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:C.white }}>{c.name}</div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"monospace" }}>{c.hex}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{c.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradients */}
            <SectionHeader title="Gradientes" sub="Dois gradientes principais — dark e brand" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
              <div style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
                <div style={{ height:80, background: grad.dark }} />
                <div style={{ background:C.surface, padding:"10px 14px" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.white, marginBottom:2 }}>Dark Gradient</div>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"monospace" }}>#cd82ff → #43148b → #2a042b</div>
                  <div style={{ fontSize:11, color:C.muted }}>Uso: hero, navbar, splash, backgrounds escuros</div>
                </div>
              </div>
              <div style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
                <div style={{ height:80, background: grad.brand }} />
                <div style={{ background:C.surface, padding:"10px 14px" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.white, marginBottom:2 }}>Brand Gradient</div>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"monospace" }}>#cd82ff → #944cfc → #4500f9</div>
                  <div style={{ fontSize:11, color:C.muted }}>Uso: botões primários, badges, CTAs, progress bars</div>
                </div>
              </div>
            </div>

            {/* Status colors */}
            <SectionHeader title="Cores Semânticas — Matriz de Decisão" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:32 }}>
              {[
                { name:"Promover",  hex:"#22c55e", token:"--status-promote",  tw:"status-promote" },
                { name:"Treinar",   hex:"#eab308", token:"--status-train",    tw:"status-train" },
                { name:"Plano Crít.",hex:"#f97316",token:"--status-critical", tw:"status-critical" },
                { name:"Revisão",   hex:"#ef4444", token:"--status-dismiss",  tw:"status-dismiss" },
              ].map(c => (
                <div key={c.hex} style={{ borderRadius:12, border:`1px solid ${c.hex}44`, overflow:"hidden" }}>
                  <div style={{ height:48, background:`${c.hex}22`, borderBottom:`2px solid ${c.hex}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:c.hex, fontWeight:800, fontSize:14 }}>{c.name}</span>
                  </div>
                  <div style={{ background:C.surface, padding:"8px 10px" }}>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"monospace", marginBottom:2 }}>{c.hex}</div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"monospace" }}>{c.token}</div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"monospace" }}>bg-{c.tw}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CSS vars code */}
            <SectionHeader title="Uso em Código" sub="Copie direto para seu projeto" />
            <div style={{ background:"#0a0010", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px", marginBottom:16 }}>
              <div style={{ fontSize:11, color:C.muted, marginBottom:10, fontFamily:"monospace" }}>/* globals.css */</div>
              {[
                "--vulp-electric:    #4500f9;",
                "--vulp-lilac:       #cd82ff;",
                "--vulp-magenta:     #8e1aa1;",
                "--vulp-deep:        #2a042d;",
                "--vulp-void:        #14021c;",
                "--grad-brand: linear-gradient(135deg, #cd82ff 0%, #944cfc 50%, #4500f9 100%);",
                "--grad-dark:  linear-gradient(135deg, #cd82ff 0%, #43148b 45%, #2a042b 100%);",
              ].map((l,i) => (
                <div key={i} style={{ fontFamily:"monospace", fontSize:12, color: l.includes("/*") ? C.muted : "#a8d8a8", marginBottom:3 }}>{l}</div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: TYPOGRAPHY ════════════════════════════════ */}
        {activeTab === "typography" && (
          <div>
            <SectionHeader title="Tipografia" sub="Dois typefaces — display (Alone) e corpo (Inter)" />

            {/* Alone */}
            <VulpCard style={{ marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>TIPOGRAFIA DISPLAY</div>
                  <div style={{ fontSize:20, fontWeight:700, color:C.white }}>Alone</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>Uso: logotipo, títulos hero, elementos de marca pontuais</div>
                </div>
                <Badge color={C.critical}>Requer licença / self-host</Badge>
              </div>
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>Fallback stack: 'Alone', 'Inter', sans-serif</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"monospace", background:"#0a0010", padding:"8px 12px", borderRadius:8 }}>
                  font-family: var(--font-display);
                </div>
                <div style={{ marginTop:16, padding:16, background:"rgba(69,0,249,0.08)", borderRadius:8, border:`1px solid ${C.electric}33` }}>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>⚠️ Alone não está no Google Fonts. Solicite o arquivo ao time de design e faça self-host em /public/fonts/.</div>
                  <div style={{ fontSize:11, fontFamily:"monospace", color:C.lilac }}>@font-face &#123; font-family: 'Alone'; src: url('/fonts/Alone-Regular.woff2'); &#125;</div>
                </div>
              </div>
            </VulpCard>

            {/* Inter */}
            <VulpCard style={{ marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>TIPOGRAFIA DE CORPO</div>
                  <div style={{ fontSize:20, fontWeight:700, color:C.white }}>Inter</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>Uso: toda a interface — textos, labels, botões, formulários, tabelas</div>
                </div>
                <Badge color={C.promote}>Google Fonts — gratuita</Badge>
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif" }}>
                {[
                  { weight:300, label:"Light 300", sample:"Risco sem método é impulso." },
                  { weight:400, label:"Regular 400", sample:"Método sem risco é estagnação." },
                  { weight:500, label:"Medium 500", sample:"Autoridade não vem do cargo. Vem da entrega." },
                  { weight:700, label:"Bold 700", sample:"Performar agora. Liderar depois." },
                  { weight:900, label:"Black 900", sample:"Alta performance começa antes da ação." },
                ].map(({ weight, label, sample }) => (
                  <div key={weight} style={{ display:"flex", alignItems:"baseline", gap:16, padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:11, color:C.muted, minWidth:100, fontFamily:"monospace" }}>{label}</div>
                    <div style={{ fontSize:15, fontWeight:weight, color:C.white }}>{sample}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:12, fontFamily:"monospace", fontSize:11, color:C.muted }}>
                import: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
              </div>
            </VulpCard>

            {/* Scale */}
            <SectionHeader title="Escala Tipográfica" sub="Tamanhos recomendados para a aplicação" />
            <VulpCard>
              {[
                { token:"text-xs",   size:"11px", usage:"Labels de status, metadata, tooltips" },
                { token:"text-sm",   size:"13px", usage:"Texto secundário, legendas, datas" },
                { token:"text-base", size:"15px", usage:"Corpo principal, parágrafos" },
                { token:"text-lg",   size:"18px", usage:"Subheadings, títulos de cards" },
                { token:"text-xl",   size:"22px", usage:"Headings de seção, score numbers" },
                { token:"text-2xl",  size:"28px", usage:"Títulos de página" },
                { token:"text-4xl",  size:"40px", usage:"Score principal em destaque, hero numbers" },
              ].map(({ token, size, usage }) => (
                <div key={token} style={{ display:"grid", gridTemplateColumns:"140px 60px 1fr", alignItems:"baseline", gap:16, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <code style={{ fontSize:11, color:C.lilac, fontFamily:"monospace" }}>{token}</code>
                  <span style={{ fontSize:11, color:C.muted }}>{size}</span>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{usage}</span>
                </div>
              ))}
            </VulpCard>
          </div>
        )}

        {/* ═══ TAB: COMPONENTS ════════════════════════════════ */}
        {activeTab === "components" && (
          <div>

            {/* Buttons */}
            <SectionHeader title="Botões" />
            <VulpCard style={{ marginBottom:24 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
                <button style={{ padding:"10px 22px", borderRadius:8, border:"none", background:grad.brand, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:`0 0 20px rgba(69,0,249,0.4)` }}>
                  Primário
                </button>
                <button style={{ padding:"10px 22px", borderRadius:8, border:`1.5px solid ${C.electric}`, background:"transparent", color:C.lilac, fontWeight:600, fontSize:13, cursor:"pointer" }}>
                  Outline
                </button>
                <button style={{ padding:"10px 22px", borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, color:C.white, fontWeight:500, fontSize:13, cursor:"pointer" }}>
                  Ghost
                </button>
                <button style={{ padding:"10px 22px", borderRadius:8, border:"none", background:C.promote, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  Promover
                </button>
                <button style={{ padding:"10px 22px", borderRadius:8, border:"none", background:C.dismiss, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  Crítico
                </button>
              </div>
              <div style={{ fontFamily:"monospace", fontSize:11, color:C.muted }}>
                Primary: bg-vulp-brand shadow-glow-electric | Outline: border-vulp-electric text-vulp-lilac
              </div>
            </VulpCard>

            {/* Score card */}
            <SectionHeader title="Score Card — Vendedor" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
              <VulpCard>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                  <div>
                    <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>SCORE FINAL</div>
                    <div style={{ fontSize:40, fontWeight:900, background:grad.brand, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>7.4</div>
                    <div style={{ fontSize:11, color:C.muted }}>/ 10 pontos</div>
                  </div>
                  <StatusBadge type="train" />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { area:"Conversão", self:7, leader:8, weight:3 },
                    { area:"Abordagem", self:8, leader:9, weight:3 },
                    { area:"Follow-up", self:3, leader:4, weight:2 },
                  ].map(r => (
                    <div key={r.area}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:12, color:C.white }}>{r.area}</span>
                        <div style={{ display:"flex", gap:6 }}>
                          <Badge color={C.muted}>P{r.weight}</Badge>
                          <span style={{ fontSize:12, color:C.muted }}>Auto: {r.self} | Líder: {r.leader}</span>
                        </div>
                      </div>
                      <ScoreBar score={(r.self+r.leader)/2} color={r.area==="Follow-up" ? C.critical : C.lilac} />
                    </div>
                  ))}
                </div>
              </VulpCard>

              {/* Roda */}
              <VulpCard style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>RODA DA VENDA — Ciclo Atual</div>
                <RadarWheel scores={sampleScores} labels={sampleAreas} size={200} />
                <div style={{ display:"flex", gap:12, marginTop:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:10, height:2, background:C.lilac, borderRadius:1 }} />
                    <span style={{ fontSize:10, color:C.muted }}>Atual</span>
                  </div>
                </div>
              </VulpCard>
            </div>

            {/* Decision matrix */}
            <SectionHeader title="Matriz de Decisão" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[
                { type:"promote",  label:"PROMOVER",     score:"Score > 8", color:C.promote,  criteria:["3 ciclos consecutivos","Alta performance","Liderança > 7"] },
                { type:"train",    label:"TREINAR",      score:"Score 5–7", color:C.train,    criteria:["Gap claro por área","Esforço presente","PDI ativo"] },
                { type:"critical", label:"PLANO CRÍTICO",score:"Score < 5", color:C.critical, criteria:["2 ciclos seguidos","Baixo esforço","Tarefas em atraso"] },
                { type:"dismiss",  label:"REVISÃO",      score:"< 5 / 3 meses", color:C.dismiss, criteria:["PDI não cumprido","Sem evolução","Dupla confirmação"] },
              ].map(d => (
                <div key={d.type} style={{ borderRadius:12, border:`1px solid ${d.color}44`, overflow:"hidden" }}>
                  <div style={{ background:`${d.color}22`, borderBottom:`2px solid ${d.color}`, padding:"10px 14px" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:d.color, letterSpacing:"0.06em" }}>{d.label}</div>
                    <div style={{ fontSize:18, fontWeight:900, color:C.white, marginTop:2 }}>{d.score}</div>
                  </div>
                  <div style={{ background:C.surface, padding:"10px 14px" }}>
                    {d.criteria.map((c,i) => (
                      <div key={i} style={{ display:"flex", gap:6, alignItems:"flex-start", marginBottom:5 }}>
                        <div style={{ width:4, height:4, borderRadius:"50%", background:d.color, marginTop:5, flexShrink:0 }} />
                        <span style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Ranking */}
            <SectionHeader title="Ranking do Time" />
            <VulpCard>
              {[
                { pos:"1°", name:"Carlos M.",    score:8.9, delta:"+0.4", color:C.promote },
                { pos:"2°", name:"Fernanda R.",  score:8.1, delta:"+0.2", color:C.promote },
                { pos:"3°", name:"Lucas T.",     score:7.4, delta:"→",    color:C.train },
                { pos:"4°", name:"Mariana S.",   score:6.2, delta:"-0.3", color:C.critical },
                { pos:"5°", name:"João P.",      score:4.8, delta:"-0.6", color:C.dismiss },
              ].map(r => (
                <div key={r.name} style={{ display:"grid", gridTemplateColumns:"36px 140px 1fr 52px 40px", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontWeight:800, color:r.pos==="1°"||r.pos==="2°"||r.pos==="3°" ? C.lilac : C.muted, fontSize:14 }}>{r.pos}</span>
                  <span style={{ color:C.white, fontSize:13, fontWeight:500 }}>{r.name}</span>
                  <ScoreBar score={r.score} color={r.color} />
                  <span style={{ fontSize:18, fontWeight:900, color:r.color, textAlign:"right" }}>{r.score}</span>
                  <span style={{ fontSize:12, color: r.delta.startsWith("+") ? C.promote : r.delta==="-0" ? C.muted : C.dismiss, textAlign:"right", fontWeight:600 }}>{r.delta}</span>
                </div>
              ))}
            </VulpCard>
          </div>
        )}

        {/* ═══ TAB: SCREENS ════════════════════════════════════ */}
        {activeTab === "screens" && (
          <div>
            <SectionHeader title="Preview de Telas" sub="Estrutura visual das principais telas da aplicação" />

            {/* Navbar */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, color:C.muted, marginBottom:8 }}>NAVBAR</div>
              <div style={{ background: grad.dark, borderRadius:12, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <svg width={24} height={24} viewBox="0 0 36 36">
                    <defs><linearGradient id="n1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#cd82ff"/><stop offset="100%" stopColor="#4500f9"/></linearGradient></defs>
                    <path d="M18 4 C10 4 5 10 6 16 C7 20 10 22 14 24 C14 24 12 28 12 32 L18 28 L24 32 C24 28 22 24 22 24 C26 22 29 20 30 16 C31 10 26 4 18 4 Z" fill="url(#n1)"/>
                  </svg>
                  <span style={{ fontSize:15, fontWeight:800, letterSpacing:"0.08em" }}>VULP</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", borderLeft:`1px solid rgba(255,255,255,0.2)`, paddingLeft:10 }}>Roda da Venda 2.0</span>
                </div>
                <div style={{ display:"flex", gap:20 }}>
                  {["Dashboard","Avaliação","Ranking","Tarefas"].map(n => (
                    <span key={n} style={{ fontSize:13, color:n==="Dashboard"?C.white:"rgba(255,255,255,0.55)", fontWeight:n==="Dashboard"?600:400, cursor:"pointer" }}>{n}</span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:grad.brand, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>NM</div>
                  <span style={{ fontSize:12, color:C.white }}>Nelson M.</span>
                </div>
              </div>
            </div>

            {/* Dashboard Vendedor */}
            <div style={{ marginBottom:16, fontSize:12, color:C.muted }}>DASHBOARD — VENDEDOR</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
              {/* Score principal */}
              <VulpCard style={{ gridColumn:"1/2" }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>MEU SCORE — Ciclo Abril</div>
                <div style={{ fontSize:52, fontWeight:900, background:grad.brand, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>7.4</div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>/ 10 pontos · <span style={{ color:C.promote }}>↑ +0.8 vs último ciclo</span></div>
                <StatusBadge type="train" />
                <div style={{ marginTop:12, padding:"8px 12px", background:`${C.train}15`, borderRadius:8, border:`1px solid ${C.train}33` }}>
                  <div style={{ fontSize:11, color:C.train, fontWeight:600 }}>Foco do PDI: Follow-up e Retorno</div>
                </div>
              </VulpCard>

              {/* Roda */}
              <VulpCard style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>RODA DA VENDA</div>
                <RadarWheel scores={sampleScores} labels={sampleAreas} size={180} />
              </VulpCard>

              {/* Tarefas */}
              <VulpCard>
                <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>MINHAS TAREFAS</div>
                {[
                  { title:"Estudar script de fechamento", due:"Hoje", status:"atrasada", color:C.dismiss },
                  { title:"Simulação de venda 3x semana", due:"Amanhã", status:"pendente", color:C.train },
                  { title:"Registrar 10 atendimentos", due:"28 Abr", status:"andamento", color:C.lilac },
                ].map((t,i) => (
                  <div key={i} style={{ padding:"8px 0", borderBottom: i<2 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize:12, color:C.white, marginBottom:3 }}>{t.title}</div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:11, color:C.muted }}>{t.due}</span>
                      <Badge color={t.color}>{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </VulpCard>
            </div>

            {/* Dashboard Líder */}
            <div style={{ marginBottom:16, fontSize:12, color:C.muted }}>DASHBOARD — LÍDER</div>
            <VulpCard style={{ marginBottom:24 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:16, marginBottom:20 }}>
                {[
                  { label:"Vendedores", value:"8", color:C.lilac },
                  { label:"Média do Time", value:"6.8", color:C.electric },
                  { label:"Em Plano Crítico", value:"2", color:C.critical },
                  { label:"Candidatos Promoção", value:"1", color:C.promote },
                ].map(m => (
                  <div key={m.label} style={{ textAlign:"center", padding:"12px", background:C.void_, borderRadius:10, border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:28, fontWeight:900, color:m.color }}>{m.value}</div>
                    <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              {/* Team list */}
              <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>EQUIPE — por score</div>
              {[
                { name:"Carlos M.",   score:8.9, status:"promote",  gap:0.5 },
                { name:"Fernanda R.", score:8.1, status:"promote",  gap:0.8 },
                { name:"Lucas T.",    score:7.4, status:"train",    gap:1.2 },
                { name:"João P.",     score:4.8, status:"critical", gap:2.1 },
              ].map(v => (
                <div key={v.name} style={{ display:"grid", gridTemplateColumns:"160px 1fr 80px 100px 90px", alignItems:"center", gap:12, padding:"8px 0", borderTop:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:13, color:C.white, fontWeight:500 }}>{v.name}</span>
                  <ScoreBar score={v.score} color={v.status==="promote" ? C.promote : v.status==="train" ? C.train : C.critical} />
                  <span style={{ fontSize:16, fontWeight:800, color:v.status==="promote"?C.promote:v.status==="train"?C.train:C.critical, textAlign:"right" }}>{v.score}</span>
                  <div style={{ textAlign:"center" }}><StatusBadge type={v.status} /></div>
                  <div style={{ textAlign:"right" }}>
                    <span style={{ fontSize:11, color:v.gap<1 ? C.promote : v.gap<2 ? C.train : C.critical }}>Gap: {v.gap}</span>
                  </div>
                </div>
              ))}
            </VulpCard>

          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop:`1px solid ${C.border}`, padding:"16px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:11, color:C.muted }}>VULP Design System · Roda da Venda 2.0 · Gerado a partir do Guia de Marca (Fev 2026)</div>
        <div style={{ display:"flex", gap:8 }}>
          <Badge color={C.lilac}>Next.js 14</Badge>
          <Badge color={C.electric}>Tailwind CSS</Badge>
          <Badge color={C.muted}>Shadcn/UI</Badge>
        </div>
      </div>
    </div>
  );
}
