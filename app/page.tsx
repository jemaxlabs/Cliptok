// START - Paste in page.tsx
"use client";
import { useState, useRef } from "react";

const clips = [
  { id: "Wc5IbN4xw70", artist: "Rema", song: "Calm Down", flag: "🇳🇬" },
  { id: "gQlMMD8auMs", artist: "Tyla", song: "Water", flag: "🇿🇦" },
  { id: "3y-O-4IL-PU", artist: "Ayra Starr", song: "Rush", flag: "🇳🇬" },
  { id: "h5oHhGlWKf0", artist: "Libianca", song: "People", flag: "🇨🇲" },
  { id: "1m4_Y1P_Q3Y", artist: "Fave", song: "Baby Riddim", flag: "🇳🇬" },
  { id: "JGwWNGJdvx8", artist: "Ed Sheeran", song: "Shape of You", flag: "🇬🇧" },
  { id: "kJQP7kiw5Fk", artist: "Luis Fonsi", song: "Despacito", flag: "🇵🇷" },
  { id: "OPf0YbXqDm0", artist: "Mark Ronson", song: "Uptown Funk", flag: "🇺🇸" },
];

export default function Cliptok() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>(Array(clips.length).fill(1240));
  
  const clip = clips[index];

  const next = () => setIndex((i) => (i + 1) % clips.length);
  const prev = () => setIndex((i) => (i - 1 + clips.length) % clips.length);

  return (
    <div style={{ background: "black", height: "100vh", width: "100vw", overflow: "hidden", position: "relative", color: "white" }}>
      {/* VIDEO */}
      <iframe
        key={clip.id}
        src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${clip.id}`}
        style={{ width: "100%", height: "100vh", border: 0 }}
        allow="autoplay; fullscreen"
      />
      
      {/* OVERLAY */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(transparent, rgba(0,0,0,0.9))" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>{clip.flag} {clip.artist}</h2>
        <p style={{ opacity: 0.8 }}>♫ {clip.song} • International Clip</p>
        <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "8px" }}>World Clip • Data Lite for Africa</p>
      </div>

      {/* SIDE BUTTONS */}
      <div style={{ position: "absolute", right: "15px", bottom: "120px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <button onClick={() => { const n=[...likes]; n[index]++; setLikes(n); }} style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px" }}>❤️</button>
        <span style={{ fontSize: "12px" }}>{likes[index]}</span>
        <button style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: "50px", height: "50px" }}>↗️</button>
      </div>

      {/* SWIPE BUTTONS */}
      <button onClick={prev} style={{ position: "absolute", top: "50%", left: "10px", background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: "40px", height: "40px" }}>↑</button>
      <button onClick={next} style={{ position: "absolute", top: "50%", right: "10px", background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: "40px", height: "40px" }}>↓</button>
      
      <div style={{ position: "absolute", top: "15px", left: "15px", fontSize: "12px", background: "red", padding: "4px 8px", borderRadius: "4px" }}>LIVE • {index+1}/{clips.length}</div>
    </div>
  );
}
// END
