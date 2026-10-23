"use client";
import { useState, useRef } from "react";

type Clip = { url: string; user: string; caption: string; sound: string; likes: number; liked: boolean };

const initialClips: Clip[] = [
  { url: "https://www.w3schools.com/html/mov_bbb.mp4", user: "Tito Daza", caption: "Neon nights ✨ SUPERESTRELLA live 🔥 #newmusic #southafrica", sound: "SUPERESTRELLA - La R", likes: 115, liked: true },
  { url: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720p.mp4", user: "Tyla", caption: "Water dance 💧 #foryou #viral #southafrica", sound: "Water - Tyla", likes: 1240, liked: false },
  { url: "https://www.w3schools.com/html/movie.mp4", user: "Rema", caption: "Calm down dance 🌍 #calmdown #afrobeats", sound: "Calm Down - Rema", likes: 3200, liked: false },
];

export default function Page() {
  const [list, setList] = useState(initialClips);
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const startY = useRef(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const c = list[i];

  const filtered = list.filter(cl => cl.caption.toLowerCase().includes(query.toLowerCase()) || cl.user.toLowerCase().includes(query.toLowerCase()) || cl.sound.toLowerCase().includes(query.toLowerCase()));

  const onTouch = (e: any) => {
    if(e.type==='touchstart') startY.current = e.touches[0].clientY;
    else { const d = startY.current - e.changedTouches[0].clientY; if(d>50) setI(v=>(v+1)%list.length); if(d<-50) setI(v=>(v-1+list.length)%list.length); }
  };

  const onUpload = (e: any) => {
    const f = e.target.files[0]; if(!f) return;
    const url = URL.createObjectURL(f);
    setList([{ url, user: "You", caption: `${f.name} #worldclip`, sound: "Original sound - You", likes: 0, liked: false }, ...list]);
    setI(0); setMuted(false);
  };

  return (
    <div onTouchStart={onTouch} onTouchEnd={onTouch} onClick={()=> muted && setMuted(false)} style={{ height: "100dvh", width: "100vw", background: "black", position: "relative", overflow: "hidden", color: "white" }}>
      
      <video key={c.url} src={c.url} autoPlay loop playsInline muted={muted} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

      {/* TOP */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px 14px", display: "flex", justifyContent: "space-between", zIndex: 10, background: "linear-gradient(rgba(0,0,0,0.6), transparent)", fontWeight: "bold" }}>
        <span onClick={()=> fileRef.current?.click()}>☰ Upload</span><span>For You</span>
        <span onClick={(e)=> { e.stopPropagation(); setShowSearch(true); }}>🔍</span>
      </div>
      <input ref={fileRef} type="file" accept="video/*" hidden onChange={onUpload} />

      {/* RIGHT BUTTONS */}
      <div style={{ position: "absolute", right: "10px", bottom: "30px", zIndex: 10, display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <div onClick={(e)=> { e.stopPropagation(); setList(a=> a.map((cl,idx)=> idx===i ? {...cl, liked: !cl.liked, likes: cl.liked ? cl.likes-1 : cl.likes+1} : cl)); }} style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: c.liked ? "#fe2c55" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>❤️</div>
          <div style={{ fontSize: "12px", marginTop: "4px", fontWeight: "bold" }}>{c.likes}</div>
        </div>
        <div style={{ textAlign: "center" }}><div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>💬</div><div style={{ fontSize: "11px" }}>Comment</div></div>
        <div style={{ textAlign: "center" }}><div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>↗️</div><div style={{ fontSize: "11px" }}>Share</div></div>
      </div>

      <div style={{ position: "absolute", bottom: "14px", left: "12px", right: "70px", zIndex: 10 }}>
        <div style={{ fontWeight: "bold" }}>🇿🇦 {c.user}</div>
        <div style={{ fontSize: "14px", marginTop: "4px" }}>{c.caption}</div>
        <div style={{ fontSize: "13px", marginTop: "6px" }}>🎵 {c.sound}</div>
      </div>

      {/* SEARCH WORKS NOW */}
      {showSearch && (
        <div style={{ position: "absolute", inset: 0, background: "black", zIndex: 30, padding: "12px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input autoFocus value={query} onChange={e=> setQuery(e.target.value)} placeholder="Search users, sounds, hashtags..." style={{ flex: 1, background: "#222", border: "none", borderRadius: "20px", padding: "12px 14px", color: "white", fontSize: "15px" }} />
            <span onClick={()=> setShowSearch(false)} style={{ fontSize: "14px" }}>Cancel</span>
          </div>
          <div style={{ marginTop: "16px" }}>
            {query==="" ? <div style={{ opacity: 0.6, fontSize: "13px" }}>Try: "Tyla", "SUPERESTRELLA", "#viral"</div> : null}
            {filtered.map((cl, idx) => (
              <div key={idx} onClick={()=> { const realIndex = list.indexOf(cl); setI(realIndex); setShowSearch(false); setQuery(""); }} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: "1px solid #222" }}>
                <div style={{ width: "48px", height: "64px", background: "#222", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>▶️</div>
                <div><div style={{ fontWeight: "bold", fontSize: "14px" }}>{cl.user}</div><div style={{ fontSize: "12px", opacity: 0.7 }}>{cl.caption.slice(0, 50)}</div><div style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>♪ {cl.sound}</div></div>
              </div>
            ))}
            {filtered.length===0 && query!=="" && <div style={{ marginTop: "20px", textAlign: "center", opacity: 0.5 }}>No results for "{query}"</div>}
          </div>
        </div>
      )}
    </div>
  );
      }
