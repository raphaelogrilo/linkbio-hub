"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/lib/getClient";
import Icons from "@/components/Icons";

export default function LinkBioPage({ client: c }: { client: Client }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const n = new Date();
    const d = n.getDay();
    const h = n.getHours() + n.getMinutes() / 60;
    const wdOpen = d >= c.openHours.weekStart && d <= c.openHours.weekEnd && h >= c.openHours.from && h < c.openHours.to;
    const satOpen = d === 6 && h >= c.openSat.from && h < c.openSat.to;
    setOpen(wdOpen || satOpen);
  }, [c]);

  const accent = c.theme.accent;
  const accentDark = c.theme.accentDark;
  const rgb = hexToRgb(accent);

  // Separate instagram links from doctor link
  const mainLinks = c.links.filter((l) => l.icon !== "person");
  const doctorLink = c.links.find((l) => l.icon === "person");

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(125% 55% at 50% -5%, ${c.theme.gradFrom} 0%, ${c.theme.gradMid} 45%, ${c.theme.gradTo} 100%)`, fontFamily: "'Poppins', sans-serif", display: "flex", justifyContent: "center", paddingBottom: 48 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');
        @keyframes riseIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes softPulse { 0%,100% { box-shadow:0 10px 30px -8px rgba(38,116,217,.55); } 50% { box-shadow:0 14px 40px -6px rgba(38,116,217,.8); } }
        @keyframes livePulse { 0% { box-shadow:0 0 0 0 rgba(45,211,111,.55); } 70% { box-shadow:0 0 0 7px rgba(45,211,111,0); } 100% { box-shadow:0 0 0 0 rgba(45,211,111,0); } }
        @keyframes deadPulse { 0% { box-shadow:0 0 0 0 rgba(224,166,77,.55); } 70% { box-shadow:0 0 0 7px rgba(224,166,77,0); } 100% { box-shadow:0 0 0 0 rgba(224,166,77,0); } }
        .rise { animation: riseIn .6s ease both; }
        .btn-primary-anim { animation: softPulse 3s ease-in-out infinite, riseIn .6s ease both; }
        .live-dot { animation: livePulse 2s infinite; }
        .dead-dot { animation: deadPulse 2s infinite; }
        .link-card:hover { transform: translateY(-2px); background: rgba(255,255,255,.1) !important; border-color: rgba(231,200,120,.4) !important; }
        .btn-hover:hover { transform: translateY(-2px); }
        .addr-card:hover { border-color: rgba(231,200,120,.45) !important; background: linear-gradient(160deg, rgba(${rgb},.15), rgba(255,255,255,.05)) !important; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 440, padding: "0 22px", boxSizing: "border-box" }}>

        {/* top bar */}
        <div className="rise" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 2px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(150deg, ${accent}, ${accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px -6px rgba(199,155,70,.7)` }}>
              <Icons.Tooth size={21} color={c.theme.gradMid} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: .2 }}>{c.name}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: accent, letterSpacing: 2.4, marginTop: 3 }}>ODONTOLOGIA</div>
            </div>
          </div>
          {open !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: 999, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
              <span className={open ? "live-dot" : "dead-dot"} style={{ width: 8, height: 8, borderRadius: "50%", background: open ? "#2dd36f" : "#e0a64d", display: "inline-block" }} />
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "#eaf1fb", letterSpacing: .2 }}>{open ? "Aberto agora" : "Fechado"}</span>
            </div>
          )}
        </div>

        {/* hero */}
        <div className="rise" style={{ textAlign: "center", marginTop: 30 }}>
          <div style={{ position: "relative", width: 132, height: 132, margin: "0 auto" }}>
            <div style={{ position: "absolute", inset: -7, borderRadius: "50%", background: `conic-gradient(from 220deg, ${accent}, ${accentDark}, #8d6f2e, ${accent})` }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `4px solid ${c.theme.gradMid}`, overflow: "hidden", background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.photo
                ? <img src={c.photo} alt={c.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <Icons.Tooth size={52} color={accent} style={{ opacity: .35 }} />
              }
            </div>
          </div>

          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 27, fontWeight: 600, color: "#fff", margin: "24px 0 0", lineHeight: 1.15 }}>
            {c.fullName.split(" ").slice(0, 1).join(" ")} {c.fullName.split(" ").slice(1, 2).join(" ")}<br />
            <span style={{ color: accent }}>{c.fullName.split(" ").slice(2).join(" ")} · Implante</span>
          </h1>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#aec4de", margin: "11px 0 0", letterSpacing: .2 }}>{c.tagline}</p>
        </div>

        {/* intro */}
        <p style={{ textAlign: "center", fontSize: 13.5, fontWeight: 500, color: "#cdddf0", margin: "26px 4px 4px", lineHeight: 1.5 }}>{c.intro}</p>

        {/* primary CTA */}
        <a href={c.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary-anim btn-hover" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, padding: "17px 18px", borderRadius: 18, background: `linear-gradient(135deg, ${c.theme.primary}, ${c.theme.primaryDark})`, textDecoration: "none", transition: "transform .18s ease" }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icons.Calendar size={23} color="#fff" />
          </div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: "#fff" }}>{c.cta.label}</div>
            <div style={{ fontSize: 11, fontWeight: 400, color: "#d6e6fb", marginTop: 3 }}>{c.cta.sub}</div>
          </div>
          <span style={{ background: accent, color: c.theme.gradMid, fontSize: 9.5, fontWeight: 800, letterSpacing: .3, padding: "5px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{c.cta.tag}</span>
        </a>

        {/* services */}
        <div style={{ marginTop: 16, padding: "20px 18px", borderRadius: 20, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 14 }}>Nossos Serviços</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {c.services.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 13px", borderRadius: 13, background: `rgba(${rgb},.08)`, border: `1px solid rgba(${rgb},.15)` }}>
                <Icons.Service index={i} size={17} color={accent} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#f2f7fc", lineHeight: 1.3 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* instagram + other main links */}
        {mainLinks.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="link-card btn-hover" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 13, padding: "15px 17px", borderRadius: 18, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.1)", textDecoration: "none", backdropFilter: "blur(6px)", transition: "transform .18s ease, background .18s ease, border-color .18s ease" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `rgba(${rgb},.14)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: accent }}>
              <Icons.Link icon={link.icon as "map" | "instagram" | "person"} size={20} />
            </div>
            <div style={{ flex: 1, lineHeight: 1.2 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: "#f2f7fc" }}>{link.title}</div>
              <div style={{ fontSize: 11, fontWeight: 400, color: "#9fb6d2", marginTop: 3 }}>{link.sub}</div>
            </div>
            <Icons.Chevron />
          </a>
        ))}

        {/* address + hours — clickable → Google Maps */}
        <a href={c.address.mapsHref} target="_blank" rel="noopener noreferrer" className="addr-card btn-hover" style={{ display: "block", marginTop: 24, padding: "20px 18px", borderRadius: 20, background: `linear-gradient(160deg, rgba(${rgb},.1), rgba(255,255,255,.03))`, border: `1px solid rgba(${rgb},.22)`, textDecoration: "none", transition: "border-color .18s ease, background .18s ease, transform .18s ease" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `rgba(${rgb},.16)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: accent }}>
              <Icons.Pin size={19} />
            </div>
            <div style={{ lineHeight: 1.45, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f2f7fc" }}>{c.address.street}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "#9fb6d2" }}>{c.address.city}</div>
            </div>
            <Icons.Chevron />
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "15px 0" }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `rgba(${rgb},.16)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: accent }}>
              <Icons.Clock size={19} />
            </div>
            <div style={{ flex: 1, lineHeight: 1.6 }}>
              {c.hours.map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#cdddf0" }}>
                  <span style={{ fontWeight: 500 }}>{h.days}</span>
                  <span style={{ fontWeight: 400, color: "#9fb6d2" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </a>

        {/* footer */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 400, color: "#6f88a6", letterSpacing: .3, margin: 0 }}>{c.footer}</p>
          {doctorLink && (
            <a href={doctorLink.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#6f88a6", fontSize: 10, letterSpacing: .2, transition: "color .18s ease" }} onMouseOver={e => (e.currentTarget.style.color = accent)} onMouseOut={e => (e.currentTarget.style.color = "#6f88a6")}>
              <Icons.Link icon="person" size={12} color="currentColor" />
              {doctorLink.title}
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
