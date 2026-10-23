"use client";
import { useState, useRef } from "react";

const clips = [
  { id: "Wc5IbN4xw70", user: "Tyla", caption: "Water • International Clip 🇿🇦", song: "Water • International Clip", likes: "1240" },
  { id: "gQlMMD8auMs", user: "Tito Daza", caption: "Te pasas apoco te casaste 😂 #foryoupage", song: "SUPERESTRELLA - La R", likes: "115" },
  { id: "3y-O-4IL-PU", user: "Rema", caption: "Calm down 🌍 #foryou #viral", song: "Rema - Calm Down", likes: "2.3k" },
];

export default function Page() {
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const startY = useRef(0);
  const c = clips[i];

  const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 50) setI((v) => (v + 1) % clips.length);
    if (diff < -50) setI((v) => (v - 1 + clips.length) % clips.length);
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ background: "black", height: "100dvh", width: "100vw", position: "relative", overflow: "hidden", color: "white" }}>
      
      {/* VIDEO FULLSCREEN - NO BLACK BARS */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <iframe
          key={`${c.id}-${muted}`}
          src={`https://www.youtube-nocookie.com/embed/${c.id}?autoplay=1&mute=${muted?1:0}&controls=0&loop=1&playlist=${c.id}&playsinline=1&enablejsapi=1`}
          style={{ position: "absolute", top: "50%", left: "50%", width: "100vh", height: "100vw", minWidth: "177.77vh", minHeight: "100vw", transform: "translate(-50%, -50%) rotate(0deg)", border: 0 }}
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Tap anywhere to unmute - like TikTok */}
      {muted && (
        <button onClick={() => setMuted(false)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 20, background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid white", padding: "10px 18px", borderRadius: "20px", fontSize: "14px" }}>
          🔊 Tap for sound
        </button>
      )}

      {/* TOP */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "space-between", padding: "12px", background: "linear-gradient(rgba(0,0,0,0.5), transparent)", fontWeight: "bold" }}>
        <div>☰</div><div>For You</div><div>🔍</div>
      </div>

      {/* RIGHT BAR - like your screenshot */}
      <div style={{ position: "absolute", right: "8px", top: "28%", bottom: "90px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "rgba(80,80,80,0.8)", borderRadius: "20px", padding: "10px 8px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
            <div>•••</div><div style={{ width: "3px", height: "70px", background: "#3b82f6", borderRadius: "2px" }}></div><div>🎵</div>
          </div>
          <div style={{ background: "rgba(80,80,80,0.8)", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div onClick={() => setMuted(!muted)} style={{ background: muted ? "rgba(80,80,80,0.8)" : "red", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>❤️</div>
            <div style={{ fontSize: "12px", marginTop: "4px" }}>{c.likes}</div>
          </div>
          <div style={{ background: "rgba(80,80,80,0.8)", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>↗️</div>
        </div>
      </div>

      {/* BOTTOM INFO - like your screenshot */}
      <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "70px", zIndex: 10 }}>
        <div style={{ fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "center", gap: "6px" }}>🇿🇦 {c.user}</div>
        <div style={{ fontSize: "14px", marginTop: "4px" }}>♪ {c.song}</div>
        <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "2px" }}>World Clip • Data Lite for Africa</div>
      </div>
    </div>
  );
}
