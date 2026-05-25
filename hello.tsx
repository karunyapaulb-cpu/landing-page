import { useState } from "react";

const weeks = [
  {
    code: "W1", num: "01", title: "Context, Urgency & Foundations",
    sub: "Shift from student to professional mindset",
    accent: "#E8C547", accentRgb: "232,197,71",
    sessions: [
      { code: "S1", full: "Careers in the AI Era: Threat, Opportunity & Survival Toolkit", output: "AI Tools & Work Map" },
      { code: "S2", full: "Structured Thinking → Prompting Mastery", output: "Personal Prompt Library" },
    ],
  },
  {
    code: "W2", num: "02", title: "Research & Analytical Thinking Lab",
    sub: "Think like professionals, not students",
    accent: "#F4845F", accentRgb: "244,132,95",
    sessions: [
      { code: "S3", full: "Research Thinking with AI Tools", output: "Industry Research Brief" },
      { code: "S4", full: "Business Analysis & Case Thinking with AI", output: "Mini Business Case" },
    ],
  },
  {
    code: "W3", num: "03", title: "Professional Communication & Work Execution",
    sub: "Effective communicators and reliable executors",
    accent: "#7EC8A4", accentRgb: "126,200,164",
    sessions: [
      { code: "S5", full: "Professional Writing Lab with AI", output: "Professional Writing Pack" },
      { code: "S6", full: "Meetings, Documentation & Project Tracking", output: "Meeting-to-Action Pack" },
    ],
  },
  {
    code: "W4", num: "04", title: "Presentations & Business Storytelling",
    sub: "Think before you open PowerPoint",
    accent: "#C9A0DC", accentRgb: "201,160,220",
    sessions: [
      { code: "S7", full: "Slide Thinking & Storyboarding Lab", output: "Presentation Storyboard" },
      { code: "S8", full: "Building Business-Ready Presentations with AI", output: "Presentation Deck" },
    ],
  },
  {
    code: "W5", num: "05", title: "Excel, Data & Productivity Systems",
    sub: "Decision-oriented data thinking",
    accent: "#F4A261", accentRgb: "244,162,97",
    sessions: [
      { code: "S9", full: "Excel & Data Reasoning Lab with AI", output: "Data Insight Report" },
      { code: "S10", full: "Building a Personal AI Productivity System", output: "AI Workflow SOP" },
    ],
  },
  {
    code: "W6", num: "06", title: "Career Application & Placement Readiness",
    sub: "Convert learning into placement outcomes",
    accent: "#5BC4D1", accentRgb: "91,196,209",
    sessions: [
      { code: "S11", full: "Career Mapping & Career Intelligence Lab", output: "Career Intelligence Report" },
      { code: "S12", full: "Resume, LinkedIn & Interview Readiness Lab", output: "Career Readiness Kit" },
    ],
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  .cr * { box-sizing: border-box; margin: 0; padding: 0; }

  .cr {
    font-family: 'Outfit', sans-serif;
    background: #0d1b2e;
    min-height: 100vh;
    padding: 52px 36px 72px;
  }

  .cr-inner { max-width: 1080px; margin: 0 auto; }

  .cr-head {
    margin-bottom: 52px;
    display: flex; align-items: flex-end;
    justify-content: space-between; flex-wrap: wrap; gap: 20px;
  }

  .cr-overline {
    font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: #3d5a7a; margin-bottom: 14px;
  }

  .cr-title {
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(32px, 4.5vw, 52px);
    font-weight: 700; line-height: 1.1; color: #e8e0d4;
  }
  .cr-title em { font-style: italic; color: #c9a96e; }

  .cr-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .cr-pill {
    font-size: 11px; font-weight: 500; color: #4a7599;
    border: 1px solid #1a3050; border-radius: 20px;
    padding: 5px 14px; letter-spacing: 0.04em; background: #0f2338;
  }

  .cr-rule {
    height: 1px;
    background: linear-gradient(90deg, #1e3a55 0%, #1a3050 60%, transparent 100%);
    margin-bottom: 36px;
  }

  /* ── 2-row × 3-col calendar grid ── */
  .cr-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  @media (max-width: 640px) { .cr-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 400px) { .cr-grid { grid-template-columns: 1fr; } }

  /* ── Week card ── */
  .wk {
    border-radius: 10px;
    background: #f5eedc;
    border: 1px solid #d4c4a8;
    padding: 18px 16px 14px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.18s, background 0.18s, transform 0.14s;
    text-align: left; width: 100%; display: block;
  }
  .wk:hover { transform: translateY(-2px); border-color: #c0a87a; }

  .wk.open {
    border-color: var(--acc);
    background: #ede5cc;
    box-shadow: 0 0 0 1px var(--acc), 0 8px 24px rgba(0,0,0,0.3);
  }

  .wk-top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 10px 10px 0 0;
    background: var(--acc); opacity: 0;
    transition: opacity 0.18s;
  }
  .wk.open .wk-top-bar, .wk:hover .wk-top-bar { opacity: 1; }

  .wk-ghost {
    font-family: 'Libre Baskerville', serif;
    font-size: 60px; font-weight: 700;
    position: absolute; bottom: -10px; right: -2px;
    line-height: 1; color: var(--acc);
    opacity: 0.06; transition: opacity 0.18s;
    pointer-events: none; user-select: none;
  }
  .wk:hover .wk-ghost, .wk.open .wk-ghost { opacity: 0.13; }

  .wk-badge {
    display: inline-block;
    font-size: 9px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--acc);
    border: 1px solid var(--acc); border-radius: 3px;
    padding: 2px 6px; margin-bottom: 12px; opacity: 0.85;
    background: rgba(var(--acc-rgb), 0.12);
  }

  .wk-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 13px; font-weight: 700; line-height: 1.35;
    color: #2a1f0e; margin-bottom: 7px;
  }
  .wk.open .wk-title { color: #1a1208; }

  .wk-sub {
    font-size: 10px; font-weight: 300; color: #7a6a52;
    line-height: 1.45; margin-bottom: 14px;
  }

  .wk-foot {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid #ddd0b8; padding-top: 10px;
  }
  .wk-count { font-size: 9.5px; font-weight: 500; color: #9a8a72; letter-spacing: 0.06em; }
  .wk-chev {
    width: 13px; height: 13px; color: #b0a080;
    transition: transform 0.22s ease, color 0.18s; flex-shrink: 0;
  }
  .wk.open .wk-chev { transform: rotate(180deg); color: var(--acc); }

  /* ── Session panel: below entire grid ── */
  .cr-panel {
    margin-top: 16px;
    border-radius: 12px;
    background: #091726;
    border: 1px solid #d4c4a8;
    padding: 24px 28px;
    animation: panelIn 0.22s cubic-bezier(.22,.68,0,1.1) both;
    position: relative;
    overflow: hidden;
  }

  @keyframes panelIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* coloured top bar matching the selected week */
  .cr-panel-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 12px 12px 0 0;
    background: var(--acc);
  }

  .cr-panel-head {
    display: flex; align-items: baseline; gap: 12px;
    margin-bottom: 20px; flex-wrap: wrap;
  }
  .cr-panel-week {
    font-size: 10px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--acc); opacity: 0.9;
  }
  .cr-panel-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 17px; font-weight: 700; color: #e0eaf4;
  }

  .cr-panel-sessions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 500px) { .cr-panel-sessions { grid-template-columns: 1fr; } }

  .sess {
    border-radius: 8px;
    background: #0d1f30;
    border: 1px solid #d4c4a8;
    border-left: 3px solid var(--acc);
    padding: 14px 14px 12px 16px;
  }

  .sess-code {
    font-size: 9px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--acc); opacity: 0.8;
    margin-bottom: 7px;
  }

  .sess-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 12px; font-weight: 400; color: #90adc4;
    line-height: 1.45; margin-bottom: 10px; font-style: italic;
  }

  .sess-out {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 9px; font-weight: 500; letter-spacing: 0.05em;
    color: var(--acc);
    background: rgba(var(--acc-rgb), 0.1);
    border-radius: 4px; padding: 3px 8px;
  }
  .sess-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--acc); flex-shrink: 0; }

  /* ── Legend ── */
  .cr-legend {
    margin-top: 44px;
    display: flex; flex-wrap: wrap;
    border: 1px solid #152d45; border-radius: 10px; overflow: hidden;
  }
  .cr-leg-item {
    flex: 1; min-width: 140px; padding: 14px 16px;
    border-right: 1px solid #152d45;
    display: flex; align-items: center; gap: 10px;
  }
  .cr-leg-item:last-child { border-right: none; }
  .cr-leg-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .cr-leg-text { font-size: 10px; font-weight: 500; color: #2d4d6a; line-height: 1.3; }
  .cr-leg-code { font-size: 9px; color: #1e3a55; display: block; margin-top: 1px; letter-spacing: 0.06em; }
`;

export default function CourseCalendar() {
  const [open, setOpen] = useState<number | null>(null);
  const selected = open !== null ? weeks[open] : null;

  return (
    <>
      <style>{css}</style>
      <div className="cr">
        <div className="cr-inner">

          <div className="cr-head">
            <div>
              <p className="cr-overline">Professional Development Program · 2025</p>
              <h1 className="cr-title">Six-Week<br /><em>Career Sprint</em></h1>
            </div>
            <div className="cr-pills">
              <span className="cr-pill">6 Weeks</span>
              <span className="cr-pill">12 Sessions</span>
              <span className="cr-pill">AI-Powered</span>
            </div>
          </div>

          <div className="cr-rule" />

          {/* Calendar grid — always 2 rows × 3 cols, no layout shift */}
          <div className="cr-grid">
            {weeks.map((w, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={w.code}
                  className={`wk${isOpen ? " open" : ""}`}
                  style={{ "--acc": w.accent, "--acc-rgb": w.accentRgb } as React.CSSProperties}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="wk-top-bar" />
                  <div className="wk-ghost">{w.num}</div>
                  <div className="wk-badge">{w.code}</div>
                  <h2 className="wk-title">{w.title}</h2>
                  <p className="wk-sub">{w.sub}</p>
                  <div className="wk-foot">
                    <span className="wk-count">{w.sessions.length} sessions</span>
                    <svg className="wk-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Session panel — renders below the full grid */}
          {selected && (
            <div
              key={open}
              className="cr-panel"
              style={{ "--acc": selected.accent, "--acc-rgb": selected.accentRgb } as React.CSSProperties}
            >
              <div className="cr-panel-bar" />
              <div className="cr-panel-head">
                <span className="cr-panel-week">{selected.code}</span>
                <span className="cr-panel-title">{selected.title}</span>
              </div>
              <div className="cr-panel-sessions">
                {selected.sessions.map((s, si) => (
                  <div key={s.code} className="sess">
                    <div className="sess-code">{s.code} · {String((open! * 2) + si + 1).padStart(2, "0")}</div>
                    <p className="sess-title">{s.full}</p>
                    <div className="sess-out">
                      <div className="sess-dot" />
                      {s.output}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cr-legend">
            {weeks.map(w => (
              <div className="cr-leg-item" key={w.code}>
                <div className="cr-leg-dot" style={{ background: w.accent }} />
                <div className="cr-leg-text">
                  {w.title.split(" ").slice(0, 2).join(" ")}
                  <span className="cr-leg-code">{w.code} · {w.sessions.length} sessions</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
