"use client";
import { useState, useRef } from "react";

type Clip = { id?: string; url?: string; user: string; caption: string; sound: string; likes: number; liked: boolean };

const initialClips: Clip[] = [
  { id: "Wc5IbN4xw70", user: "Tito Daza", caption: "The fire that'll slowly put you to sleep, so beautiful #foryou #fyp", sound: "SUPERESTRELLA - La R", likes: 115, liked: false },
  { id: "gQlMMD8auMs", user: "Tyla", caption: "Water dance 💧 #foryou #water #viral 🇿🇦", sound: "Water • International Clip", likes: 1240, liked: true },
];

export default function Page() {
  const [clips, setClips] = useState<Clip[]>(initialClips);
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const startY = useRef(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const c = clips[i];

  const handleTouch = (e: any) => {
    if(e.type==='touchstart') startY.current = e.touches[0].clientY;
    else {
      const diff = startY.current - e.changedTouches[0].clientY;
      if(diff > 50) setI(v => (v+1)%clips.length);
      if(diff < -50) setI(v => (v-1+clips.length)%clips.length);
    }
  };

  const toggleLike = () => {
    setClips(arr => arr.map((cl, idx) => idx===i ? {...cl, liked: !cl.liked, likes: cl.liked ? cl.likes-1 : cl.likes+1} : cl));
  };

  const uploadVideo = (e: any) => {
    const file = e.target.files[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    setClips(prev => [{ user: "You", caption: file.name + " #myvideo #worldclip", sound: "Original sound - You", likes: 0, liked: false, url }, ...prev]);
    setI(0);
    setMuted(false);
  };

  return (
    <div 
      onTouchStart={handleTouch} onTouchEnd={handleTouch}
      onClick={() => { if(muted) setMuted(false); }}
      style={{ background: "black", height: "100dvh", width: "100vw", position: "relative", overflow: "hidden", color: "white", fontFamily: "system-ui" }}
    >
      {/* VIDEO FULLSCREEN - NO BARS */}
      <div style={{ position: "absolute", inset: 0 }}>
        {c.url ? (
          <video src={c.url} autoPlay loop playsInline muted={muted} onClick={() => setMuted(!muted)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <iframe key={`${c.id}-${muted}`} src={`https://www.youtube-nocookie.com/embed/${c.id}?autoplay=1&mute=${muted?1:0}&controls=0&loop=1&playlist=${c.id}&playsinline=1`} style={{ width: "100%", height: "100%", border: 0, objectFit: "cover" }} allow="autoplay" />
        )}
      </div>

      {/* TOP */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "10px 14px", display: "flex", justifyContent: "space-between", zIndex: 10, background: "linear-gradient(rgba(0,0,0,0.6), transparent)" }}>
        <span onClick={() => fileRef.current?.click()} style={{ fontSize: "22px" }}>☰ Upload</span>
        <b>For You</b>
        <span>🔍</span>
      </div>
      <input ref={fileRef} type="file" accept="video/*" onChange={uploadVideo} hidden />

      {/* RIGHT BUTTONS - TikTok style like your screenshot */}
      <div style={{ position: "absolute", right: "8px", bottom: "90px", zIndex: 10, display: "flex", flexDirection: "column", gap: "22px", alignItems: "center" }}>
        
        <div style={{ background: "rgba(70,70,70,0.8)", borderRadius: "22px", padding: "8px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div>•••</div>
          <div style={{ width: "3px", height: "55px", background: "#2b7fff", borderRadius: "3px" }}></div>
          <div>🎵</div>
        </div>

        <div>🔔</div>

        <div style={{ textAlign: "center" }} onClick={(e) => { e.stopPropagation(); toggleLike(); }}>
          <div style={{ fontSize: "30px", color: c.liked ? "red" : "white" }}>{c.liked ? "❤️" : "🤍"}</div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{c.likes}</div>
        </div>

        <div style={{ textAlign: "center" }} onClick={(e) => { e.stopPropagation(); setShowComments(true); }}>
          <div style={{ fontSize: "26px" }}>💬</div>
          <div style={{ fontSize: "12px" }}>{showComments ? "Close" : "Comment"}</div>
        </div>

        <div style={{ textAlign: "center" }} onClick={(e) => { e.stopPropagation(); if(navigator.share) navigator.share({ title: c.caption, url: window.location.href }); else alert("Link copied!"); }}>
          <div style={{ fontSize: "26px" }}>↗️</div>
          <div style={{ fontSize: "11px" }}>Share</div>
        </div>
      </div>

      {/* BOTTOM - username + hashtags + sound - like you asked */}
      <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "70px", zIndex: 10 }}>
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>🇿🇦 {c.user}</div>
        <div style={{ fontSize: "14px", marginTop: "4px", lineHeight: "18px" }}>{c.caption}</div>
        <div style={{ fontSize: "13px", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>♪</span> <span style={{ fontWeight: "500" }}>{c.sound}</span>
        </div>
        <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>World Clip • Data Lite for Africa</div>
      </div>

      {/* COMMENT SHEET */}
      {showComments && (
        <div onClick={() => setShowComments(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 20, display: "flex", alignItems: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", background: "#111", borderRadius: "14px 14px 0 0", padding: "14px", maxHeight: "50vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><b>Comments</b><span onClick={() => setShowComments(false)}>✕</span></div>
            <div style={{ marginTop: "12px", fontSize: "14px", opacity: 0.8 }}>🔥 Nice video! • @user1</div>
            <div style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>❤️ Love this sound • @tyla_fan</div>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
              <input placeholder="Add comment..." style={{ flex: 1, background: "#222", border: "none", borderRadius: "20px", padding: "10px 14px", color: "white" }} />
              <button style={{ background: "white", color: "black", borderRadius: "20px", padding: "0 16px", border: "none", fontWeight: "bold" }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* hint for sound - disappears after first tap, no button */}
      {muted && <div style={{ position: "absolute", bottom: "140px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.5)", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", zIndex: 9 }}>Tap video for sound</div>}
    </div>
  );
                            }
