import { useState } from "react";

const SERMONS = [
  { id: 1, title: "Walking in Faith", speaker: "Pastor James Thompson", date: "May 18, 2026", duration: "42 min", series: "Foundations", scripture: "Hebrews 11:1-6", thumbnail: "🕊️" },
  { id: 2, title: "The Power of Grace", speaker: "Pastor James Thompson", date: "May 11, 2026", duration: "38 min", series: "Foundations", scripture: "Ephesians 2:8-10", thumbnail: "✝️" },
  { id: 3, title: "Renewed in Spirit", speaker: "Pastor Diane Clark", date: "May 4, 2026", duration: "45 min", series: "New Life", scripture: "Romans 12:1-2", thumbnail: "🌿" },
  { id: 4, title: "A Heart of Gratitude", speaker: "Pastor James Thompson", date: "Apr 27, 2026", duration: "36 min", series: "New Life", scripture: "Psalm 100", thumbnail: "🙏" },
];

const EVENTS = [
  { id: 1, title: "Sunday Worship Service", date: "May 25, 2026", time: "10:00 AM", location: "Main Sanctuary", category: "Worship", spots: null },
  { id: 2, title: "Youth Bible Study", date: "May 21, 2026", time: "6:30 PM", location: "Youth Hall", category: "Youth", spots: 12 },
  { id: 3, title: "Community Food Drive", date: "May 24, 2026", time: "9:00 AM", location: "Fellowship Hall", category: "Outreach", spots: 40 },
  { id: 4, title: "Women's Prayer Breakfast", date: "May 28, 2026", time: "8:00 AM", location: "Room 204", category: "Prayer", spots: 8 },
  { id: 5, title: "Vacation Bible School Prep", date: "Jun 1, 2026", time: "7:00 PM", location: "Children's Wing", category: "Children", spots: 20 },
  { id: 6, title: "Annual Picnic & Fellowship", date: "Jun 7, 2026", time: "12:00 PM", location: "Riverside Park", category: "Fellowship", spots: null },
];

const PRAYER_REQUESTS = [
  { id: 1, name: "Margaret H.", request: "Recovery from surgery next week — peace and swift healing.", date: "May 19", category: "Health", prayed: false },
  { id: 2, name: "The Rivera Family", request: "Guidance as they navigate a major life transition.", date: "May 18", category: "Family", prayed: false },
  { id: 3, name: "Anonymous", request: "Strength and clarity while dealing with workplace difficulties.", date: "May 17", category: "Work", prayed: false },
  { id: 4, name: "David K.", request: "Prayers for my son who has been struggling in school.", date: "May 16", category: "Family", prayed: true },
];

const GIVING_FUNDS = [
  { id: "general", label: "General Fund", desc: "Supports all church operations and ministries" },
  { id: "missions", label: "Missions & Outreach", desc: "Local and global mission efforts" },
  { id: "building", label: "Building Fund", desc: "Facilities maintenance and expansion" },
  { id: "benevolence", label: "Benevolence Fund", desc: "Supporting families in need in our community" },
];

const CATEGORY_COLORS = {
  Worship: "#7C3AED", Youth: "#0891B2", Outreach: "#059669",
  Prayer: "#DC2626", Children: "#D97706", Fellowship: "#7C3AED",
  Health: "#DC2626", Family: "#0891B2", Work: "#D97706",
};

export default function ChurchApp() {
  const [tab, setTab] = useState("home");
  const [playingSermon, setPlayingSermon] = useState(null);
  const [prayerList, setPrayerList] = useState(PRAYER_REQUESTS);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ name: "", request: "", category: "Health", anonymous: false });
  const [amount, setAmount] = useState("");
  const [fund, setFund] = useState("general");
  const [frequency, setFrequency] = useState("one-time");
  const [givingDone, setGivingDone] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const markPrayed = (id) => {
    setPrayerList(prev => prev.map(p => p.id === id ? { ...p, prayed: !p.prayed } : p));
  };

  const submitPrayer = () => {
    if (!newPrayer.request.trim()) return;
    const entry = {
      id: Date.now(),
      name: newPrayer.anonymous ? "Anonymous" : (newPrayer.name || "Anonymous"),
      request: newPrayer.request,
      date: "Today",
      category: newPrayer.category,
      prayed: false,
    };
    setPrayerList(prev => [entry, ...prev]);
    setNewPrayer({ name: "", request: "", category: "Health", anonymous: false });
    setShowPrayerForm(false);
  };

  const handleGive = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;
    setGivingDone(true);
    setTimeout(() => { setGivingDone(false); setAmount(""); }, 3000);
  };

  const toggleRegister = (id) => {
    setRegisteredEvents(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const tabs = [
    { id: "home", icon: "⛪", label: "Home" },
    { id: "sermons", icon: "🎙️", label: "Sermons" },
    { id: "events", icon: "📅", label: "Events" },
    { id: "prayer", icon: "🙏", label: "Prayer" },
    { id: "give", icon: "💛", label: "Give" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#FAFAF7", color: "#1C1A14" }}>
      {/* Header */}
      <div style={{ background: "#1C1A14", color: "#F5F0E8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>✝️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "0.02em" }}>Grace Fellowship</div>
            <div style={{ fontSize: 11, color: "#B5A98A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Member Portal</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#3D3520", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#D4C49A", fontWeight: 600 }}>JD</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E4D8", display: "flex", justifyContent: "space-around", padding: "0 8px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", padding: "12px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: tab === t.id ? "#8B6914" : "#7A7060", borderBottom: `2px solid ${tab === t.id ? "#8B6914" : "transparent"}`, transition: "all 0.15s", fontSize: 12, fontFamily: "sans-serif", fontWeight: tab === t.id ? 600 : 400 }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 80px" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #2D2410 0%, #5C3D11 100%)", color: "#F5F0E8", padding: "32px 24px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.06 }}>✝</div>
              <div style={{ fontSize: 13, color: "#C4A85A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontFamily: "sans-serif" }}>Welcome back</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Good morning, James</div>
              <div style={{ fontSize: 14, color: "#C4A46A", fontFamily: "sans-serif" }}>Sunday service is this week — May 25 at 10:00 AM</div>
            </div>

            {/* Verse of the day */}
            <div style={{ margin: "20px 16px 0", background: "#fff", borderRadius: 12, border: "1px solid #E8E4D8", padding: "20px 22px" }}>
              <div style={{ fontSize: 11, color: "#9A8E76", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>Verse of the day</div>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: "#2C2416", fontStyle: "italic" }}>"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."</div>
              <div style={{ marginTop: 10, fontSize: 13, color: "#8B6914", fontFamily: "sans-serif", fontWeight: 600 }}>Proverbs 3:5–6</div>
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "16px 16px 0", fontFamily: "sans-serif" }}>
              {[
                { label: "Upcoming Events", value: EVENTS.length, icon: "📅" },
                { label: "Prayer Requests", value: prayerList.length, icon: "🙏" },
                { label: "New Sermons", value: 2, icon: "🎙️" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E8E4D8", padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1C1A14" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9A8E76", lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent sermon */}
            <div style={{ margin: "20px 16px 0" }}>
              <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5C5040", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Latest Sermon</div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E4D8", padding: "18px 20px", display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }} onClick={() => { setTab("sermons"); setPlayingSermon(SERMONS[0].id); }}>
                <div style={{ width: 50, height: 50, borderRadius: 10, background: "#F5F0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{SERMONS[0].thumbnail}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{SERMONS[0].title}</div>
                  <div style={{ fontSize: 12, color: "#8A7C60", fontFamily: "sans-serif" }}>{SERMONS[0].speaker} · {SERMONS[0].duration}</div>
                </div>
                <div style={{ fontSize: 22, color: "#8B6914" }}>▶</div>
              </div>
            </div>

            {/* Next event */}
            <div style={{ margin: "16px 16px 0" }}>
              <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5C5040", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Coming Up</div>
              {EVENTS.slice(0, 2).map(ev => (
                <div key={ev.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E8E4D8", padding: "14px 18px", marginBottom: 8, display: "flex", alignItems: "center", gap: 14, fontFamily: "sans-serif" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: "#F5F0E0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: "#8B6914", fontWeight: 700, textTransform: "uppercase" }}>{ev.date.split(" ")[0]}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1A14", lineHeight: 1 }}>{ev.date.split(" ")[1]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1C1A14" }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "#9A8E76" }}>{ev.time} · {ev.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERMONS */}
        {tab === "sermons" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sermons</div>
            <div style={{ fontSize: 14, color: "#7A7060", fontFamily: "sans-serif", marginBottom: 20 }}>Messages from Grace Fellowship</div>
            {SERMONS.map(s => (
              <div key={s.id} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${playingSermon === s.id ? "#8B6914" : "#E8E4D8"}`, padding: "18px 20px", marginBottom: 12, cursor: "pointer", transition: "border-color 0.2s" }} onClick={() => setPlayingSermon(playingSermon === s.id ? null : s.id)}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "#F5F0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{s.thumbnail}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: "#8A7C60", fontFamily: "sans-serif", marginBottom: 6 }}>{s.speaker}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: "#F5F0E0", color: "#6B5020", fontSize: 11, padding: "3px 8px", borderRadius: 6, fontFamily: "sans-serif" }}>{s.series}</span>
                      <span style={{ background: "#F0F4FF", color: "#3A50A0", fontSize: 11, padding: "3px 8px", borderRadius: 6, fontFamily: "sans-serif" }}>{s.scripture}</span>
                      <span style={{ color: "#9A8E76", fontSize: 11, fontFamily: "sans-serif", padding: "3px 0" }}>{s.duration} · {s.date}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, color: playingSermon === s.id ? "#8B6914" : "#C4B898" }}>{playingSermon === s.id ? "⏸" : "▶"}</div>
                </div>
                {playingSermon === s.id && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #E8E4D8" }}>
                    <div style={{ background: "#F9F6EE", borderRadius: 8, padding: "12px 14px", fontFamily: "sans-serif" }}>
                      <div style={{ fontSize: 12, color: "#8A7C60", marginBottom: 8 }}>Now playing</div>
                      <div style={{ height: 4, background: "#E8E4D8", borderRadius: 2, marginBottom: 10 }}>
                        <div style={{ height: 4, width: "35%", background: "#8B6914", borderRadius: 2 }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9A8E76" }}>
                        <span>14:50</span><span>{s.duration}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
                        {["⏮", "⏪", "⏸", "⏩", "⏭"].map((ctrl, i) => (
                          <button key={i} style={{ background: i === 2 ? "#8B6914" : "none", color: i === 2 ? "#fff" : "#5C4A20", border: "none", borderRadius: i === 2 ? "50%" : 0, width: i === 2 ? 36 : "auto", height: i === 2 ? 36 : "auto", fontSize: i === 2 ? 16 : 18, cursor: "pointer" }}>{ctrl}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* EVENTS */}
        {tab === "events" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Events</div>
            <div style={{ fontSize: 14, color: "#7A7060", fontFamily: "sans-serif", marginBottom: 20 }}>Join us at upcoming gatherings</div>
            {EVENTS.map(ev => (
              <div key={ev.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E4D8", padding: "18px 20px", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 50, height: 54, borderRadius: 10, background: "#1C1A14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: "#C4A85A", fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ev.date.split(" ")[0]}</div>
                    <div style={{ fontSize: 20, color: "#fff", fontWeight: 700, lineHeight: 1.1 }}>{ev.date.split(" ")[1]}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ev.title}</div>
                        <div style={{ fontSize: 12, color: "#8A7C60", fontFamily: "sans-serif", marginBottom: 6 }}>🕐 {ev.time} &nbsp;·&nbsp; 📍 {ev.location}</div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ background: "#F5F0E0", color: CATEGORY_COLORS[ev.category] || "#5C4020", fontSize: 11, padding: "3px 8px", borderRadius: 6, fontFamily: "sans-serif", fontWeight: 600 }}>{ev.category}</span>
                          {ev.spots && <span style={{ fontSize: 11, color: "#9A8E76", fontFamily: "sans-serif" }}>{ev.spots} spots left</span>}
                        </div>
                      </div>
                      <button onClick={() => toggleRegister(ev.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${registeredEvents.includes(ev.id) ? "#059669" : "#C4A85A"}`, background: registeredEvents.includes(ev.id) ? "#ECFDF5" : "transparent", color: registeredEvents.includes(ev.id) ? "#059669" : "#8B6914", fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        {registeredEvents.includes(ev.id) ? "✓ Registered" : "Register"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRAYER */}
        {tab === "prayer" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Prayer Requests</div>
                <div style={{ fontSize: 14, color: "#7A7060", fontFamily: "sans-serif" }}>Lifting each other in prayer</div>
              </div>
              <button onClick={() => setShowPrayerForm(!showPrayerForm)} style={{ padding: "9px 16px", borderRadius: 8, background: "#1C1A14", color: "#F5F0E8", border: "none", fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Request</button>
            </div>

            {showPrayerForm && (
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #C4A85A", padding: "20px", marginBottom: 20, fontFamily: "sans-serif" }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Submit a Prayer Request</div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: "#7A7060", display: "block", marginBottom: 5 }}>Your Name</label>
                  <input value={newPrayer.anonymous ? "" : newPrayer.name} onChange={e => setNewPrayer(p => ({ ...p, name: e.target.value }))} disabled={newPrayer.anonymous} placeholder="First name or initials" style={{ width: "100%", padding: "9px 12px", border: "1px solid #E8E4D8", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: newPrayer.anonymous ? "#F5F5F2" : "#fff" }} />
                  <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 12, color: "#7A7060", cursor: "pointer" }}>
                    <input type="checkbox" checked={newPrayer.anonymous} onChange={e => setNewPrayer(p => ({ ...p, anonymous: e.target.checked }))} /> Submit anonymously
                  </label>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: "#7A7060", display: "block", marginBottom: 5 }}>Category</label>
                  <select value={newPrayer.category} onChange={e => setNewPrayer(p => ({ ...p, category: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1px solid #E8E4D8", borderRadius: 8, fontSize: 14, background: "#fff" }}>
                    {["Health", "Family", "Work", "Grief", "Relationships", "Guidance", "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "#7A7060", display: "block", marginBottom: 5 }}>Your Request</label>
                  <textarea value={newPrayer.request} onChange={e => setNewPrayer(p => ({ ...p, request: e.target.value }))} placeholder="Share what's on your heart..." rows={3} style={{ width: "100%", padding: "9px 12px", border: "1px solid #E8E4D8", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={submitPrayer} style={{ flex: 1, padding: "10px", background: "#1C1A14", color: "#F5F0E8", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Submit</button>
                  <button onClick={() => setShowPrayerForm(false)} style={{ padding: "10px 16px", background: "none", border: "1px solid #E8E4D8", borderRadius: 8, fontFamily: "sans-serif", fontSize: 14, cursor: "pointer", color: "#7A7060" }}>Cancel</button>
                </div>
              </div>
            )}

            {prayerList.map(p => (
              <div key={p.id} style={{ background: p.prayed ? "#F9FEFC" : "#fff", borderRadius: 12, border: `1px solid ${p.prayed ? "#BBF7D0" : "#E8E4D8"}`, padding: "16px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", align: "center", gap: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                    <span style={{ background: "#F5F0E0", color: CATEGORY_COLORS[p.category] || "#5C4020", fontSize: 11, padding: "2px 7px", borderRadius: 5, fontFamily: "sans-serif", marginLeft: 6 }}>{p.category}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#9A8E76", fontFamily: "sans-serif" }}>{p.date}</span>
                </div>
                <div style={{ fontSize: 14, color: "#3C3426", lineHeight: 1.65, marginBottom: 12, fontStyle: "italic" }}>"{p.request}"</div>
                <button onClick={() => markPrayed(p.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: p.prayed ? "#D1FAE5" : "#F5F0E0", color: p.prayed ? "#065F46" : "#6B5020", border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  {p.prayed ? "🙏 Prayed" : "🙏 I'll Pray"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* GIVE */}
        {tab === "give" && (
          <div style={{ padding: "20px 16px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Online Giving</div>
            <div style={{ fontSize: 14, color: "#7A7060", fontFamily: "sans-serif", marginBottom: 20 }}>Give generously as the Lord has blessed you</div>

            {givingDone ? (
              <div style={{ background: "#ECFDF5", border: "1px solid #6EE7B7", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🙏</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#065F46", marginBottom: 6 }}>Thank You!</div>
                <div style={{ fontSize: 14, color: "#047857", fontFamily: "sans-serif" }}>Your gift of ${parseFloat(amount).toFixed(2)} to the {GIVING_FUNDS.find(f => f.id === fund)?.label} has been received.</div>
              </div>
            ) : (
              <>
                {/* Fund select */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5C5040", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Designate Your Gift</div>
                  {GIVING_FUNDS.map(f => (
                    <div key={f.id} onClick={() => setFund(f.id)} style={{ background: fund === f.id ? "#FBF7EE" : "#fff", border: `1.5px solid ${fund === f.id ? "#C4A85A" : "#E8E4D8"}`, borderRadius: 10, padding: "13px 16px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${fund === f.id ? "#8B6914" : "#D4C9B0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {fund === f.id && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#8B6914" }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{f.label}</div>
                        <div style={{ fontSize: 12, color: "#8A7C60", fontFamily: "sans-serif" }}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Frequency */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5C5040", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Frequency</div>
                  <div style={{ display: "flex", gap: 8, fontFamily: "sans-serif" }}>
                    {[["one-time", "One Time"], ["weekly", "Weekly"], ["monthly", "Monthly"]].map(([v, l]) => (
                      <button key={v} onClick={() => setFrequency(v)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1.5px solid ${frequency === v ? "#C4A85A" : "#E8E4D8"}`, background: frequency === v ? "#FBF7EE" : "#fff", color: frequency === v ? "#8B6914" : "#5C5040", fontWeight: frequency === v ? 700 : 400, fontSize: 13, cursor: "pointer" }}>{l}</button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5C5040", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10, fontFamily: "sans-serif" }}>
                    {["25", "50", "100", "250"].map(a => (
                      <button key={a} onClick={() => setAmount(a)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1.5px solid ${amount === a ? "#C4A85A" : "#E8E4D8"}`, background: amount === a ? "#FBF7EE" : "#fff", color: amount === a ? "#8B6914" : "#5C5040", fontWeight: amount === a ? 700 : 400, fontSize: 14, cursor: "pointer" }}>${a}</button>
                    ))}
                  </div>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#8A7C60", fontFamily: "sans-serif" }}>$</span>
                    <input type="number" placeholder="Other amount" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: "100%", padding: "12px 12px 12px 30px", border: "1.5px solid #E8E4D8", borderRadius: 10, fontSize: 16, boxSizing: "border-box", fontFamily: "sans-serif" }} />
                  </div>
                </div>

                <button onClick={handleGive} style={{ width: "100%", padding: "16px", background: amount && parseFloat(amount) > 0 ? "#1C1A14" : "#C4BCA8", color: "#F5F0E8", border: "none", borderRadius: 10, fontFamily: "sans-serif", fontSize: 16, fontWeight: 700, cursor: amount && parseFloat(amount) > 0 ? "pointer" : "default", transition: "background 0.2s" }}>
                  Give {amount && parseFloat(amount) > 0 ? `$${parseFloat(amount).toFixed(2)}` : ""}
                </button>
                <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#9A8E76", fontFamily: "sans-serif" }}>🔒 Secure giving · All transactions encrypted</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}